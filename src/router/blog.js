import React, { Component } from 'react';
import BlogDetail from '@/view/home/author/BlogDetail';

const BlogRoute = {
  blogDetail: {
    screen: BlogDetail,
    name: 'blogDetail',
    options: { headerShown: true, title: '文章详情' },
  },
};
export default BlogRoute;
