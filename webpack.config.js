const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader"
      },
      {
        test: /\.svg$/,
        loader: 'svg-loader'
      },
      { 
        test: /\.scss$/, use: [ 
          { loader: "style-loader" },
          { loader: "@teamsupercell/typings-for-css-modules-loader" }, 
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ] 
      }, 
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new WorkboxPlugin.GenerateSW()
  ]
}