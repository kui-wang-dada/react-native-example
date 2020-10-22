/** @format */
import { ApiConfig } from "../utils/config";

export default {
  userInfo: {
    name: "userInfo",
    method: "GET",
    desc: "用户信息",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.my.info",
  },
  wechatLogin: {
    name: "wechatLogin",
    method: "POST",
    desc: "登录",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.auth.login",
  },

  erpLogin: {
    name: "erpLogin",
    method: "POST",
    desc: "绑定erp",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.auth.bind",
  },
  account: {
    name: "account",
    method: "GET",
    desc: "关联的学生账号",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.my.accounts",
  },
  switchAccount: {
    name: "switchAccount",
    method: "GET",
    desc: "切换关联",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.auth.switch",
  },
  bindConfig: {
    name: "bindConfig",
    method: "GET",
    desc: "关联配置",
    path: ApiConfig.baseUrl + "/apis/method/frappe.apis.apps.auth.sysinfo",
  },
};
