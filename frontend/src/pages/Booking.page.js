import react from 'react';
 
import BookingForm from '../components/BookingForm';
 import BookedAppointments from '../components/BookedAppointments';
import ManageAppointments from '../components/ManageAppointments';
import {ThreeDMarqueeDemo} from '../components/ThreeDMarqueeDemo';
 import HeroSection from '../components/Hero2'; // Assuming Hero2 is the updated HeroSection component
 import BusinessListing from '../components/ViewAll.bussi';
  const BookingPage = () => {
  return (
    <div className="home-container">
       
    
       <HeroSection/>
      
 
<div className="bg-gray-900 text-white flex">
  <div className="w-1/2 p-4">
    <ThreeDMarqueeDemo />
  </div>

  <div className="w-1/2 p-4">
    {/* List Section with Bottom Margin */}
    <div className="text-center mb-10">
      <h3 className="text-3xl font-bold text-yellow-400 mb-4">
        Why Book with Us?
      </h3>
      <ul className="text-gray-300 text-sm list-none flex flex-col items-center space-y-3">
        <li>✔️ Choose your slot quickly and easily. Choose your slot quickly and easily.</li>
        <li>✔️ Get real-time booking confirmation now. Get real-time booking confirmation now.</li>
        <li>✔️ Receive timely reminders for your visit. Receive timely reminders for your visit.</li>
        <li>✔️ Browse and select premium services. Browse and select premium services.</li>
        <li>✔️ Enjoy expert care from trained staff. Enjoy expert care from trained staff.</li>
      </ul>
    </div>

    {/* Booking Form Section */}
    <div className="mt-4">
      <BookingForm />
    </div>
  </div>
</div>

     <div className='bg-gray-900 text-white '>
        <BookedAppointments/>
     </div>
  
    
     
    </div>
  ); 
}

export default BookingPage;