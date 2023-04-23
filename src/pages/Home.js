import React from "react";

function Home() {
    return (
        <div className="Home">
            <div className="main">
                <div className="main-img">
                    로고
                </div>
            </div>
            <Btns></Btns>
        </div>
    )
    
}

function Btns() {

    function test() {
        console.log("테스트용");
    }

    return (
        <div className="btns">
            <button className="btn" onClick={test}>로그인, 냉장고</button>
            <button className="btn">레시피</button>
            <button className="btn">게시판</button>
        </div>
    );
}

export default Home;