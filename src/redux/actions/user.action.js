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
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from '../constants';

export const userActions = {
  login,
  logout,
  register,
  resetPassword,
  getLocation,
  getProfile,
};

function login(username, password, route) {
  try {
    validator({ type: 'login', data: { username, password } });

    return dispatch => {
      dispatch({ type: LOGIN_REQUEST });
      userService.login(username, password).then(
        user => {
          window.location.assign(route);
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

function register({ email, nickname, passwd1, passwd2, birthYear, sexual }) {
  try {
    validator({
      type: 'register',
      data: { email, passwd1, passwd2, nickname, birthYear },
    });

    return dispatch => {
      dispatch({ type: REGISTER_REQUEST });
      userService.register(email, passwd1, birthYear, sexual, nickname).then(
        data => {
          localStorage.setItem('user', JSON.stringify(data.data));
          dispatch({ type: REGISTER_SUCCESS, payload: data.data });
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

function resetPassword(email) {
  return dispatch => {
    dispatch({ type: RESETPASSWORD_REQUEST });
    userService.resetPassword(email).then(
      () => {
        dispatch({ type: RESETPASSWORD_SUCCESS });
      },
      error => {
        dispatch({
          type: RESETPASSWORD_FAILURE,
          payload: error.response.data.message,
        });
      }
    );
  };
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

function getProfile() {
  return dispatch => {
    dispatch({ type: GET_PROFILE_REQUEST });
    userService.getProfile().then(
      data => {
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data.data });
      },
      error => {
        dispatch({
          type: GET_PROFILE_FAILURE,
          payload: error.response.data.message,
        });
      }
    );
  };
}
