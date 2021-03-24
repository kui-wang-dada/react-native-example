/** @format */

// axios 默认配置
export const ApiConfig = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-APIS-Version': 'v1',
    'X-APIS-Application': 'ucmp',
    'X-MP-Platform': 'Mobile',
    'X-MP-Appname': 'ucmp',
    // 'Content-Type': 'application/json'
  },
  // baseURL: "https://baobao.cctar.us/apis"
  baseURL: 'https://erpapi.wholeren.cn',
  // baseURL: 'https://dev2.wholeren.com',
};
export const wechatConfig = {
  appid: 'wx55b14f887a79758c',
  secret: '8ed5b4fc35a605858bb62ea4fc0a3f5d',
};
// 开启请求参数打印
export const CONSOLE_REQUEST_ENABLE = true;
// 开启响应参数打印
export const CONSOLE_RESPONSE_ENABLE = true;

// API 默认配置
export const API_DEFAULT_CONFIG = {
  mockBaseURL: process.env.MOCK_URL, // mock地址
  mock: process.env.IS_MOCK, // 是否开启mock
  debug: false, // 是否开启debug模式
  sep: '/', // 接口调用分隔符
};
