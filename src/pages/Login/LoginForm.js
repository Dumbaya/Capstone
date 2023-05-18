import React, { useState} from 'react';
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";
import { GoogleLogin} from 'react-google-login';

import SignupForm from "./SignupForm"; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const responseGoogle = (response) => {
    console.log(response);
    setAccessToken(response.accessToken);
    if(response.accessToken){
      sessionStorage.setItem('loginState', true);
      window.location.href = 'http://localhost:3000/';
      alert('성공');
    }
  }

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">로그인</button>
      </form>
      <form>
        <button type="submit" onClick={() => handleButtonClick("/Login/SignupForm")}>회원가입</button>
        <Routes>
            <Route path="/Login/SignupForm" element={<SignupForm />}></Route>
        </Routes>
        {accessToken ? (
          <p>로그인 성공!</p>
          ) : (
          <GoogleLogin
            clientId="774959781817-j2df940qcjig49lseldpi3shq2171d5a.apps.googleusercontent.com"
            buttonText="Google 계정으로 로그인"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          )} 
      </form>
    </div>
  );
};

export default Login;