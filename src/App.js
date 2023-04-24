import React from "react";
import {Routes, Route, Link} from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import List from "./pages/List";
import Recipe from "./pages/Recipe";
import Board from "./pages/Board";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/List" element={<List />} />
        <Route path="/Recipe" element={<Recipe />} />
        <Route path="/Board" element={<Board />} />
      </Routes>
    </div>
  );
}



export default App;
