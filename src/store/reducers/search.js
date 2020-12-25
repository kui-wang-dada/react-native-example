import * as search from '../actions/search';

const DEFAULT_STATE = {
  language: '',
  sessionId: '',

  agreementFlag: false,
  deviceId: '',
};

export default function (state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case search.LANGUAGE:
      return { ...state, ...action.payload };

    case search.SESSION_ID:
      return { ...state, ...action.payload };

    case search.AGREEMENT_FLAG:
      return { ...state, ...action.payload };
    case search.DEVICE_ID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
