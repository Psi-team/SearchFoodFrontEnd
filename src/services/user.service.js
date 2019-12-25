import {
  apiLogin,
  apiSignup,
  apiLogout,
  apiResetPassword,
} from '../helpers/apis';

export const userService = { login, logout, register, resetPassword };

function login(mail, passwd) {
  const browser = getUserBrowser();

  if (process.env.REACT_APP_ENV) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = { data: { username: 'test', token: 'adawrq31312eda' } };
        localStorage.setItem('user', JSON.stringify(user.data));
        if (mail !== 'admin' || passwd !== 'admin')
          return reject({ response: { data: { message: '帳號或密碼錯誤' } } });

        return resolve(user);
      }, 2000);
    });
  } else {
    return apiLogin({ mail, passwd, browser });
  }
}

function logout() {
  return apiLogout();
}

function register(mail, passwd, birthyear, sexual, username) {
  const browser = getUserBrowser();
  if (process.env.REACT_APP_ENV) {
    return new Promise(resolve => {
      setTimeout(() => {
        const user = { data: { username: username, token: '1232asddsfsvfa' } };
        localStorage.setItem('user', JSON.stringify(user.data));
        return resolve(user);
      }, 2000);
    });
  } else {
    return apiSignup({
      mail,
      passwd,
      birthyear,
      sexual,
      username,
      browser,
    });
  }
}

function resetPassword(email) {
  if (process.env.REACT_APP_ENV) {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve('');
      }, 2000);
    });
  } else {
    return apiResetPassword({ email });
  }
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
