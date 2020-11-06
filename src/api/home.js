/** @format */

export default [
  {
    name: 'serviceCount',
    method: 'GET',
    desc: '服务统计',
    path: '/apis/method/frappe.apis.apps.services.count',
  },
  {
    name: 'spList',
    method: 'GET',
    desc: '服务列表',
    path: '/apis/method/frappe.apis.apps.services.service_projects',
  },
  {
    name: 'tpList',
    method: 'GET',
    desc: '服务列表',
    path: '/apis/method/frappe.apis.apps.services.tutoring_plans',
  },
  {
    name: 'message',
    method: 'GET',
    desc: '沟通记录',
    path: '/apis/method/frappe.apis.apps.services.opportunity',
  },
  {
    name: 'spDetail',
    method: 'GET',
    desc: '服务详情',
    path: '/apis/method/frappe.apis.apps.services.service_project_detail',
  },
  {
    name: 'tpDetail',
    method: 'GET',
    desc: '服务详情',
    path: '/apis/method/frappe.apis.apps.services.tutoring_plan_detail',
  },
  {
    name: 'report',
    method: 'GET',
    desc: '文档报告',
    path: '/apis/method/frappe.apis.apps.services.reports',
  },
  {
    name: 'author',
    method: 'GET',
    desc: '老师专栏',
    path: '/apis/method/frappe.apis.apps.services.stakeholders',
  },
  {
    name: 'authorDetail',
    method: 'GET',
    desc: '老师详情',
    path: '/apis/method/frappe.apis.apps.services.stakeholder_detail',
  },
  {
    name: 'spSchool',
    method: 'GET',
    desc: '选校单',
    path: '/apis/method/frappe.apis.apps.services.application_schools',
  },
  {
    name: 'tpRecord',
    method: 'GET',
    desc: '辅导记录',
    path: '/apis/method/frappe.apis.apps.services.tutoring_events',
  },
  {
    name: 'tpReport',
    method: 'GET',
    desc: '辅导报告',
    path: '/apis/method/frappe.apis.apps.services.tutoring_week_reports',
  },
  {
    name: 'tpReportDetail',
    method: 'GET',
    desc: '辅导报告详情',
    path: '/apis/method/frappe.apis.apps.services.tutoring_summary_detail',
  },
  {
    name: 'tpCourse',
    method: 'GET',
    desc: '辅导课程',
    path: '/apis/method/frappe.apis.apps.services.tutoring_class',
  },

  {
    name: 'messageDetail',
    method: 'GET',
    desc: '沟通记录详情',
    path: '/apis/method/frappe.apis.apps.services.opportunity_detail',
  },
  {
    name: 'courseDetail',
    method: 'GET',
    desc: '辅导课程详情',
    path: '/apis/method/frappe.apis.apps.services.tutoring_class_detail',
  },
  {
    name: 'recordDetail',
    method: 'GET',
    desc: '辅导记录详情',
    path: '/apis/method/frappe.apis.apps.services.tutoring_event_detail',
  },
  {
    name: 'comment',
    method: 'POST',
    desc: '留言',
    path: '/apis/method/frappe.apis.apps.feedbacks.comment',
  },
  {
    name: 'delComment',
    method: 'DELETE',
    desc: '删除留言',
    path: '/apis/method/frappe.apis.apps.feedbacks.comment',
  },
  {
    name: 'reply',
    method: 'POST',
    desc: '回复',
    path: '/apis/method/frappe.apis.apps.feedbacks.reply',
  },
  {
    name: 'delReply',
    method: 'DELETE',
    desc: '删除回复',
    path: '/apis/method/frappe.apis.apps.feedbacks.reply',
  },
];
