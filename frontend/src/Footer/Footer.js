import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <p className="title-card-footer">
            <img className="footer-logo" src="plant.svg" alt="Logo" />
            Crop<span className="footer-title">Credit</span>
          </p>
          <p className="footer-description">India's largest lending platform</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Loan Products</h3>
          <ul>
            <li>Crop Loan</li>
            <li>Digital Gold Loan</li>
            <li>Agri Credit Card</li>
            <li>Farm Mechanisation Loan</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Other Links</h3>
          <ul>
            <li>Career</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul>
            <li className="footer-contact">
              <MdEmail className="footer-icon" /> support@CropCredit.com
            </li>
            <li className="footer-contact">
              <MdPhone className="footer-icon" /> +91 9345556893
            </li>
          </ul>
          <div className="footer-social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
