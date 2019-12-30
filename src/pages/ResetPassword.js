import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Typography,
  OutlinedInput,
  Button,
  Snackbar,
  makeStyles,
} from '@material-ui/core';

import { userActions } from '../redux/actions';
import AccountView from '../components/Users/AccountView';

const useStyles = makeStyles(() => ({
  button: {
    display: 'block',
    marginLeft: 'auto',
  },
}));

const ResetPassword = ({ resetPassword, loading, error }) => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    resetPassword(email);
  };

  const goToLogin = () => {
    history.push('/login');
  };

  return (
    <AccountView handleSubmit={handleSubmit}>
      <Typography variant="h4" color="primary" align="center" paragraph>
        忘記密碼
      </Typography>
      <OutlinedInput
        autoComplete="off"
        value={email}
        onChange={handleChange}
        name="email"
        placeholder="請輸入您的電子信箱"
        fullWidth
        required
      />
      {error && (
        <Typography color="error" variant="h6" align="center" paragraph>
          {error}
        </Typography>
      )}
      <Button
        size="large"
        variant="contained"
        type="submit"
        className={classes.button}
      >
        送出
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={loading}
        onClose={goToLogin}
        autoHideDuration={2000}
        message={
          <span id="message-id">
            新密碼已寄送到
            {email}
          </span>
        }
      />
    </AccountView>
  );
};

ResetPassword.proptTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

function mapStateToProp(state) {
  return {
    loading: state.user.loading,
    error: state.user.error,
  };
}

const actionCreator = {
  resetPassword: userActions.resetPassword,
};

export default connect(mapStateToProp, actionCreator)(ResetPassword);
