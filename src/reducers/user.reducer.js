const user = JSON.parse(localStorage.getItem('user'));

const initState = user ? { loggedIn: true, user: user } : {};

export const authentication = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        loading: true
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.user,
        loading: false
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