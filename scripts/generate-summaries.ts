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
const ENDPOINT = 'https://models.github.ai/inference/chat/completions'
const MODEL = process.env.AI_SUMMARY_MODEL || 'openai/gpt-4o-mini'
const MAX_BODY_CHARS = 6000

const args = process.argv.slice(2)
const force = args.includes('--force')
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

function splitFrontmatter(raw: string): { fm: Frontmatter; body: string } | null {
  const m = raw.match(FRONTMATTER_RE)
  if (!m) return null
  return { fm: parse(m[1]) as Frontmatter, body: m[2] }
}

function joinFrontmatter(fm: Frontmatter, body: string): string {
  const yaml = stringify(fm, { lineWidth: 0, defaultStringType: 'PLAIN' })
  return `---\n${yaml}---\n${body}`
}

async function callModel(title: string, description: string, body: string, lang: string) {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error('GITHUB_TOKEN not set. Get one from https://github.com/settings/tokens')
  }

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

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
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
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub Models ${res.status}: ${text}`)
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
