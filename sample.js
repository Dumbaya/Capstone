import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/login', { username: 'johndoe', password: 'password' })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    axios.post('/logout')
      .then((response) => {
        if (response.data.success) {
          localStorage.removeItem('isLoggedIn');
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>로그인 성공</h1>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input type="text" name="username" />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" />
            </div>
            <button type="submit">로그인</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
