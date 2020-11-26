import lang from '@/assets/lang';
export const LOGIN_EMAIL = 'LOGIN_EMAIL';

export const LANGUAGE = 'LANGUAGE';

export const SESSION_ID = 'SESSION_ID';

export const SEARCH_HISTORY_DATA = 'SEARCH_HISTORY_DATA';

export const PROFILE_HISTORY_DATA = 'PROFILE_HISTORY_DATA';

export const TIME_HISTORY_DATA = 'TIME_HISTORY_DATA';

export const INVITATION = 'INVITATION';

export const FINGER = 'FINGER';

export const LOGINMESSAGE = 'LOGINMESSAGE';

export const AGREEMENT_FLAG = 'AGREEMENT_FLAG';

export const commitLoginEmail = (params) => {
  return (dispatch) => {
    return dispatch({
      type: LOGIN_EMAIL,
      payload: { loginEmail: params },
    });
  };
};

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
export const commitSearchHistory = (params) => {
  return (dispatch) => {
    return dispatch({
      type: SEARCH_HISTORY_DATA,
      payload: { searchHistoryData: params },
    });
  };
};

export const commitProfileHistory = (params) => {
  return (dispatch) => {
    return dispatch({
      type: PROFILE_HISTORY_DATA,
      payload: { profileHistoryData: params },
    });
  };
};

export const commitTimeHistory = (params) => {
  return (dispatch) => {
    return dispatch({
      type: TIME_HISTORY_DATA,
      payload: { timeHistoryData: params },
    });
  };
};
export const commitInvitation = (params) => {
  return (dispatch) => {
    return dispatch({
      type: INVITATION,
      payload: { invitation: params },
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
      type: LOGINMESSAGE,
      payload: { loginMessage: params },
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
