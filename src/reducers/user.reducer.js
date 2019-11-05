const userInfo = JSON.parse(localStorage.getItem('user'));

const initState = userInfo ? { loggedIn: true, ...userInfo } : {};

export const user = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        loading: true
      };
    case 'LOGIN_SUCCESS':
      return {
        ...action.user
      };
    case 'LOGIN_FAILURE':
      return {
        error: action.error
      }
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}