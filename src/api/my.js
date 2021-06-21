/** @format */

export default [
  {
    name: 'userInfo',
    method: 'GET',
    desc: '用户信息',
    path: '/apis/method/frappe.apis.apps.my.info',
  },
  {
    name: 'login',
    method: 'POST',
    desc: '登录',
    path: '/apis/method/frappe.apis.apps.auth.accountlogin',
    // path: '/apis/method/frappe.apis.apps.auth.login',
    headers: {
      'Content-Type': 'application/json',
    },
  },
  {
    name: 'register',
    method: 'POST',
    desc: '账号注册',
    path: '/apis/method/frappe.apis.apps.auth.accountsignup',
  },
  {
    name: 'sendCode',
    method: 'GET',
    desc: '发送验证码',
    path: '/apis/method/frappe.apis.apps.auth.sendcode',
  },
  {
    name: 'password',
    method: 'POST',
    desc: '忘记密码',
    path: '/apis/method/frappe.apis.apps.auth.resetpassword',
  },
  {
    name: 'updatePwd',
    method: 'POST',
    desc: '更新密码',
    path: '/apis/method/frappe.apis.apps.auth.updatepassword',
  },
  {
    name: 'wechatLogin',
    method: 'POST',
    desc: '微信登录',
    path: '/apis/method/frappe.apis.apps.auth.applogin',
    // path: '/apis/method/frappe.apis.apps.auth.login',
    headers: {
      'Content-Type': 'application/json',
    },
  },

  {
    name: 'erpBind',
    method: 'POST',
    desc: '绑定erp',
    path: '/apis/method/frappe.apis.apps.auth.bind',
  },
  {
    name: 'account',
    method: 'GET',
    desc: '关联的学生账号',
    path: '/apis/method/frappe.apis.apps.my.accounts',
  },
  {
    name: 'switchAccount',
    method: 'GET',
    desc: '切换关联',
    path: '/apis/method/frappe.apis.apps.auth.switch',
  },
  {
    name: 'bindConfig',
    method: 'GET',
    desc: '关联配置',
    path: '/apis/method/frappe.apis.apps.auth.sysinfo',
  },
  {
    name: 'order',
    method: 'GET',
    desc: '交易记录',
    path: '/apis/method/frappe.apis.apps.my.pays',
  },
  {
    name: 'orderDetail',
    method: 'GET',
    desc: '交易记录',
    path: '/apis/method/frappe.apis.apps.my.pay_detail',
  },

  {
    name: 'contract',
    method: 'GET',
    desc: '我的合同',
    path: '/apis/method/frappe.apis.apps.my.contracts',
  },
  {
    name: 'relation',
    method: 'GET',
    desc: '中美厚仁关系说明',
    path: '/apis/method/soa.www.cms_adp.get_details?slug=wholeren-company-about',
  },
];
