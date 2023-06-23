import React, { useState, useEffect} from "react";
import "../../css/AfterSignin.css";

import RefriContent from '../List/ListForm';
import RecipeContent from '../Recipe/RecipeForm';
import BoardContent from '../Board/BoardForm';

function AfterSignin() {
    const loginState = sessionStorage.getItem('loginState');
    const handleLogout = () =>{
        sessionStorage.clear();
        alert("로그아웃 되었습니다.");
        window.location.href = 'http://localhost:3000/';
    }

    const [tab, setTab] = useState('refri');
    const handleTabChange = (tab) => {
        setTab(tab);
    };

    return (
        <div className="AfterSigninform">
            <div className="top_bar">
                <div className="main_img">
                    <img className="logo" alt = "LOGO" src="img/LOGO.PNG" />
                </div>
                <div className="main_title">
                    title
                </div>
                <div className="logoutbutton">
                    <button className="LoginButton" onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
            <hr className="top_bar_line"/>
            <div className="top_tap">
                <button
                className={tab === 'refri' ? 'active' : ''}
                onClick={() => handleTabChange('refri')}
                >
                    refri
                </button>
                <button
                className={tab === 'recipe' ? 'active' : ''}
                onClick={() => handleTabChange('recipe')}
                >
                    recipe
                </button>
                <button
                className={tab === 'board' ? 'active' : ''}
                onClick={() => handleTabChange('board')}
                >
                    board
                </button>
            </div>
            <div className="tab-content">
                {tab === 'refri' ? <RefriContent /> : null}
                {tab === 'recipe' ? <RecipeContent /> : null}
                {tab === 'board' ? <BoardContent /> : null}
            </div>
        </div>
    );
}

export default AfterSignin;