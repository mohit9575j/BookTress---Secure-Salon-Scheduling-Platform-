// src/components/BookingForm.js 
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../style/BookingForm.css';
import { toast } from 'react-toastify';

const BookingForm = () => {
  const location = useLocation();
  const serviceId = location.state?.serviceId;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Something went wrong! Token not found');
      
      await axios.post('http://localhost:5000/appointments', {
        serviceId,
        date,
        time
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Appointment Booked!');
    } catch (err) {
      console.error(err);
      toast.error('Booking failed! Please try again.');
    }
  };

  return (
    <div className="booking-form-container">
      <h2 className="booking-heading">Book Your Appointment</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label htmlFor="date">Select Date</label>
        <input
          type="date"
          id="date"
          placeholder="Select a date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="time">Select Time</label>
        <input 
          type="time"
          id="time"
            placeholder="Select a time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
