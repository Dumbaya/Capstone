import React, { useState } from "react";
import "../../css/Recipe.css";
import RecipeBox from "./RecipeBox.js"

function Recipe() {
    const [query, setQuery] = useState("");

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="recipe_container">
            <form className="recipe">
                <div className="recipe-logo">
                    로고
                </div>
                <div className="recipe-search" onSubmit={handleSubmit}>
                    <label>
                        <input type="text" value={query} onChange={handleQueryChange} />
                    </label>
                    <button type="submit">검색</button>
                </div>
                <div className="recipe-contents">
                    <div className="recipe-category">
                        카테고리
                    </div>
                    <div className="recipe-body">
                        <RecipeBox />
                        <RecipeBox />
                        <RecipeBox />
                        <RecipeBox />
                        <RecipeBox />
                        <RecipeBox />
                        <RecipeBox />

                    </div>
                </div>


            </form>
        </div>

    )
}

export default Recipe;