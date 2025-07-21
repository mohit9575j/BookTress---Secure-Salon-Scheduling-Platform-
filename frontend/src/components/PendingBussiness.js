

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessApprovalPanel = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectModal, setRejectModal] = useState(null); // { id, reason }

  const token = localStorage.getItem('token');

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/business/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBusinesses(response.data.data);
    } catch (err) {
      toast.error('Failed to fetch businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/business/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Business approved');
      fetchBusinesses();
    } catch (err) {
      toast.error('Approval failed');
    }
  };

  const handleReject = async () => {
    if (!rejectModal?.reason) {
      toast.warning('Please enter a rejection reason');
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/business/${rejectModal.id}/reject`,
        { reason: rejectModal.reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Business rejected');
      setRejectModal(null);
      fetchBusinesses();
    } catch (err) {
      toast.error('Rejection failed');
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const getStatusBadge = (status, reason) => {
    switch (status) {
      case 'approved':
        return <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">Approved</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">Pending</span>;
      case 'rejected':
        return (
          <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded" title={reason}>
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Pending Businesses for Approval </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : ( 
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {businesses.map((biz) => (
            <div key={biz.id} className="bg-white p-5 rounded-2xl shadow border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{biz.businessName}</h3>
                {getStatusBadge(biz.status, biz.rejectionReason)}
              </div>
              <p><strong>Owner:</strong> {biz.User.name} ({biz.User.email})</p>
              <p><strong>Phone:</strong> {biz.phone}</p>
              <p><strong>Address:</strong> {biz.address}</p>
              <p className="mb-2">
                <strong>Document:</strong>{' '}
                <a
                  href={`http://localhost:5000/${biz.documentUrl.replace(/\\/g, '/')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View
                </a>
              </p>

              {/* Always show both buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleApprove(biz.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                >
                  Approve
                </button>
                <button
                  onClick={() => setRejectModal({ id: biz.id, reason: '' })}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                >
                  Reject
                </button>
              </div>

              {biz.status === 'rejected' && biz.rejectionReason && (
                <p className="mt-2 text-sm text-red-500">
                  <strong>Reason:</strong> {biz.rejectionReason}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Reject Business</h3>
            <textarea
              rows="4"
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Enter rejection reason"
              value={rejectModal.reason}
              onChange={(e) => setRejectModal({ ...rejectModal, reason: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRejectModal(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessApprovalPanel;

