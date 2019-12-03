import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ThemeProvider } from '@material-ui/core/styles';

import rootReducer from './reducers';
import Router from './router';
import { theme } from './settings/Theme';

const App = () => {
  const loggerMiddleware = createLogger();

  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
