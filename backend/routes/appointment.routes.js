 


import express from 'express';
 import {
  createAppointment,
  getMyAppointments,
  deleteMyAppointment,
  getAllAppointments,
  getBusinessAppointments,
  rescheduleAppointment,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointment.controller.js';

import { protect } from '../middlewares/authMiddleware.js';
import { isAdminOrApprovedBusiness } from '../middlewares/businessMiddleware.js';

const router = express.Router();

  

// All routes need authentication
router.use(protect);

// USER ROUTES (Any authenticated user)
router.post('/',  protect,  createAppointment); // Book appointment with auto staff assignment
router.get('/me', protect, getMyAppointments); // User's own appointments
router.delete('/cancel/:id', protect,  deleteMyAppointment); // User's own appointments


// BUSINESS ROUTES (Only approved businesses)
router.get('/business',protect,  isAdminOrApprovedBusiness, getBusinessAppointments); // Business's appointments
router.put('/:id/reschedule', protect, isAdminOrApprovedBusiness, rescheduleAppointment); // Reschedule with message

// ADMIN ROUTES (Admin can see all)
router.get('/', protect, getAllAppointments); // Admin sees all appointments

// GENERAL ROUTES (Owner or admin can modify)
router.put('/:id', protect, updateAppointment); // Update appointment
router.delete('/:id', protect, deleteAppointment); // Delete appointment

export default router;