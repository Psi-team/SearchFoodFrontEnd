import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { register } from './register.reducer';
import { county } from './shop.reducer';

const rootReducer = combineReducers({
  user,
  register,
  county
});

export default rootReducer;