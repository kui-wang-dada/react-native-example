/** @format */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from './index';
import store from '@/store/store';

import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { commitSessionId, commitLoginEmail } from '@/store/actions/search';
import debounce from 'lodash/debounce';
import { modal } from '@/utils';
import { Loading } from 'ui';
// import { Navigation } from "@/router";
const CancelToken = axios.CancelToken;
const source = axios.CancelToken.source();
let CancelPromise = {};
import lang from '@/assets/lang';
/**
 * 请求成功拦截器
 * @param req 请求参数
 * @returns {*}
 */
export async function requestSuccessFunc(req) {
  if (req.loading) {
    modal.showLoading();
  }

  let session_id;

  let res = await store.getState().search.sessionId;
  if (res) {
    session_id = res;
    console.log(session_id, 'deviceId1');
    // Do something with return value
  } else {
    console.log(2, 'value');
    let whiteList = ['wechatLogin', 'wechatRegist', 'erpLogin', 'userInfo'];
    if (!whiteList.includes(req.name)) {
      return Promise.reject();
    }
  }
  console.log(res, 'session');

  console.log(req, 'headers');
  req.headers['X-APIS-Sid'] = res;

  //取消重复请求

  if (CancelPromise[req.url]) {
    CancelPromise[req.url]();
  }

  req.cancelToken = new CancelToken((c) => {
    CancelPromise[req.url] = c;
  });

  CONSOLE_REQUEST_ENABLE && console.info('requestInterceptorFunc', `url:${req.url}`, req);
  // 自定义请求拦截逻辑，处理权限，请求发送监控等
  return req;
}

/**
 * 请求失败拦截器
 * @param reqError 失败信息
 * @returns {Promise.<*>}
 */
export function requestFailFunc(reqError) {
  // console.log(reqError, 'resError');
  getNet(reqError);
  // 自定义请求失败逻辑，处理断网，请求发送监控等
  return Promise.reject(reqError);
}

/**
 * 响应成功拦截器
 * @param res 返回数据
 * @returns {*}
 */
export function responseSuccessFunc(response) {
  modal.close();
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  CONSOLE_RESPONSE_ENABLE && console.info('responseInterceptorFunc', response);
  if (response && response.data) {
    let status = response.data.status;
    if (status && status.code) {
      if (status.code !== 200 && status.code !== 401) {
        modal.showToast(response.data.status.message);
      }
      if (status.code === 401) {
        modal.showToast(response.data.status.message);

        store.dispatch(commitLoginEmail(''));
      }
    }

    return response.data;
  } else {
    // 异常处理
    console.log('warning', response.data.msg);
    return Promise.reject('error：' + (response && response.data && response.data.msg));
  }
}

/**
 * 响应失败拦截器
 * @param resError 失败信息
 * @returns {Promise.<*>}
 */
export function responseFailFunc(resError) {
  modal.close();
  //如果是取消，返回空，前端不提示消息
  if (resError.toString() == 'Cancel') {
    resError = '';
  }
  getNet(resError);
  console.log('fail', resError, resError.response);

  // if (resError.response.status === 500 || resError.response.status === 417) {
  // if (resError.response.status === 500) {
  //   modal.showToast(lang.t('common.message.interface'));
  //   return Promise.reject(resError);
  // }

  return Promise.reject(resError);
}

function getNet(resError) {
  console.log(resError.message, 'resError');
  // let timeout = resError.message.includes('timeout');
  NetInfo.fetch().then((state) => {
    let { isConnected } = state;
    if (!isConnected) {
      Alert.alert('您的网络状况不佳，请检查网络');
    }
  });
}
