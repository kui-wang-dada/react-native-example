import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, NativeModules } from 'react-native';
import { useDispatch } from 'react-redux';
import { commitBarHeight } from '@/store/actions/common';
import * as WeChat from 'react-native-wechat-lib';
// import {size, commonStyle} from '@/utils';
import { Touchable, Icon } from 'ui';
import MyRouter from '@/router';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the document title using the browser API
    console.log(5);

    WeChat.registerApp('wx55b14f887a79758c', 'https://staticapp.hourenlx.com/');
    const { StatusBarManager } = NativeModules;

    // iOS Only
    StatusBarManager.getHeight((statusBarHeight) => {
      dispatch(commitBarHeight(statusBarHeight.height));
      console.log(statusBarHeight);
    });
  }, [dispatch]);
  return (
    <View style={style.wrap}>
      <MyRouter />
    </View>
  );
};

const style = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
