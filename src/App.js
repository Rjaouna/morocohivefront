import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircuitsList from "./components/CircuitsList";
import Circuit from "./components/Circuit";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ClientReviews from "./components/ClientReviews";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<CircuitsList />} />
        <Route path='/circuit/:id' element={<Circuit />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
      <ClientReviews />
      <Footer />
    </Router>
  );
}

export default App;
