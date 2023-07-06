import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import "../../css/Recipe.css";
import RecipeUpdate from "./RecipeUpdate.js"


function RecipePage(props) {
    const recipe_DB=props.recipe;
    const navigate=useNavigate();

    const closeContents=props.closeContents;


    const handleDelete = () => {
        axios.delete(`http://localhost:3002/recipesDelete/${recipe_DB.id}`)
            .then(response => {
                navigate('Recipe/RecipeForm');
                console.log('게시물이 삭제되었습니다.');
            })
            .catch(error => {
                console.error('게시물 삭제에 실패했습니다:', error);
            });
    };

    function handleButtonClick() {
        navigate(`/Recipe/Update?id=${recipe_DB.id}`);
    }


    return (
        <div className="recipe-page">
            <div>
                제목 : {recipe_DB.name}
            </div>
            <div>
                사진 : {recipe_DB.thumbnail}
            </div>
            <div>
                내용 : {recipe_DB.recipe_text}
            </div>
            <div>
                작성자 : {recipe_DB.author}
            </div>
            <div>
                좋아요 : {recipe_DB.likes}
            </div>
            <div>
                <button onClick={handleDelete}>삭제</button>
                <button onClick={() => handleButtonClick("/Recipe/Update")}>수정{recipe_DB.id}</button>
                <Routes>
                    <Route path="/Recipe/Update" element={<RecipeUpdate id={recipe_DB.id} />} />
                </Routes>
                <button onClick={closeContents}>뒤로</button>

            </div>
        </div>

    )
}

export default RecipePage;