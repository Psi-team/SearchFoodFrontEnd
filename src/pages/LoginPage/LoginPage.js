import React, { useReducer } from 'react';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useUser from './useUser';

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
}));

const initState = {
  email: '',
  passwd: '',
  error: ''
}

const reducer = (prevState, updatePrev) => ({
  ...prevState,
  ...updatePrev
});

const LoginPage = (props) => {
  const classes = useStyles();
  const [state, setState] = useReducer(reducer, initState);
  const { login, fetchState } = useUser(props.history);
  const handleChange = e => setState({ [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (state.email === '' || state.passwd === '') {
      setState({ error: '帳號或密碼不得空' });
    } else if (state.email.indexOf('@') === -1) {
      setState({ error: '帳號格式不對，請再次確認' });
    } else {
      login(state.email, state.passwd);
    }
  }
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
      {
        state.error &&
        <Typography variant='h6' color='error'>{state.error}</Typography>
      }
      <Box>
        {
          fetchState.loading
            ? <Typography>載入中</Typography>
            : <Button
              variant="contained"
              className={classes.button}
              type='submit'>
              登入
              </Button>
        }
        <Button
          variant="contained"
          className={classes.button}
          type='button'
          onClick={() => props.history.push('/register')}
        >
          註冊
      </Button>
      </Box>
    </form>
  );
};

export default LoginPage;