 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Building2,
  Phone,
  MapPin,
  User,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Loader2,
  RefreshCw,
} from 'lucide-react';

const BusinessDetailsView = () => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // User ID from localStorage (fallback for demo)
  const getCurrentUserId = () => {
    return localStorage.getItem('userId') || '8';
  };

  // Fetch business data
  const fetchBusinessDetails = async () => {
    setLoading(true);
    setError('');

    const userId = getCurrentUserId();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authentication token not found.');
      toast.error('Please login first.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/business/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBusinessData(response.data);
     } catch (err) {
      console.error(err);

      if (err.response?.status === 404) {
        setError('Business not found. Please register first.');
        toast.error('Business not found!');
      } else if (err.response?.status === 401) {
        setError('Unauthorized. Please login again.');
        toast.error('Unauthorized access!');
      } else {
        setError('Something went wrong. Try again.');
        toast.error('Failed to load!');
      }
    } finally {
      setLoading(false);
    }
  };

  // On mount
  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  // Utility: Status color
  const getStatusStyle = (status) => {
    if (status === 'approved') return 'text-green-600 bg-green-50 border-green-200';
    if (status === 'rejected') return 'text-red-600 bg-red-50 border-red-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200'; // pending
  };

  // Utility: Status icon
  const getStatusIcon = (status) => {
    if (status === 'approved') return <CheckCircle className="w-5 h-5" />;
    if (status === 'rejected') return <XCircle className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  // Refresh button
  const handleRefresh = () => {
    toast.info('Refreshing...');
    fetchBusinessDetails();
  };

  // --- Render ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow text-center">
          <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 inline-block mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <Building2 className="w-10 h-10 text-white bg-blue-600 p-2 rounded-xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Business</h1>
              <p className="text-sm text-gray-500">User ID: {getCurrentUserId()}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Business Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Business Info</h2>
            <p className="mb-2">
              <Building2 className="inline w-5 h-5 mr-2 text-blue-500" />
              <span className="font-semibold">{businessData.businessName}</span>
            </p>
            <p className="mb-2">
              <Phone className="inline w-5 h-5 mr-2 text-green-500" />
              {businessData.phone}
            </p>
            <p className="mb-2">
              <MapPin className="inline w-5 h-5 mr-2 text-red-500" />
              {businessData.address}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-purple-600 mb-4">Owner Info</h2>
            <p className="mb-2">
              <User className="inline w-5 h-5 mr-2 text-purple-500" />
              {businessData.User.name}
            </p>
            <p className="mb-2">
              <Mail className="inline w-5 h-5 mr-2 text-blue-500" />
              {businessData.User.email}
            </p>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-green-600 mb-4">Business Document</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src={`http://localhost:5000/${businessData.documentUrl.replace(/\\/g, '/')}`}
              alt="Business Document"
              className="w-full max-w-md mx-auto rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-center py-4">
              <FileText className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-500">Image not available</p>
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Status</h2>
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border ${getStatusStyle(
              businessData.status
            )}`}
          >
            {getStatusIcon(businessData.status)}
            <span className="ml-2 capitalize">{businessData.status}</span>
          </div>

          {businessData.status === 'pending' && (
            <p className="mt-4 text-sm text-yellow-700 bg-yellow-50 p-3 rounded">
              ⏳ Your application is being reviewed.
            </p>
          )}

          {businessData.status === 'approved' && (
            <p className="mt-4 text-sm text-green-700 bg-green-50 p-3 rounded">
              🎉 Congratulations! Your business is approved.
            </p>
          )}

          {businessData.status === 'rejected' && businessData.rejectionReason && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 p-3 rounded">
              <p className="font-semibold">❌ Rejected:</p>
              <p>{businessData.rejectionReason}</p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default BusinessDetailsView;
