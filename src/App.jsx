import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutUs from "./components/AboutUs";
import Gurukul from "./components/Gurukul";
import Yatras from "./components/Yatras";
import ContactUs from "./components/ContactUs";
import Biography from "./components/Biography";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/gurukul" element={<Gurukul />} />
        <Route path="/yatras" element={<Yatras />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
