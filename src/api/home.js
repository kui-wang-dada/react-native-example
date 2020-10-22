/** @format */
import { ApiConfig } from "../utils/config";

export default {
  serviceCount: {
    name: "serviceCount",
    method: "GET",
    desc: "服务统计",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.count",
  },
  spList: {
    name: "spList",
    method: "GET",
    desc: "服务列表",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.service_projects",
  },
  tpList: {
    name: "tpList",
    method: "GET",
    desc: "服务列表",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.tutoring_plans",
  },
  message: {
    name: "message",
    method: "GET",
    desc: "沟通记录",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.opportunity",
  },
  spDetail: {
    name: "serviceDetail",
    method: "GET",
    desc: "服务详情",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.service_project_detail",
  },
  tpDetail: {
    name: "tpDetail",
    method: "GET",
    desc: "服务详情",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.tutoring_plan_detail",
  },
  report: {
    name: "report",
    method: "GET",
    desc: "文档报告",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.reports",
  },
  author: {
    name: "author",
    method: "GET",
    desc: "老师专栏",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.stakeholders",
  },
  authorDetail: {
    name: "authorDetail",
    method: "GET",
    desc: "老师详情",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.stakeholder_detail",
  },
  spSchool: {
    name: "spSchool",
    method: "GET",
    desc: "选校单",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.application_schools",
  },
  tpRecord: {
    name: "tpRecord",
    method: "GET",
    desc: "辅导记录",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.tutoring_events",
  },
  tpReport: {
    name: "tpReport",
    method: "GET",
    desc: "辅导报告",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.tutoring_week_reports",
  },
  tpCourse: {
    name: "tpCourse",
    method: "GET",
    desc: "辅导课程",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.tutoring_class",
  },

  messageDetail: {
    name: "messageDetail",
    method: "GET",
    desc: "沟通记录详情",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.opportunity_detail",
  },
  courseDetail: {
    name: "courseDetail",
    method: "GET",
    desc: "辅导课程详情",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.tutoring_class_detail",
  },
  recordDetail: {
    name: "recordDetail",
    method: "GET",
    desc: "辅导记录详情",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.services.tutoring_event_detail",
  },
  comment: {
    name: "comment",
    method: "POST",
    desc: "留言",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.feedbacks.comment",
  },
  delComment: {
    name: "delComment",
    method: "DELETE",
    desc: "删除留言",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.feedbacks.comment",
  },
  reply: {
    name: "reply",
    method: "POST",
    desc: "回复",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.feedbacks.reply",
  },
  delReply: {
    name: "delReply",
    method: "DELETE",
    desc: "删除回复",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.feedbacks.reply",
  },
};
