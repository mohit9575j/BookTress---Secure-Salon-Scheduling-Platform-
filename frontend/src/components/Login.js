// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify'; // ✅ Toast import
// import '../style/Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/auth/login', formData);
//       if (res.status === 200) {
//         toast.success('Login successful!');
//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('userRole', res.data.user.role);
//         navigate('/home');
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Login failed!');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Login</button>
//       </form>

//       <p className="register-text">
//         Don't have an account? <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ Toast import
import '../style/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/auth/login', formData);
      if (res.status === 200) {
        toast.success('Login successful!');
        
        // ✅ Dynamic data storage - jo bhi user login kare uska data store hoga
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userRole', res.data.user.role);
        localStorage.setItem('userId', res.data.user.id); // ✅ Dynamic user ID
        localStorage.setItem('userName', res.data.user.name); // ✅ User name bhi store kar lete hain
        localStorage.setItem('userEmail', res.data.user.email); // ✅ Email bhi useful hai
        
        // ✅ Debug console - development ke liye helpful hai
        console.log('🔥 Login Successful!');
        console.log('User ID:', res.data.user.id);
        console.log('User Role:', res.data.user.role);
        console.log('User Name:', res.data.user.name);
        console.log('Full Response:', res.data);
        
        navigate('/home');
      }
    } catch (err) {
      // ✅ Better error handling
      console.error('❌ Login Error:', err.response?.data);
      toast.error(err?.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p className="register-text">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
