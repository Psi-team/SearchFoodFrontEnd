import { combineReducers } from 'redux';

import { authentication } from './user.reducer';

const rootReducer = combineReducers({
  authentication
});

export default rootReducer;