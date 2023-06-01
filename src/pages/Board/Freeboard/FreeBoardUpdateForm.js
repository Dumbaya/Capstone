import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function FreeBoardUpdateForm() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const author = sessionStorage.getItem('username');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/freeBoard/${id}`);
                const {title, content} = response.data;
                setTitle(title);
                setContent(content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    if (!title) {
        return <div>Loading...{`${id}`}</div>;
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleUpdate = async (e) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('content', content);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        try {
            const response = await axios.post(`http://localhost:3002/freeBoardUpdate/${id}`, formData);
            console.log(response.data);
            if (response.data.success) {
                alert('게시물 수정 완료');
            } else {
                alert('게시물 수정 오류');
            }
        } catch (error) {
            console.error(error);
            alert('게시물 수정 오류');
        }
    };

    return (
        <div>
            <form>
                <div>
                    <label>제목</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>내용</label>
                    <textarea value={content} onChange={handleContentChange} />
                </div>
                <div>
                    <label>이미지</label>
                    <input type="file" multiple onChange={handleImageChange}/>
                </div>
                <button onClick={handleUpdate}><Link to={`/freeBoard/${id}`}>글 수정</Link></button>
            </form>
        </div>
    );
}

export default FreeBoardUpdateForm;