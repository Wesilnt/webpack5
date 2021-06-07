const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const baseWebpackConfig = require('./webpack.base');

const htmlConfig = require('./configs/htmlTemplate');

// pro环境打包
module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  stats: 'normal', // 标准输出
  output: {
    filename: '[name].[contenthash:6].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(htmlConfig),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      ignoreOrder: true,
    }),
    new CssMinimizerPlugin({
      parallel: true, // 开启多线程压缩
    }),
    new ProgressBarPlugin({
      format: `${chalk.green.bold('build[:bar]')} ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
      width: 60,
    }),
  ],
});
