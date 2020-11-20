import { size } from '@/utils';
import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';
import { initialMode } from 'react-native-dark-mode';

export const lightColorTheme = {
  dark: false,
  colors: {
    primary: '#4bc694',
    assist: '#fc8300',
    color_yellow: '#fdc940',
    color_blue: '#4169e2',
    color_red: '#d10101',
    background: '#ffffff',
    card: '#f1f1f1',
    text: '#333333',
    text_p: '#666',
    text_tag: '#999',
    sep: '#f0f0f0',
    bg: '#1cad7',
    border: '#ededed',
    border_2: '#ccc',
    notification: '#4bc694',
  },
};
export const darkColorTheme = {
  dark: true,
  colors: {
    primary: '#4bc694',
    assist: '#fc8300',
    color_yellow: '#fdc940',
    color_blue: '#4169e2',
    color_red: '#d10101',
    background: '#000023',
    card: '#000028',
    text: '#ffffff',
    text_p: '#666',
    text_tag: '#999',
    sep: '#f0f0f0',
    bg: '#1cad7',
    border: '#000028',
    border_2: '#ccc',
    notification: '#4bc694',
  },
};

export let colorTheme = initialMode === 'dark' ? darkColorTheme : lightColorTheme;

// export function changeTheme(type) {
//   if (type === 'dark') {
//     colorTheme = darkColorTheme;
//   } else {
//     colorTheme = lightColorTheme;
//   }
// }
export const color_theme = '#3fc375';
// export const color_theme = '#4CAF50'
export const color_yellow = '#F8BC5A';
export const color_red = '#EE806B';
export const color_blue = '#7CAFEA';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const ellipsis = {
  overflow: 'hidden',
  whiteSpace: 'normal',
};

export const h_1 = {
  fontSize: size(32),
  fontWeight: 'bold',
  color: '#333',
};

export const h_2 = {
  fontSize: size(28),
  fontWeight: 'bold',
  color: '#333',
};
export const p_1 = {
  fontSize: size(28),
  color: '#333',
};
export const p_2 = {
  fontSize: size(24),
  color: '#333',
};
export const tag_1 = {
  fontSize: size(24),
  color: '#666',
};
export const separation = {
  width: size(750),
  height: size(20),
  backgroundColor: '#f1f1f1',
};

export const borderBottom = {
  borderBottomColor: '#f1f1f1',
  borderBottomWidth: size(1),
};
