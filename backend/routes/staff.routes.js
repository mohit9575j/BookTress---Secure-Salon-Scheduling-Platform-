 


import express from 'express';
import rateLimit from 'express-rate-limit';
import { 
  createStaff, 
  getStaffByBusiness, 
  getStaffWithAppointments,
  updateStaff, 
  deleteStaff 
} from '../controllers/staff.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdminOrApprovedBusiness } from '../middlewares/businessMiddleware.js';

 const router = express.Router();

 
router.get('/workload', protect, isAdminOrApprovedBusiness, getStaffWithAppointments);  

router.post('/', protect, isAdminOrApprovedBusiness, createStaff);  
router.get('/:id', protect, isAdminOrApprovedBusiness, getStaffByBusiness);  
router.put('/:id', protect, isAdminOrApprovedBusiness, updateStaff);  
router.delete('/:id', protect, isAdminOrApprovedBusiness, deleteStaff);  

export default router;