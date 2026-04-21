import type { Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'


export const theme: ThemeUserConfig = {
  // === Basic configuration ===
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: "MuXinCG's Blog",
  /** Will be used in index page & copyright declaration */
  author: 'Ziheng Zhang',
  /** Description metadata for your website. Can be used in page metadata. */
  description: 'Undergraduate in Computer Science, Shandong University',
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  /** Specify the default language for this site. */
  locale: {
    lang: 'en',
    attrs: 'en_US',
    // Date locale
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: 'src/assets/avatar.jpg',
    alt: 'Avatar'
  },

  // === Global configuration ===
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  head: [],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Series', link: '/series' },
      { title: 'About', link: '/about' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    year: `© ${new Date().getFullYear()}`,
    links: [],
    credits: false,
    social: { github: 'https://github.com/MuXinCG2004', email: 'mailto:202322130196@mail.sdu.edu.cn' }
  },

  content: {
    /** External links configuration */
    externalLinks: {
      content: ' ↗',
      /** Properties for the external links element */
      properties: {
        style: 'user-select:none'
      }
    },
    /** Blog page size for pagination (optional) */
    blogPageSize: 8,
    // Currently support weibo, x, bluesky
    share: ['x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  pagefind: true,
  quote: {
    server: '',
    target: `(data) => ''`
  },
  typography: {
    class: 'prose text-base text-muted-foreground',
    blockquoteStyle: 'italic',
    inlineCodeBlockStyle: 'modern'
  },
  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  waline: {
    enable: false,
    server: ''
  }
}

const config = { ...theme, integ } as Config
export default config