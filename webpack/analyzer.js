const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackDev = require('./webpack.dev');
const webpackPro = require('./webpack.prod');

const isEnvPro = process.env.NODE_ENV !== 'production';

const smp = new SpeedMeasurePlugin();

module.exports = merge(isEnvPro ? webpackPro : webpackDev, {
  // plugins: [new BundleAnalyzerPlugin()],
});

// module.exports = smp.wrap(
//   merge(isEnvPro ? webpackPro : webpackDev, {
//     plugins: [new BundleAnalyzerPlugin()],
// }),
// );
