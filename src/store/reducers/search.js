import * as search from '../actions/search'

const DEFAULT_STATE = {
  loginEmail: '',
  language: '',
  sessionId: '',
  searchHistoryData: [],

  timeHistoryData: [],

  profileHistoryData: [],

  invitation: '',

  finger: false,
  loginMessage: {
    usr: '',
    pwd: ''
  },
  agreementFlag: false
}

export default function(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case search.LOGIN_EMAIL:
      return { ...state, ...action.payload }

    case search.LANGUAGE:
      return { ...state, ...action.payload }

    case search.SESSION_ID:
      return { ...state, ...action.payload }
    case search.SEARCH_HISTORY_DATA:
      return { ...state, ...action.payload }

    case search.PROFILE_HISTORY_DATA:
      return { ...state, ...action.payload }

    case search.TIME_HISTORY_DATA:
      return { ...state, ...action.payload }

    case search.INVITATION:
      return { ...state, ...action.payload }

    case search.FINGER:
      return { ...state, ...action.payload }

    case search.LOGINMESSAGE:
      return { ...state, ...action.payload }
    case search.AGREEMENT_FLAG:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
