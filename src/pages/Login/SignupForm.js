import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3002/signup', {
        username: username,
        password: password,
        email: email
      });

      if (response.status === 200) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = 'http://localhost:3000/Login/LoginForm';
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('오류로 인해 회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <button type="button" onClick={handleSignup}>회원가입</button>
    </form>
  );
}

export default SignUpForm;