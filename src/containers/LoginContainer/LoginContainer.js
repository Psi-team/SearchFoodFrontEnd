import React, { useReducer } from 'react';

import Form from '../../components/Form';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

import AccountData from './account.json';

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

const initState = {
  username: '',
  password: '',
  error: ''
};

const LoginContainer = (props) => {
  const [state, setState] = useReducer(reducer, initState);
  const handleChange = e => setState({ [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const { username: currentUn, passwd: currentPw } = AccountData;
    const { username, password } = state;
    if (currentUn === username && currentPw === password) {
      props.signin();
      setState({ 'error': '' });
      props.history.push('/');
    }
    else
      setState({ 'error': '13' });
  };

  return (
    <>
      <Form
        error={state.error}
        errorMsg='帳號或密碼錯誤'
        validFunc={handleSubmit}
      >
        <h1>登入</h1>
        <InputField
          displayName='帳號'
          name='username'
          handleChange={handleChange}
          value={state.username}
          placeholder='請輸入帳號'
          required={true}
          style={{
            width: '200px',
            margin: '20px 50px'
          }}
        />
        <InputField
          displayName='密碼'
          name='password'
          handleChange={handleChange}
          value={state.password}
          required={true}
          placeholder='請輸入密碼'
          style={{
            width: '200px',
            margin: '20px 50px'
          }}
        />
        <div>
          <Button
            type='submit'
            displayName='Login'
          />
          <Button
            displayName='Sign up'
          />
        </div>
      </Form>
    </>
  );
};

export default LoginContainer;