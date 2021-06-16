import { doAction } from './getData';

export const OPP_BLOG_LIST = 'OPP_BLOG_LIST';
export const BLOG_DETAIL = 'BLOG_DETAIL';

export const getOppBlogList = (params) => doAction(params, 'blog/oppBlogList', 'OPP_BLOG_LIST', 'oppBlogList', { wordpress: true });
export const getBlogDetail = (params) =>
  doAction(params, 'blog/blogDetail', 'BLOG_DETAIL', 'blogDetail', { arrayOne: true, wordpress: true });
export const commitOppBlogList = () => {
  return (dispatch) => {
    return dispatch({
      type: 'OPP_BLOG_LIST',
      payload: { oppBlogList: [] },
    });
  };
};
