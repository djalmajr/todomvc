import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import liveServer from 'rollup-plugin-live-server';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

const DEV = !!process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'app',
    sourcemap: true,
  },
  plugins: [
    copy({ targets: [{ src: 'public/*', dest: 'dist' }] }),

    svelte({
      // enable run-time checks when not in production
      dev: DEV,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => css.write('dist/index.css'),
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({ browser: true, dedupe: ['svelte'] }),

    commonjs(),

    // Watch the `dist` directory and refresh the
    // browser on changes when not in production
    DEV && liveServer({ file: 'index.html', root: 'dist', port: 8889 }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    !DEV && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
