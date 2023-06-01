import React, { useState } from "react";
import axios from 'axios';
import "../../css/Recipe.css";


const Sample = () => {
  const [attachment, setAttachment] = useState();

  const onFileChange = (evt) => {
    // 업로드 된 file
    const files = evt.target.files;
    const theFile = files[0];

    // FileReader 생성
    const reader = new FileReader();

    // file 업로드가 완료되면 실행
    reader.onloadend = (finishedEvent) => {
      // 업로드한 이미지 URL 저장
      const result = finishedEvent.currentTarget.result;
      setAttachment(result);
    };
    // 파일 정보를 읽기
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  const onSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" accept="image/*" onChange={onFileChange} />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
      <input type="submit" value="Upload" />
    </form>
  );
};

function RecipeInput() {
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
    } catch (error) {
      console.error('폼 제출 오류', error);
    }
  };

  return (
    <div className="recipe-input">
      <form className="input-form" onSubmit={handleSubmit}>
        레시피 등록
        <div className="input-contents">
          <div className="input-name">
            레시피 제목
            <input type="text" name="name"></input>
          </div>
          <div className="input-text">
            레시피 내용
            <input type="text" name="recipe_text"></input>
          </div>
          <div className="input-text">
            레시피 내용
            <Sample />
          </div>
        </div>
        <button type="submit">등록</button>
      </form>

    </div>

  )
}

export default RecipeInput;