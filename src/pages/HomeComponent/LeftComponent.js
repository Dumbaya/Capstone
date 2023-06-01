import React from "react";
import "../../css/HomeleftComponent.css";

function LeftComponent() {
    const loginState = sessionStorage.getItem('loginState');

    return (
        <div className="Home">
            <div className="main">
                <div className="main-img">
                    <img scr="img/LOGO.PNG" alt='logo'/>
                </div>
            </div>
            { !loginState 
                ? <div className="main-introduce">소개글</div>
                : <div className="main-refri">냉장고 간단한 정보</div>
            }
            <div className="main-recipe">
                인기 레시피
            </div>
            <div className="main-board">
                인기 게시글
            </div>
        </div>
    )
}

export default LeftComponent;