import React from "react";
import "../css/Home.css";

import Componentleft from './HomeComponent/LeftComponent';
import Componentright from './HomeComponent/RightComponent';

function Home() {
    return (
       <div className="container">
            <div className="leftComponent">
                <Componentleft />
            </div>
            <div className="rightComponent">
                <Componentright />
            </div>
       </div>
    )
}

export default Home;