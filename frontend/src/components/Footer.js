import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
          />
          <h3>SalonPro</h3>
        </div>

        <div className="footer-links">
          <div className="footer-category">
            <h4>Menu</h4>
            <ul>
              <li><Link to="/home">Dashboard</Link></li>
              <li><Link to="/book">Book Appointment</Link></li>
              <li><Link to="/add-services">Add Service</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li>📞 9617287251</li>
              <li>✉️ joshimohit8130@gmail.com</li>
              <li>🌐 github.com/mohit9575j</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Mohit | Software Developer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
