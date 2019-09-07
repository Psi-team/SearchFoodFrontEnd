import React, { useState } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SearchFoodPage from '../pages/SearchFood';

import '../_base.scss';

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signin = () => {
    setIsAuthenticated(true);
  };

  const signout = () => {
    setIsAuthenticated(false)
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  return (
    <div className="container">
      <BrowserRouter>
        <Sidebar
          isAuthenticated={isAuthenticated}
          signout={signout}
        />
        <Route
          exact
          path='/'
          component={HomePage}
        />
        {/* TODO: 權限控管 */}
        <PrivateRoute path='/search' component={SearchFoodPage} />
        <Route
          path='/login'
          render={(props) => <LoginPage signin={signin} {...props} />}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Router;