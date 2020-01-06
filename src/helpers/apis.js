import req from './https';

// login
export const apiLogin = data => req('post', 'login', data);

// signup
export const apiSignup = data => req('post', 'signup', data);

// reset password
export const apiResetPassword = data => req('post', 'resetPassword', data);

// logout
export const apiLogout = () => req('post', 'logout');

// get store type
export const apiGetStoreType = () => req('get', 'getStoreTypes');

// create store
export const apiCreateStore = data => req('post', 'createStore', data);

// search store
export const apiGetStores = data => req('get', 'search', data);

// fetch single store
export const apiGetStore = data => req('get', 'storeDetail', data);

// leave message
export const apiLeaveMessage = data => req('post', 'createComment', data);

// get user profile
export const apiGetProfile = () => req('get', 'profile');
