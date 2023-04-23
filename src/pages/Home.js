import React from "react";
import {Routes, Route, Link} from "react-router-dom";

import List from "./List";
import Recipe from "./Recipe";
import Board from "./Board";

function Home() {
    return (
        <div className="Home">
            <div className="main">
                <div className="main-img">
                    로고
                </div>
            </div>
            <nav>
                <Link to="/List"><button className="btn">로그인, 냉장고</button></Link>
                <Link to="/Recipe"><button className="btn">레시피</button></Link>
                <Link to="/Board"><button className="btn">게시판</button></Link>
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