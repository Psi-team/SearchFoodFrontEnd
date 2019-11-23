import React, { useState } from 'react';
import {
  Container,
  OutlinedInput,
  Button,
  Typography,
  LinearProgress,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

const useStyles = makeStyles(() => ({
  container: {
    background: `url(${require(`../../assets/images/login.jpg`)}) center center / cover`,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    height: 420,
    padding: '30px 10%',
    background: 'rgba(50, 50, 50, .6)  0% 0% no-repeat padding-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  title: {
    font: 'Bold 28px/36px Microsoft JhengHei',
    letterSpacing: '4px',
    color: '#ffb5b5',
    marginBottom: 14,
    textAlign: 'center',
  },
  errorMessage: {
    height: 30,
    marginBottom: 10,
    '& > p': {
      font: 'Bold 20px Microsoft JhengHei',
      textAlign: 'center',
      color: '#ff424f',
      letterSpacing: '4px',
    },
  },
  textField: {
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    marginBottom: 25,
    opacity: 1,
    '& fieldset': {
      borderRadius: 30,
    },
  },
  loadingArea: {
    marginBottom: 25,
    height: 50,
  },
  button: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    border: '1px solid #707070',
    borderRadius: '30px',
    font: 'Bold 24px/32px Microsoft JhengHei',
    letterSpacing: '3.2px',
    color: '#4F576D',
  },
  registerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 20%',
    ' & > span, & > a': {
      font: 'Regular 24px/32px Microsoft JhengHei',
      letterSpacing: '2.4px',
    },
  },
  registerLink: {
    color: '#ffb5b5',
  },
}));

const LoginPage = ({ error, loading, login }) => {
  const [state, setState] = useState({ email: '', passwd: '' });
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:760px)');
  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    login(state.email, state.passwd);
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="sm">
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit}
          noValidate
          data-testid="form"
        >
          <Typography className={classes.title}>會員登入</Typography>
          <div className={classes.errorMessage}>
            {error && <Typography component="p">{error}</Typography>}
          </div>
          <OutlinedInput
            className={classes.textField}
            value={state.email}
            onChange={handleChange}
            name="email"
            placeholder="email"
            fullWidth
            required
          />
          <OutlinedInput
            placeholder="password"
            type="password"
            className={classes.textField}
            value={state.passwd}
            onChange={handleChange}
            name="passwd"
            fullWidth
            required
          />
          <div className={classes.loadingArea}>
            {loading ? (
              <LinearProgress />
            ) : (
              <Button
                variant="contained"
                className={classes.button}
                type="submit"
              >
                登入
              </Button>
            )}
          </div>
          <div className={classes.registerContainer}>
            {/* Hidden in phone mode*/}
            {matches && <Typography component="span">還不是會員?</Typography>}
            <Link className={classes.registerLink} to="/register">
              加入會員
            </Link>
          </div>
        </form>
      </Container>
    </div>
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
