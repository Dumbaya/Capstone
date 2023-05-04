import React, { useState } from "react";
import "../../css/Board.css";
import {Routes, Route, useNavigate} from "react-router-dom";

import BoardWriterForm from "./BoardWriteForm";

function Board() {
    const [query, setQuery] = useState("");

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
        
        <div className="board-container">
            <div className="board-logo">로고</div>
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
                    <button type="submit" onClick={() => handleButtonClick("/Board/BoardWriteForm")}>글쓰기</button>
                    <Routes>
                        <Route path="/Board/BoardWriteForm" element={<BoardWriterForm />}></Route>
                    </Routes>
                </div>
                <table className="freeboard-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                </table>
                <hr></hr>
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
                <table className="qaboard-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                </table>
                <hr></hr>
            </div>
            )}
        </div>    
  );
}

export default Board;