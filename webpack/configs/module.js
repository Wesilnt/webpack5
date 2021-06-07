const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');

const css_inline = process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader;
const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    // disable gzip compression for cache files
    // faster when there are millions of small files
    cacheCompression: false,
  },
};

module.exports = {
  // noParse:/title.js/, // 以配置哪些模块文件不需要进行解析,提高整体的构建速度
  rules: [
    {
      oneOf: [
        {
          test: /\.tsx?$/,
          use: [
            'thread-loader',
            'cache-loader',
            babelLoader,
            // {
            //   loader: 'ts-loader',
            //   options: {
            //     happyPackMode: true,
            //     transpileOnly: true, // 关闭类型检查
            //     configFile: path.resolve(__dirname, 'tsconfig.json'),
            //     compilerOptions: {
            //       esModuleInterop: false,
            //       importHelpers: false,
            //       module: 'esnext',
            //       target: 'esnext',
            //     },
            //   },
            // },
          ],
          include: paths.appSrc,
          // exclude: ['node_modules'],
        },
        {
          test: /\.jsx?$/,
          use: ['thread-loader', 'cache-loader', babelLoader],
          include: paths.appSrc,
          // exclude: ['node_modules'],
        },
        {
          test: /\.css$/,
          use: [
            'cache-loader',
            // 'thread-loader',
            css_inline,
            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, modules: true } },
            'postcss-loader',
          ],
          // exclude: ['node_modules'],
        },

        {
          test: /\.less$/,
          use: [
            'thread-loader',
            'cache-loader',
            css_inline,
            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2, modules: true } },
            'postcss-loader',
            'less-loader',
          ],
          // exclude: ['node_modules'],
        },
        // image-webpack-loader 压缩图片
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|svg|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
  ],
};
