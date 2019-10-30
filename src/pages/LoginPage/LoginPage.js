import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../../actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const LoginPage = (props) => {
  const [state, setState] = useState({ email: '', passwd: '' });
  const classes = useStyles();
  const handleChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    props.login(state.email, state.passwd);
    console.log(e)
  }
  // TODO: redux state pass loading
  let loading = false;
  return (
    <form
      className={classes.container}
      autoComplete='off'
      //It cancels the html5 default validation.
      noValidate
      onSubmit={handleSubmit}
    >
      <Typography variant='h3'>登入</Typography>
      <TextField
        id="filled-email-input"
        label="email"
        type='email'
        className={classes.textField}
        value={state.email}
        onChange={handleChange}
        name='email'
        margin="normal"
        variant="filled"
        required
      />
      <TextField
        id="filled-password-input"
        label="password"
        type='password'
        className={classes.textField}
        value={state.passwd}
        onChange={handleChange}
        margin="normal"
        variant="filled"
        name='passwd'
      />
      {/* {
        state.error &&
        <Typography variant='h6' color='error'>{state.error}</Typography>
      } */}
      {
        loading
          ?
          <CircularProgress className={classes.progress} />
          :
          <Box>
            <Button
              variant="contained"
              className={classes.button}
              type='submit'>
              登入
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              type='button'
              onClick={() => props.history.push('/register')}>
              註冊
            </Button>
          </Box>
      }
    </form>
  );
};

function mapStateToProps(state) {
  // const { loggingIn } = state.authentication;
  return { loggingIn: state.loggingIn }
}

const actionCreators = {
  login: userActions.login,
};

export default connect(mapStateToProps, actionCreators)(LoginPage);