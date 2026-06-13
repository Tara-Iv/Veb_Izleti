import express from 'express';
const router = express.Router();
import { getTours, getTourById, createTour, updateTour, deleteTour } from '../controllers/tourController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getTours).post(protect, admin, createTour);
router.route('/:id').get(getTourById).put(protect, admin, updateTour).delete(protect, admin, deleteTour);

export default router;