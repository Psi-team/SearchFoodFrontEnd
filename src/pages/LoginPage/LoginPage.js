import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
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
  const history = useHistory();
  const handleChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    props.login(state.email, state.passwd);
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
        props.error &&
        <Typography variant='h6' color='error'>{props.error}</Typography>
      }
      {
        props.loading
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
              onClick={() => history.push('/register')}>
              註冊
            </Button>
          </Box>
      }
    </form>
  );
};

function mapStateToProps(state) {
  const { loggingIn, loading, error } = state.user;
  return { loggingIn, loading, error };
}

const actionCreators = {
  login: userActions.login,
};

export default connect(mapStateToProps, actionCreators)(LoginPage);