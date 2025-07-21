 
// src/components/BookedAppointments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/BookedAppointments.css';

const BookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/appointments/me?page=${currentPage}&limit=4`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    fetchAppointments();
  }, [currentPage]);

  return (
    <section className="appointments-section">
      <h2 className="section-title">Your Booked Appointments</h2>

      <div className="appointments-grid">
        {appointments.map((apt) => (
          <div className="appointment-card" key={apt.id}>
            <h3>Appointment #{apt.id}</h3>
            <p><strong>Date:</strong> {apt.date}</p>
            <p><strong>Time:</strong> {apt.time}</p>
            <p><strong>Status:</strong> <span className={`status ${apt.status}`}>{apt.status}</span></p>

            {apt.Service ? (
              <>
                <p><strong>Service:</strong> {apt.Service.name}</p>
                <p><strong>Price:</strong> ₹{apt.Service.price}</p>
                <p><strong>Duration:</strong> {apt.Service.duration} min</p>
                <p><strong>Salon Owner:</strong> {apt.Service.owner?.name} ({apt.Service.owner?.email})</p>
              </>
            ) : <p><em>No Service Info</em></p>}

            {apt.Staff ? (
              <>
                <p><strong>Staff:</strong> {apt.Staff.name}</p>
                <p><strong>Contact Number :</strong> {apt.Staff.phone} </p>
                <p><strong>Contact Email:</strong>  {apt.Staff.email}</p>
              </>
            ) : <p><em>No Staff Assigned</em></p>}
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BookedAppointments;
