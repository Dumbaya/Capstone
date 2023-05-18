import React, { useState} from 'react';
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import "../../css/Login.css";

import SignupForm from "./SignupForm"; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
            <React.Fragment>
              <GoogleOAuthProvider clientId='774959781817-j2df940qcjig49lseldpi3shq2171d5a.apps.googleusercontent.com'>
                <GoogleLogin
                buttonText="Google Login"
                onSuccess={(credentialResponse)=>{
                  window.location.href = 'http://localhost:3000/';
                  sessionStorage.setItem('loginState', true);
                }}
                onError={()=>{
                  alert('실패')
                }}
                />
              </GoogleOAuthProvider>
            </React.Fragment>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;