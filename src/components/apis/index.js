import req from './https';

export const apiLogin = () => req('get', 'account');