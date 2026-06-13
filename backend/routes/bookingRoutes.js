import express from 'express';
const router = express.Router();
import { 
    addBooking, 
    getMyBookings, 
    getBookingById, 
    cancelBooking, 
    confirmBooking, 
    getBookings, 
    deleteBooking,
    completeExpiredBookings 
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addBooking).get(protect, admin, getBookings);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/complete-expired').put(protect, admin, completeExpiredBookings);
router.route('/:id').get(protect, getBookingById).delete(protect, admin, deleteBooking);
router.route('/:id/cancel').put(protect, cancelBooking);
router.route('/:id/confirm').put(protect, admin, confirmBooking);

export default router;