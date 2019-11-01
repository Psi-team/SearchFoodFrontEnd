import { userService } from '../services';

export const userActions = {
  login, logout
}

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    userService.login(username, password)
      .then(
        user => {
          dispatch(success(user));
          window.location.assign('/');
        },
        error => {
          dispatch(failure(error.toString()));
        }
      )
  }

  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type: LOGIN_FAILURE, error } }
}

function logout() {
  return dispatch => {
    dispatch(() => ({ type: LOGOUT }));
    userService.logout();
    window.location.assign('/');
  }
}