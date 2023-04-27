import React, { useState } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";

import SignupForm from "./Login/SignupForm";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 서버에 로그인 요청을 보내고, 로그인 성공 여부를 처리합니다.
    console.log("username:", username, "password:", password);
    setUsername("");
    setPassword("");
  };

  const navigate=useNavigate();

  function handleButtonClick(path){
    navigate(path);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={ () => sessionStorage.setItem("username", username)}>Login</button>
      <button type="submit" onClick={() => handleButtonClick("/Login/SignupForm")}>sing up</button>

      <Routes>
        <Route path="/Login/SignupForm" element={<SignupForm />}></Route>
      </Routes>
    </form>
  );
}
export default LoginForm;