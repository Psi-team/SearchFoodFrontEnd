import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import UserContext from '../utils/UserContext';
import PrivateRoute from '../utils/PrivateRoute';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SearchPage from '../pages/SearchPage';

const Router = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Route
          exact
          path='/'
          component={HomePage}
        />
        <Route
          path='/login'
          component={LoginPage}
        />
        <Route
          path='/register'
          component={RegisterPage}
        />
        <PrivateRoute
          path='/search'
          component={SearchPage}
        />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default Router;