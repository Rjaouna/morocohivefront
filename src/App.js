import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircuitsList from "./components/CircuitsList";
import Circuit from "./components/Circuit";
import Navbar from "./components/Navbar";
import Slide from "./components/Slide";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Slide />
      <Routes>
        <Route path='/' element={<CircuitsList />} />
        <Route path='/circuit/:id' element={<Circuit />} />
      </Routes>
    </Router>
  );
}

export default App;
