 

import react from 'react';
 import HeroSection from '../components/Hero2'; 
  import AddServiceForm from '../components/AddServiceForm';
   import BusinessListing from '../components/ViewAll.bussi';
  import Updates from '../components/Update'; // Assuming this is the component for updates
  
 
 
 
  
const AddServicePage = () => {
  return (
    <div className="add-service-container"  >
 
        <HeroSection/>
        <AddServiceForm />
        <BusinessListing/>
        <Updates/>
         
        
    
     
    </div>
  );
}

export default AddServicePage;