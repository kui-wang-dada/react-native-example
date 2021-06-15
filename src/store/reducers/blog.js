import * as blog from "../actions/blog";

const INITIAL_STATE = {
  oppBlogList: [],
  blogDetail: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case blog.OPP_BLOG_LIST:
      return { ...state, ...action.payload };
    case blog.BLOG_DETAIL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
