import React from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-content">
        <div className="contact-box">
          <p>
            📍 <strong>Address:</strong> ISKCON Newtown Temple, Rajarhat,
            Kolkata, West Bengal 700156
          </p>
          <p>
            📞 <strong>Phone:</strong> +91 XXXXXXXXXX
          </p>
          <p>
            📧 <strong>Email:</strong> sharanagati.hk@gmail.com
          </p>
          <p>
            🕒 <strong>Timings:</strong> Mon–Sun: 7:00 AM – 8:30 PM
          </p>
        </div>

        <div className="map-container">
          <iframe
            title="ISKCON Newtown Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.4052953996825!2d88.51809377368224!3d22.563939979497793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020b8f2325aa81%3A0xfefa177dac344f36!2sISKCON%20Newtown%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1750349377157!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
