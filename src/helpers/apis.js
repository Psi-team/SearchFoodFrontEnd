import req from './https';

// login
export const apiLogin = data => req({ method: 'post', url: 'login', data });

// signup
export const apiSignup = data => req({ method: 'post', url: 'signup', data });

// reset password
export const apiResetPassword = data =>
  req({ method: 'post', url: 'resetPassword', data });

// logout
export const apiLogout = () => req({ method: 'post', url: 'logout' });

// get store type
export const apiGetStoreType = () =>
  req({ method: 'get', url: 'getStoreTypes' });

// create store
export const apiCreateStore = data =>
  req({ method: 'post', url: 'createStore', data });

// search store
export const apiGetStores = data => req({ method: 'get', url: 'search', data });

// fetch single store
export const apiGetStore = data =>
  req({ method: 'get', url: 'storeDetail', data });

// leave message
export const apiLeaveMessage = data =>
  req({ method: 'post', url: 'createComment', data });

// get user profile
export const apiGetProfile = () => req({ method: 'get', url: 'profile' });
