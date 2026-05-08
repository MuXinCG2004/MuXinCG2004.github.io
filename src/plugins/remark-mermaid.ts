import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

/**
 * Convert ```mermaid fenced blocks into raw <pre class="mermaid"> so Shiki
 * doesn't tokenize them. The client-side mermaid runtime renders them.
 */
export default function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid' || !parent || index == null) return
      const escaped = node.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      parent.children[index] = {
        type: 'html',
        value: `<pre class="mermaid not-prose">${escaped}</pre>`
      } as never
    })
  }
}
