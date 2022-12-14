module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          common: './src/components/common',
          hook: './src/components/hook',
          ui: './src/components/ui',

          '@': './src',
          '@/*': './src/*',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
