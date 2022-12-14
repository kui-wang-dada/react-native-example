import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, NativeModules, Platform, StatusBar, Linking, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { commitBarHeight, commitVersion, commitHasWechat, commitDeviceId } from '@/store/actions';
import * as WeChat from 'react-native-wechat-lib';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import { size, commonStyle, $api, checkImg } from '@/utils';
import SplashScreen from 'react-native-splash-screen';
import { Touchable, Icon } from 'ui';
import MyRouter from '@/router';

export default () => {
  const dispatch = useDispatch();
  const version = useSelector((state) => state.common.version);
  const deviceId = useSelector((state) => state.search.deviceId);

  useEffect(() => {
    // Update the document title using the browser API
    console.log(5);
    SplashScreen.hide();

    getWechat();
    getStatusBar();
    getVersion();
    if (!deviceId) {
      getDeviceId();
    }
  }, []);

  const getWechat = () => {
    WeChat.registerApp('wx55b14f887a79758c', 'https://staticapp.hourenlx.com/');

    WeChat.isWXAppInstalled().then((isInstalled) => {
      if (isInstalled) {
        dispatch(commitHasWechat(true));
      }
    });
  };
  const getStatusBar = () => {
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
  };

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
        `????????????${remote.version_number}`,
        `${remote.description_zh}???
        ???????????????`,
        [
          {
            text: '??????',
            onPress: () => console.log('Ask me later pressed'),
          },
          {
            text: '??????',
            onPress: () => {
              Linking.openURL(downloadUrl);
              dispatch(commitVersion(remote.version_number));
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  const getDeviceId = () => {
    let uniqueId = getUniqueId();
    console.log(uniqueId, 'uniqueId');
    if (uniqueId) {
      dispatch(commitDeviceId(uniqueId));
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
