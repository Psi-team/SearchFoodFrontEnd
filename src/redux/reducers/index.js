import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { externalInfo } from './external.reducer';
import {
  createStore,
  searchStores,
  storeDetail,
  createMessage,
} from './shop.reducer';

const rootReducer = combineReducers({
  user,
  createStore,
  searchStores,
  storeDetail,
  createMessage,
  externalInfo,
});

export default rootReducer;
