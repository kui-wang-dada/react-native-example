module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          common: './src/components/common',
          hoc: './src/components/hoc',
          ui: './src/components/ui',
          home: './src/components/pages/home',
          ncov: './src/components/pages/ncov',
          service: './src/components/pages/service',
          my: './src/components/pages/my',
          public: './src/components/pages/public',
          login: './src/components/pages/login',
          '@': './src',
          '@/*': './src/*'
        }
      }
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      '@babel/transform-runtime',
      {
        helpers: true,
        regenerator: false
      }
    ]
  ]
};
