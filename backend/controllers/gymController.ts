import { Request, Response } from 'express';
import Gym from '../models/Gym';
import Member from '../models/Member';

export const createGym = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, location, amenities, totalSlots, pricePerSlot, operatingHours, images } = req.body;
    const trainerId = (req as any).user.id;

    const gym = new Gym({
      name,
      description,
      trainerId,
      location,
      amenities,
      totalSlots,
      pricePerSlot,
      operatingHours,
      images,
    });

    await gym.save();
    res.status(201).json({ message: 'Gym created successfully', gym });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getGyms = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city, state, verified } = req.query;
    const filter: any = {};

    if (city) filter['location.city'] = city;
    if (state) filter['location.state'] = state;
    if (verified !== undefined) filter.verified = verified === 'true';

    const gyms = await Gym.find(filter).populate('trainerId', 'name email');
    res.json(gyms);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getGymById = async (req: Request, res: Response): Promise<void> => {
  try {
    const gym = await Gym.findById(req.params.id).populate('trainerId', 'name email');
    if (!gym) {
      res.status(404).json({ error: 'Gym not found' });
      return;
    }

    const memberCount = await Member.countDocuments({ gymId: gym._id });
    res.json({ ...gym.toObject(), memberCount });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateGym = async (req: Request, res: Response): Promise<void> => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      res.status(404).json({ error: 'Gym not found' });
      return;
    }

    if (gym.trainerId.toString() !== (req as any).user.id) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    Object.assign(gym, req.body);
    await gym.save();
    res.json({ message: 'Gym updated successfully', gym });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteGym = async (req: Request, res: Response): Promise<void> => {
  try {
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      res.status(404).json({ error: 'Gym not found' });
      return;
    }

    if (gym.trainerId.toString() !== (req as any).user.id) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    await Gym.deleteOne({ _id: req.params.id });
    res.json({ message: 'Gym deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTrainerGyms = async (req: Request, res: Response): Promise<void> => {
  try {
    const trainerId = (req as any).user.id;
    const gyms = await Gym.find({ trainerId });
    res.json(gyms);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
