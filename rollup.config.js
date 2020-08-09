import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-porter";

const PROD = process.env.NODE_ENV === "production";

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
    plugins: PROD && [terser()],
    sourcemap: true,
    globals: externals,
  },
  external: Object.keys(externals),
  plugins: [
    copy({ targets: [{ src: "public/*", dest: "dist" }] }),
    resolve(),
    alias({ entries: { "~": path.resolve(__dirname, "src") } }),
    css({
      raw: !PROD && "dist/index.css",
      minified: PROD && "dist/index.css",
    }),
  ],
};
