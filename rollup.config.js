import esmImportToUrl from 'rollup-plugin-esm-import-to-url';
// import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    // plugins: [terser()],
  },
  plugins: [
    copy({ targets: [{ src: 'public/*', dest: 'dist' }] }),
    esmImportToUrl({
      imports: {
        haunted: 'https://unpkg.com/haunted/haunted.js',
        'lit-element/lib/css-tag': `https://unpkg.com/lit-element/lib/css-tag.js`,
        'lit-html': `https://unpkg.com/lit-html/lit-html.js`,
        'lit-html/directives/repeat.js': `https://unpkg.com/lit-html/directives/repeat.js`,
        'query-selector-shadow-dom': `https://unpkg.com/query-selector-shadow-dom`,
      },
    }),
  ],
};
