import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";
import "../../css/Recipe.css";
import RecipeBox from "./RecipeBox.js"
import RecipeInput from "./RecipeInput.js"
import RecipePage from "./RecipePage.js"
import RecipeUpdate from "./RecipeUpdate.js"

import Head from '../HeadContainer';

function Recipe() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);//데이터 여러개 그자체가 들어감
    const navigate=useNavigate();

    const [isInputOpen, setInputOpen] = useState(0);
    const [isContentsOpen, setContentsOpen] = useState(0);//값이 id면 그것의 내용 출력
    const [isDeleteOpen, setDeleteOpen] = useState(0);//
    const [isUpdateOpen, setUpdateOpen] = useState(0);//값이 id면 그것의 수정창 출력
    

    //등록오픈
    const openInput=()=>{
        setInputOpen(1);
        setContentsOpen(0);
        setUpdateOpen(0);
    }
    const closeInput=()=>{
        setInputOpen(0);
        setContentsOpen(0);
        setUpdateOpen(0);
    }
    //콘텐츠오픈
    const openContents=(id)=>{
        setInputOpen(0);
        setContentsOpen(id);
        setUpdateOpen(0);
    }
    const closeContents=()=>{
        setInputOpen(0);
        setContentsOpen(0);
        setUpdateOpen(0);
    }

    //수정오픈
    const openUpdate=(id)=>{
        setInputOpen(0);
        setContentsOpen(0);
        setUpdateOpen(id);
    }
    const closeUpdate=()=>{
        setInputOpen(0);
        setContentsOpen(0);
        setUpdateOpen(0);
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
                <RecipeBox recipe={recipedown} closeContents={closeContents}/>
            </button>
        ));
    }

    const listOrContents = () => {
        if (isContentsOpen != 0) {//컨텐츠의 내용
            return(//contents
                <div className="recipe-contents">
                    <RecipePage recipe={recipes.find(item => item.id == isContentsOpen)}/>
                </div>
            );
        }
        else if (isInputOpen !=0) {// 레시피 등록
            return(
                <RecipeInput/>
            );
        }
        else if (isUpdateOpen != 0) {// 레시피 수정
            return(
                <RecipeUpdate openUpdate={openUpdate(isContentsOpen)} />
            );
        }
        else{//리스트출력
            return (//list
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
    }


    return (
        <div className="recipe_container">
            <Head/>
            <form className="recipe">
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