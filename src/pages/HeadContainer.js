import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import "../css/HeadContainer.css";

import ListForm from "./List/ListForm";
import Recipe from "./Recipe/RecipeForm";
import Board from "./Board/BoardForm";

function Head(){
    const navigate = useNavigate();

    function handleButtonClick(path){
        navigate(path);
    }

    function handleImageClick(){
        // 이미지를 클릭했을 때 홈 화면으로 이동
        navigate("/");
    };

    return(
        <div className="headall">
            <div className="firstheadLine">
                <img className="headlogo" alt = "LOGO" onClick={handleImageClick} src="../../../img/image.png" style={{ cursor: "pointer" }} />
                <button className="userinformationb">사용자 정보</button>
            </div>
            <div className="secondheadLine">
                <button className="headb" onClick={() => handleButtonClick("../List/ListForm")}>
                    <img className = "headbuttonimg" alt = "ref" src="../../../img/fridge.png" />냉장고 리스트
                </button>
                <button className="headb" onClick={() => handleButtonClick("../Recipe/RecipeForm")}>
                    <img className = "headbuttonimg" alt = "rec" src="../../../img/recipe.png" />레시피
                </button>
                <button className="headb" onClick={() => handleButtonClick("../Board/BoardForm")}>
                    <img className = "headbuttonimg" alt = "boa" src="../../../img/bulletin-board.png" />게시판
                </button>
                <Routes>
                    <Route path="./Recipe/RecipeForm" element={<Recipe />}></Route>
                    <Route path="./Board/BoardForm" element={<Board />}></Route>
                    <Route path="./List/ListForm" element={<ListForm />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default Head;