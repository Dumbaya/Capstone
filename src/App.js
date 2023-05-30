import React from "react";
import {Routes, Route} from "react-router-dom";

import './App.css';
import Home from "./pages/Homeform";
import List from "./pages/List/ListForm";
import Recipe from "./pages/Recipe/RecipeForm";
import Board from "./pages/Board/BoardForm";
import FreeBoardWriteForm from "./pages/Board/Freeboard/FreeBoardWriteForm";
import FreeBoardReadForm from "./pages/Board/Freeboard/FreeBoardReadForm";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Login/SignupForm";
import Test from "./pages/test/test";
import Left from "./pages/HomeComponent/LeftComponent"
import Right from "./pages/HomeComponent/RightComponent"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />       
        <Route path="/List/ListForm" element={<List />} />
        <Route path="/Recipe/RecipeForm" element={<Recipe />} />
        <Route path="/Board/BoardForm" element={<Board />} />
        <Route path="/Board/FreeBoardWriteForm" element={<FreeBoardWriteForm />} />
        <Route path="/Board/:id" element={<FreeBoardReadForm />} />
        <Route path="/Login/LoginForm" element={<LoginForm />} />
        <Route path="/Login/SignupForm" element={<SignupForm />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/HomeComponent/left" element={<Left />} />
        <Route path="/HomeComponent/right" element={<Right />} />
      </Routes>
    </div>
  );
}



export default App;
