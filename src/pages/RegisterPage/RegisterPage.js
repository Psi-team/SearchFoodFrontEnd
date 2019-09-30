import React, { useRef, useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useUser from '../../hooks/user/useUser';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const yearOptions = () => {
  const nowYear = new Date().getFullYear();
  const arr = [];
  for (let i = nowYear - 100; i < nowYear; i++)
    arr.push(<option key={i.toString()} value={i}>{i}</option>);

  return arr;
}

const RegisterPage = (props) => {
  const classes = useStyles();
  const {
    registerState: state,
    setRegisterState: setState,
    register,
    loading } = useUser(props.history);

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = e => setState({ [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (state.email === '' || state.passwd1 === '' || state.passwd2 === '') {
      setState({ error: '帳號或密碼不得空' });
    } else if (state.email.indexOf('@') === -1) {
      setState({ error: '帳號格式不對，請再次確認' });
    } else if (state.passwd1 !== state.passwd2) {
      setState({ error: '兩次密碼不一致，請再次確認' });
    } else {
      register(state);
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
        id="filled-password1-input"
        label="password"
        type='password'
        className={classes.textField}
        value={state.passwd1}
        onChange={handleChange}
        margin="normal"
        variant="filled"
        name='passwd1'
      />
      <TextField
        id="filled-password2-input"
        label="password"
        type='password'
        className={classes.textField}
        value={state.passwd2}
        onChange={handleChange}
        margin="normal"
        variant="filled"
        name='passwd2'
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-birthYear-native-simple">
          BirthYear
        </InputLabel>
        <Select
          native
          value={state.birthYear}
          onChange={handleChange}
          labelWidth={labelWidth}
          inputProps={{
            name: 'birthYear',
            id: 'outlined-birthYear-native-simple',
          }}
        >
          {yearOptions()}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-sex-native-simple">
          Sex
        </InputLabel>
        <Select
          native
          value={state.sex}
          onChange={handleChange}
          labelWidth={labelWidth}
          inputProps={{
            name: 'sex',
            id: 'outlined-sex-native-simple',
          }}
        >
          <option value={0}>man</option>
          <option value={1}>woman</option>
        </Select>
      </FormControl>
      {
        state.error &&
        <Typography variant='h6' color='error'>{state.error}</Typography>
      }
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
              註冊
            </Button>
          </Box>
      }
    </form>
  );
};

export default RegisterPage;