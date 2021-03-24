import * as common from '../actions/common';

const INITIAL_STATE = {
  barHeight: 0,
  theme: 'light',
  version: '3.2',
  hasWechat: false,
  showErp: 'out',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case common.BAR_HEIGHT:
      return { ...state, ...action.payload };
    case common.THEME:
      return { ...state, ...action.payload };
    case common.VERSION:
      return { ...state, ...action.payload };
    case common.HAS_WECHAT:
      return { ...state, ...action.payload };
    case common.SHOW_ERP:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
