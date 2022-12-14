import { doAction } from './getData';

export const USER_INFO = 'USER_INFO';
export const USER_INFO_TRAN = 'USER_INFO_TRAN';
export const ACCOUNT = 'ACCOUNT';
export const CONTRACT = 'CONTRACT';
export const ORDER = 'ORDER';
export const ORDER_DETAIL = 'ORDER_DETAIL';
export const RELATION = 'RELATION';

export const commitUserInfo = (params) => {
  return (dispatch) => {
    return dispatch({
      type: USER_INFO,
      payload: { userInfo: params },
    });
  };
};
export const commitUserInfoTran = (params) => {
  return (dispatch) => {
    return dispatch({
      type: USER_INFO_TRAN,
      payload: { userInfoTran: params },
    });
  };
};
export const getUserInfo = (params) => doAction(params, 'my/userInfo', 'USER_INFO', 'userInfo');
export const getAccount = (params) => doAction(params, 'my/account', 'ACCOUNT', 'account');
export const getContract = (params) => doAction(params, 'my/contract', 'CONTRACT', 'contract');
export const getOrder = (params) => doAction(params, 'my/order', 'ORDER', 'order');
export const getOrderDetail = (params) => doAction(params, 'my/orderDetail', 'ORDER_DETAIL', 'orderDetail');
export const getRelation = (params) => doAction(params, 'my/relation', 'RELATION', 'relation');
