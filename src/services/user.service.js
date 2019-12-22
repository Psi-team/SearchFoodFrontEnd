import { apiLogin, apiSignup, apiLogout } from '../helpers/apis';

export const userService = { login, logout, register };

function login(username, passwd) {
  const browser = getUserBrowser();

  return apiLogin({ username, passwd, browser });
}

function logout() {
  return apiLogout();
}

function register(username, passwd, birthyear, sexual) {
  return apiSignup({ username, passwd, birthyear, sexual });
}

function getUserBrowser() {
  const sUsrAg = window.navigator.userAgent;
  if (sUsrAg.indexOf('Firefox') > -1) {
    return 'Firefox';
  } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
    return 'Samsung Internet';
  } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
    return 'Opera';
  } else if (sUsrAg.indexOf('Trident') > -1) {
    return 'Internet Explorer';
  } else if (sUsrAg.indexOf('Edge') > -1) {
    return 'Edge';
  } else if (sUsrAg.indexOf('Chrome') > -1) {
    return 'Chrome';
  } else if (sUsrAg.indexOf('Safari') > -1) {
    return 'Safari';
  } else {
    console.error('unknown browser');
    return 'unknown';
  }
}
