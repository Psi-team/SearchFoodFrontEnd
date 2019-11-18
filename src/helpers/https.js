import axios from 'axios';

/**
 * 請求失敗統一處理
 */
const errorHandle = (status, msg) => {
  switch (status) {
    //  400: 登入失敗，可能是帳號密碼錯誤
    case 400:
      console.log(status, msg);
      break;

    //  401: backend session 過期，轉到Login判斷
    case 401:
      console.log(status, msg);
      break;

    //  403: 權限不足
    case 403:
      console.log(status, msg);
      break;

    //  404: 請求失敗
    case 404:
      console.log(status, msg);
      break;

    default:
      console.log('resp沒有攔截到的錯誤', +msg);
  }
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
/**
 * 新增axios實例
 */
const instance = axios.create();

const { token } = JSON.parse(localStorage.getItem('user')) || {};

if (token) instance.defaults.headers.common['Authorization'] = ` Token ${token}`;

//  request攔截器
instance.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response攔截器
instance.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    const { response } = error;
    console.log(response);
    if (response) {
      // 成功發出請求且收到res，但有error
      errorHandle(response.status, response.data.error);
      return Promise.reject(error);
    } else {
      // 成功發出請求但未收到res
      if (!window.navigator.onLine) {
        console.log('網路出了點問題，請重新連線後刷新網頁');
      } else {
        // 可能是跨域，或程式問題
        return Promise.reject(error);
      }
    }
  }
);

export default (method, url, data = null) => {
  method = method.toLowerCase();
  if (method === 'post') {
    return instance.post(url, data);
  } else if (method === 'get') {
    return instance.get(url, { params: data });
  } else if (method === 'put') {
    return instance.put(url, data);
  } else if (method === 'delete') {
    return instance.delete(url, { params: data });
  } else {
    console.log('未知的method' + method);
    return false;
  }
};
