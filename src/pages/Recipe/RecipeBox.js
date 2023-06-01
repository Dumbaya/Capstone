import React, { useState } from "react";
import "../../css/Recipe.css";

function RecipeBox(props) {
    const recipe_DB=props.recipe;

    return (
        <div className="recipe-box">

            <div className="recipe-img">
                <img src={recipe_DB.thumbnail} />
            </div>
            <div className="recipe-title">
                {recipe_DB.name}
            </div>
            <div className="recipe-like">
                좋아요{recipe_DB.likes}
            </div>
        </div>

    )
}

export default RecipeBox;