import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircuitsList from "./components/CircuitsList";
import Circuit from "./components/Circuit";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<CircuitsList />} />
        <Route path='/circuit/:id' element={<Circuit />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
