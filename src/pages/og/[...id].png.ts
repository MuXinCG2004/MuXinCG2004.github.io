import type { APIContext, GetStaticPathsResult } from 'astro'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { getBlogCollection } from 'astro-pure/server'

// Load local font file at build time
const fontData = readFileSync(resolve('src/assets/fonts/NotoSansSC-Bold.otf'))

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = await getBlogCollection()
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post }
  }))
}

export async function GET({ props }: APIContext) {
  const { post } = props
  const { title, description, publishDate, tags } = post.data

  const dateStr = publishDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const tagList = tags?.slice(0, 3) || []

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          fontFamily: 'Noto Sans SC',
          color: '#f1f5f9'
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '20px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '48px',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      maxWidth: '900px',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    },
                    children: title
                  }
                },
                description
                  ? {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '24px',
                          color: '#94a3b8',
                          lineHeight: 1.5,
                          maxWidth: '800px',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        },
                        children: description
                      }
                    }
                  : null
              ].filter(Boolean)
            }
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: '8px' },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: '22px', fontWeight: 700 },
                          children: "MuXinCG's Blog"
                        }
                      },
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: '18px', color: '#94a3b8' },
                          children: dateStr
                        }
                      }
                    ]
                  }
                },
                tagList.length > 0
                  ? {
                      type: 'div',
                      props: {
                        style: { display: 'flex', gap: '10px' },
                        children: tagList.map((tag: string) => ({
                          type: 'div',
                          props: {
                            style: {
                              padding: '6px 16px',
                              borderRadius: '9999px',
                              border: '1px solid #475569',
                              fontSize: '16px',
                              color: '#cbd5e1'
                            },
                            children: tag
                          }
                        }))
                      }
                    }
                  : null
              ].filter(Boolean)
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans SC',
          data: fontData,
          weight: 700,
          style: 'normal'
        }
      ]
    }
  )

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 }
  })
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return new Response(pngBuffer.buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
