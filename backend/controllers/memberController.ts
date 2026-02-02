import { Request, Response } from 'express';
import Member from '../models/Member';
import Gym from '../models/Gym';

export const joinGym = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gymId } = req.body;
    const customerId = (req as any).user.id;

    const gym = await Gym.findById(gymId);
    if (!gym) {
      res.status(404).json({ error: 'Gym not found' });
      return;
    }

    const existingMember = await Member.findOne({ gymId, customerId });
    if (existingMember) {
      res.status(400).json({ error: 'Already a member of this gym' });
      return;
    }

    const member = new Member({ gymId, customerId, joinDate: new Date() });
    await member.save();

    res.status(201).json({ message: 'Joined gym successfully', member });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getGymMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gymId } = req.params;
    const members = await Member.find({ gymId }).populate('customerId', 'name email phone');
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMemberStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gymId } = req.params;
    const customerId = (req as any).user.id;

    const member = await Member.findOne({ gymId, customerId });
    if (!member) {
      res.status(404).json({ error: 'Not a member' });
      return;
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateMemberStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { memberId } = req.params;
    const { status } = req.body;

    const member = await Member.findByIdAndUpdate(memberId, { status }, { new: true });
    res.json({ message: 'Member status updated', member });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const leaveMembership = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gymId } = req.params;
    const customerId = (req as any).user.id;

    await Member.deleteOne({ gymId, customerId });
    res.json({ message: 'Membership cancelled' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
