import React, { useState } from 'react';
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";

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
        localStorage.setItem('id',username);
        localStorage.setItem('loginState', true);
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
      </form>
    </div>
  );
};

export default Login;