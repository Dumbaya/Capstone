import React, { useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/app'
import 'firebase/auth'
import "../../css/Signup.css";

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

      if (response.ok) {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');       
      } else {
        alert('회원가입이 완료되었습니다.');
        window.location.href = 'http://localhost:3000/Login/LoginForm';
      }
    } catch (error) {
      console.error(error);
      alert('이미 가입된 계정입니다.');
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const { user } = await firebase.auth().signInWithPopup(provider);
      const username = user.displayName;
      const password = user.displayName;
      const email = user.email;
  
      const response = await axios.post('http://localhost:3002/signup/google', {
        username: username,
        password: password,
        email: email
      });
  
      if (response.ok) {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      } else {
        alert('회원가입이 완료되었습니다.');
        window.location.href = 'http://localhost:3000/Login/LoginForm';
      }
    } catch (error) {
      console.error(error);
      alert('이미 가입된 계정입니다.');
    }
  };

  return (
    <div className='SignupForm'>
      <div className='Signup'>
        <div className='Username'>
          <label>
            Username:&nbsp;
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div className='PassWord'>
          <label>
            Password:&nbsp;
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <div className='Email'>
          <label>
            Email:&nbsp;
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
        </div>
        <div className='RegisterButton'>
          <button type="button" onClick={handleSignup}>회원가입</button>
        </div> 
      </div>
      <button onClick={handleGoogleSignup}>구글 로그인으로 회원가입</button>
    </div>
  );
}

export default SignUpForm;