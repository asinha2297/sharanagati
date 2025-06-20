import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import bkgd2 from "../assets/regal.webp";
import iskconlogo from "../assets/R.png";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

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
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-6 text-lg font-semibold transition duration-300 transform hover:scale-110 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] ${
                  isActive ? "text-[#b34700]" : "text-white"
                }`
              }
            >
              Home
            </NavLink>

            <div className="relative px-6" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-lg font-semibold transition duration-300 transform hover:scale-110 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
              >
                About Us
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-orange-300 text-orange-800 rounded-md shadow-lg z-50">
                  <NavLink
                    to="/about"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 hover:bg-orange-200 font-semibold"
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to="/biography"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 hover:bg-orange-200 font-semibold"
                  >
                    About Govind Ghosh Das
                  </NavLink>
                </div>
              )}
            </div>

            {/* Other NavLinks */}
            {[
              { name: "Gurukul", path: "/gurukul" },
              { name: "Yatras", path: "/yatras" },
              { name: "Contact Us", path: "/contact" },
            ].map((item, index) => (
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

        {/* Right Logo */}
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
