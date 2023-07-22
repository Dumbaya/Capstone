import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../../css/Recipe.css";




function RecipeUpdate(props) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);//데이터 여러개 그자체가 들어감

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    formData.append('likes', recipes.likes);
    formData.append('author', sessionStorage.getItem('username'));
  
    const formValues = Object.fromEntries(formData.entries());
    
    try {
      
      const response = await axios.post(
        `http://localhost:3002/recipesUpdate/${id}`,
        formValues
      );
      alert('게시물 수정 완료');
      // 서버 응답 처리
      console.log(response.data);
      if (response.data.success) {
        alert('게시물 수정 완료');
      } else {
        alert('게시물 수정 오류');
      }
      
    } catch (error) {
      console.error(error);
    }
    navigate('../Recipe/RecipeForm');
  };

  // id로 레시피 하나만 가져오는 유즈이펙트
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/recipes3/${id}`);
        setRecipes(response.data);
        console.log("asdf");
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [props.id]);

  return (
    <div className="recipe-input">
      <form className="input-form" onSubmit={handleSubmit}>
        레시피 수정
        <div className="input-contents">
          <div className="input-name">
            레시피 제목{id}
            <input type="text" name="name" defaultValue={recipes.name || ''}></input>
          </div>
          <div className="input-text">
            레시피 내용
            <input type="text" name="recipe_text" defaultValue={recipes.recipe_text || ''}></input>
          </div>
          <div className="input-text">
            레시피 내용

          </div>
          <div className="input-thumbnail">
            썸네일
            <input type="text" name="thumbnail" defaultValue={recipes.thumbnail || ''}></input>
          </div>
        </div>
        <button type="submit">수정</button>
      </form>

    </div>

  )
}

export default RecipeUpdate;