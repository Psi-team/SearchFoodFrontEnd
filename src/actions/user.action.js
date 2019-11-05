import { userService } from '../services';

export const userActions = {
  login, logout, register
}

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTRE_FAILTURE';

function login(username, password) {
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

function logout() {
  return dispatch => {
    dispatch(() => ({ type: LOGOUT }));
    userService.logout();
    window.location.assign('/');
  }
}

function register(username, password, birthYear, sexual) {
  return dispatch => {
    dispatch({ type: REGISTER_REQUEST });
    userService.register(username, password, birthYear, sexual)
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
}