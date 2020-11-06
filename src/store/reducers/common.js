import * as common from '../actions/common';

const INITIAL_STATE = {
  barHeight: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case common.BAR_HEIGHT:
      return {...state, ...action.payload};
    default:
      return state;
  }
}