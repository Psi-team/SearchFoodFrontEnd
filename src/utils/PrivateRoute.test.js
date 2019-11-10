import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, getByText, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import reducer from '../reducers';
import PrivateRoute from './PrivateRoute';

afterEach(() => cleanup);

const MyComponent = ({ content }) => (<div>{content}</div>);

const renderWithRedux = (ui, initState) => {
  const store = createStore(reducer, initState);
  const history = createMemoryHistory();
  history.push('/test');

  return {
    ...render(
      <Router history={history}>
        <Route path='/login'>
          <MyComponent content='loginPage' />
        </Route>
        <Provider store={store}>
          {ui}
        </Provider>
      </Router>
    ),
    store
  }
};


test('when username is undefined, it will redirect to login page', () => {
  const { container, store } = renderWithRedux(
    <PrivateRoute to='/test'>
      <MyComponent content='testPage' />
    </PrivateRoute>,
    {}
  );

  expect(getByText(container, /loginPage/).innerHTML).toBe('loginPage');
  expect(() => getByText(container, /testPage/)).toThrow();
  expect(store.getState()).toMatchObject({});
});

test('when username is defined, it will render the target page', () => {
  const { container, store } = renderWithRedux(
    <PrivateRoute path='/test'>
      <MyComponent content='testPage' />
    </PrivateRoute>,
    { user: { username: 'Tom' } }
  );

  expect(getByText(container, /testPage/).innerHTML).toBe('testPage');
  expect(() => getByText(container, /loginPage/)).toThrow();
  expect(store.getState()).toMatchObject({ user: { username: 'Tom' } });
});