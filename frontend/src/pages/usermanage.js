 

import react from 'react';
 import HeroSection from '../components/Hero2'; 
 import {CardHoverEffectDemo} from '../components/card';
 import { WobbleCardDemo } from '../components/Wobles';
 import BusinessListing from '../components/ViewAll.bussi';
 import ManageAppointments from '../components/ManageAppointments';
 
 
  
const AddServicePage = () => {
  return (
    <div className="add-service-container"  >
       
        <HeroSection/>
        <div className='bg-gray-900 text-white pb-20'>
                    <CardHoverEffectDemo/>

        </div>
        <BusinessListing/>
        <ManageAppointments/>

        <WobbleCardDemo/>
        
    
     
    </div>
  );
}

export default AddServicePage;