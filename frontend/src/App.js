// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import HomePage from './pages/Home.page';
//import AdminPage from './pages/Admin.page';
import BookingPage from './pages/Booking.page';
import AddServicePage from './pages/AddService.page';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Usermanage from './pages/usermanage';
import Bussines1 from './pages/Bussines1';
import Bussines2 from './pages/Bussines2';
import Bussines3 from './pages/Bussines3'; // Assuming this is the third business page
import BusinessApprovalPanel from './components/BusinessApprovalPanel';
const AppLayout = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* user routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/user-booking" element={<BookingPage />} />
        <Route path="/user-manage" element={<Usermanage />} />

         {/* bussines routes */}
        <Route path="/business-registration" element={<Bussines1 />} />
        <Route path="/business-details" element={<Bussines2 />} />
        <Route path="/business-listing" element={<Bussines3 />} />

        {/* admin routes */}
         <Route path="/admin-services" element={<AddServicePage />} />


        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
