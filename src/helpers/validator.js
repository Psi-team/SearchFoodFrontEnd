class ValueError extends Error {
  constructor(message) {
    super(message);
    this.message = message
  }
}

const loginHandler = {
  set: (obj, prop, value) => {
    console.log(value);
    if (value === '') {
      throw new ValueError('帳號或密碼不得空白');
    }

    obj[prop] = value;
    return true;
  }
}

const registerHandler = {
  set: (obj, prop, value) => {
    if (value === '')
      throw new ValueError('帳號或密碼不得空白');
    else if (prop === 'email' && !/@/.test(value))
      throw new ValueError('帳號需有@');
    else if (prop === 'passwd1' && !(6 <= value.length <= 10))
      throw new ValueError('密碼長度為6~10');
    else if (prop === 'passwd2' && value !== obj['passwd1'])
      throw new ValueError('兩次密碼不相同，請再次確認');

    obj[prop] = value;
    return true;
  }
}

const HANDLERENUMERATION = Object.freeze({
  login: loginHandler,
  register: registerHandler
});

export const validator = ({ type, data }) => {
  const proxy = new Proxy({}, HANDLERENUMERATION[type]);
  for (const [key, value] of Object.entries(data)) {
    proxy[key] = value;
  }
}
