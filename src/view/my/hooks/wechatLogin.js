import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import * as WeChat from 'react-native-wechat-lib';
import { useDispatch, useSelector } from 'react-redux';
import { size, $api } from '@/utils';
import { Touchable, Icon, Button } from 'ui';
const useWechatLogin = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const getWechat = () => {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';
    //判断微信是否安装
    WeChat.isWXAppInstalled().then((isInstalled) => {
      if (isInstalled) {
        //发送授权请求
        WeChat.sendAuthRequest(scope, state)
          .then((responseCode) => {
            //返回code码，通过code获取access_token
            console.log('getWechat,', responseCode);
            console.log(43);
            getAccessToken(responseCode.code);
          })
          .catch((err) => {
            console.log(43);
          });
        console.log(123);
      } else {
        console.log('nowechat');
      }
    });
  };

  const getAccessToken = async (code) => {
    let url =
      'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' +
      'wx55b14f887a79758c' +
      '&secret=' +
      '8ed5b4fc35a605858bb62ea4fc0a3f5d' +
      '&code=' +
      code +
      '&grant_type=authorization_code';
    let res = await $api['my/erpLogin'](null, { url });
    console.log('getAccessToken,', res);
    getRefreshToken(res.refresh_token);
  };
  const getRefreshToken = async (token) => {
    let url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=' + 'wx55b14f887a79758c' + '&grant_type=refresh_token&refresh_token=' + token;
    let res = await $api['my/erpLogin'](null, { url });
    console.log('getRefreshToken,', res);
    getUserInfo(res);
  };
  const getUserInfo = async (res) => {
    let url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + res.access_token + '&openid=' + res.openid;
    let resData = await $api['my/erpLogin'](null, { url });
    console.log('getUserInfo', resData);
  };

  return getWechat;
};

export default useWechatLogin;
