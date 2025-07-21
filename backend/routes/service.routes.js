
// ✅ Updated service.routes.js
import express from 'express';
import {
  getAllServices,
  getServiceById,
  getMyServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdminOrApprovedBusiness } from '../middlewares/businessMiddleware.js';
import {upload} from '../middlewares/service.fileupload.js';

const router = express.Router();

router.get('/my-services', protect, isAdminOrApprovedBusiness, getMyServices);


router.get('/', protect, getAllServices);



router.get('/:id',protect, isAdminOrApprovedBusiness, getServiceById);



router.post('/', protect, isAdminOrApprovedBusiness, upload.single('image'), createService);


//router.post('/', protect, isAdminOrApprovedBusiness, createService);
router.put('/:id', protect, isAdminOrApprovedBusiness, updateService);
router.delete('/:id', protect, isAdminOrApprovedBusiness, deleteService);

export default router;
