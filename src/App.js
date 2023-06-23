import React from "react";
import {Routes, Route} from "react-router-dom";

import './App.css';
import Home from "./pages/Homeform";
import List from "./pages/List/ListForm";
import Recipe from "./pages/Recipe/RecipeForm";
import RecipeInput from "./pages/Recipe/RecipeInput";
import Board from "./pages/Board/BoardForm";
import FreeBoardWriteForm from "./pages/Board/Freeboard/FreeBoardWriteForm";
import FreeBoardReadForm from "./pages/Board/Freeboard/FreeBoardReadForm";
import FreeBoardUpdateForm from "./pages/Board/Freeboard/FreeBoardUpdateForm";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Login/SignupForm";
import Test from "./pages/test/test";
import BeforeSignin from "./pages/HomeComponent/BeforeSignin"
import AfterSignin from "./pages/HomeComponent/AfterSignin"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />       
        <Route path="/List/ListForm" element={<List />} />
        <Route path="/Recipe/RecipeForm" element={<Recipe />} />
        <Route path="/Recipe/Input" element={<RecipeInput />}></Route>
        <Route path="/Board/BoardForm" element={<Board />} />
        <Route path="/Board/Freeboard/FreeBoardWriteForm" element={<FreeBoardWriteForm />} />
        <Route path="/freeBoard/:id" element={<FreeBoardReadForm />} />
        <Route path="/BoardUpdate/:id" element={<FreeBoardUpdateForm />} />
        <Route path="/Login/LoginForm" element={<LoginForm />} />
        <Route path="/Login/SignupForm" element={<SignupForm />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/HomeComponent/BeforeSignin" element={<BeforeSignin />} />
        <Route path="/HomeComponent/AfterSignin" element={<AfterSignin />} />

      </Routes>
    </div>
  );
}



export default App;
