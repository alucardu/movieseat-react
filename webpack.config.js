const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const {GenerateSW} = require('workbox-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  devtool: 'eval-cheap-source-map',
  entry: ['./src/index.tsx'],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Helpers: path.resolve(__dirname, 'src/helpers/'),
      Src: path.resolve(__dirname, 'src/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: {
      index: '/',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new Dotenv(),
    new ESLintPlugin(),
    new GenerateSW(),
  ],
};

