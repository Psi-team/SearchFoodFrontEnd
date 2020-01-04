import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { syncHistoryWithStore } from 'react-router-redux';

import { store } from './redux/store';
import Router from './router';
import { theme } from './settings/Theme';
import { history } from './helpers/history';

const App = () => {
  const syncHistory = syncHistoryWithStore(history, store);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={syncHistory} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
