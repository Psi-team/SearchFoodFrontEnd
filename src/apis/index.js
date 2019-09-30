import req from './https';

// login method should be post
export const apiLogin = () => req('get', 'login');

export const apiSignup = data => req('post', 'signup', data);

// logout method should be post
export const apiLogout = data => req('get', 'logout', data);