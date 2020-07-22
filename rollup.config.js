import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import copy from 'rollup-plugin-copy';
import importUrl from 'rollup-plugin-esm-import-to-url';
import { terser } from 'rollup-plugin-terser';

const DEV = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    plugins: !DEV && [terser()],
    sourcemap: true,
  },
  plugins: [
    copy({ targets: [{ src: 'public/*', dest: 'dist' }] }),
    !DEV &&
      importUrl({
        imports: {
          haunted: 'https://unpkg.com/haunted/haunted.js',
          'lit-element/lib/css-tag': `https://unpkg.com/lit-element/lib/css-tag.js`,
          'lit-html': `https://unpkg.com/lit-html/lit-html.js`,
          'lit-html/directives/repeat': `https://unpkg.com/lit-html/directives/repeat.js`,
          'query-selector-shadow-dom': `https://unpkg.com/query-selector-shadow-dom`,
        },
      }),
    resolve(),
    alias({ entries: { '~': path.resolve(__dirname, 'src') } }),
  ],
};
