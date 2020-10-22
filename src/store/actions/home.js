import { doAction } from "./getData";


export const HOME_COUNT = "HOME_COUNT";
export const HOME_SP = "HOME_SP";
export const HOME_TP = "HOME_TP";
export const HOME_MESSAGE = "HOME_MESSAGE";
export const HOME_REPORT = "HOME_REPORT";
export const HOME_AUTHOR = "HOME_AUTHOR";
export const AUTHOR_DETAIL = "AUTHOR_DETAIL";

export const SERVICE_LIST = "SERVICE_LIST";
export const SP_DETAIL = "SP_DETAIL";
export const TP_DETAIL = "TP_DETAIL";

export const SP_MESSAGE = "SP_MESSAGE";
export const SP_REPORT = "SP_REPORT";
export const SP_SCHOOL = "SP_SCHOOL";

export const TP_RECORD = "TP_RECORD";
export const TP_WEEK_REPORT = "TP_WEEK_REPORT";
export const TP_DOC_REPORT = "TP_DOC_REPORT";
export const TP_COURSE = "TP_COURSE";
export const TP_MESSAGE = "TP_MESSAGE";

export const MESSAGE_DETAIL = "MESSAGE_DETAIL";
export const COURSE_DETAIL = "COURSE_DETAIL";
export const COURSE_RECORD = "COURSE_RECORD";
export const RECORD_DETAIL = "RECORD_DETAIL";

export const WEEK_REPORT_DETAIL = "WEEK_REPORT_DETAIL";

export const getHomeCount = (params) => doAction(params, "home/serviceCount", "HOME_COUNT", "homeCount");
export const getHomeSp = (params) => doAction(params, "home/spList", "HOME_SP", "homeSp");
export const getHomeTp = (params) => doAction(params, "home/tpList", "HOME_TP", "homeTp");
export const getHomeMessage = (params) => doAction(params, "home/message", "HOME_MESSAGE", "homeMessage");
export const getHomeReport = (params) => doAction(params, "home/report", "HOME_REPORT", "homeReport");

export const getServiceList = (params) => doAction(params, "home/spList", "SERVICE_LIST", "serviceList");
export const getSpDetail = (params) => doAction(params, "home/spDetail", "SP_DETAIL", "spDetail");
export const getTpDetail = (params) => doAction(params, "home/tpDetail", "TP_DETAIL", "tpDetail");

export const getHomeAuthor = (params) => doAction(params, "home/author", "HOME_AUTHOR", "homeAuthor");
export const getAuthorDetail = (params) => doAction(params, "home/authorDetail", "AUTHOR_DETAIL", "authorDetail");

export const getSpMessage = (params) => doAction(params, "home/message", "SP_MESSAGE", "spMessage");
export const getSpReport = (params) => doAction(params, "home/report", "SP_REPORT", "spReport");
export const getSpSchool = (params) => doAction(params, "home/spSchool", "SP_SCHOOL", "spSchool");

export const getTpRecord = (params) => doAction(params, "home/tpRecord", "TP_RECORD", "tpRecord");
export const getTpWeekReport = (params) => doAction(params, "home/tpReport", "TP_WEEK_REPORT", "tpWeekReport");
export const getTpDocReport = (params) => doAction(params, "home/report", "TP_DOC_REPORT", "tpDocReport");
export const getTpCourse = (params) => doAction(params, "home/tpCourse", "TP_COURSE", "tpCourse");
export const getTpMessage = (params) => doAction(params, "home/message", "TP_MESSAGE", "tpMessage");

export const getMessageDetail = (params) => doAction(params, "home/messageDetail", "MESSAGE_DETAIL", "messageDetail");
export const getCourseDetail = (params) => doAction(params, "home/courseDetail", "COURSE_DETAIL", "courseDetail");
export const getCourseRecord = (params) => doAction(params, "home/tpRecord", "COURSE_RECORD", "courseRecord");
export const getRecordDetail = (params) => doAction(params, "home/recordDetail", "RECORD_DETAIL", "recordDetail");

export const commitWeekReportDetail = (params) => {
  return (dispatch) => {
    return dispatch({
      type: "WEEK_REPORT_DETAIL",
      payload: { weekReportDetail: params },
    });
  };
};
