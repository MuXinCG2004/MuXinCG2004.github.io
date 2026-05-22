#!/usr/bin/env tsx
/**
 * Generate one-line TL;DR summaries for blog posts using GitHub Models (free).
 *
 * Usage:
 *   GITHUB_TOKEN=ghp_... npm run summaries           # only fill missing
 *   GITHUB_TOKEN=ghp_... npm run summaries -- --force # overwrite all
 *   npm run summaries -- --post Algo-DP             # only one post
 *
 * Notes:
 * - Caches the result back into the post's frontmatter under `summary`.
 * - Never re-generates a summary that already exists unless --force is passed.
 * - Skips drafts.
 * - Get a token from https://github.com/settings/tokens (no scopes needed for Models).
 */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, basename } from 'node:path'
import { parse, stringify } from 'yaml'

const BLOG_DIR = join(process.cwd(), 'src/content/blog')

interface Provider {
  name: string
  endpoint: string
  defaultModel: string
  token: string | undefined
  setupHint: string
}

// Provider auto-detection: GROQ_API_KEY beats GITHUB_TOKEN. Both are OpenAI-compatible.
const PROVIDERS: Record<'groq' | 'github', Provider> = {
  groq: {
    name: 'Groq',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    defaultModel: 'llama-3.3-70b-versatile',
    token: process.env.GROQ_API_KEY,
    setupHint: 'Sign up free at https://console.groq.com → API Keys'
  },
  github: {
    name: 'GitHub Models',
    endpoint: 'https://models.github.ai/inference/chat/completions',
    defaultModel: 'microsoft/phi-4-mini-instruct',
    token: process.env.GITHUB_TOKEN,
    setupHint:
      'Create token at https://github.com/settings/tokens with `models:read` scope ' +
      '(Classic) or Models permission (Fine-grained)'
  }
}

const PROVIDER_KEY: 'groq' | 'github' = process.env.GROQ_API_KEY
  ? 'groq'
  : 'github'
const PROVIDER = PROVIDERS[PROVIDER_KEY]
const MODEL = process.env.AI_SUMMARY_MODEL || PROVIDER.defaultModel
const MAX_BODY_CHARS = 6000
// Groq: 30 RPM, GitHub: 15 RPM. 5s spacing covers both.
const MIN_INTERVAL_MS = Number(process.env.AI_SUMMARY_DELAY_MS) || 5000
const MAX_RETRIES = 3

const args = process.argv.slice(2)
const force = args.includes('--force')
const listModels = args.includes('--list-models')
const postFilter = args.includes('--post') ? args[args.indexOf('--post') + 1] : null

interface Frontmatter {
  title: string
  description?: string
  draft?: boolean
  summary?: string
  language?: string
  [k: string]: unknown
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
let lastCallAt = 0

function splitFrontmatter(raw: string): { fm: Frontmatter; body: string } | null {
  const m = raw.match(FRONTMATTER_RE)
  if (!m) return null
  return { fm: parse(m[1]) as Frontmatter, body: m[2] }
}

function joinFrontmatter(fm: Frontmatter, body: string): string {
  const yaml = stringify(fm, { lineWidth: 0, defaultStringType: 'PLAIN' })
  return `---\n${yaml}---\n${body}`
}

async function listAvailableModels() {
  if (PROVIDER_KEY === 'groq') {
    if (!PROVIDER.token) throw new Error('GROQ_API_KEY not set')
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${PROVIDER.token}`, Accept: 'application/json' }
    })
    if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`)
    const { data } = (await res.json()) as { data: { id: string; owned_by?: string }[] }
    console.log(`\nFound ${data.length} model(s) on Groq:\n`)
    for (const m of data) console.log(`  ${m.id}${m.owned_by ? `   (${m.owned_by})` : ''}`)
    console.log(`\nUse with:  AI_SUMMARY_MODEL=<id> npm run summaries`)
    return
  }
  // GitHub Models catalog
  if (!PROVIDER.token) throw new Error('GITHUB_TOKEN not set')
  const res = await fetch('https://models.github.ai/catalog/models', {
    headers: { Authorization: `Bearer ${PROVIDER.token}`, Accept: 'application/json' }
  })
  if (!res.ok) throw new Error(`Catalog ${res.status}: ${await res.text()}`)
  const raw = (await res.json()) as unknown
  const models = Array.isArray(raw)
    ? (raw as Record<string, unknown>[])
    : Array.isArray((raw as { data?: unknown }).data)
      ? ((raw as { data: Record<string, unknown>[] }).data)
      : []

  if (!models.length) {
    console.log('Catalog returned no models. Raw response below — paste this back if puzzling:\n')
    console.log(JSON.stringify(raw, null, 2).slice(0, 2000))
    return
  }

