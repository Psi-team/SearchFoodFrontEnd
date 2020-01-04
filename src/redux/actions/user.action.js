import { push } from 'react-router-redux';

import { userService } from '../../services';
import { validator } from '../../helpers/validator';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
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
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAILURE,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILURE,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAILURE,
} from '../constants';

export const userActions = {
  login,
  logout,
  register,
  resetPassword,
  getLocation,
  getProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
};

function login(username, password, route) {
  try {
    validator({ type: 'login', data: { username, password } });

    return dispatch => {
      dispatch({ type: LOGIN_REQUEST });
      userService.login(username, password).then(
        user => {
          localStorage.setItem('user', JSON.stringify(user.data));
          dispatch({ type: LOGIN_SUCCESS, payload: user.data });
          dispatch(getFavorites());
          dispatch(push(route));
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
    dispatch({ type: LOGOUT_REQUEST });
    userService.logout().then(() => {
      localStorage.removeItem('user');
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch(push('/'));
    });
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
          dispatch(push('/'));
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

function getFavorites() {
  return dispatch => {
    userService.getFavorites().then(
      data => {
        dispatch({ type: GET_FAVORITES_SUCCESS, payload: data });
      },
      error => {
        dispatch({
          type: GET_FAVORITES_FAILURE,
          payload: error,
        });
      }
    );
  };
}

function addFavorite(shop) {
  return dispatch => {
    userService.addFavorite(shop).then(
      data => {
        dispatch({ type: ADD_FAVORITE_SUCCESS, payload: data });
      },
      error => {
        dispatch({
          type: ADD_FAVORITE_FAILURE,
          payload: error,
        });
      }
    );
  };
}

function removeFavorite(shop) {
  return dispatch => {
    userService.removeFavorite(shop).then(
      data => {
        dispatch({ type: REMOVE_FAVORITE_SUCCESS, payload: data });
      },
      error => {
        dispatch({
          type: REMOVE_FAVORITE_FAILURE,
          payload: error,
        });
      }
    );
  };
}
