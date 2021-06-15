/** @format */

export default [
  {
    name: 'oppBlogList',
    method: 'GET',
    desc: '沟通记录详情的推荐阅读',
    baseUrl: 'https://comapi.wholeren.cn',
    path: '/wp-admin/admin-ajax.php?action=jieba_ajax_keywordinfo',
  },
  {
    name: 'blogDetail',
    method: 'GET',
    desc: '沟通记录详情的推荐阅读详情',
    baseUrl: 'https://comapi.wholeren.cn',
    path: '/wp-admin/admin-ajax.php?action=jieba_ajax_postinfo',
  },
];
