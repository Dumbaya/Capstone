import React, { useEffect, useState} from 'react';
import { useParams, Routes, Route, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

import BoardForm from "../BoardForm";
import FreeBoardUpdateForm from "./FreeBoardUpdateForm";

const FreeBoardReadForm = () => {
  const { id } = useParams();
  const [freeboard, setfreeboard] = useState({});
  const navigate=useNavigate();

  function handleButtonClick(path){
      navigate(path);
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/freeBoard/${id}`);
        setfreeboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3002/freeBoardDelete/${id}`)
      .then(response => {
        window.location.href = 'http://localhost:3000/Board/BoardForm';
        console.log('게시물이 삭제되었습니다.');
      })
      .catch(error => {
        console.error('게시물 삭제에 실패했습니다:', error);
      });
  };

  if (!freeboard) {
    return <div>Loading...{`${id}`}</div>;
  }

  return (
    <div>
      <h1>{`${id}`}</h1>
      <h1>{freeboard.title}</h1>
      <h1>{freeboard.author}</h1>
      <h1>{freeboard.date}</h1>
      <h1>{freeboard.content}</h1>
      <h1>{freeboard.image}</h1>
      {sessionStorage.getItem('username') === freeboard.author
        ?
        <>
          <div>
            <button onClick={handleDelete}>삭제</button>
            <button><Link to={`/BoardUpdate/${freeboard.id}`}>수정</Link></button>
            <button onClick={() => handleButtonClick("/Board/BoardForm")}>목록</button>
            <Routes>
              <Route path="../BoardForm" element={<BoardForm />}></Route>
              <Route path="./FreeBoardUpdateForm" element={<FreeBoardUpdateForm />}></Route>
            </Routes>
          </div>
        </>
        :
        <>
          <div>
            <button onClick={() => handleButtonClick("/Board/BoardForm")}>목록</button>
            <Routes>
              <Route path="../BoardForm" element={<BoardForm />}></Route>
            </Routes>
          </div>
        </>
      }
    </div>
  );
};

export default FreeBoardReadForm;