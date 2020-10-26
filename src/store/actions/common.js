import {doAction} from './getData';

export const BAR_HEIGHT = 'BAR_HEIGHT';

// export const getOfferList = (params) =>
//   doAction(params, 'common/offer', 'OFFER_LIST', 'offerList');
export const commitBarHeight = (params) => {
  return (dispatch) => {
    return dispatch({
      type: BAR_HEIGHT,
      payload: {barHeight: params},
    });
  };
};
