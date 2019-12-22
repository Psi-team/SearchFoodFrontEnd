import { userService } from '../../services';
import { validator } from '../../helpers/validator';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
} from '../constants';

export const userActions = {
  login,
  logout,
  register,
  getLocation,
};

function login(username, password) {
  try {
    validator({ type: 'login', data: { username, password } });

    return dispatch => {
      dispatch({ type: LOGIN_REQUEST });
      userService.login(username, password).then(
        user => {
          window.location.assign('/');
          localStorage.setItem('user', JSON.stringify(user.data));
          dispatch({ type: LOGIN_SUCCESS, payload: user.data });
        },
        error => {
          dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data.message,
          });
        }
      );
    };
  } catch ({ message }) {
    return { type: LOGIN_FAILURE, payload: message };
  }
}

function logout() {
  return dispatch => {
    dispatch(() => ({ type: LOGOUT }));
    userService.logout();
    localStorage.removeItem('user');
    window.location.assign('/');
  };
}

function register({ email, passwd1, passwd2, birthYear, sexual }) {
  try {
    validator({ type: 'register', data: { email, passwd1, passwd2 } });

    return dispatch => {
      dispatch({ type: REGISTER_REQUEST });
      userService.register(email, passwd1, birthYear, sexual).then(
        user => {
          if (process.env.REACT_APP_ENV) {
            localStorage.setItem(
              'user',
              JSON.stringify({ username: email, token: '1232asddsfsvfa' })
            );
            dispatch({
              type: REGISTER_SUCCESS,
              payload: { username: email, token: '1232asddsfsvfa' },
            });
          } else {
            localStorage.setItem('user', JSON.stringify(user.data));
            dispatch({ type: REGISTER_SUCCESS, payload: user.data });
          }
          window.location.assign('/');
        },
        error => {
          dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data.message,
          });
        }
      );
    };
  } catch ({ message }) {
    return { type: REGISTER_FAILURE, payload: message };
  }
}

function getLocation() {
  return dispath => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          dispath({
            type: GET_LOCATION_SUCCESS,
            location: { latitude, longitude },
          });
        },
        error => {
          dispath({ type: GET_LOCATION_FAILURE });
        }
      );
    } else {
      dispath({ type: GET_LOCATION_FAILURE });
    }
  };
}
