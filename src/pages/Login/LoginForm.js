import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/login', {
        username: username,
        password: password
      });
      if (response.data.success) {
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
    </div>
  );
};

export default Login;