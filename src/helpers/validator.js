class ValueError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

const loginHandler = {
  set: (obj, prop, value) => {
    if (value === '') {
      throw new ValueError('帳號或密碼不得空白');
    }

    obj[prop] = value;
    return true;
  },
};

const registerHandler = {
  set: (obj, prop, value) => {
    if (value === '') {
      throw new ValueError('帳號或密碼不得空白');
    } else if (prop === 'email' && !/@/.test(value)) {
      throw new ValueError('帳號格式錯誤');
    } else if (prop === 'passwd1' && !(value.length >= 6 && value.length <= 10)) {
      throw new ValueError('密碼長度為6~10');
    } else if (prop === 'passwd2' && value !== obj['passwd1']) {
      throw new ValueError('兩次密碼不相同，請再次確認');
    }

    obj[prop] = value;
    return true;
  },
};

const createStoreHandler = {
  set: (obj, prop, value) => {
    if (value === '') {
      throw new ValueError('欄位不得空白');
    } else if (prop === 'tel' && typeof value !== 'number') {
      throw new TypeError('電話只能輸入數字');
    } else if (prop === 'tel' && !(value.toString().length === 8 || value.toString().length === 10)) {
      throw new ValueError('電話長度應為八碼或十碼，請再次確認');
    }

    obj[prop] = value;
    return true;
  },
};

const HANDLERENUMERATION = Object.freeze({
  login: loginHandler,
  register: registerHandler,
  createStore: createStoreHandler,
});

export const validator = ({ type, data }) => {
  const proxy = new Proxy({}, HANDLERENUMERATION[type]);
  for (const [key, value] of Object.entries(data)) {
    proxy[key] = value;
  }
};
