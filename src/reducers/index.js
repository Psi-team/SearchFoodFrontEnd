import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { register } from './register.reducer';
const rootReducer = combineReducers({
  user,
  register
});

export default rootReducer;