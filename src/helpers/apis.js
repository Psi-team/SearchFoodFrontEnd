import req from './https';

// login method should be post
export const apiLogin = data => req('post', 'login', data);

export const apiSignup = data => req('post', 'signup', data);

// logout method should be post
export const apiLogout = data => req('post', 'logout', data);

// get store type
export const apiGetStoreType = () => req('get', 'getStoreTypes');

// create store
export const apiCreateStore = data => req('post', 'createStore', data);
