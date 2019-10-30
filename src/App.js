import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';
import Router from './router';

const App = () => {
  const loggerMiddleware = createLogger();

  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;