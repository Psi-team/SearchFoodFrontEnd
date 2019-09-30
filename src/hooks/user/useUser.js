import { useState, useReducer } from 'react';

import { useUserContext } from '../../utils/UserContext';
import { apiLogin, apiSignup, apiLogout } from '../../apis';

const getUserBrowser = () => {
  const sUsrAg = window.navigator.userAgent;
  if (sUsrAg.indexOf('Firefox') > -1) {
    return 'Mozilla Firefox';
  } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    return 'Samsung Internet';
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    return 'Opera';
  } else if (sUsrAg.indexOf("Trident") > -1) {
    return 'Microsoft Internet Explorer'
  } else if (sUsrAg.indexOf("Edge") > -1) {
    return 'Microsoft Edge'
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    return 'Google Chrome or Chromium';
  } else if (sUsrAg.indexOf("Safari") > -1) {
    return 'Apple Safari';
  } else {
    console.error('unknown browser');
    return 'unknown';
  }
}

const loginInitState = {
  email: '',
  passwd: '',
  error: ''
};

const registerInitState = {
  email: '',
  passwd1: '',
  passwd2: '',
  birthYear: (new Date().getFullYear() - 1),
  sex: 0,
  error: ''
};

const reducer = (prevState, updateProp) => ({
  ...prevState,
  ...updateProp
});

const useUser = (history) => {
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useReducer(reducer, loginInitState);
  const [registerState, setRegisterState] = useReducer(reducer, registerInitState);

  const { user, setUser } = useUserContext();
  // login
  const login = e => {
    setLoading(true);
    const browserName = getUserBrowser();
    const data = {
      username: loginState.email,
      passwd: loginState.password,
      browser: browserName
    };
    apiLogin(data)
      .then(res => {
        setLoading(false);
        setUser({ ...res.data });
        console.log(res.data);
        history.push('/');
      }, err => {
        setLoading(false);
        setLoginState({ error: '伺服器沒有回應，請稍後在試' });
        console.log(err); // Error!
      });
  };

  // register
  const register = () => {
    const data = {
      username: registerState.email,
      passwd: registerState.passwd1,
      birthyear: registerState.birthYear.toString(),
      sex: Number(registerState.sex)
    };
    setLoading(true);
    apiSignup(data)
      .then(res => {
        setLoading(false);
        console.log(res);
        setUser({ ...res.data });
        history.push('/');
      }, err => {
        setLoading(false);
        setRegisterState({ error: '伺服器沒有回應，請稍後在試' });
        console.log(err); // Error!
      });
  };

  // logout
  const logout = () => {
    apiLogout(user.token)
      .then(res => {
        console.log(res);
        setUser(null);
        window.location.assign('/');
      });
  };

  return {
    loginState,
    setLoginState,
    registerState,
    setRegisterState,
    loading,
    login,
    register,
    logout
  };
}

export default useUser;