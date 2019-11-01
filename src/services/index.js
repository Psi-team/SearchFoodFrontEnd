export const userService = { login, logout };

const getUserBrowser = () => {
  const sUsrAg = window.navigator.userAgent;
  if (sUsrAg.indexOf('Firefox') > -1) {
    return 'Firefox';
  } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    return 'Samsung Internet';
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    return 'Opera';
  } else if (sUsrAg.indexOf("Trident") > -1) {
    return 'Internet Explorer'
  } else if (sUsrAg.indexOf("Edge") > -1) {
    return 'Edge'
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    return 'Chrome';
  } else if (sUsrAg.indexOf("Safari") > -1) {
    return 'Safari';
  } else {
    console.error('unknown browser');
    return 'unknown';
  }
};

function login(username, passwd) {
  const browser = getUserBrowser();
  const requestOptions = {
    method: 'POST',
    header: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify({ username, passwd, browser })
  };

  if (process.env.REACT_APP_ENV) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = { username: 'test', token: 'adawrq31312eda' };
        localStorage.setItem('user', JSON.stringify(user));
        if (username !== 'admin' || passwd !== 'admin')
          return reject('username or password is wrong');

        return resolve(user);
      }, 2000);
    });
  } else
    return fetch(`${process.env.REACT_APP_API_URL}login`, requestOptions)
      .then(handleResponse)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      });
}

function logout() {
  const requestOptions = {
    method: 'POST',
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': " Token " + localStorage.getItem('Token')
    }
  };
  if (!process.env.REACT_APP_ENV) {
    return fetch(`${process.env.REACT_APP_API_URL}logout`, requestOptions)
      .then(res => {
        return res;
      });
  }
  // remove user from local storage to log user out
  localStorage.removeItem('user');

}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
