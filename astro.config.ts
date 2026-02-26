// @ts-check

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import AstroPureIntegration from 'astro-pure'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import { remarkAlert } from 'remark-github-blockquote-alert'
import remarkMath from 'remark-math'

import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  site: 'https://muxincg2004.github.io',
  trailingSlash: 'never',

  image: {
    responsiveStyles: true,
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [AstroPureIntegration(config)],

  prefetch: true,
  server: {
    host: true,
    allowedHosts: ['muxincg2004.github.io']
  },
  markdown: {
    remarkPlugins: [remarkMath, remarkAlert],
    rehypePlugins: [
      [rehypeKatex, { strict: false }],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  },
  experimental: {
    contentIntellisense: true
  }
})
