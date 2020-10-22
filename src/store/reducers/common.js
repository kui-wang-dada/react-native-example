import * as common from "../actions/common";

const INITIAL_STATE = {
  offerList: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case common.OFFER_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
