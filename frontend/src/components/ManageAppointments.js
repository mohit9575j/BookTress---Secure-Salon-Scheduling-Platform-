 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [deleteNotes, setDeleteNotes] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch user appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/appointments/me?page=${currentPage}&limit=4`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.data || res.data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      if (err.response?.status === 401) {
        alert('Please login to view appointments');
        window.location.href = '/login';
      } else {
        alert('Failed to load appointments');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  // Handle delete button click
  const handleDeleteClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowDeleteModal(true);
    setDeleteNotes('');
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedAppointmentId(null);
    setDeleteNotes('');
  };

  // Confirm delete appointment
  const confirmDelete = async () => {
    if (!deleteNotes.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }

    try {
      setDeleting(true);
      const token = localStorage.getItem('token');
      
      await axios.delete(`http://localhost:5000/appointments/cancel/${selectedAppointmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: {
          notes: deleteNotes
        }
      });

      alert('Appointment cancelled successfully');
      closeDeleteModal();
      fetchAppointments(); // Refresh appointments
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  // Handle page change
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">My Appointments</h1>
          <p className="mt-3 text-xl text-gray-500">
            Manage and view all your salon appointments
          </p>
        </div>

        {/* No Appointments */}
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Appointments Found</h3>
            <p className="text-gray-500 mb-6">You haven't booked any appointments yet.</p>
            <button 
              onClick={() => window.location.href = '/services'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          /* Appointments Grid */
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Appointment Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Appointment #{appointment.id}
                      </h3>
                      <p className="text-white text-opacity-90 text-sm">
                        {new Date(appointment.date).toLocaleDateString('en-GB')} at {appointment.time}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Service Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="mr-2">💅</span>Service Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-700">
                          <span className="font-medium">Service:</span> {appointment.Service?.name || 'N/A'}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Price:</span> ₹{appointment.Service?.price || 0}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Duration:</span> {appointment.Service?.duration || 0} minutes
                        </p>
                        {appointment.Service?.owner && (
                          <p className="text-gray-700">
                            <span className="font-medium">Salon:</span> {appointment.Service.owner.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Staff Details */}
                    {appointment.Staff && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <span className="mr-2">👨‍⚕️</span>Staff Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700">
                            <span className="font-medium">Name:</span> {appointment.Staff.name}
                          </p>
                          {appointment.Staff.phone && (
                            <p className="text-gray-700">
                              <span className="font-medium">Phone:</span> {appointment.Staff.phone}
                            </p>
                          )}
                          {appointment.Staff.email && (
                            <p className="text-gray-700">
                              <span className="font-medium">Email:</span> {appointment.Staff.email}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Customer Notes */}
                    {appointment.notes && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <span className="mr-2">📝</span>Your Notes
                        </h4>
                        <p className="text-gray-700 text-sm">{appointment.notes}</p>
                      </div>
                    )}

                    {/* Reschedule Message */}
                    {appointment.rescheduleMessage && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <span className="mr-2">🔄</span>Reschedule Message
                        </h4>
                        <p className="text-gray-700 text-sm">{appointment.rescheduleMessage}</p>
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="mr-2">🕒</span>Timeline
                      </h4>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>
                          <span className="font-medium">Created:</span> {new Date(appointment.createdAt).toLocaleString('en-GB')}
                        </p>
                        <p>
                          <span className="font-medium">Last Updated:</span> {new Date(appointment.updatedAt).toLocaleString('en-GB')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    {appointment.status?.toLowerCase() !== 'cancelled' && 
                     appointment.status?.toLowerCase() !== 'completed' && (
                      <button
                        onClick={() => handleDeleteClick(appointment.id)}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200 flex items-center justify-center"
                      >
                        <span className="mr-2">🗑️</span>
                        Cancel Appointment
                      </button>
                    )}
                    
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full mx-4 animate-scale-in">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Cancel Appointment</h3>
                <button
                  onClick={closeDeleteModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-2">Are you sure you want to cancel this appointment?</p>
                <p className="text-red-600 text-sm mb-4">This action cannot be undone.</p>
                
                <div>
                  <label htmlFor="deleteReason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for cancellation *
                  </label>
                  <textarea
                    id="deleteReason"
                    value={deleteNotes}
                    onChange={(e) => setDeleteNotes(e.target.value)}
                    placeholder="Please provide a reason for cancellation..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
                <button
                  onClick={closeDeleteModal}
                  disabled={deleting}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition duration-200 disabled:opacity-50"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting || !deleteNotes.trim()}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? 'Cancelling...' : 'Cancel Appointment'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyAppointments;