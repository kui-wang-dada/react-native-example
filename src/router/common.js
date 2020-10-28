import React, {Component} from 'react';
import Webview from '@/view/common/Webview';

const CommonRoute = {
  webview: {
    screen: Webview,
    name: 'webview',
    options: {headerShown: true, title: '浏览器'},
  },
};
export default CommonRoute;
