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
const REGISTER_FAILURE = 'REGISTER_FAILURE';

function login(username, password) {
  if (!username || !password)
    return { type: LOGIN_FAILURE, error: '帳號或密碼不得空白' };

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

function register({ email, passwd1, passwd2, birthYear, sexual }) {
  if (email === '' || passwd1 === '' || passwd2 === '')
    return { type: REGISTER_FAILURE, error: '帳號或密碼不得空' };
  else if (email.indexOf('@') === -1)
    return { type: REGISTER_FAILURE, error: '帳號格式不對，請再次確認' };
  else if (passwd1 !== passwd2)
    return { type: REGISTER_FAILURE, error: '密碼不一致，請再次確認' };
  else if (6 > passwd1.length || passwd1.length > 10)
    return { type: REGISTER_FAILURE, error: '密碼長度需6~10碼' }

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
}