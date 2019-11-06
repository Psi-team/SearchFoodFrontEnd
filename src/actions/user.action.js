import { userService } from '../services';
import { validator } from '../helpers/validator';

export const userActions = {
  login, logout, register
}

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

function login(username, password) {
  try {
    validator({ type: 'login', data: { username, password } });

    return dispatch => {
      dispatch({ type: LOGIN_REQUEST });
      userService.login(username, password)
        .then(
          user => {
            window.location.assign('/');
            dispatch({ type: LOGIN_SUCCESS, user });
          },
          error => {
            dispatch({ type: LOGIN_FAILURE, error });
          }
        );
    }
  }
  catch ({ message }) {
    return { type: LOGIN_FAILURE, error: message }
  }
}

function logout() {
  return dispatch => {
    dispatch(() => ({ type: LOGOUT }));
    userService.logout();
    window.location.assign('/');
  }
}

function register({ email, passwd1, passwd2, birthYear, sexual }) {
  try {
    validator({ type: 'register', data: { email, passwd1, passwd2 } });

    return dispatch => {
      dispatch({ type: REGISTER_REQUEST });
      userService.register(email, passwd1, birthYear, sexual)
        .then(
          user => {
            window.location.assign('/');
            dispatch({ type: REGISTER_SUCCESS, user });
          },
          error => {
            dispatch({ type: REGISTER_FAILURE, error });
          }
        );
    }
  } catch ({ message }) {
    return { type: REGISTER_FAILURE, error: message };
  }
}