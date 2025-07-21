 // src/components/ServicesSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchServices = async (page) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/services?page=${page}&limit=6`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setServices(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error('Error fetching services:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  const handleBookNow = (serviceId) => {
    navigate('/user-booking', { state: { serviceId } });
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Our Services</h2>
        <p className="text-gray-600 text-center mb-10">
          Discover a wide range of professional salon treatments tailored just for you.<br />
          Experience exceptional care and personalized attention every time you visit.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={`http://localhost:5000/uploads/${service.image}`}
                alt={service.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {service.description.length > 60
                    ? service.description.slice(0, 60) + '...'
                    : service.description}
                </p>
                <p className="text-indigo-600 font-bold mt-2">₹{service.price}</p>
                <button
                  onClick={() => handleBookNow(service.id)}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : ' text-white hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
