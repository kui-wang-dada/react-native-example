import * as my from '../actions/my';

const INITIAL_STATE = {
  userInfo: {
    students_id: '123',
    students_name: '423',
  },
  userInfoTran: {},
  account: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case my.USER_INFO:
      return {...state, ...action.payload};
    case my.USER_INFO_TRAN:
      return {...state, ...action.payload};
    case my.ACCOUNT:
      return {...state, ...action.payload};

    default:
      return state;
  }
}
