import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import * as WeChat from 'react-native-wechat-lib';
import { useDispatch, useSelector } from 'react-redux';
import { commitSessionId, getHomeSp, getHomeTp, getHomeCount, getUserInfo } from '@/store/actions';
import { size, $api, modal } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
export const useWechatLogin = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const getWechat = () => {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';
    //判断微信是否安装
    WeChat.isWXAppInstalled().then((isInstalled) => {
      if (isInstalled) {
        console.log(WeChat, 'wechat');
        //发送授权请求
        WeChat.sendAuthRequest(scope, state)
          .then((responseCode) => {
            //返回code码，通过code获取access_token
            console.log('getWechat,', responseCode);
            console.log(43);
            getUser(responseCode.code);
          })
          .catch((err) => {
            console.log(err, 'err');
          });
        console.log(123);
      } else {
        console.log('nowechat');
      }
    });
  };

  const getUser = async (code) => {
    let params = {
      code,
    };

    let res = await $api['my/wechatLogin'](params);
    console.log('getUser,', res);

    if (res.data.display) {
      let id = res.data.display.unionid || res.data.display.uid;
      await dispatch(commitSessionId(id));
      modal.showLoading();
      await getHomeData();
      modal.close();
      navigation.navigate('首页');
    }
  };
  const getHomeData = async () => {
    let params = {
      limit_start: 0,
      limit_page_length: 10,
    };

    dispatch(getHomeSp(params));
    dispatch(getHomeTp(params));
    dispatch(getHomeCount());
    await dispatch(getUserInfo());
  };

  return getWechat;

  // const getAccessToken = async (code) => {
  //   let url =
  //     'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' +
  //     'wx55b14f887a79758c' +
  //     '&secret=' +
  //     '8ed5b4fc35a605858bb62ea4fc0a3f5d' +
  //     '&code=' +
  //     code +
  //     '&grant_type=authorization_code';
  //   let res = await $api['my/erpBind'](null, { url });
  //   console.log('getAccessToken,', res);
  //   getRefreshToken(res.refresh_token);
  // };
  // const getRefreshToken = async (token) => {
  //   let url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + 'wx55b14f887a79758c' + '&grant_type=refresh_token&refresh_token=' + token;
  //   let res = await $api['my/erpBind'](null, { url });
  //   console.log('getRefreshToken,', res);
  //   getUserInfo(res);
  // };
  // const getUserInfo = async (res) => {
  //   let url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + res.access_token + '&openid=' + res.openid;
  //   let resData = await $api['my/erpBind'](null, { url });
  //   console.log('getUserInfo', resData);
  // };
};

export const useOpenMini = () => {
  const openMini = (id, path) => {
    WeChat.launchMiniProgram({
      userName: id, // 拉起的小程序的username
      miniProgramType: 0, // 拉起小程序的类型. 0-正式版 1-开发版 2-体验版
      path: path, // 拉起小程序页面的可带参路径，不填默认拉起小程序首页
    });
  };
  return openMini;
};
