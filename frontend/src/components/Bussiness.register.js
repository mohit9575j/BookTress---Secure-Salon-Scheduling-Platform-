// import React, { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Building2, Phone, MapPin, Upload, Check, Loader2 } from 'lucide-react';

// const BusinessRegistration = () => {
//   const [formData, setFormData] = useState({
//     businessName: '',
//     phone: '',
//     address: '',
//     document: null
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [documentPreview, setDocumentPreview] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         toast.error('File size should be less than 5MB');
//         return;
//       }
      
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please select an image file');
//         return;
//       }

//       setFormData(prev => ({
//         ...prev,
//         document: file
//       }));

//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (e) => setDocumentPreview(e.target.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     if (!formData.businessName.trim()) {
//       toast.error('Business name is required');
//       return false;
//     }
//     if (!formData.phone.trim()) {
//       toast.error('Phone number is required');
//       return false;
//     }
//     if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
//       toast.error('Please enter a valid 10-digit phone number');
//       return false;
//     }
//     if (!formData.address.trim()) {
//       toast.error('Address is required');
//       return false;
//     }
//     if (!formData.document) {
//       toast.error('Business document is required');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
    
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const submitData = new FormData();
//       submitData.append('businessName', formData.businessName);
//       submitData.append('phone', formData.phone);
//       submitData.append('address', formData.address);
//       submitData.append('document', formData.document);

//       const response = await fetch('http://localhost:5000/business', {
//         method: 'POST',
//         body: submitData,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         toast.success(result.message || 'Business details submitted successfully!');
        
//         // Reset form
//         setFormData({
//           businessName: '',
//           phone: '',
//           address: '',
//           document: null
//         });
//         setDocumentPreview(null);
        
//         // Reset file input
//         const fileInput = document.getElementById('document');
//         if (fileInput) fileInput.value = '';
        
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || 'Failed to submit business details');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       toast.error('Network error. Please check your connection and try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
//             <Building2 className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Register Your Business
//           </h1>
//           <p className="text-gray-600 max-w-md mx-auto">
//             Join our platform and start offering your services to customers. Fill out the form below to get started.
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
//             <h2 className="text-xl font-semibold text-white">Business Information</h2>
//             <p className="text-purple-100 text-sm mt-1">
//               Your application will be reviewed by our team within 24-48 hours
//             </p>
//           </div>

//           <div className="p-8 space-y-6">
//             {/* Business Name */}
//             <div className="space-y-2">
//               <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
//                 Business Name
//               </label>
//               <div className="relative">
//                 <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   id="businessName"
//                   name="businessName"
//                   value={formData.businessName}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Charcoal Massage Spa"
//                   className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
//                 />
//               </div>
//             </div>

//             {/* Phone */}
//             <div className="space-y-2">
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   placeholder="9876543220"
//                   className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div className="space-y-2">
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                 Business Address
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                 <textarea
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   placeholder="123 Main Road, Mumbai"
//                   rows={3}
//                   className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
//                 />
//               </div>
//             </div>

//             {/* Document Upload */}
//             <div className="space-y-2">
//               <label htmlFor="document" className="block text-sm font-medium text-gray-700">
//                 Business Document
//               </label>
//               <div className="space-y-4">
//                 <div className="relative">
//                   <input
//                     type="file"
//                     id="document"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="document"
//                     className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
//                   >
//                     <div className="text-center">
//                       <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm text-gray-600">
//                         Click to upload business license, registration certificate, or ID
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         PNG, JPG up to 5MB
//                       </p>
//                     </div>
//                   </label>
//                 </div>

//                 {/* Document Preview */}
//                 {documentPreview && (
//                   <div className="relative">
//                     <img
//                       src={documentPreview}
//                       alt="Document preview"
//                       className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                     />
//                     <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
//                       <Check className="w-4 h-4" />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                   Submitting...
//                 </>
//               ) : (
//                 'Submit Application'
//               )}
//             </button>

//             {/* Info Text */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <p className="text-sm text-blue-800">
//                 <strong>What happens next?</strong> Our team will review your application and verify your business documents. You'll receive an email notification once your business is approved and ready to start accepting bookings.
//               </p>
//             </div>
//             </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// };

// export default BusinessRegistration;







import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Building2, Phone, MapPin, Upload, Check, Loader2 } from 'lucide-react';

const BusinessRegistration = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    address: '',
    document: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentPreview, setDocumentPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setFormData(prev => ({
        ...prev,
        document: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setDocumentPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.businessName.trim()) {
      toast.error('Business name is required');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!formData.address.trim()) {
      toast.error('Address is required');
      return false;
    }
    if (!formData.document) {
      toast.error('Business document is required');
      return false;
    }
    return true;
  };

  const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to register a business');
      return null;
    }
    return token;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Token check karna
    const token = getAuthToken();
    if (!token) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('businessName', formData.businessName);
      submitData.append('phone', formData.phone);
      submitData.append('address', formData.address);
      submitData.append('document', formData.document);

      const response = await axios.post('http://localhost:5000/business', submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || 'Business details submitted successfully!');
        
        // Reset form
        setFormData({
          businessName: '',
          phone: '',
          address: '',
          document: null
        });
        setDocumentPreview(null);
        
        // Reset file input
        const fileInput = document.getElementById('document');
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
      } else if (error.response) {
        toast.error(error.response.data.message || 'Failed to submit business details');
      } else {
        toast.error('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Register Your Business
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Join our platform and start offering your services to customers. Fill out the form below to get started.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <h2 className="text-xl font-semibold text-white">Business Information</h2>
            <p className="text-purple-100 text-sm mt-1">
              Your application will be reviewed by our team within 24-48 hours
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="e.g., Charcoal Massage Spa"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543220"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Business Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Road, Mumbai"
                  rows={3}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                />
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-2">
              <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                Business Document
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    id="document"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="document"
                    className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload business license, registration certificate, or ID
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </label>
                </div>

                {/* Document Preview */}
                {documentPreview && (
                  <div className="relative">
                    <img
                      src={documentPreview}
                      alt="Document preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>

            {/* Info Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>What happens next?</strong> Our team will review your application and verify your business documents. You'll receive an email notification once your business is approved and ready to start accepting bookings.
              </p>
            </div>
            </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default BusinessRegistration;