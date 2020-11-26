import React from 'react';
import { Dimensions, View, Platform, PixelRatio, StyleSheet, ActivityIndicator } from 'react-native';

import moment from 'moment-timezone';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import ImageViewer from 'react-native-image-zoom-viewer';
import modal from './modal';

const DESIGN_WIDTH = 750;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export function size(designSize) {
  const number = (designSize / DESIGN_WIDTH) * SCREEN_WIDTH;

  let remainder = number % 1;
  const int = number - remainder;
  // 防止非标准Android屏，不做处理
  if (Platform.OS === 'android' && parseInt(PixelRatio.get()) !== PixelRatio.get()) {
  } else {
    remainder = remainder >= 0.25 && remainder < 0.75 ? 0.5 : Math.round(remainder);
  }
  return int + remainder;
}

export function checkStaticImg(dataStr) {
  if (!dataStr) {
    return '';
  }
  return 'https://staticapp.hourenlx.com/wholerenApp/v3/' + dataStr;
}

export function messageTime(dataStr) {
  if (!dataStr) {
    return '';
  }
  const data1 = moment(dataStr).format('YYYY');
  if (data1 === '2020') {
    return moment(dataStr).format('MM-DD');
  } else {
    return moment(dataStr).format('YYYY-MM-DD');
  }
}

export function formatTime(v, type = 'YYYY/MM/DD') {
  return moment(v).format(type);
}

export function openReport(url, navigation) {
  if (url.includes('https://erp-cdn.wholeren.cn')) {
    url = url.replace('/privatehttps://erp-cdn.wholeren.cn', 'https://erpapi.wholeren.cn/private');
    url = url.replace('https://erp-cdn.wholeren.cn', 'https://erpapi.wholeren.cn');
    console.log(url, 'url');
  }
  let isPdf = /(.*)\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/.test(url);
  let isImage = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(url);
  if (isPdf) {
    navigation.navigate('webview', { url: url });
  } else if (isImage) {
    let imgUrl = [
      {
        url: url,
      },
    ];

    let Components = (
      <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
        <ImageViewer
          imageUrls={imgUrl}
          enableImageZoom
          saveToLocalByLongPress={false}
          onClick={() => modal.close()}
          loadingRender={() => <ActivityIndicator animating={true} size="large" color="#fff" />}
        />
      </View>
    );
    modal.show(Components, 'center');
  }
}

export function checkImg(item, size) {
  let remoteUrl = '';
  let prefix = '';
  if (!item) {
    return '';
  }

  if (typeof item === 'object') {
    remoteUrl = item.attach_image_url || item.attach_image;
  } else {
    remoteUrl = item;
  }
  if (!remoteUrl) {
    return '';
  }
  let arr = remoteUrl.split('.');
  prefix = arr[arr.length - 1];

  if (remoteUrl.includes('https://erp-cdn.wholeren.cn')) {
    remoteUrl = remoteUrl.replace('/privatehttps://erp-cdn.wholeren.cn', 'https://erpapi.wholeren.cn/private');
    remoteUrl = remoteUrl.replace('https://erp-cdn.wholeren.cn', 'https://erpapi.wholeren.cn');
  }

  if (!remoteUrl.includes('http')) {
    remoteUrl = `https://erpapi.wholeren.cn${remoteUrl}`;
  }

  if (remoteUrl.includes('wr-cdn.wholeren.cn') || remoteUrl.includes('res.accspeed.com')) {
    return remoteUrl;
  }
  if (size) {
    remoteUrl = `${remoteUrl}_${size}-.${prefix}`;
  } else {
    remoteUrl = `${remoteUrl}_360-.${prefix}`;
  }

  return remoteUrl;
}
