// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import '../style/Navbar.css';

// const Navbar = () => {
//   const location = useLocation();

//   return (
//     <nav className="navbar">
//       {/* Left: Logo */}
//       <div className="navbar-logo">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//           alt="Logo"
//         />
//         <span>SalonPro</span>
//       </div>

//       {/* user menu*/}
//       <ul className="navbar-menu">
//         <li className={location.pathname === '/home' ? 'active' : ''}>
//           <Link to="/home">Dashboard</Link>
//         </li>
//         <li className={location.pathname === '/user-booking' ? 'active' : ''}>
//           <Link to="/user-booking">Book Appointment</Link>
//         </li>
//         <li className={location.pathname === '/user-manage' ? 'active' : ''}>
//           <Link to="/user-manage">Manage</Link>
//         </li>

//       {/* bussiness menu*/}

//          <li className={location.pathname === '/business-registration' ? 'active' : ''}>
//           <Link to="/business-registration">Bussines register</Link>
//         </li>
//          <li className={location.pathname === '/business-details' ? 'active' : ''}>
//           <Link to="/business-details">Business Details</Link>
//         </li>
//           <li className={location.pathname === '/business-listing' ? 'active' : ''}>
//           <Link to="/business-listing">Business listing</Link>
//         </li>
//       </ul>

//       {/* Right: Sign In */}
//       <div className="navbar-auth">
//         <Link to="/login">Sign In</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

 





import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ named import ka use karo
import '../style/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  // 🔐 JWT token localStorage se lo
  const token = localStorage.getItem('token');

  // 🧠 Token decode karke role nikalo
  let userRole = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role; // Role ko token me jaisa store kiya tha us name se lo
    } catch (error) {
      console.error('Invalid Token:', error);
    }
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Logo"
        />
        <span>SalonPro</span>
      </div>

      <ul className="navbar-menu">
        {/* 👤 User Role */}
        {userRole === 'user' && (
          <>
            <li className={location.pathname === '/home' ? 'active' : ''}>
              <Link to="/home">Dashboard</Link>
            </li>
            <li className={location.pathname === '/user-booking' ? 'active' : ''}>
              <Link to="/user-booking">Book Appointment</Link>
            </li>
            <li className={location.pathname === '/user-manage' ? 'active' : ''}>
              <Link to="/user-manage">Manage</Link>
            </li>
          </>
        )}

        {/* 🏢 Business Role */}
        {userRole === 'business' && (
          <>
            <li className={location.pathname === '/business-registration' ? 'active' : ''}>
              <Link to="/business-registration">Business Register</Link>
            </li>
            <li className={location.pathname === '/business-details' ? 'active' : ''}>
              <Link to="/business-details">Business Details</Link>
            </li>
            <li className={location.pathname === '/business-listing' ? 'active' : ''}>
              <Link to="/business-listing">Business Staff </Link>
            </li>
          </>
        )}

        
        {/* 🏢 Business Role */}
        {userRole === 'admin' && (
          <>
             
            <li className={location.pathname === '/admin-services' ? 'active' : ''}>
              <Link to="/admin-services">Admin Panel</Link>
            </li>
          </>
        )}
      </ul>

      {/* Sign In */}
      <div className="navbar-auth">
        <Link to="/login">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;

 