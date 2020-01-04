import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { user } from './user.reducer';
import { externalInfo } from './external.reducer';
import {
  storeType,
  createStore,
  searchStores,
  storeDetail,
  createMessage,
} from './shop.reducer';

const rootReducer = combineReducers({
  user,
  storeType,
  createStore,
  searchStores,
  storeDetail,
  createMessage,
  externalInfo,
  routing: routerReducer,
});

export default rootReducer;
