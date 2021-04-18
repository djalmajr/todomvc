import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import path from 'path';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-porter';
import del from 'rollup-plugin-delete';
import html from 'rollup-plugin-html2';
import { terser } from 'rollup-plugin-terser';
import { imports } from './src/index.json';

const { NODE_ENV } = process.env;
const DEV = NODE_ENV !== 'production';

export default {
  input: 'src/app/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: DEV,
  },
  external: Object.keys(imports),
  preserveEntrySignatures: false,
  plugins: [
    del({ targets: 'dist/*' }),
    copy({
      targets: [
        {
          dest: 'dist',
          src: ['src/assets', 'src/index.css', 'src/index.json'],
        },
      ],
    }),
    html({
      inject: false,
      template: 'src/index.html',
      externals: [{ file: 'style.css', pos: 'before', type: 'css' }],
    }),
    replace({ process: JSON.stringify({ env: { NODE_ENV } }) }),
    resolve(),
    commonjs({ transformMixedEsModules: DEV }),
    alias({ entries: { '~': path.resolve(__dirname, 'src/app') } }),
    css({
      raw: DEV && 'dist/style.css',
      minified: !DEV && 'dist/style.css',
    }),
    !DEV && terser(),
  ],
};
