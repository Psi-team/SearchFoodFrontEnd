const user = JSON.parse(localStorage.getItem('user'));

const initState = user ? { loggedIn: true, user: user } : {};

export const authentication = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        loading: true
      };
    case 'REGISTER_REQUEST':
      return {
        loading: true
      }
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        user: action.user
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        error: action.error
      }
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}