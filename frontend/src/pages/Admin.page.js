 

import react from 'react';
 import HeroSection from '../components/Hero2'; 
 import BusinessApprovalPanel from '../components/BusinessApprovalPanel'; // Assuming this is the component for business approval
 import PendingBussines from '../components/PendingBussiness'; // Assuming this is the component to view pending businesses

const AddServicePage = () => {
  return (
    <div className="add-service-container"  >
       
        <HeroSection/>
        <BusinessApprovalPanel/>
        <PendingBussines/>
    
     
    </div>
  );
}

export default AddServicePage;