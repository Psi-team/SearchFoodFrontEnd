import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers';
import Router from './router';

const App = () => {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;