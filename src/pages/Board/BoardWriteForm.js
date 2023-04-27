import React, { useState } from "react";
import "../../css/BoardWrite.css";

function BoardWriteForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    // TODO: Send data to server
    };

  return (
    <form onSubmit={handleSubmit} className="boardWirte">
        <label className="boardWrite-title">
            제목:
            <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label className="boardWrite-body">
            내용:
            <textarea value={content} onChange={handleContentChange} />
        </label>
        <button type="submit" className="boardWrite-ok">작성완료</button>
    </form>
  );
}

export default BoardWriteForm;