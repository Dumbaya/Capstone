import React from "react";
import {Routes, Route, Link} from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import List from "./pages/List";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/List">List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/List" element={<List/>}></Route>
      </Routes>
    </div>
  );
}



export default App;
