import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import OccultScience from "./pages/OccultScience";
import AboutUs from "./components/AboutUs";
import Gurukul from "./components/Gurukul";
import Yatras from "./components/Yatras";
import ContactUs from "./components/ContactUs";
import Biography from "./components/Biography";
import RegistrationForm from "./components/RegistrationForm";
import JaipurRegistrationForm from "./components/JaipurRegistrationForm";
import JaipurPaymentReview from "./components/JaipurPaymentReview";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/the-soul-archive" element={<OccultScience />} />
        <Route path="/gurukul" element={<Gurukul />} />
        <Route path="/yatras" element={<Yatras />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/register/jaipur" element={<JaipurRegistrationForm />} />
        <Route path="/admin/jaipur-payments" element={<JaipurPaymentReview />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
