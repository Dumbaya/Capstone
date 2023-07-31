import React, { useState, useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "../../css/AfterSignin.css";

import ListForm from "../List/ListForm";
import Recipe from "../Recipe/RecipeForm";
import Board from "../Board/BoardForm";

function AfterSignin() {
    const loginState = sessionStorage.getItem('loginState');

    const handleLogout = () =>{
        sessionStorage.clear();
        alert("로그아웃 되었습니다.");
        window.location.href = 'http://localhost:3000/';
    }

    const navigate=useNavigate();

    function handleButtonClick(path){
        navigate(path);
    }

    return (
        <div className="AfterSigninform">
            <div className="Mainlogo">
                <img className="logo" alt = "LOGO" src="img/image.png" />
                <button className="Logoutbutton" onClick={handleLogout}>로그아웃</button>
            </div>
            <div className="welcome">
                <h1 id="first">CAPSTONE DISIGN</h1>
                <h1 id="second">My refrigerator manager</h1>
                <hr className="welcome_hr" />
                <h1 id="third">냉장고 파먹기</h1>
            </div>
            <div className="Homebutton">
                <button onClick={() => handleButtonClick("../List/ListForm")}>
                    <img className = "buttonimg" alt = "ref" src="img/fridge.png" />냉장고 리스트
                </button>
                <button onClick={() => handleButtonClick("../Recipe/RecipeForm")}>
                    <img className = "buttonimg" alt = "rec" src="img/recipe.png" />레시피
                </button>
                <button onClick={() => handleButtonClick("../Board/BoardForm")}>
                    <img className = "buttonimg" alt = "boa" src="img/bulletin-board.png" />게시판
                </button>
                <Routes>
                    <Route path="../Recipe/RecipeForm" element={<Recipe />}></Route>
                    <Route path="../Board/BoardForm" element={<Board />}></Route>
                    <Route path="../List/ListForm" element={<ListForm />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default AfterSignin;