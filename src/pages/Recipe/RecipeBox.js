import React, { useState } from "react";
import "../../css/Recipe.css";

function RecipeBox() {

    return (
        <div className="recipe-box">

            <div className="recipe-img">
                사진
            </div>
            <div className="recipe-title">
                제목
            </div>
            <div className="recipe-like">
                좋아요 별
            </div>
        </div>

    )
}

export default RecipeBox;