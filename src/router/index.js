import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import UserContext from '../utils/UserContext';
// import PrivateRoute from '../components/utils/PrivateRoute';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

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
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default Router;