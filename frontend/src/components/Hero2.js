// src/components/HeroSection.js
import React from 'react';
import '../style/HeroSection.css';
//import heroImage from '../assets/hero-illustration.png'; // Place any image in this path

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Book and Manage Your Salon Services Easily – Schedule Your Appointment!!</h1>
        <p> Easily Book Appointments, Seamlessly Manage Your Services, and Effortlessly Grow Your Business with Our All-in-One Salon Booking Solution Designed to Save You Time and Boost Your Success!</p>
        <button className="cta-button">Get Started</button>
      </div>

      <div className="hero-image">
        <img src="https://wpmanageninja.com/wp-content/uploads/2023/10/Fluent-Booking-WordPress-Booking-Plugin.png" alt="Salon Illustration" />
      </div>
    </section>
    
  );
};

export default HeroSection;
