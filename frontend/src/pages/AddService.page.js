 

import react from 'react';
 import '../style/AddServiceForm.css'; // Ensure you have this CSS file for styling
import HeroSection from '../components/Hero2'; 
import BusinessListing from '../components/ViewAll.bussi';
 
import BusinessApprovalPanel from '../components/BusinessApprovalPanel'; // Assuming this is the component for business approval
import PendingBussines from '../components/PendingBussiness'; // Assuming this is the component to view pending businesses
 
const AddServicePage = () => {
  return (
    <div className="add-service-container"  >
       
        <HeroSection/>
  
        <BusinessListing/>
          <BusinessApprovalPanel/>
        <PendingBussines/>
        
        {/* You can add more components here as needed */}
      
    </div>
  );
}

export default AddServicePage;