import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="font-sans">
      <div className="bg-[#1E3A8A] px-4 py-10 text-center text-[#FFF7E0]">
        <div className="flex justify-center gap-6">
          <a href="#" className="text-[#FFF7E0] hover:text-[#F59E0B] transition-colors">
            <FaFacebookF size={24} />
          </a>
          <a href="https://www.instagram.com/sharanagati_team?igsh=MTVnYmZpd3htbmhlYw==" className="text-[#FFF7E0] hover:text-[#F59E0B] transition-colors" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.youtube.com/@Sharanagati" className="text-[#FFF7E0] hover:text-[#F59E0B] transition-colors" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={24} />
          </a>
        </div>
      </div>

      <div className="bg-[#FFF7E0] px-4 py-4">
        <div className="text-center text-sm sm:text-base text-[#475569] tracking-wide">
          Copyright © 2025 | Version 1.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
