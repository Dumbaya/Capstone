import React, { useState, useEffect} from "react";
import "../../css/Board.css";
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import BoardWriterForm from "./Freeboard/FreeBoardWriteForm";
import dateFormat from 'dateformat';

import Head from '../HeadContainer';

function Board() {
    const [query, setQuery] = useState("");
    const [freeboards, setFreeboards] = useState([]);
    const [qaboards, setQaboards] = useState([]);

    //자유게시판 출력
    useEffect(() => {
        freeboardfetchPosts();
      }, []);
    
    const freeboardfetchPosts = async () => {
        try {
          const response = await fetch(`http://localhost:3002/freeboard`); // API 엔드포인트에 맞게 경로 설정
          const freedata = await response.json();
          setFreeboards(freedata);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
    };

    //Q&A게시판 출력
    useEffect(() => {
        qaboardfetchPosts();
      }, []);

    const qaboardfetchPosts = async () => {
        try {
          const response = await fetch('http://localhost:3002/qaboard'); // API 엔드포인트에 맞게 경로 설정
          const qadata = await response.json();
          setQaboards(qadata);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const [tab, setTab] = useState("free");

    const navigate=useNavigate();

    function handleButtonClick(path){
        navigate(path);
    }

    return (
        <div className="board_container">
            <Head/>
            <div className="boardc">
                <div className="tab-container">
                    <button
                        className={`tab-btn ${tab === "free" ? "active" : ""}`}
                        onClick={() => setTab("free")}
                    >
                    자유게시판
                    </button>
                    <button
                        className={`tab-btn ${tab === "qna" ? "active" : ""}`}
                        onClick={() => setTab("qna")}
                    >
                    Q&A
                    </button>
                </div>
                {tab === "free" ? (
                <div className="board free-board">
                    <div className="board-search" onSubmit={handleSubmit}>
                        <label>
                            <input type="text" value={query} onChange={handleQueryChange} />
                        </label>
                        <button type="submit">검색</button>
                    </div>
                    <div className="board-write">
                        <button type="submit" onClick={() => handleButtonClick("/Board/Freeboard/FreeBoardWriteForm")}>글쓰기</button>
                        <Routes>
                            <Route path="/Board/Freeboard/FreeBoardWriteForm" element={<BoardWriterForm />}></Route>
                        </Routes>
                    </div>
                    <div>
                    <table>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </table>
                    <hr></hr>
                    {freeboards.map((freeboard) => (
                        <div>                       
                            <table key={freeboard.id}>
                                <tr>
                                    <td>{freeboard.id}</td>
                                    <td><Link to={`/freeBoard/${freeboard.id}`}>{freeboard.title}</Link></td>
                                    <td>{freeboard.author}</td>
                                    <td>{dateFormat(freeboard.date, "yyyy년 mm월 dd일")}</td>
                                    <td>{freeboard.views}</td>
                                </tr>
                            </table>
                        </div>
                    ))}
                    </div>                
                </div>
                ) : (
                <div className="board qna-board">
                    <div className="board-search" onSubmit={handleSubmit}>
                        <label>
                            <input type="text" value={query} onChange={handleQueryChange} />
                        </label>
                        <button type="submit">검색</button>
                    </div>
                    <div className="board-write">
                        <button type="submit" onClick={() => handleButtonClick("/Board/BoardWriteForm")}>글쓰기</button>
                        <Routes>
                            <Route path="/Board/BoardWriteForm" element={<BoardWriterForm />}></Route>
                        </Routes>
                    </div>
                    <table>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                            <th>조회수</th>
                        </tr>
                    </table>
                    <hr></hr>
                    {qaboards.map((qaboard) => (
                        <div key={qaboard.id}>                       
                            <table>
                                <tr>
                                    <td>{qaboard.id}</td>
                                    <td>{qaboard.thread_id}</td>
                                    <td>{qaboard.author}</td>
                                    <td>{qaboard.qa_type}</td>
                                    <td>{qaboard.title}</td>
                                    <td>{dateFormat(qaboard.date, "yyyy년 mm월 dd일")}</td>
                                </tr>
                            </table>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
  );
}

export default Board;