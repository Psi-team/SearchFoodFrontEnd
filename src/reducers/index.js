import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { register } from './register.reducer';
import { county, storeType, createStore } from './shop.reducer';

const rootReducer = combineReducers({
  user,
  register,
  county,
  storeType,
  createStore
});

export default rootReducer;