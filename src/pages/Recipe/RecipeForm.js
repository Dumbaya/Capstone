import React, { useState } from "react";
import "../../css/Recipe.css";

function Recipe() {
    const [query, setQuery] = useState("");

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
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
            <div className="recipe-category">
                카테고리
            </div>
            <div className="recipe-body">
                레시피 내용
            </div>
        </form>
    )
}

export default Recipe;