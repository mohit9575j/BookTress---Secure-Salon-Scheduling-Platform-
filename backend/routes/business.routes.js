import express from 'express';
import { getAllApprovedBusinesses,getAllPendingBusinesses, 
  getBusinessByUserId,submitBusinessDetails, approveBusiness,  rejectBusiness } from '../controllers/business.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';
import upload from '../middlewares/uploadBusinessDoc.js';

const router = express.Router();
router.get('/all', protect, getAllApprovedBusinesses);
router.get('/pending', protect, getAllPendingBusinesses);
 

router.post('/', protect, upload.single('document'), submitBusinessDetails);  

router.get('/:userId', protect, getBusinessByUserId);
router.put('/:id/approve', protect, isAdmin, approveBusiness);  
router.put('/:id/reject', protect, isAdmin, rejectBusiness);

export default router;
 