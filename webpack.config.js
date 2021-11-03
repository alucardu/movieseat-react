const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const {GenerateSW} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const production = process.env.NODE_ENV === 'production';

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

    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
    }),
    new CopyPlugin({
      patterns: [
        {from: 'public', to: './'},
      ],
    }),
  ],
};

if (production) {
  module.exports.plugins.push(
      new GenerateSW({
        maximumFileSizeToCacheInBytes: 5000000000000,
      }),
  );
}
