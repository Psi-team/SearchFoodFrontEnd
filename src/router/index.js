import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import UserContext from '../components/utils/UserContext';
import PrivateRoute from '../components/utils/PrivateRoute';
import Header from '../layouts/Header';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SearchFoodPage from '../pages/SearchFood';

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
        <PrivateRoute path='/search' component={SearchFoodPage} />
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