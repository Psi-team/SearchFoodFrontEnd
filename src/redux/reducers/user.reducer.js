import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_FAILURE,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from '../constants';

const userInfo = JSON.parse(localStorage.getItem('user'));

const basicState = {
  loading: false,
  loggedIn: false,
  location: null,
  error: null,
};
const initState = userInfo
  ? {
      ...basicState,
      loggedIn: true,
      ...userInfo,
    }
  : basicState;
export const user = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case RESETPASSWORD_REQUEST:
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case RESETPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case RESETPASSWORD_FAILURE:
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...basicState,
      };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload,
      };
    case GET_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
