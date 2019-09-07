import React from 'react';

import LoginContainer from '../../containers/LoginContainer';

import './LoginPage.scss';

const LoginPage = (props) => (
  <div className="loginPage__form">
    <LoginContainer {...props} />
  </div>

);

export default LoginPage;