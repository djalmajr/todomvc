const path = require("path");
const webpack = require("webpack");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ExternalsPlugin = require("html-webpack-externals-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");

const { PORT = 8080, HOST = "localhost" } = process.env;

const DEV = process.env.NODE_ENV === "development";

const plugins = [
  new CleanPlugin(["dist"]),
  new HtmlPlugin({
    title: "TodoMVC",
    description: "TodoMVC",
    template: path.resolve(__dirname, "public/index.ejs"),
    stylesheets: [
      "https://fonts.googleapis.com/css?family=Raleway:300,300i,600i,700,900,900i",
      "./base.css",
      "./main.css",
      "./style.css",
    ],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
    },
  }),
  new CopyPlugin([
    { from: "*.css", to: "./", context: "./public" },
    { from: "*.ico", to: "./", context: "./public" },
  ]),
  new ExternalsPlugin({
    externals: [
      { module: "hyperhtml", global: "hyperHTML", entry: "umd.js" },
      { module: "lodash", global: "_", entry: "lodash.min.js" },
      { module: "mobx", global: "mobx", entry: "lib/mobx.umd.min.js" },
      { module: "classnames", global: "classNames", entry: "index.js" },
      { module: "director", global: "Router", entry: "build/director.min.js" },
    ],
  }),
];

if (DEV) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  plugins,
  entry: "./src/index.js",
  devtool: DEV ? "inline-cheap-source-map" : undefined,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          DEV ? { loader: "style-loader" } : MiniCssPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: true,
              localIdentName: "[name]-[local]",
            },
          },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  devServer: {
    compress: true,
    overlay: true,
    open: true,
    hot: true,
    host: HOST,
    port: PORT,
    publicPath: `http://localhost:${PORT}/`,
    stats: {
      chunks: false,
      colors: true,
      reasons: false,
    },
  },
};
