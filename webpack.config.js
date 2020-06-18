const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.css$/,
        // 后面加个?modules表示启用css modules
        use: [ 'style-loader', 'css-loader?modules' ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'react app',
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
};