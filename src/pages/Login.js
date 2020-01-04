import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  OutlinedInput,
  Box,
  Button,
  Typography,
  Hidden,
  Grid,
  Divider,
  makeStyles,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../redux/actions';
import AccountView from '../components/Users/AccountView';
import Loading from '../components/Common/Loading';

const useStyles = makeStyles(() => ({
  divider: {
    height: 25,
    backgroundColor: grey[300],
  },
}));

const Login = ({ error, loading, login }) => {
  const [state, setState] = useState({ email: '', passwd: '' });
  const history = useHistory();
  const classes = useStyles();
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const route = history.location.state || '/';
    login(state.email, state.passwd, route);
  };

  return (
    <AccountView handleSubmit={handleSubmit}>
      <Typography variant="h4" color="primary" align="center" paragraph>
        會員登入
      </Typography>
      <OutlinedInput
        autoComplete="off"
        value={state.email}
        onChange={handleChange}
        name="email"
        placeholder="email"
        fullWidth
        required
      />
      <OutlinedInput
        autoComplete="off"
        type="password"
        value={state.passwd}
        onChange={handleChange}
        name="passwd"
        placeholder="password"
        fullWidth
        required
      />
      {error && (
        <Typography variant="h6" color="error" align="center" paragraph>
          {error}
        </Typography>
      )}
      <Box
        component={Grid}
        container
        justify="center"
        alignContent="center"
        mb={3}
      >
        <Button size="large" fullWidth variant="contained" type="submit">
          登入
        </Button>
        <Loading loading={loading} />
      </Box>
      <Grid container alignItems="center" spacing={3} justify="center">
        <Grid item>
          <Typography
            component={Link}
            to="/resetPassword"
            color="secondary"
            align="center"
            variant="body1"
          >
            忘記密碼
          </Typography>
        </Grid>
        <Divider orientation="vertical" className={classes.divider} />
        <Grid item>
          <Hidden smDown>
            <Typography
              paragraph
              component="span"
              align="center"
              variant="body1"
            >
              還不是會員?
            </Typography>
          </Hidden>
          <Typography
            component={Link}
            to="/register"
            color="secondary"
            align="center"
            variant="body1"
          >
            加入會員
          </Typography>
        </Grid>
      </Grid>
    </AccountView>
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.string]),
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { loading, error } = state.user;
  return { loading, error };
}

const actionCreators = {
  login: userActions.login,
};

export default connect(mapStateToProps, actionCreators)(Login);
