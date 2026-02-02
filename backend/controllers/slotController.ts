import { Request, Response } from 'express';
import Slot from '../models/Slot';
import Gym from '../models/Gym';

export const createSlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gymId, date, startTime, endTime, capacity } = req.body;

    const gym = await Gym.findById(gymId);
    if (!gym) {
      res.status(404).json({ error: 'Gym not found' });
      return;
    }

    const slot = new Slot({
      gymId,
      date: new Date(date),
      startTime,
      endTime,
      capacity,
      booked: 0,
    });

    await slot.save();
    res.status(201).json({ message: 'Slot created successfully', slot });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getGymSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gymId } = req.params;
    const { date } = req.query;

    const filter: any = { gymId };
    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const slots = await Slot.find(filter).sort({ date: 1, startTime: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const bookSlot = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slotId } = req.params;
    const customerId = (req as any).user.id;

    const slot = await Slot.findById(slotId);
    if (!slot) {
      res.status(404).json({ error: 'Slot not found' });
      return;
    }

    if (slot.booked >= slot.capacity) {
      res.status(400).json({ error: 'Slot is full' });
      return;
    }

    if (slot.membersBooked.includes(customerId)) {
      res.status(400).json({ error: 'Already booked this slot' });
      return;
    }

    slot.booked += 1;
    slot.membersBooked.push(customerId);
    if (slot.booked >= slot.capacity) {
      slot.status = 'full';
    }

    await slot.save();
    res.json({ message: 'Slot booked successfully', slot });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const cancelSlotBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slotId } = req.params;
    const customerId = (req as any).user.id;

    const slot = await Slot.findById(slotId);
    if (!slot) {
      res.status(404).json({ error: 'Slot not found' });
      return;
    }

    const index = slot.membersBooked.indexOf(customerId);
    if (index === -1) {
      res.status(400).json({ error: 'Not booked for this slot' });
      return;
    }

    slot.membersBooked.splice(index, 1);
    slot.booked -= 1;
    slot.status = slot.booked >= slot.capacity ? 'full' : 'available';

    await slot.save();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAvailableSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gymId } = req.params;
    const slots = await Slot.find({
      gymId,
      status: 'available',
      date: { $gte: new Date() },
    }).sort({ date: 1 });

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
