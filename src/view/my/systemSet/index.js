import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { commitUserInfo } from '@/store/actions';

import { size, commonStyle } from '@/utils';
import { Touchable, Icon, Button, Cell } from 'ui';

import SetUpload from '../components/SetUpload';
import SetDefault from '../components/SetDefault';
import SetAction from '../components/SetAction';
import SetSwtich from '../components/SetSwtich';
export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.my.userInfo);

  const logout = () => {
    // Taro.setStorageSync('deviceId', '');
    // Taro.setStorageSync('studentId', '');
    dispatch(commitUserInfo({}));
    // Taro.navigateBack();
  };
  const goToAccount = () => {
    navigation.navigate('account');
  };

  const setData = [
    {
      label: '语言',
      key: 'language_mobile',
      type: 'action',
      border: false,

      action: [
        {
          zh: '中文',
          en: '中文',
          value: 'zh',
        },
        {
          zh: 'English',
          en: 'English',
          value: 'en',
        },
        {
          zh: '取消',
          en: 'Cancel',
          value: '',
        },
      ],
    },

    {
      label: '夜间模式',
      key: '',
      type: 'switch',
      border: true,
    },
    {
      label: '服务条款说明',
      key: '',
      type: 'to',
      border: false,
      route: 'terms',
    },
    {
      label: '隐私权政策',
      key: '',
      type: 'to',
      border: false,
      route: 'privacy',
    },
    {
      label: '关于',
      key: '',
      type: 'to',
      border: false,
      route: 'about',
    },
  ];
  let strategy = {
    upload: SetUpload,
    input: SetDefault,
    switch: SetSwtich,
    to: SetDefault,
    to_profile: SetDefault,
    nothing: SetDefault,
    action: SetAction,
  };
  return (
    <View style={style.mysetWrap}>
      <View style={style.listWrap}>
        {setData.map((item, index) => {
          const Component = strategy[item.type];
          return <Component data={item} key={index} />;
        })}
      </View>

      <Button style={[style.logout, { backgroundColor: colors.primary }]} textStyle={[style.logoutText, { color: colors.background }]} onPress={logout} title="退出" />
    </View>
  );
};
const style = StyleSheet.create({
  mysetWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  listWrap: {
    width: '100%',
  },
  logout: {
    marginTop: size(100),
    borderRadius: size(10),
    width: size(600),
    height: size(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: size(32),
  },
});
