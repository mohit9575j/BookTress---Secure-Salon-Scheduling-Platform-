// src/components/HeroSection.js
import React from 'react';
import '../style/HeroSection.css';
//import heroImage from '../assets/hero-illustration.png'; // Place any image in this path

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Your Ultimate Salon Booking Experience – Where Style Meets Convenience!</h1>
        <p> Easily Book Appointments, Seamlessly Manage Your Services, and Effortlessly Grow Your Business with Our All-in-One Salon Booking Solution Designed to Save You Time and Boost Your Success!</p>
        <button className="cta-button">Get Started</button>
      </div>

      <div className="hero-image">
        <img src="https://www.digitalsilk.com/wp-content/uploads/2023/05/website-navigation-hero-image.png" alt="Salon Illustration" />
      </div>
    </section>
    
  );
};

export default HeroSection;
