const webpack = require('webpack');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const baseModule = require('./configs/module');
const paths = require('./configs/paths');

const envIsPro = process.env.NODE_ENV === 'production';

const getPlugins_ = IsEnvPro => {
  if (IsEnvPro) return [];
  return [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx}',
      },
    }),
  ];
};

module.exports = {
  entry: ['react-hot-loader/patch', paths.appSrc],
  // entry: {
  //     index: {
  //         import: './src/index.js',
  //         dependOn: 'shared'
  //     },
  //     another: {
  //         import: './src/another-module.js',
  //         dependOn: 'shared'
  //     },
  //     shared: 'lodash-es'
  // },
  output: {
    path: paths.appDist,
    publicPath: '/',
    filename: '[name].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
    pathinfo: false, // 去掉输出的 bundle 中生成路径信息
  },
  resolve: {
    modules: [paths.appNodeModules],
    // 文件扩展名
    extensions: paths.moduleFileExtensions,
    // mainFields: ['browser', 'jsnext:main', 'main'],
    // externals // 想引用一个库,并且不想让webpack打包
    alias: {
      // moment$: 'moment/moment.js',
      // 'react-dom': '@hot-loader/react-dom',
      '@/src': paths.appSrc,
    },
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
      config: [__filename],
    },
    // cacheDirectory 默认路径是 node_modules/.cache/webpack
    cacheDirectory: `${paths.appPublic}/.temp_cache`,
  },
  module: baseModule,
  plugins: [
    // https://webpack.docschina.org/plugins/ignore-plugin/
    //     new webpack.IgnorePlugin({
    //       resourceRegExp: /^\\.\\/locale\$/,
    //   contextRegExp: /moment\$/,
    // }),
    ...getPlugins_(envIsPro),
    // new TsconfigPathsPlugin(),
    new ESLintPlugin({
      fix: true, // 启用ESLint自动修复功能
      extensions: paths.moduleFileExtensions,
      context: paths.appSrc, // 文件根目录
      exclude: ['/node_modules/', 'dist'], // 指定要排除的文件/目录
      cwd: paths.appSrc,
      // cache: true, // 缓存
    }),
    new webpack.DefinePlugin({
      NODE_ENV: envIsPro && JSON.stringify('production'), // 设置全局
    }),
    // new CleanWebpackPlugin
  ],
  optimization: {
    moduleIds: 'deterministic', // 默认 根据模块名称生成简短的hash值
    chunkIds: 'deterministic', // 默认 根据模块名称生成简短的hash值
    minimize: envIsPro,
    usedExports: envIsPro,
    // runtimeChunk: 'single',
    runtimeChunk: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all', // 默认作用于异步chunk
      minSize: 0, // 默认值是30kb,代码块的最小尺寸
      minChunks: 1, // 被多少模块共享,表示被引用次数，默认为1
      maxAsyncRequests: 2, // 限制异步模块内部的并行最大请求数的，默认为5
      maxInitialRequests: 4, // 限制入口的拆分数量 一个入口最大的并行请求数，默认为3
      automaticNameDelimiter: '~', // 默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name: 'vendors',
          test: /node_modules/,
          priority: -10, /// 优先级，
        },
        commons: {
          chunks: 'all',
          name: 'commons',
          minSize: 0, // 最小提取字节数
          minChunks: 2, // 最少被几个chunk引用
          priority: -20,
        },
      },
    },
  },
};
