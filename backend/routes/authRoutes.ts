import express from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../utils/authMiddleware';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);

export default router;
