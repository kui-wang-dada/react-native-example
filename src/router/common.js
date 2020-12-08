import React, { Component } from 'react';
import Webview from '@/view/common/Webview';
import LiveChat from '@/view/common/LiveChat';

const CommonRoute = {
  webview: {
    screen: Webview,
    name: 'webview',
    options: { headerShown: true, title: '浏览器' },
  },
  livechat: {
    screen: LiveChat,
    name: 'livechat',
    options: { headerShown: true, title: '在线客服' },
  },
};
export default CommonRoute;
