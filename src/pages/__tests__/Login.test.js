import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  getByText,
  getByTestId,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import mediaQuery from 'css-mediaquery';

import reducer from '../../reducers';
import LoginPage from '../Login';

const renderWithRedux = (ui, initState) => {
  const store = createStore(reducer, initState);
  const history = createMemoryHistory();

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    store,
  };
};

const createMatchMedia = width => {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
};

afterEach(() => cleanup);

test('loginPage in PC mode, form submit will trigger actions', () => {
  window.matchMedia = createMatchMedia(761);
  const { container, store } = renderWithRedux(<LoginPage />, {});
  expect(container).toMatchSnapshot();
  fireEvent.submit(getByTestId(container, 'form'));
  const state = store.getState();
  // Because the submit data is fail to validator, so it will not call api
  expect(state.user.error).toEqual('帳號或密碼不得空白');
});

test('loginPage in mobile mode', () => {
  window.matchMedia = createMatchMedia(759);
  const { container } = renderWithRedux(<LoginPage />, {});
  // It's hidden in mobile mode.
  expect(() => getByText(container, /還*會員/)).toThrow();
});

test('loginPage in loading', () => {
  const { container } = renderWithRedux(<LoginPage />, {
    user: { loading: true },
  });
  expect(() => getByText(container, '登入')).toThrow();
});
