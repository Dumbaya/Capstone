import React, { useState } from "react";
import "../../css/Recipe.css";

function RecipeBox(props) {

    return (
        <div className="recipe-box">

            <div className="recipe-img">
                <img src={props.recipe.thumbnail} />
            </div>
            <div className="recipe-title">
                {props.recipe.name}
            </div>
            <div className="recipe-like">
                좋아요{props.recipe.likes}
            </div>
        </div>

    )
}

export default RecipeBox;