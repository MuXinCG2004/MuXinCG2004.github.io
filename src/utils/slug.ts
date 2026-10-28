/** Convert a display label into a stable URL segment. */
export function slugify(value: string) {
  return value
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

/** Build a slug-to-label map and fail early if two labels would share a URL. */
export function createSlugMap(labels: Iterable<string>) {
  const slugs = new Map<string, string>()

  for (const label of labels) {
    const slug = slugify(label)
    if (!slug) throw new Error(`Label "${label}" does not contain letters or numbers`)
    const previous = slugs.get(slug)
    if (previous && previous !== label) {
      throw new Error(`URL slug collision: "${previous}" and "${label}" both map to "${slug}"`)
    }
    slugs.set(slug, label)
  }

  return slugs
}

export const tagPath = (tag: string) => `/tags/${slugify(tag)}`
export const seriesPath = (series: string) => `/series/${slugify(series)}`
