import React from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline, Container, makeStyles } from '@material-ui/core';
import { Router as BrowserRouter } from 'react-router';

import PrivateRoute from '../helpers/PrivateRoute';
import ScrollToTop from '../helpers/ScrollToTop';
import Header from '../components/Common/Header';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import ResetPasswordPage from '../pages/ResetPassword';
import SearchPage from '../pages/Search';
import CreateStorePage from '../pages/CreateStore';
import StorePage from '../pages/Store';
import ProfilePage from '../pages/Profile';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
}));

const Router = ({ history }) => {
  const classes = useStyles();

  return (
    <BrowserRouter history={history}>
      <CssBaseline />
      <ScrollToTop />
      <Container className={classes.root} disableGutters={true} maxWidth="xl">
        <Header />
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/resetPassword">
          <ResetPasswordPage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <PrivateRoute path="/storeDetail:storename">
          <StorePage />
        </PrivateRoute>
        <PrivateRoute path="/createStore">
          <CreateStorePage />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <ProfilePage />
        </PrivateRoute>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
