import { userService } from '../services';


export const userActions = {
  login
}

const LOGIN_REQUEST = 'LOGIN_REQUEST';

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    userService.login(username, password)
      .then(
        user => console.log(user),
        error => console.log(error)
      )
  }

  function request(user) { return { type: LOGIN_REQUEST, user } }
}
