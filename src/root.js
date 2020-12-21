import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, NativeModules, Platform, StatusBar, Linking, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { commitBarHeight, commitVersion } from '@/store/actions/common';
import * as WeChat from 'react-native-wechat-lib';
import { size, commonStyle, $api, checkImg } from '@/utils';
import { Touchable, Icon } from 'ui';
import MyRouter from '@/router';

export default () => {
  const dispatch = useDispatch();
  const version = useSelector((state) => state.common.version);

  useEffect(() => {
    // Update the document title using the browser API
    console.log(5);

    WeChat.registerApp('wx55b14f887a79758c', 'https://staticapp.hourenlx.com/');
    const { StatusBarManager } = NativeModules;

    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((statusBarHeight) => {
        dispatch(commitBarHeight(statusBarHeight.height));
        console.log(statusBarHeight);
      });
    } else {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      dispatch(commitBarHeight(StatusBar.currentHeight));
      console.log(StatusBar.currentHeight, 'statusBarHeight');
    }
    getVersion();
  }, []);

  const getVersion = async () => {
    let res = await $api['common/version']();
    let remote = Platform.select({
      ios: res.data.display.ios,
      android: res.data.display.android,
    });
    const downloadUrl = Platform.OS === 'ios' ? 'https://apps.apple.com/app/id1396115491' : remote.apk;

    let handleVersion = (v) => v.split('.').join();
    if (handleVersion(version) < handleVersion(remote.version_number)) {
      console.log('versions');
      Alert.alert(
        `有新版本${remote.version_number}`,
        `${remote.description_zh}，
        是否更新？`,
        [
          {
            text: '取消',
            onPress: () => console.log('Ask me later pressed'),
          },
          {
            text: '确定',
            onPress: () => {
              Linking.openURL(checkImg(downloadUrl));
              dispatch(commitVersion(remote.version_number));
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

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
