import {
  Dimensions,
  View,
  Platform,
  PixelRatio,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const DESIGN_WIDTH = 750;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export function transformSize(designSize) {
  const number = (designSize / DESIGN_WIDTH) * SCREEN_WIDTH;

  let remainder = number % 1;
  const int = number - remainder;
  // 防止非标准Android屏，不做处理
  if (
    Platform.OS === 'android' &&
    parseInt(PixelRatio.get()) !== PixelRatio.get()
  ) {
  } else {
    remainder =
      remainder >= 0.25 && remainder < 0.75 ? 0.5 : Math.round(remainder);
  }
  return int + remainder;
}

export function checkStaticImg(dataStr) {
  if (!dataStr) {
    return '';
  }
  return 'https://ministatic.wholeren.com/usmentor/mini-student/' + dataStr;
}
