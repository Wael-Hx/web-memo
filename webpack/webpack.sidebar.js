const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    "react-lib": {
      import: ["react", "react-dom"],
    },
    sidebar: {
      import: path.resolve(__dirname, "..", "sidebar/index.tsx"),
      dependOn: ["react-lib"],
    },
  },
  output: {
    filename: "static/[name].[contenthash].js",
    path: path.resolve(__dirname, "..", "build/sidebar"),
    assetModuleFilename: "../assets/[name][ext]",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "sidebar/index.html"),
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    moduleIds: "deterministic",
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ico|png|jpeg|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
};