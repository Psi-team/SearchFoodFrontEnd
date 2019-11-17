import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, username, ...rest }) => (
  <Route {...rest} render={() => (
    username ? children : <Redirect to='/login' />
  )} />
);

function mapStateToProp(state) {
  return {
    username: state.user.username
  }
}
export default connect(mapStateToProp)(PrivateRoute);