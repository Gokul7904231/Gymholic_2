import express from 'express';
import * as subscriptionController from '../controllers/subscriptionController';
import { authenticate } from '../utils/authMiddleware';

const router = express.Router();

router.post('/', authenticate, subscriptionController.createSubscription);
router.get('/:subscriptionId', authenticate, subscriptionController.getSubscription);
router.delete('/:subscriptionId/cancel', authenticate, subscriptionController.cancelSubscription);
router.get('/customer/subscriptions', authenticate, subscriptionController.getCustomerSubscriptions);
router.get('/:subscriptionId/payments', authenticate, subscriptionController.getPaymentHistory);

export default router;
