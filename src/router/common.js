import React, { Component } from 'react';
import Webview from '@/view/common/Webview';
import LiveChat from '@/view/common/LiveChat';
import PDF from '@/view/common/PDF.js';

const CommonRoute = {
  webview: {
    screen: Webview,
    name: 'webview',
    options: { headerShown: true, title: '文件浏览' },
  },
  livechat: {
    screen: LiveChat,
    name: 'livechat',
    options: { headerShown: true, title: '在线客服' },
  },
  pdf: {
    screen: PDF,
    name: 'pdf',
    options: { headerShown: true, title: '文件浏览' },
  },
};
export default CommonRoute;
