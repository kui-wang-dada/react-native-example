module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    semi: 0, //不强制使用分号
    'react-native/no-inline-styles': 0,
    'react/self-closing-comp': 1,
    'prettier/prettier': 0,
    'react-hooks/exhaustive-deps': 'warn',
  },
};
