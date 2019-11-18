import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, getByText, getByTestId, cleanup, fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import mediaQuery from 'css-mediaquery';

import reducer from '../../reducers';
import LoginPage from '.';

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
    addListener: () => { },
    removeListener: () => { },
  });
};

afterEach(() => cleanup);
jest.mock('../../actions');

test('loginPage in PC mode', () => {
  window.matchMedia = createMatchMedia(761);
  const { userActions } = require('../../actions');
  userActions.login = () => jest.fn();
  const { container } = renderWithRedux(<LoginPage />, {});
  expect(container).toMatchSnapshot();
  fireEvent.submit(getByTestId(container, 'form'));
  // expect(login).toHaveBeenCalled();
});

test('loginPage in mobile mode', () => {
  window.matchMedia = createMatchMedia(759);
  const { container } = renderWithRedux(<LoginPage />, {});
  // It's hidden in mobile mode.
  expect(() => getByText(container, /還不是會員/)).toThrow();
});
