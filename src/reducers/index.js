import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { register } from './register.reducer';
import { storeInfo, createStore, searchStore } from './shop.reducer';

const rootReducer = combineReducers({
  user,
  register,
  storeInfo,
  createStore,
  searchStore,
});

export default rootReducer;
