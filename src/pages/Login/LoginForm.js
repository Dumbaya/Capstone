import React, { useState} from 'react';
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";
import firebase from 'firebase/app'
import 'firebase/auth'
import "../../css/Login.css";

import SignupForm from "./SignupForm"; 

const firebaseConfig = {
  apiKey: "AIzaSyCf7wOpt60WAQwg9BEFjeHzZq_6QYBfBoU",
  authDomain: "capstone-387105.firebaseapp.com",
  projectId: "capstone-387105",
  storageBucket: "capstone-387105.appspot.com",
  messagingSenderId: "774959781817",
  appId: "1:774959781817:web:3f1a4f8e9c11643850c868",
  measurementId: "G-4R22K2KVV4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
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

  const handleGoogleLogin = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      // 구글 로그인 팝업 띄우기     
      const { user } = await firebase.auth().signInWithPopup(provider);
      const username = user.displayName;
      const password = user.displayName;
      
      const response = await axios.post('http://localhost:3002/googlelogin',{
        username: username,
        password: password
      })

      // 사용자 정보 가져오기
      if (response.data.success) {
        sessionStorage.setItem('username',username);
        sessionStorage.setItem('loginState', true);
        alert('로그인 성공');
        window.location.href = 'http://localhost:3000/';
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      alert('로그인 실패');
      console.error('Error signing in with Google:', error);
    }
    
  };

  return (
    <div className='LoginForm'>
      <div className='title'>
        Sign in
      </div>
      <div className='Login'>
        <form onSubmit={handleSubmit}>
          <div className='Username'>
            <label><img className="Loginimg" alt = "LoginId" src="../../img/loginid.png" />&nbsp;</label>
            <input className='logininput' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='PassWord'>
            <label><img className="Loginimg" alt = "LoginId" src="../../img/loginPass.png" />&nbsp;</label>
            <input className='logininput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='Loginbutton' type="submit">로그인</button>
        </form>
        <div class="text-with-line">
          <span class="line-left"></span>
          <span class="text">OR</span>
          <span class="line-right"></span>
        </div>
        <div>
          <div className='Googlelogin'>
            <button className="Googleloginb" onClick={handleGoogleLogin}><img className="googleimg" alt = "googleicon" src="../../img/googleicon.png" />&nbsp;Sign in with Google</button>
          </div>
          <div className='register'>
            <button className='registerb' type="submit" onClick={() => handleButtonClick("/Login/SignupForm")}>Sign Up</button>
            <Routes>
              <Route path="/Login/SignupForm" element={<SignupForm />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;