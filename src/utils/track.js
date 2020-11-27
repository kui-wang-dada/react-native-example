import analytics from '@react-native-firebase/analytics';
export default {
  trackScreen: async function (screen) {
    await analytics().setCurrentScreen(screen, screen);
  },
  logEvent: async function (name, params) {
    await analytics().logEvent(name, params);
  },
  setUser: async function (user) {
    await Promise.all([analytics().setUserId(user.name), analytics().setUserProperty('roles', user.roles.join(','))]);
  },
};
