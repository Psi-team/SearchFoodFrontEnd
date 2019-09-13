import React, { useReducer } from 'react';

import Form from '../../components/Form';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { LOGINAPIURL } from '../../constants/Url';

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
    const { username, password } = state;
    const data = { 
        username: username, 
        password: password 
    }; 

    fetch(LOGINAPIURL, {
      method: 'POST',
      body:JSON.stringify(data),  
      //不確定這行用意
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }).then(res => {
      console.log('成功訊息', res);
      return res.json();
    }).catch(err => {
      console.log('失敗訊息', err);
      setState({ 'error': '13' });
    }).then(data => {
      // const { token, username } = data;
      // localStorage.setItem('token', token);
      // localStorage.setItem('username', username);
      console.log('回傳資料須有token, username:', data);
      props.signin();
      setState({ 'error': '' });
      props.history.push('/');
    });

    console.log('request is', {
      method: 'POST',
      username: username,
      passwd: password,
      //不確定這行用意
      header: {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    });
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
