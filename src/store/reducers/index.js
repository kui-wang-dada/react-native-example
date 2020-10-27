import {combineReducers} from 'redux';
import home from './home';
import my from './my';

import common from './common';
import search from './search';

export default combineReducers({
  home,
  common,
  my,
  search,
});
