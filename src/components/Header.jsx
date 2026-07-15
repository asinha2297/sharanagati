import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import bkgd2 from "../assets/regal.webp";
import iskconlogo from "../assets/R.png";
import sharanagatilogo from "../assets/MainLogo2.jpg";

const Header = () => {
  const getNavLinkClass = (isActive) =>
    `px-6 text-lg font-semibold transition duration-300 transform hover:scale-110 hover:text-[#1E3A8A] hover:drop-shadow-[0_0_8px_rgba(30,58,138,0.2)] ${
      isActive
        ? "text-[#1E3A8A] border border-[#1E3A8A] rounded-full bg-[#EFF6FF]"
        : "text-[#475569]"
    }`;

  return (
    <header className="relative text-[#1E3A8A] shadow-md bg-[#FFF7E0] border-b-4 border-[#F59E0B]">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src={sharanagatilogo} alt="Left Logo" className="h-20 w-auto" />
          <div className="ml-10" />

          <nav className="flex items-center space-x-0 divide-x divide-white">
            <NavLink
              to="/"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              Mission & Vision
            </NavLink>
            <NavLink
              to="/biography"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              Our Spiritual Guide
            </NavLink>
            {[
              { name: "Gurukul", path: "/gurukul" },
              { name: "Yatras", path: "/yatras" },
              { name: "Contact Us", path: "/contact" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center">
          <img
            src={iskconlogo}
            alt="ISKCON Logo"
            className="h-20 w-auto pl-4"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
