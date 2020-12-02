import { doAction } from './getData';

export const BAR_HEIGHT = 'BAR_HEIGHT';
export const THEME = 'THEME';

// export const getOfferList = (params) =>
//   doAction(params, 'common/offer', 'OFFER_LIST', 'offerList');
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
