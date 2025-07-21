import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffWorkload = () => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token not found. Please login again.');
        return;
      }

      const response = await axios.get('http://localhost:5000/staff/workload', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStaffData(response.data.staff);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch staff workload.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkload();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Staff Workload Overview</h2>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staffData.map((staff) => (
            <div key={staff.id} className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{staff.name}</h3>
                  <p className="text-sm text-gray-600">{staff.email}</p>
                  <p className="text-sm text-gray-600">📞 {staff.phone}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${staff.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {staff.isAvailable ? 'Available' : 'Busy'}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500 font-semibold mb-2">
                  Appointments: {staff.appointmentCount}
                </p>
                {staff.appointments.length === 0 ? (
                  <p className="text-gray-400 italic">No appointments</p>
                ) : (
                  <ul className="space-y-2 max-h-56 overflow-y-auto pr-2">
                    {staff.appointments.map((appt) => (
                      <li key={appt.id} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                        <p><strong>Date:</strong> {appt.date}</p>
                        <p><strong>Time:</strong> {appt.time}</p>
                        <p><strong>Service:</strong> {appt.Service?.name} ({appt.Service?.duration} min)</p>
                        <p><strong>Customer:</strong> {appt.User?.name || 'N/A'}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffWorkload;
