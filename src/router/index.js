import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import PrivateRoute from '../utils/PrivateRoute';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SearchPage from '../pages/SearchPage';
import CreateStorePage from '../pages/CreateStorePage';

const Router = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/register'>
        <RegisterPage />
      </Route>
      <PrivateRoute path='/search'>
        <SearchPage />
      </PrivateRoute>
      <PrivateRoute path='/createStore'>
        <CreateStorePage />
      </PrivateRoute>
    </BrowserRouter>
  );
};

export default Router;