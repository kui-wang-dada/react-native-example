/** @format */

import axios from 'axios';

import {ApiConfig} from '@/config';
import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc,
} from '@/config/axios';

let axiosInstance = {};
axiosInstance = axios.create(ApiConfig);

// 注入请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);

// 注入返回拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export default axiosInstance;
