import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ContactUs.css";

const Yatras = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-us-container px-4 py-10 bg-gray-100 min-h-screen">
      <h1 className="page-title text-center text-4xl font-bold text-gray-800 mb-10">
        Yatra
      </h1>

      <div className="max-w-md mx-auto bg-orange-100 rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ayodhya-Chitrakut Dham Yatra
        </h2>

        <p className="text-gray-600 mb-6">
          Join the spiritual journey to Ayodhya and Chitrakut in 2025.
          Experience peace, devotion, and culture.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bounce-pulse px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition duration-300 cursor-pointer"
        >
          Register for Yatra
        </button>
      </div>
    </div>
  );
};

export default Yatras;
