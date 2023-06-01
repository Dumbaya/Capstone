import React from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "../../css/HomeleftComponent.css";

function BeforeSignin() {
    const loginState = sessionStorage.getItem('loginState');
    const username = sessionStorage.getItem('username');
    const navigate=useNavigate();
    function handleButtonClick(path){
        navigate(path);
    }

    return (
        <div className="LeftHome">
            <button className="LoginButton" onClick={() => handleButtonClick("../Login/LoginForm")}>로그인</button>
            BeforeSignin
        </div>
    )
}

export default BeforeSignin;