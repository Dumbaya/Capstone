import React, { useState } from "react";
import "../../css/Recipe.css";

function RecipePage(props) {
    const recipe_DB=props.recipe;
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
                <button>삭제</button>
                <button>수정</button>
            </div>
        </div>

    )
}

export default RecipePage;