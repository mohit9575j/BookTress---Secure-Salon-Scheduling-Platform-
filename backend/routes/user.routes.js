import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import {protect}  from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);

export default router;
