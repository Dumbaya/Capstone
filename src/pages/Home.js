import React from "react";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import "../css/Home.css";

import List from "./List";
import Recipe from "./Recipe";
import Board from "./Board";

function Home() {

    const navigate=useNavigate();

    function handleButtonClick(path){
        navigate(path);
    }

    return (
        <div className="Home">
            <div className="main">
                <div className="main-img">
                    로고
                </div>
            </div>
            <nav>
                <button className="btn" onClick={() => handleButtonClick("/List")}>로그인,냉장고</button>
                <button className="btn" onClick={() => handleButtonClick("/Recipe")}>레시피</button>
                <button className="btn" onClick={() => handleButtonClick("/Board")}>게시판</button>
            </nav>
            <Routes>
                <Route path="/List" element={<List />}></Route>
                <Route path="/Recipe" element={<Recipe />}></Route>
                <Route path="/Board" element={<Board />}></Route>
            </Routes>
        </div>
    )
}

function Btns() {

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
}

export default Home;