import React from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "../css/Home.css";

import ListForm from "./List/ListForm";
import Recipe from "./Recipe/RecipeForm";
import Board from "./Board/BoardForm";
import LoginForm from "./Login/LoginForm";

function Home() {
    const loginState = sessionStorage.getItem('loginState');
    const username = sessionStorage.getItem('username');
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
                { !loginState || !username ? <button onClick={() => handleButtonClick("/Login/LoginForm")}>로그인</button> 
                : <button onClick={handleLogout}>로그아웃</button> }              
            </div>
            <div className="main">
                <div className="main-img">
                    로고
                </div>
            </div>
            <nav>
                <button className="btn" onClick={() => handleButtonClick("/List/ListForm")}>냉장고</button>
                <button className="btn" onClick={() => handleButtonClick("/Recipe/RecipeForm")}>레시피</button>
                <button className="btn" onClick={() => handleButtonClick("/Board/BoardForm")}>게시판</button>
            </nav>
            <Routes>
                <Route path="/Login/LoginForm" element={<LoginForm />}></Route>
                <Route path="/Recipe/RecipeForm" element={<Recipe />}></Route>
                <Route path="/Board/BoardForm" element={<Board />}></Route>
                <Route path="/List/ListForm" element={<ListForm />}></Route>
            </Routes>
        </div>
    )
}

/*function Btns() {

    function test() {
        console.log("테스트용");
    }

    return (
        <div className="btns">
            <button className="btn" onClick={test}>로그인, 냉장고</button>
            <button className="btn">레시피</button>
            <button className="btn">게시판</button>
        </div>
    );
}*/

export default Home;