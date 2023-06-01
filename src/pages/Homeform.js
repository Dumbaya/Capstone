import React from "react";
import "../css/Home.css";

import BeforeSignin from './HomeComponent/BeforeSignin';
import AfterSignin from './HomeComponent/AfterSignin';

function Home() {
    const loginState = sessionStorage.getItem('loginState');

    return (
        <div>
            { !loginState 
            ? 
            <>
                <BeforeSignin />
            </>
            
            :
            <>
                <AfterSignin />
            </>
            }
        </div>
    )
}

export default Home;