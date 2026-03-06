import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white font-sans">
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-10 text-center">
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:scale-120 transition-transform">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.instagram.com/sharanagati_team?igsh=MTVnYmZpd3htbmhlYw==" className="hover:scale-120 transition-transform" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.youtube.com/@Sharanagati" className="hover:scale-120 transition-transform" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={24} />
          </a>
        </div>
      </div>

      <div className="bg-black px-4 py-4">
        <div className="text-center text-sm sm:text-base font-small tracking-wide">
          Copyright © 2025 | Version 1.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
