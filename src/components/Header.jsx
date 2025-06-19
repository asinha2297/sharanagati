import React from "react";
import { NavLink } from "react-router-dom";
import bkgd2 from "../assets/regal.webp";
import iskconlogo from "../assets/R.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Gurukul", path: "/gurukul" },
  { name: "Yatras", path: "/yatras" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  return (
    <header
      className="relative text-white shadow-md"
      style={{
        backgroundImage: `url(${bkgd2})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundSize: "100px 100px",
      }}
    >
      <div className="absolute inset-0 bg-orange-400/100 mix-blend-multiply pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="Left Logo" className="h-12 w-auto" />
          <div className="ml-10" />

          <nav className="flex items-center space-x-0 divide-x divide-white">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `px-6 text-lg font-semibold transition duration-300 transform hover:scale-110 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] ${
                    isActive ? "text-[#b34700]" : "text-white"
                  }`
                }
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
            className="h-14 w-auto pl-4"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
