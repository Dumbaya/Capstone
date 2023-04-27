import React, { useState } from "react";
import "../../css/Board.css";
import {Routes, Route, useNavigate} from "react-router-dom";

import BoardWriterForm from "./BoardWriteForm";

function Board() {
    const [tab, setTab] = useState("free");

    const navigate=useNavigate();

    function handleButtonClick(path){
        navigate(path);
    }

    return (
        
        <div className="board-container">
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
                <div class="board-search">
                    검색창
                </div>
                <div class="board-write">
                    <button type="submit" onClick={() => handleButtonClick("/BoardWriteForm")}>글쓰기</button>
                    <Routes>
                        <Route path="/BoardWriteForm" element={<BoardWriterForm />}></Route>
                    </Routes>
                </div>
                <table class="freeboard-table">
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
            </div>
            ) : (
            <div className="board qna-board">
                <div class="board-search">
                    검색창
                </div>
                <div class="board-write">
                    <button type="submit" onClick={() => handleButtonClick("/BoardWriteForm")}>글쓰기</button>
                    <Routes>
                        <Route path="/BoardWriteForm" element={<BoardWriterForm />}></Route>
                    </Routes>
                </div>
                <table class="qaboard-table">
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
            </div>
            )}
        </div>    
  );
}

export default Board;