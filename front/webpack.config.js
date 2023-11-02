const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");


const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: isProd ? "production" : "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: resolve(__dirname, "build"),
    filename: "build.js",
    publicPath: '/',
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sass|less|css|scss)$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'sass-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    port: 4000,
    open: true,
    hot: true,
    compress: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      webSocketURL: "auto://0.0.0.0:0/ws"
    }
  };
}

module.exports = config;