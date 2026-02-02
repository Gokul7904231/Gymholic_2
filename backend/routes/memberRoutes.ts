import express from 'express';
import * as memberController from '../controllers/memberController';
import { authenticate } from '../utils/authMiddleware';

const router = express.Router();

router.post('/join', authenticate, memberController.joinGym);
router.get('/:gymId/members', authenticate, memberController.getGymMembers);
router.get('/:gymId/status', authenticate, memberController.getMemberStatus);
router.patch('/:memberId/status', authenticate, memberController.updateMemberStatus);
router.delete('/:gymId/leave', authenticate, memberController.leaveMembership);

export default router;
