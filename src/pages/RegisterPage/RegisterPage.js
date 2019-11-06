import React, { useRef, useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

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
  const inputLabel = useRef(null);
  const [state, setState] = useState({
    email: '',
    passwd1: '',
    passwd2: '',
    birthYear: '',
    sexual: '',
  });
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    props.register({ ...state });
  }
  console.log(props.error);
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
          value={state.sexual}
          onChange={handleChange}
          labelWidth={labelWidth}
          inputProps={{
            name: 'sexual',
            id: 'outlined-sex-native-simple',
          }}
        >
          <option value={0}>man</option>
          <option value={1}>woman</option>
        </Select>
      </FormControl>
      {
        props.error &&
        <Typography variant='h6' color='error'>{props.error}</Typography>
      }
      {
        props.loading ?
          <CircularProgress className={classes.progress} /> :
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

function mapStateToProp(state) {
  const { loading, error } = state.register;
  return { loading, error };
}

const actionCreators = {
  register: userActions.register,
};

export default connect(mapStateToProp, actionCreators)(RegisterPage);