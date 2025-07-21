 

import react from 'react';
 import HeroSection from '../components/Hero2'; 
 import BusinessRegistration from '../components/Bussiness.register'; 
 import BusinessDetailsView from '../components/Bussi.details'; // Assuming this is the component to view business details
 
 
 
 
  
const AddServicePage = () => {
  return (
    <div className="add-service-container"  >
 
        <HeroSection/>
        <BusinessRegistration/>
        <BusinessDetailsView/>
        
        
    
     
    </div>
  );
}

export default AddServicePage;