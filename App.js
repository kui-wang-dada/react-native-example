import Main from './src/main'
import { UIManager } from 'react-native'
import { YellowBox } from 'react-native'
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  }
}
console.disableYellowBox = true
// YellowBox.ignoreWarnings(["Require cycle:"]);
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)
export default Main
