import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FreeBoardUpdateForm() {
    const { id } = useParams();
    const [freeboard, setfreeboard] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const author = sessionStorage.getItem('username');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.post(`http://localhost:3002/freeBoard/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    if (!freeboard) {
        return <div>Loading...{`${id}`}</div>;
    }

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('content', content);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        try {
            const response = await axios.post('http://localhost:3002/freeboardUpdate', formData);
            console.log(response.data);
            if (response.data.success) {
                window.location.href = `http://localhost:3000/freeBoardReadForm/${id}`;
                alert('게시물 작성 완료');
            } else {
                alert('게시물 작성 오류');
            }
        } catch (error) {
            console.error(error);
            alert('게시물 작성 오류');
        }
    };

    return (
        <div>
            <form>
                <div>
                    <label>제목</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>내용</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
                </div>
                <div>
                    <label>이미지</label>
                    <input type="file" multiple onChange={handleImageChange}/>
                </div>
                <button type="submit">글 작성</button>
            </form>
        </div>
    );
}

export default FreeBoardUpdateForm;