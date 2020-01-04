import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
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
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAILURE,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILURE,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAILURE,
} from '../constants';

const userInfo = JSON.parse(localStorage.getItem('user'));

let initState = {};
if (userInfo) {
  initState = {
    loggedIn: true,
    loading: false,
    favorites: [],
    ...userInfo,
  };
} else {
  initState = {
    loading: false,
    loggedIn: false,
    favorites: [],
  };
}

export const user = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
    case RESETPASSWORD_REQUEST:
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
        loggedIn: true,
      };
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
    case GET_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.payload,
      };
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: [...(state.favorites || []), action.payload],
      };
    case REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.filter(f => f.storeId !== action.payload),
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case RESETPASSWORD_FAILURE:
    case GET_PROFILE_FAILURE:
    case GET_FAVORITES_FAILURE:
    case ADD_FAVORITE_FAILURE:
    case REMOVE_FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        loggedIn: false,
        favorites: [],
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
