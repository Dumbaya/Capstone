import React, { useState } from "react";

function BoardWriterForm() {
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
    <form onSubmit={handleSubmit}>
        <label>
            제목:
            <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
        내용:
            <textarea value={content} onChange={handleContentChange} />
        </label>
        <button type="submit">작성완료</button>
    </form>
  );
}

export default BoardWriterForm;