 

import react from 'react';
 import HeroSection from '../components/Hero2'; 
   import AddStaffForm from '../components/AddStaffForm'; // Assuming this is the component for adding staff
   import StaffList from '../components/Staffupdate'; // Assuming this is the component to list staff members
   import StaffWorkload from '../components/StaffWorkload'; // Assuming this is the component to view staff workload
   
 
 
 
  
const AddServicePage = () => {
  return (
    <div className="add-service-container"  >
 
        <HeroSection/>
        <AddStaffForm />
        <StaffList />
        <StaffWorkload />
        
        {/* You can add more components here as needed */}
         
         
        
    
     
    </div>
  );
}

export default AddServicePage;