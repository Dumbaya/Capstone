import React from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "../../css/HomerightComponent.css";

import ListForm from "../List/ListForm";
import Recipe from "../Recipe/RecipeForm";
import Board from "../Board/BoardForm";
import LoginForm from "../Login/LoginForm";

function RightComponent() {
    const loginState = sessionStorage.getItem('loginState');
    //const username = sessionStorage.getItem('username');
    const navigate=useNavigate();

    function handleButtonClick(path){
        navigate(path);
    }

    const handleLogout = () =>{
        sessionStorage.clear();
        alert("로그아웃 되었습니다.");
        window.location.href = 'http://localhost:3000/'; 
    }

    return (
        <div className="Home">
            <div>
                { !loginState ? <button className="LoginButton" onClick={() => handleButtonClick("../Login/LoginForm")}>로그인</button> 
                : <button className="LoginButton" onClick={handleLogout}>로그아웃</button> }              
            </div>
            <div className="MainButtons">
                <button className="btn" onClick={() => handleButtonClick("../List/ListForm")}>냉장고</button>
                <button className="btn" onClick={() => handleButtonClick("../Recipe/RecipeForm")}>레시피</button>
                <button className="btn" onClick={() => handleButtonClick("../Board/BoardForm")}>게시판</button>
                <Routes>
                    <Route path="../Login/LoginForm" element={<LoginForm />}></Route>
                    <Route path="../Recipe/RecipeForm" element={<Recipe />}></Route>
                    <Route path="../Board/BoardForm" element={<Board />}></Route>
                    <Route path="../List/ListForm" element={<ListForm />}></Route>
                </Routes>
            </div>   
        </div>
    )
}

export default RightComponent;