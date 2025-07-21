// src/components/StaffList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const token = localStorage.getItem('token');
  const businessId = JSON.parse(atob(token.split('.')[1])).id;

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/staff/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaffList(res.data.staff);
    } catch (err) {
      toast.error('Failed to fetch staff');
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleEdit = (staff) => {
    setEditingStaff(staff.id);
    setFormData({ name: staff.name, email: staff.email, phone: staff.phone });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/staff/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Staff updated');
      setEditingStaff(null);
      fetchStaff();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await axios.delete(`http://localhost:5000/staff/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Staff deleted');
        fetchStaff();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Your Staff Members</h1>
        {staffList.length === 0 ? (
          <p className="text-center text-gray-500">No staff members found.</p>
        ) : (
          <div className="grid gap-6">
            {staffList.map((staff) => (
              <div
                key={staff.id}
                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm"
              >
                {editingStaff === staff.id ? (
                  <div className="flex-1 space-y-2 mr-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <button
                      onClick={() => handleUpdate(staff.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold">{staff.name}</h3>
                      <p className="text-sm text-gray-600">{staff.email}</p>
                      <p className="text-sm text-gray-600">{staff.phone}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(staff)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(staff.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffList;
