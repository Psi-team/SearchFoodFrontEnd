import React, { useReducer } from 'react';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useUser from '../LoginPage/useUser';

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
  passwd1: '',
  passwd2: '',
  error: ''
}

const reducer = (prevState, updatePrev) => ({
  ...prevState,
  ...updatePrev
});

const RegisterPage = (props) => {
  const classes = useStyles();
  const [state, setState] = useReducer(reducer, initState);
  const { register, fetchState } = useUser(props.history);
  const handleChange = e => setState({ [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (state.email === '' || state.passwd1 === '' || state.passwd2 === '') {
      setState({ error: '帳號或密碼不得空' });
    } else if (state.email.indexOf('@') === -1) {
      setState({ error: '帳號格式不對，請再次確認' });
    } else if (state.passwd1 != state.passwd2) {
      setState({ error: '兩次密碼不一致，請再次確認' });
    } else {
      register(state.email, state.passwd1);
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
      <Typography variant='h3'>註冊</Typography>
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
        name='passwd1'
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
        name='passwd2'
      />
      {
        state.error &&
        <Typography variant='h6' color='error'>{state.error}</Typography>
      }
      <Box>
        <Button
          variant="contained"
          className={classes.button}
          type='submit'
        >
          註冊
      </Button>
      </Box>
    </form>
  );
};

export default RegisterPage;