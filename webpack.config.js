const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseManifest = require("./public/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const config = {
  mode: 'production',
  entry: {
      background: './src/background.js',
      content: './src/vk_interface/content.js'
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [ ".js" ]
  },
   plugins: [
    new HtmlWebpackPlugin({
      title: "VTelegram",
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#000000"
      },
      manifest: "./public/manifest.json",
      filename: "index.html",
      template: "./public/index.html",
      hash: true
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    })
 ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: ['file-loader']
      }
    ]
  },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
module.exports = config;
