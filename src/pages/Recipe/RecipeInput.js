import React, { useState } from "react";
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

    return (
        <div className="recipe-input">
            레시피 등록
            <div className="input-contents">
                <div className="input-name">
                    레시피 제목
                    <input type="text"></input>
                </div>
                <div className="input-text">
                    레시피 내용
                    <input type="text"></input>
                </div>
                <div className="input-text">
                    레시피 내용
                    <Sample/>
                </div>

            </div>
        </div>

    )
}

export default RecipeInput;