const packageConfig = require('./package.json');

module.exports = {
  sourceMaps: true,
  sourceType: 'module',
  retainLines: true,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        loose: true,
        modules: false,
        shippedProposals: true,
        targets: packageConfig.browserslist,
      },
    ],
    ['@babel/preset-react', { development: process.env.NODE_ENV === 'development' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    // 'lodash',
    'react-hot-loader/babel',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    // ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-transform-react-constant-elements',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
  ],
};
