import express from 'express';
import * as slotController from '../controllers/slotController';
import { authenticate, authorize } from '../utils/authMiddleware';

const router = express.Router();

router.post('/', authenticate, authorize('trainer'), slotController.createSlot);
router.get('/gym/:gymId', slotController.getGymSlots);
router.post('/:slotId/book', authenticate, slotController.bookSlot);
router.delete('/:slotId/cancel', authenticate, slotController.cancelSlotBooking);
router.get('/gym/:gymId/available', slotController.getAvailableSlots);

export default router;
