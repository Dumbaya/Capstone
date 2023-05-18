import React from "react";
import "../../css/HomeleftComponent.css";

function LeftComponent() {
    const loginState = sessionStorage.getItem('loginState');

    return (
        <div className="LeftHome">
            { !loginState 
                ? 
                <>
                    <div className="main">
                        <div className="main-img">
                            로고
                        </div>
                    </div>
                    <div>
                            소개글 추가하기
                    </div>
                </>
                :
                <>
                    <div className="main">
                        <div className="main-img">
                            로고
                        </div>
                    </div>
                    <div className="main-refri">냉장고 간단한 정보</div>
                    <div className="main-recipe">인기 레시피</div>
                    <div className="main-board">인기 게시글</div>
                </>
            }
        </div>
    )
}

export default LeftComponent;