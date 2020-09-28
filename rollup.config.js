import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import path from "path";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-porter";
import { terser } from "rollup-plugin-terser";

const { NODE_ENV } = process.env;
const DEV = NODE_ENV !== "production";

const externals = {
  "htm/preact": "htmPreact",
  "preact/hooks": "preactHooks",
  htm: "htm",
  preact: "preact",
};

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "iife",
    sourcemap: true,
    globals: externals,
  },
  external: Object.keys(externals),
  plugins: [
    copy({ targets: [{ src: ["public/favicon.ico", "public/index.html"], dest: "dist" }] }),
    replace({ process: JSON.stringify({ env: { NODE_ENV } }) }),
    resolve(),
    commonjs({ transformMixedEsModules: DEV }),
    alias({ entries: { "~": path.resolve(__dirname, "src") } }),
    css({
      raw: DEV && "dist/index.css",
      minified: !DEV && "dist/index.css",
    }),
    !DEV && terser(),
  ],
};
