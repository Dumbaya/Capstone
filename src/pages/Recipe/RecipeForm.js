import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";
import "../../css/Recipe.css";
import RecipeBox from "./RecipeBox.js"
import RecipeInput from "./RecipeInput.js"
import RecipePage from "./RecipePage.js"

function Recipe() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);//데이터 여러개 그자체가 들어감
    const navigate=useNavigate();

    const [isContentsOpen, setContentsOpen] = useState(0);
    const [isDeleteOpen, setDeleteOpen] = useState(0);
    const [isUpdateOpen, setUpdateOpen] = useState(0);
    
    
    const openContents=(id)=>{
        setContentsOpen(id);
    }

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function handleButtonClick(path){
        navigate(path);
    }

    //레시피 유즈이펙
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3002/recipes2');
                setRecipes(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const renderRecipes=()=>{//여기 지금 수정중 레시피박스 db에 있는거 출력용
        return recipes.map((recipedown) => (
            <button onClick={() => openContents(recipedown.id)}>
                <RecipeBox recipe={recipedown}/>
            </button>
            //<option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
        ));
    }

    const listOrContents = () => {
        if (isContentsOpen == 0) {
            return (
                <div className="recipe-contents">
                    <div className="recipe-category">
                        <button className="recipe-input-btn" onClick={() => handleButtonClick("/Recipe/Input")}>등록</button>
                        <Routes>
                            <Route path="/Recipe/Input" element={<RecipeInput />}></Route>
                        </Routes>
                    </div>
                    <div className="recipe-body">
                        {renderRecipes()}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="recipe-contents">
                    <RecipePage recipe={recipes.find(item => item.id == isContentsOpen)}/>
                </div>
            );
        }

    }


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
                {listOrContents()}


            </form>
        </div>

    )
}

export default Recipe;