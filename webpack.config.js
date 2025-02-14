const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
import webpack from "webpack";
import { supportedLocales } from "./config.js";

export default config = {
  resolve: {
    alias: {
      "date-fns-locale": path.dirname(require.resolve("date-fns/package.json")),
    },
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /date-fns[/\\]locale/,
      new RegExp(`(${locales.join("|")})\.js$`),
    ),
  ],
};

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
