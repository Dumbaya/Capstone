import React from "react";
import "../../css/HomeleftComponent.css";

function AfterSignin() {
    const loginState = sessionStorage.getItem('loginState');
    const handleLogout = () =>{
        sessionStorage.clear();
        alert("로그아웃 되었습니다.");
        window.location.href = 'http://localhost:3000/'; 
    }

    return (
        <div className="LeftHome">
            <button className="LoginButton" onClick={handleLogout}>로그아웃</button>
            AfterSignin
        </div>
    )
}

export default AfterSignin;