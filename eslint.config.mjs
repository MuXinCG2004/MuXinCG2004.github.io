// @ts-check

import eslint from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  // Ignore files
  {
    ignores: ['public/scripts/*', '.astro/', 'src/type.d.ts']
  }
]
