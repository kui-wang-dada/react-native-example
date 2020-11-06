import * as home from '../actions/home';

const INITIAL_STATE = {
  homeCount: {
    total_days: 23,
    total_time: 423,
    total_records: 4123,
  },
  homeSp: [],
  homeTp: [],

  homeMessage: [],
  homeReport: [],

  serviceList: [],
  spDetail: {},
  tpDetail: {},

  homeAuthor: [],
  authorDetail: {},

  spMessage: [],
  spReport: [],
  spSchool: [],

  tpRecord: [],
  tpWeekReport: [],
  tpDocReport: [],
  tpCourse: [],
  tpMessage: [],

  messageDetail: {
    feedbacks: [],
  },
  courseDetail: {},
  courseRecord: [],

  recordDetail: {
    feedbacks: [],
  },
  weekReportDetail: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case home.HOME_COUNT:
      return { ...state, ...action.payload };
    case home.HOME_SP:
      return { ...state, ...action.payload };
    case home.HOME_TP:
      return { ...state, ...action.payload };
    case home.HOME_MESSAGE:
      return { ...state, ...action.payload };
    case home.HOME_REPORT:
      return { ...state, ...action.payload };

    case home.SERVICE_LIST:
      return { ...state, ...action.payload };
    case home.SP_DETAIL:
      return { ...state, ...action.payload };
    case home.TP_DETAIL:
      return { ...state, ...action.payload };

    case home.HOME_AUTHOR:
      return { ...state, ...action.payload };
    case home.AUTHOR_DETAIL:
      return { ...state, ...action.payload };

    case home.SP_MESSAGE:
      return { ...state, ...action.payload };
    case home.SP_REPORT:
      return { ...state, ...action.payload };
    case home.SP_SCHOOL:
      return { ...state, ...action.payload };

    case home.TP_RECORD:
      return { ...state, ...action.payload };
    case home.TP_WEEK_REPORT:
      return { ...state, ...action.payload };
    case home.TP_DOC_REPORT:
      return { ...state, ...action.payload };
    case home.TP_COURSE:
      return { ...state, ...action.payload };
    case home.TP_MESSAGE:
      return { ...state, ...action.payload };

    case home.MESSAGE_DETAIL:
      return { ...state, ...action.payload };
    case home.COURSE_DETAIL:
      return { ...state, ...action.payload };
    case home.COURSE_RECORD:
      return { ...state, ...action.payload };
    case home.RECORD_DETAIL:
      return { ...state, ...action.payload };

    case home.WEEK_REPORT_DETAIL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
