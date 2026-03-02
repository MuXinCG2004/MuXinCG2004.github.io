import { h } from 'hastscript'
import type { ShikiTransformer } from 'shiki'

export {
  transformerNotationDiff,
  transformerNotationHighlight
} from '@shikijs/transformers'

function parseMetaString(str = '') {
  return Object.fromEntries(
    str.split(' ').reduce((acc: [string, string | true][], cur) => {
      const matched = cur.match(/(.+)?=("(.+)"|'(.+)')$/)
      if (matched === null) return acc
      const key = matched[1]
      const value = matched[3] || matched[4] || true
      acc = [...acc, [key, value]]
      return acc
    }, [])
  )
}

// Nest a div in the outer layer
export const updateStyle = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-update-style',
    pre(node) {
      const container = h('pre', node.children)
      node.children = [container]
      node.tagName = 'div'
    }
  }
}

// Add a title to the code block
export const addTitle = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-add-title',
    pre(node) {
      const rawMeta = this.options.meta?.__raw
      if (!rawMeta) return
      const meta = parseMetaString(rawMeta)
      // If meta is needed to parse in other transformers
      // if (this.options.meta) {
      //   Object.assign(this.options.meta, meta)
      // }

      if (!meta.title) return

      const div = h(
        'div',
        {
          class: 'title text-sm text-foreground px-3 py-1 bg-primary-foreground rounded-lg border'
        },
        meta.title.toString()
      )
      node.children.unshift(div)
    }
  }
}

// Add a language tag to the code block
export const addLanguage = (): ShikiTransformer => {
  return {
    name: 'shiki-transformer-add-language',
    pre(node) {
      const span = h(
        'span',
        {
          class: 'language ps-1 pe-3 text-sm bg-muted text-muted-foreground'
        },
        this.options.lang
      )
      node.children.push(span)
    }
  }
}

// Add a copy button to the code block
export const addCopyButton = (timeout?: number): ShikiTransformer => {
  const toggleMs = timeout || 3000

  return {
    name: 'shiki-transformer-copy-button',
    pre(node) {
      const button = h(
        'button',
        {
          class: 'copy text-muted-foreground p-1 box-content border rounded bg-primary-foreground',
          'data-code': this.source,
          onclick: `
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add('copied');
          setTimeout(() => this.classList.remove('copied'), ${toggleMs})
        `
        },
        [
          h('div', { class: 'ready' }, [
            h(
              'svg',
              {
                class: 'size-5'
              },
              [
                h('use', {
                  href: '/icons/code.svg#mingcute-clipboard-line'
                })
              ]
            )
          ]),
          h('div', { class: 'success hidden' }, [
            h(
              'svg',
              {
                class: 'size-5'
              },
              [
                h('use', {
                  href: '/icons/code.svg#mingcute-file-check-line'
                })
              ]
            )
          ])
        ]
      )

      node.children.push(button)
    }
  }
}

// Collapse long code blocks
export const addCollapsible = (threshold: number = 15): ShikiTransformer => {
  return {
    name: 'shiki-transformer-collapsible',
    pre(node) {
      const lines = this.source.split('\n')
      // Don't count trailing empty line
      const lineCount = lines[lines.length - 1] === '' ? lines.length - 1 : lines.length
      if (lineCount <= threshold) return

      node.properties['data-collapsible'] = ''
      node.properties['data-collapsed'] = ''

      const button = h(
        'button',
        {
          class: 'collapse-toggle',
          onclick: `
            const block = this.closest('[data-collapsible]');
            if (block.hasAttribute('data-collapsed')) {
              block.removeAttribute('data-collapsed');
            } else {
              block.setAttribute('data-collapsed', '');
            }
          `
        },
        [
          h('span', { class: 'collapse-text-expand' }, '展开'),
          h('span', { class: 'collapse-text-collapse' }, '收起'),
          h(
            'svg',
            {
              class: 'collapse-chevron',
              viewBox: '0 0 24 24',
              width: '16',
              height: '16',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round'
            },
            [h('polyline', { points: '6 9 12 15 18 9' })]
          )
        ]
      )

      node.children.push(button)
    }
  }
}
