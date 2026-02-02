import express from 'express';
import * as gymController from '../controllers/gymController';
import { authenticate, authorize } from '../utils/authMiddleware';

const router = express.Router();

router.post('/', authenticate, authorize('trainer'), gymController.createGym);
router.get('/', gymController.getGyms);
router.get('/:id', gymController.getGymById);
router.put('/:id', authenticate, authorize('trainer'), gymController.updateGym);
router.delete('/:id', authenticate, authorize('trainer'), gymController.deleteGym);
router.get('/trainer/gyms', authenticate, authorize('trainer'), gymController.getTrainerGyms);

export default router;
