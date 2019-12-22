import '@testing-library/jest-dom/extend-expect';

import { validator } from '../validator';

describe('test validator cases', () => {
  afterEach(() => (initState = {}));
  let initState = {};
  function validatorWrap() {
    validator(initState);
  }

  test('test login validator', () => {
    initState = { type: 'login', data: { username: '', password: '' } };
    expect(validatorWrap).toThrowError(/不得空白/);
    initState.data = { username: 'abc', password: '12231' };
    expect(validatorWrap).not.toThrow();
  });

  test('test register validator', () => {
    initState = {
      type: 'register',
      data: { email: '', passwd1: '', passwd2: '' },
    };
    expect(validatorWrap).toThrowError(/不得空白/);
    initState.data = { email: '123', passwd1: '123', passwd2: '1' };
    expect(validatorWrap).toThrowError(/帳號格式錯誤/);
    initState.data = { email: 'test@test.com', passwd1: '123', passwd2: '123' };
    expect(validatorWrap).toThrowError(/密碼長度/);
    initState.data = {
      email: 'test@test.com',
      passwd1: '123456',
      passwd2: '1234567',
    };
    expect(validatorWrap).toThrowError(/密碼不相同/);
    initState.data = {
      email: 'test@test.com',
      passwd1: '123456',
      passwd2: '123456',
    };
    expect(validatorWrap).not.toThrow();
  });

  test('test create store validator', () => {
    initState = { type: 'createStore', data: { tel: '' } };
    expect(validatorWrap).toThrowError(/不得空白/);
    initState = { type: 'createStore', data: { tel: '12345678' } };
    expect(validatorWrap).toThrowError(/電話只能輸入數字/);
    initState = { type: 'createStore', data: { tel: 1234 } };
    expect(validatorWrap).toThrowError(/電話長度/);
    initState = { type: 'createStore', data: { tel: 12345678 } };
    expect(validatorWrap).not.toThrow();
  });
});