  console.log(`\nFound ${models.length} model(s) in your GitHub Models catalog:\n`)
  for (const m of models) {
    const id = (m.id as string) || (m.name as string) || '<no id>'
    const tags = (m.tags as string[] | undefined)?.join(', ') ?? ''
    const caps = (m.capabilities as string[] | undefined)?.join(', ') ?? ''
    const extra = [caps && `caps: ${caps}`, tags && `tags: ${tags}`].filter(Boolean).join('  |  ')
    console.log(`  ${id}${extra ? `   (${extra})` : ''}`)
  }
  console.log(`\nUse with:  AI_SUMMARY_MODEL=<id> npm run summaries`)
}

async function callModel(
  title: string,
  description: string,
  body: string,
  lang: string,
  attempt = 0
): Promise<string> {
  if (!PROVIDER.token) {
    throw new Error(
      `No API key found. Set one of:\n` +
        `  GROQ_API_KEY (recommended — ${PROVIDERS.groq.setupHint})\n` +
        `  GITHUB_TOKEN (${PROVIDERS.github.setupHint})`
    )
  }

  // Throttle: enforce min interval since last call (skip-safe — only counts real calls).
  const elapsed = Date.now() - lastCallAt
  const wait = MIN_INTERVAL_MS - elapsed
  if (wait > 0) await sleep(wait)
  lastCallAt = Date.now()

  const trimmed = body.length > MAX_BODY_CHARS ? body.slice(0, MAX_BODY_CHARS) + '\n...[truncated]' : body
  const targetLang = lang === 'zh' ? 'Chinese' : 'English'
  const system =
    `You write a one-sentence TL;DR for a technical blog post. Output ONLY the sentence, ` +
    `no quotes, no preamble, no markdown, no trailing period unless natural. ` +
    `Max 30 words. Concrete and specific — name the technique or insight, not just the topic. ` +
    `Write in ${targetLang}.`
  const user =
    `Title: ${title}\n` +
    (description ? `Description: ${description}\n` : '') +
    `\nBody:\n${trimmed}`

  const res = await fetch(PROVIDER.endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PROVIDER.token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      max_tokens: 120,
      temperature: 0.3
    })
  })

  if (res.status === 429 && attempt < MAX_RETRIES) {
    // Honor Retry-After when present, else exponential backoff: 30s, 90s, 180s.
    const retryAfter = Number(res.headers.get('retry-after')) * 1000
    const backoff = retryAfter > 0 ? retryAfter : 30_000 * Math.pow(2, attempt)
    console.warn(`       rate-limited (429), waiting ${Math.round(backoff / 1000)}s (retry ${attempt + 1}/${MAX_RETRIES})`)
    await sleep(backoff)
    return callModel(title, description, body, lang, attempt + 1)
  }

  if (res.status === 403 && PROVIDER_KEY === 'github') {
    const text = await res.text()
    throw new Error(
      `403 on model "${MODEL}": ${text}\n` +
      `       Your GITHUB_TOKEN likely lacks the "models:read" scope.\n` +
      `       Easier path: switch to Groq (more generous free tier):\n` +
      `         export GROQ_API_KEY=gsk_... ; npm run summaries\n` +
      `       Get a free key at https://console.groq.com`
    )
  }

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${PROVIDER.name} ${res.status}: ${text}`)
  }
  const json = (await res.json()) as { choices: { message: { content: string } }[] }
  const content = json.choices?.[0]?.message?.content?.trim() ?? ''
  return content
    .replace(/^["'`]|["'`]$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function processFile(file: string) {
  const path = join(BLOG_DIR, file)
  const raw = await readFile(path, 'utf8')
  const parts = splitFrontmatter(raw)
  if (!parts) {
    console.warn(`[skip] ${file}: no frontmatter`)
    return
  }
  const { fm, body } = parts
  if (fm.draft) return console.log(`[skip] ${file}: draft`)
  if (fm.summary && !force) return

  console.log(`[gen ] ${file}${force && fm.summary ? ' (forced)' : ''}`)
  try {
    const summary = await callModel(fm.title, fm.description ?? '', body, fm.language ?? 'en')
    if (!summary) {
      console.warn(`[warn] ${file}: empty summary, skipping write`)
      return
    }
    fm.summary = summary
    await writeFile(path, joinFrontmatter(fm, body))
    console.log(`       → ${summary}`)
  } catch (err) {
    console.error(`[fail] ${file}: ${(err as Error).message}`)
  }
}

async function main() {
  console.log(`Provider: ${PROVIDER.name}    Model: ${MODEL}\n`)
  if (listModels) {
    await listAvailableModels()
    return
  }
  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
  const targets = postFilter
    ? files.filter((f) => basename(f, '.md').includes(postFilter) || f.includes(postFilter))
    : files
  if (!targets.length) {
    console.error('No matching posts.')
    process.exit(1)
  }
  for (const f of targets) {
    await processFile(f)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
