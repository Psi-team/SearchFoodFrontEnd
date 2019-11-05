import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  console.log(user);
  return (
    <Route {...rest} render={(props) => (
      user ? <Component {...props} /> : <Redirect to='/login' />
    )} />
  );
}

function mapStateToProp(state) {
  return {
    user: state.authentication.user
  }
}
export default connect(mapStateToProp)(PrivateRoute);