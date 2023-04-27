import React from "react";
import {Routes, Route} from "react-router-dom";

import './App.css';
import Home from "./pages/Homeform";
import List from "./pages/ListForm";
import Recipe from "./pages/Recipe/RecipeForm";
import Board from "./pages/Board/BoardForm";
import BoardWriteForm from "./pages/Board/BoardWriteForm";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Login/SignupForm";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />       
        <Route path="/List" element={<List />} />
        <Route path="/Recipe/RecipeForm" element={<Recipe />} />
        <Route path="/Board/BoardForm" element={<Board />} />
        <Route path="/BoardWriteForm" element={<BoardWriteForm />} />
        <Route path="/Login/LoginForm" element={<LoginForm />} />
        <Route path="/SignupForm" element={<SignupForm />} />
      </Routes>
    </div>
  );
}



export default App;
