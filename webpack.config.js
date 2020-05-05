const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fetch = require('node-fetch');

module.exports = {
  mode: "development",
  entry: "./src/index",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: "public/index.html" }])
  ],
  devtool: 'sourcemap',
  devServer: {
    before: function(app) {
      app.get('/api', async function(req, res) {
        try {
          const queryURL = req.query.q;
          const resp = await fetch(queryURL);
          const body = await resp.text();
          res.send(body);
        } catch (e) {
          res.status(500);
          res.send(e);
        }

      });
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
};
