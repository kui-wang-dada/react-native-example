import lang from '@/assets/lang';

export const LANGUAGE = 'LANGUAGE';

export const SESSION_ID = 'SESSION_ID';

export const AGREEMENT_FLAG = 'AGREEMENT_FLAG';
export const DEVICE_ID = 'DEVICE_ID';
export const FINGER = 'FINGER';
export const LOGIN_MESSAGE = 'LOGIN_MESSAGE';

export const commitLanguage = (params) => {
  return (dispatch) => {
    lang.locale = params;
    return dispatch({
      type: LANGUAGE,
      payload: { language: params },
    });
  };
};
export const commitSessionId = (params) => {
  return (dispatch) => {
    return dispatch({
      type: SESSION_ID,
      payload: { sessionId: params },
    });
  };
};

export const commitAgreementFlag = (params) => {
  return (dispatch) => {
    return dispatch({
      type: AGREEMENT_FLAG,
      payload: { agreementFlag: params },
    });
  };
};
export const commitDeviceId = (params) => {
  return (dispatch) => {
    return dispatch({
      type: DEVICE_ID,
      payload: { deviceId: params },
    });
  };
};

export const commitFinger = (params) => {
  return (dispatch) => {
    return dispatch({
      type: FINGER,
      payload: { finger: params },
    });
  };
};
export const commitLoginMessage = (params) => {
  return (dispatch) => {
    return dispatch({
      type: LOGIN_MESSAGE,
      payload: { loginMessage: params },
    });
  };
};
