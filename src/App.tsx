import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <div className='App'>
        <h1>Welcome to React Router!</h1>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
