import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';

const MiddleRoute = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return open ? (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={2000}
      message={<span id="message-id">請先登入</span>}
    />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: location.pathname,
      }}
    />
  );
};

const PrivateRoute = ({ children, loggedIn, ...rest }) => (
  <Route {...rest} render={() => (loggedIn ? children : <MiddleRoute />)} />
);

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  rest: PropTypes.object,
};

function mapStateToProp(state) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

export default connect(mapStateToProp)(PrivateRoute);
