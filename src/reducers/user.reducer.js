const userInfo = JSON.parse(localStorage.getItem('user'));

const initState = userInfo ? { loggedIn: true, ...userInfo } : {};

export const user = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loggingIn: true,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.user,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    case 'LOGOUT':
      return {};
    case 'GET_LOCATION_SUCCESS':
      return {
        ...state,
        location: action.location,
      };
    case 'GET_LOCATION_FAILURE':
      return {
        ...state,
        location: '',
      };
    default:
      return state;
  }
};
