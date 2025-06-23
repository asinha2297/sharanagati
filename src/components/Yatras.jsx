import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ContactUs.css";
import Y1Img1 from "../assets/Ekachakra.jpg";
import Y3Img1 from "../assets/Medicos.jpg";
import Y4Img1 from "../assets/Snehodiya.jpg";
import Y5Img1 from "../assets/Dwarka.jpg";
import Y6Img1 from "../assets/Malda.jpg";

const Yatras = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-us-container px-4 py-10 bg-gray-100 min-h-screen">
      <h1 className="page-title text-center text-4xl font-bold text-gray-800 mb-10">
        Yatra
      </h1>
      <div>
      <h1 className="page-title !text-left text-4xl !font-normal text-gray-800 mb-10">
        Upcoming Yatra
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
      <h1 className="page-title !text-left text-4xl !font-normal text-gray-800 mt-10 mb-10">
        Previous Yatra
      </h1>
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-start">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y1Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ekachakra Dhaam Yatra</h2>
          <p className="text-gray-700">
            Our previous yatra was a spiritually enriching journey, filled with devotion, learning, and memorable experiences. Participants visited sacred sites, engaged in kirtans, and deepened their connection with the divine.
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-start mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gangasagar Dhaam Yatra</h2>
        <p className="text-gray-700">
          Our previous yatra was a spiritually enriching journey, filled with devotion, learning, and memorable experiences. Participants visited sacred sites, engaged in kirtans, and deepened their connection with the divine.
        </p>
      </div>
    </div>
    {/* Carousel Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y1Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
      </div>
    </div>
    </div>
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-start mt-10">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y3Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sri Mayapur Dhaam Yatra for Medicos</h2>
          <p className="text-gray-700">
            Our previous yatra was a spiritually enriching journey, filled with devotion, learning, and memorable experiences. Participants visited sacred sites, engaged in kirtans, and deepened their connection with the divine.
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-start mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sri Mayapur Dhaam Yatra for Seniors</h2>
        <p className="text-gray-700">
          Our previous yatra was a spiritually enriching journey, filled with devotion, learning, and memorable experiences. Participants visited sacred sites, engaged in kirtans, and deepened their connection with the divine.
        </p>
      </div>
    </div>
    {/* Carousel Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y4Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
      </div>
    </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-start mt-10">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y5Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
        </div>
      </div>
      {/* Write-up Section */}
      <div className="w-full md:w-1/2">
        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dakor/Somnath/Dwarka/Srinath-Jee Dhaam Yatra</h2>
          <p className="text-gray-700">
            Our previous yatra was a spiritually enriching journey, filled with devotion, learning, and memorable experiences. Participants visited sacred sites, engaged in kirtans, and deepened their connection with the divine.
          </p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-8 items-start mt-10">
    {/* Write-up Section */}
    <div className="w-full md:w-1/2">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Malda Yatra</h2>
        <p className="text-gray-700">
          Our previous yatra was a spiritually enriching journey, filled with devotion, learning, and memorable experiences. Participants visited sacred sites, engaged in kirtans, and deepened their connection with the divine.
        </p>
      </div>
    </div>
    {/* Carousel Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <div className="w-full flex flex-wrap gap-4 justify-center">
          <img src={Y6Img1} alt="Yatra 1 Img1" className="rounded-lg shadow w-150 h-75 object-cover" />
      </div>
    </div>
    </div>
    </div>
  );
};

export default Yatras;
