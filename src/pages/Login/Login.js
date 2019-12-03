import React, { useState } from 'react';
import {
  Container,
  OutlinedInput,
  Box,
  Button,
  Typography,
  CircularProgress,
  Hidden,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

const useStyles = makeStyles(theme => ({
  container: {
    background: `url(${require(`../../assets/images/login.jpg`)}) center center / cover`,
    height: '100%',
  },
  form: {
    height: 420,
    padding: `${theme.spacing(3)}px ${theme.spacing(7)}px`,
    background: 'rgba(50, 50, 50, .55)  0% 0% no-repeat padding-box',
    '& > p:first-child': {
      fontWeight: 'bold',
    },
  },
  button: {
    '& > span': {
      color: theme.palette.primary.main,
      fontWeight: 550,
      fontSize: '1.6rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
    },
  },
}));

const LoginPage = ({ error, loading, login }) => {
  const [state, setState] = useState({ email: '', passwd: '' });
  const classes = useStyles();
  const handleChange = e => setState({ ...state, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    login(state.email, state.passwd);
  };

  return (
    <Grid className={classes.container} container justify="center" alignItems="center">
      <Container
        component="form"
        maxWidth="sm"
        className={classes.form}
        autoComplete="off"
        onSubmit={handleSubmit}
        noValidate
        data-testid="form"
      >
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
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        )}
        <Box component={Grid} container justify="center" alignContent="center" mb={3}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              size="large"
              fullWidth
              variant="contained"
              className={classes.button}
              type="submit"
            >
              登入
            </Button>
          )}
        </Box>
        <Grid container alignItems="center" justify="center">
          <Hidden smDown>
            <Grid item>
              <Typography paragraph component="span" align="center" variant="body1">
                還不是會員?
              </Typography>
            </Grid>
          </Hidden>
          <Grid item>
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
      </Container>
    </Grid>
  );
};

function mapStateToProps(state) {
  const { loading, error } = state.user;
  return { loading, error };
}

const actionCreators = {
  login: userActions.login,
};

export default connect(mapStateToProps, actionCreators)(LoginPage);
