/*
"off"或者0    //关闭规则关闭
"warn"或者1    //在打开的规则作为警告（不影响退出代码）
"error"或者2    //把规则作为一个错误（退出代码触发时为1）
*/

// const isEnvPro = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'airbnb/hooks',
    'plugin:react/recommended', // jsx 规范支持,
    // 'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['prettier', 'react'],
  rules: {
    'max-len': 0,
    camelcase: 0,
    'consistent-return': 0, // 箭头函数不强制return
    semi: 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 0, // 不禁用console
    'no-underscore-dangle': 0, // _
    'no-use-before-define': 0, // _
    'react/jsx-uses-react': 'error', // 防止react被错误地标记为未使用
    'react/jsx-uses-vars': 'error',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    // 'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': [2, 'as-needed'], // 箭头函数
    'class-methods-use-this': 0, // 强制类方法使用 this
    // 缩进Indent with 2 spaces
    indent: ['error', 2, { SwitchCase: 1 }], // SwitchCase冲突 闪烁问题
    // Indent JSX with 4 spaces
    'react/jsx-indent': ['error', 4],
    // Indent props with 4 spaces
    'react/jsx-indent-props': ['error', 4],
    'react/jsx-props-no-spreading': 0,
    'import/no-unresolved': [
      0,
      {
        ignore: ['^@/'], // @ 是设置的路径别名
      },
    ],
    'import/extensions': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      ],
      rules: {
        'node/no-unsupported-features/es-syntax': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        // '@typescript-eslint/explicit-function-return-type': 'off',
        // '@typescript-eslint/no-namespace': 'off' // maybe we should consider enabling it in the future
      },
    },
  ],
  settings: {
    react: { version: 'detect' },
    node: {
      tryExtensions: ['.js', '.json'],
    },
    // 如果在webpack.config.js中配置了alias 并且在import时使用了别名需要安装eslint-import-resolver-webpack
    'import/resolve': {
      webpack: {
        config: 'webpack/webpack.base.js',
      },
    },
  },
};
