const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base');
const htmlConfig = require('./configs/htmlTemplate');

// dev环境打包
module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  stats: 'minimal',
  // output: {
  //     filename: '[name].bundle.js',
  // },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    open: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      ...htmlConfig,
      template: "/public/index.html",
      title: 'Development',
    }),
  ],
});
