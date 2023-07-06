import React from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "../../css/BeforeSignin.css";

function BeforeSignin() {
    const loginState = sessionStorage.getItem('loginState');
    const username = sessionStorage.getItem('username');
    const navigate=useNavigate();
    function handleButtonClick(path){
        navigate(path);
    }

    return (
        <div className="Home">
            <div className="Mainlogo">
                <img className="logo" alt = "LOGO" src="img/image.png" />
            </div>
            <div className="welcome">
                <h1 id="first">CAPSTONE DISIGN</h1>
                <h1 id="second">My refrigerator manager</h1>
                <hr className="welcome_hr" />
                <h1 id="third">냉장고 파먹기</h1>
            </div>
            <div className="LoginButtondiv">
                <button className="LoginButton" onClick={() => handleButtonClick("../Login/LoginForm")}>Sign in</button>
            </div>
        </div>
    )
}

export default BeforeSignin;