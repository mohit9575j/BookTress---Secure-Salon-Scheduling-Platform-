import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddStaffForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/staff/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('✅ Staff created successfully!');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error creating staff:', error);
      toast.error(error.response?.data?.message || '❌ Failed to create staff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center justify-center">
      {/* Page Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">You can work with your staff</h1>
        <p className="mt-2 text-gray-500 text-lg">Add and manage your salon team easily</p>
      </div>

      {/* Card Section */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
        {/* Left side image */}
        <div className="hidden md:block">
          <img
            src="https://pix4free.org/assets/library/2021-06-16/originals/staff.jpg"
            alt="Staff"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Add Your Staff</h2>
          <p className="text-gray-500 mb-6">Manage your team by adding staff members to your salon</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Phone number"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? 'Adding...' : 'Create Staff'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaffForm;
