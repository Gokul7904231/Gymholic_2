import express from 'express';
import * as paymentController from '../controllers/paymentController';
import { authenticate } from '../utils/authMiddleware';

const router = express.Router();

router.post('/', authenticate, paymentController.createPayment);
router.post('/verify', authenticate, paymentController.verifyPayment);
router.get('/customer/payments', authenticate, paymentController.getPaymentsByCustomer);
router.post('/:paymentId/refund', authenticate, paymentController.refundPayment);

export default router;
