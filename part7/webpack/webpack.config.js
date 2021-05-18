const path = require("path");
const webpack = require("webpack");

const config = (env, argv) => {
  const backend_url =
    argv.mode === "production"
      ? "http://localhost:3001/notes"
      : "https://evening-mesa-82321.herokuapp.com/api/books";

  return {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
    },
    devServer: {
      contentBase: path.resolve(__dirname, "build"),
      compress: true,
      port: 8000,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            compact: false,
          },
        },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({ BACKEND_URL: JSON.stringify(backend_url) }),
    ],
  };
};

module.exports = config;
