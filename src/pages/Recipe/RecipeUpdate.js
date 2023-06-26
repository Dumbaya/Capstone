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


    formData.append('likes', 0);
    formData.append('author', sessionStorage.getItem('username'));
    formData.append('thumbnail', "asdf");

    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        'http://localhost:3002/recipes',
        formValues
      );

      // 서버 응답 처리
      if (response.status === 200) {
        alert('등록 성공');
      } else {
        alert('등록 실패');
      }
      navigate('../Recipe/RecipeForm');
    } catch (error) {
      console.error('폼 제출 오류', error);
    }
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
            <input type="text" name="name" value={recipes.name || ''}></input>
          </div>
          <div className="input-text">
            레시피 내용
            <input type="text" name="recipe_text"></input>
          </div>
          <div className="input-text">
            레시피 내용

          </div>
        </div>
        <button type="submit">등록</button>
      </form>

    </div>

  )
}

export default RecipeUpdate;