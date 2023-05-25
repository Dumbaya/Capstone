import React, { useState } from "react";
import axios from 'axios';
import "../../css/BoardWrite.css";

function BoardWriteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const author = sessionStorage.getItem('username');
  
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
  
    const handleImageChange = (e) => {
        setImages(e.target.files);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('content', content);
        for(let i=0; i<images.length;i++){
            formData.append('images', images[i]);
        }
        try {
            const response = await axios.post('http://localhost:3002/freeboardwrite', formData);
            console.log(response.data);
            alert('게시물 작성 완료');
        } catch (error) {
            console.error(error);
            alert('게시물 작성 오류');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <textarea value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>내용</label>
                    <textarea value={content} onChange={handleContentChange} />
                </div>
                <div>
                    <label>이미지</label>
                    <input type="file" multiple onChange={handleImageChange} />
                </div>
                <button type="submit">글 작성</button>
            </form>
        </div>
    );
}

export default BoardWriteForm;