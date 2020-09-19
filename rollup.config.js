import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";

const DEV = process.env.NODE_ENV !== "production";

const globals = {
  uce: "uce",
  "uce-mixins": "uceMixins",
};

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "iife",
    plugins: !DEV && [terser()],
    sourcemap: true,
    globals,
  },
  external: Object.keys(globals),
  plugins: [
    copy({ targets: [{ src: "public/*", dest: "dist" }] }),
    resolve(),
    alias({ entries: { "~": path.resolve(__dirname, "src") } }),
  ],
};
