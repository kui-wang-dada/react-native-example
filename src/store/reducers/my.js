import * as my from '../actions/my';

const INITIAL_STATE = {
  userInfo: {
    students_id: '',
    students_name: '',
  },
  userInfoTran: {},
  account: [],
  contract: [],
  order: [],
  orderDetail: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case my.USER_INFO:
      return { ...state, ...action.payload };
    case my.USER_INFO_TRAN:
      return { ...state, ...action.payload };
    case my.ACCOUNT:
      return { ...state, ...action.payload };
    case my.CONTRACT:
      return { ...state, ...action.payload };
    case my.ORDER:
      return { ...state, ...action.payload };
    case my.ORDER_DETAIL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
