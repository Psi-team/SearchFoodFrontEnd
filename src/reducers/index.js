const user = JSON.parse(localStorage.getItem('user'));

const initState = user ? { loggedIn: true, user: user } : {};

export default function authentication(state = initState, action) {
  console.log(state, action);
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        logginIn: true,
        user: action.user
      };
    case 'LOGIN_FAILURE':
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}