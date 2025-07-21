 


// import React, { useState } from 'react';

// const CreateServiceComponent = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     duration: ''
//   });
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getUserInfo = () => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');
//     const userId = localStorage.getItem('userid');
//     return { token, role, userId };
//   };

//   const checkToken = () => {
//     const { token } = getUserInfo();
//     if (!token) {
//       showToast('Please login first!', 'error');
//       return false;
//     }
//     return true;
//   };

//   const showToast = (message, type) => {
//     const toastDiv = document.createElement('div');
//     toastDiv.className = `fixed top-4 right-4 p-4 rounded-md text-white z-50 ${
//       type === 'success' ? 'bg-green-500' : 'bg-red-500'
//     }`;
//     toastDiv.textContent = message;
//     document.body.appendChild(toastDiv);
//     setTimeout(() => {
//       if (document.body.contains(toastDiv)) {
//         document.body.removeChild(toastDiv);
//       }
//     }, 3000);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!checkToken()) return;

//     if (!formData.name || !formData.description || !formData.price || !formData.duration) {
//       showToast('Please fill all required fields!', 'error');
//       return;
//     }

//     if (!image) {
//       showToast('Please select an image!', 'error');
//       return;
//     }

//     setLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('duration', formData.duration);
//       formDataToSend.append('image', image);

//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/services', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to create service');
//       }

//       const result = await response.json();
//       showToast('Service created successfully! 🎉', 'success');

//       setFormData({
//         name: '',
//         description: '',
//         price: '',
//         duration: ''
//       });
//       setImage(null);
//       console.log('Service created:', result);

//     } catch (error) {
//       console.error('Error creating service:', error);
//       if (error.message.includes('403')) {
//         showToast('Access denied! Only approved businesses can add services.', 'error');
//       } else if (error.message.includes('401')) {
//         showToast('Session expired! Please login again.', 'error');
//       } else {
//         showToast(error.message || 'Failed to create service.', 'error');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       {/* Top Headings */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold text-gray-800">Add Your Services</h1>
//         <p className="text-gray-600 mt-2">Create and publish your professional salon or business services.</p>
//       </div>

//       {/* Two Column Layout */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* Left: Form Section */}
//         <div className="bg-white shadow-md rounded-lg p-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Service Details</h2>

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Service Name *</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g., Haircut + Beard Styling"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Description *</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows="3"
//                 className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g., Haircut with styling according to modern trends"
//               ></textarea>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700">Price (₹) *</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700">Duration (min) *</label>
//                 <input
//                   type="number"
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Service Image *</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
//                 loading
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
//               }`}
//             >
//               {loading ? 'Creating...' : 'Create Service'}
//             </button>
//           </form>
//         </div>

//         {/* Right: Image + Text */}
//         <div className="text-center md:text-left">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Showcase Your Best Services</h2>
//           <p className="text-gray-600 mb-6">Upload details with image to attract your customers professionally.</p>
//           <img
//             src="https://addvalueintellectual.com/wp-content/uploads/2022/01/AVISS-Home-Page-IT-Services-scaled.jpg"
//             alt="Service Illustration"
//             className="rounded-lg shadow-lg w-full object-cover max-h-[450px]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateServiceComponent;















import React, { useState, useRef } from 'react';

const CreateServiceComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null); // 👈 Reference for file input

  const getUserInfo = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userid');
    return { token, role, userId };
  };

  const checkToken = () => {
    const { token } = getUserInfo();
    if (!token) {
      showToast('Please login first!', 'error');
      return false;
    }
    return true;
  };

  const showToast = (message, type) => {
    const toastDiv = document.createElement('div');
    toastDiv.className = `fixed top-4 right-4 p-4 rounded-md text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toastDiv.textContent = message;
    document.body.appendChild(toastDiv);
    setTimeout(() => {
      if (document.body.contains(toastDiv)) {
        document.body.removeChild(toastDiv);
      }
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkToken()) return;

    if (!formData.name || !formData.description || !formData.price || !formData.duration) {
      showToast('Please fill all required fields!', 'error');
      return;
    }

    if (!image) {
      showToast('Please select an image!', 'error');
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('image', image);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/services', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create service');
      }

      const result = await response.json();
      showToast('Service created successfully! 🎉', 'success');

      setFormData({
        name: '',
        description: '',
        price: '',
        duration: ''
      });
      setImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = null; // 👈 Reset file input field
      }

      console.log('Service created:', result);

    } catch (error) {
      console.error('Error creating service:', error);
      if (error.message.includes('403')) {
        showToast('Access denied! Only approved businesses can add services.', 'error');
      } else if (error.message.includes('401')) {
        showToast('Session expired! Please login again.', 'error');
      } else {
        showToast(error.message || 'Failed to create service.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Top Headings */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Add Your Services</h1>
        <p className="text-gray-600 mt-2">Create and publish your professional salon or business services.</p>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Form Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Service Details</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Service Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Haircut + Beard Styling"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Haircut with styling according to modern trends"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Duration (min) *</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Service Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef} // 👈 attach ref to input
                className="w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              }`}
            >
              {loading ? 'Creating...' : 'Create Service'}
            </button>
          </form>
        </div>

        {/* Right: Image + Text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Showcase Your Best Services</h2>
          <p className="text-gray-600 mb-6">Upload details with image to attract your customers professionally.</p>
          <img
            src="https://addvalueintellectual.com/wp-content/uploads/2022/01/AVISS-Home-Page-IT-Services-scaled.jpg"
            alt="Service Illustration"
            className="rounded-lg shadow-lg w-full object-cover max-h-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateServiceComponent;

