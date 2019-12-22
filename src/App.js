import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import { store } from './redux/store';
import Router from './router';
import { theme } from './settings/Theme';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
);

export default App;
