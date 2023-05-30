import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FreeBoardReadForm = () => {
  const { id } = useParams();
  const [freeboard, setfreeboard] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/Board/${id}`);
        setfreeboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

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
    </div>
  );
};

export default FreeBoardReadForm;