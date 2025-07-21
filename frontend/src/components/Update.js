import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', duration: '' });
  const token = localStorage.getItem('token');

  const fetchServices = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/services/my-services?page=${page}&limit=6`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(res.data.services);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load services');
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await axios.delete(`http://localhost:5000/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Service deleted');
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/services/${editingService.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Service updated successfully');
      setEditingService(null);
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Manage your listed services</h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition"
            >
              <img
                src={`http://localhost:5000/uploads/${service.image}`}
                alt={service.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{service.description}</p>
                <p className="text-gray-800 font-bold">₹{service.price}</p>
                <p className="text-sm text-gray-500">Duration: {service.duration} min</p>
              </div>
              <div className="flex justify-between px-4 pb-4">
                <button
                  onClick={() => openEditModal(service)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-900 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-900 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Service</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Service Name"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Description"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Price"
              />
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Duration in minutes"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;
