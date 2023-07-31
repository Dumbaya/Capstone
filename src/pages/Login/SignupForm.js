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

      if (response.data.success) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = 'http://localhost:3000/Login/LoginForm';          
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');    
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
  
      if (response.data.success) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = 'http://localhost:3000/Login/LoginForm';     
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('이미 가입된 계정입니다.');
    }
  };

  return (
    <div className='SignupForm'>
      <div className='title'>
        Sign Up
      </div>
      <div className='Signup'>
        <div className='Username'>
          <label>
            <img className="Signupimg" alt = "LoginId" src="../../img/loginid.png" />&nbsp;
            <input className='signupinput' typetype="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div className='PassWord'>
          <label>
          <img className="Signupimg" alt = "LoginId" src="../../img/loginPass.png" />&nbsp;
            <input className='signupinput' type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <div className='Email'>
          <label>
            <img className="Signupimg" alt = "LoginId" src="../../img/signupemail.png" />&nbsp;
            <input className='signupinput' type="text" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <button className='RegisterButton' type="button" onClick={handleSignup}>Sign Up</button>
        </div>
        <div class="text-with-line">
          <span class="line-left"></span>
          <span class="text">OR</span>
          <span class="line-right"></span>
        </div>
        <button className='googleSignupb' onClick={handleGoogleSignup}><img className="googleimg" alt = "googleicon" src="../../img/googleicon.png" />&nbsp;Sign Up with Google</button>
      </div>
    </div>
  );
}

export default SignUpForm;