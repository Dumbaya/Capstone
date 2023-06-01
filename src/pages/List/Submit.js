import React, { useState, useEffect } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/List.css";
import Waiting from "./modal/waiting.js";
import Infor from "./modal/Infor.js";



function Submit(props) {
    return (
        <div>
            <Waiting num={props.num}/>
        </div>
    );
}

export default Submit;
