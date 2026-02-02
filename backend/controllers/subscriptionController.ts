import { Request, Response } from 'express';
import Subscription from '../models/Subscription';
import Payment from '../models/Payment';
import { razorpayInstance } from '../utils/razorpayClient';

export const createSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gymId, plan } = req.body;
    const customerId = (req as any).user.id;

    const planPrices: Record<string, number> = {
      monthly: 99900,
      quarterly: 29970,
      yearly: 99900,
    };

    const amount = planPrices[plan] || 99900;

    const razorpayPlan = await razorpayInstance.plans.create({
      period: plan === 'monthly' ? 'monthly' : plan === 'quarterly' ? 'monthly' : 'yearly',
      interval: plan === 'monthly' ? 1 : plan === 'quarterly' ? 3 : 12,
      period_count: 1,
      customer_notify: 1,
      notes: { gymId },
    });

    const subscription = new Subscription({
      customerId,
      gymId,
      razorpaySubscriptionId: razorpayPlan.id,
      plan,
      amount,
      status: 'trial',
      startDate: new Date(),
    });

    await subscription.save();
    res.status(201).json({ message: 'Subscription created', subscription });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subscriptionId } = req.params;
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const cancelSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subscriptionId } = req.params;
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }

    subscription.status = 'cancelled';
    subscription.cancelledDate = new Date();
    await subscription.save();

    res.json({ message: 'Subscription cancelled', subscription });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCustomerSubscriptions = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = (req as any).user.id;
    const subscriptions = await Subscription.find({ customerId }).populate('gymId', 'name');

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPaymentHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subscriptionId } = req.params;
    const payments = await Payment.find({ subscriptionId }).sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
