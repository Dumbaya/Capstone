import React, { useState} from 'react';
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";
import { GoogleLogin} from 'react-google-login';
import GoogleLoginButton from './GoogleLoginButton';
import "../../css/Login.css";

import SignupForm from "./SignupForm"; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleGoogleLoginSuccess = (response) => {
    // Google 로그인 성공 시 처리할 로직을 작성하세요.
    alert('Google 로그인 성공:');
    // 세션 유지 등의 로직을 추가하세요.
  };

  const handleGoogleLoginFailure = (error) => {
    // Google 로그인 실패 시 처리할 로직을 작성하세요.
    alert('Google 로그인 실패:');
  };

  const navigate=useNavigate();

  function handleButtonClick(path){
      navigate(path);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/login', {
        username: username,
        password: password
      });
      if (response.data.success) {
        sessionStorage.setItem('username',username);
        sessionStorage.setItem('loginState', true);
        alert('로그인 성공');
        window.location.href = 'http://localhost:3000/';
      } else {
        alert('로그인 실패');
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  return (
    <div className='LoginForm'>
      <div className='Login'>
        <form onSubmit={handleSubmit}>
          <div className='Username'>
            <label>Username:&nbsp;</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='PassWord'>
            <label>Password:&nbsp;</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='LoginButton' type="submit">로그인</button>
        </form>
        <form>
          <div className='register'>
            <button type="submit" onClick={() => handleButtonClick("/Login/SignupForm")}>회원가입</button>
            <Routes>
              <Route path="/Login/SignupForm" element={<SignupForm />}></Route>
            </Routes>
          </div>
          <div className='google-login'>
            {accessToken ? (
              <p>로그인 성공!</p>
              ) : (
                <GoogleLoginButton
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
              />
            )} 
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;