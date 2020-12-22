import { doAction } from './getData';

export const BAR_HEIGHT = 'BAR_HEIGHT';
export const THEME = 'THEME';
export const VERSION = 'VERSION';
export const HAS_WECHAT = 'HAS_WECHAT';

export const commitBarHeight = (params) => {
  return (dispatch) => {
    return dispatch({
      type: BAR_HEIGHT,
      payload: { barHeight: params },
    });
  };
};
export const commitTheme = (params) => {
  return (dispatch) => {
    return dispatch({
      type: THEME,
      payload: { theme: params },
    });
  };
};
export const commitVersion = (params) => {
  return (dispatch) => {
    return dispatch({
      type: VERSION,
      payload: { version: params },
    });
  };
};
export const commitHasWechat = (params) => {
  return (dispatch) => {
    return dispatch({
      type: HAS_WECHAT,
      payload: { hasWechat: params },
    });
  };
};
