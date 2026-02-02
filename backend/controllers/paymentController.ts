import { Request, Response } from 'express';
import Payment from '../models/Payment';
import Subscription from '../models/Subscription';
import { razorpayInstance } from '../utils/razorpayClient';

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subscriptionId, amount } = req.body;
    const customerId = (req as any).user.id;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      res.status(404).json({ error: 'Subscription not found' });
      return;
    }

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `sub_${subscriptionId}`,
      notes: {
        subscriptionId: subscriptionId.toString(),
        customerId: customerId.toString(),
      },
    });

    const payment = new Payment({
      customerId,
      subscriptionId,
      razorpayPaymentId: '',
      razorpayOrderId: razorpayOrder.id,
      amount,
      currency: 'INR',
      status: 'pending',
      description: `Subscription payment for ${subscription.plan}`,
    });

    await payment.save();
    res.status(201).json({ order: razorpayOrder, payment });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const crypto = require('crypto');
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpaySignature) {
      const payment = await Payment.findOneAndUpdate(
        { razorpayOrderId },
        {
          razorpayPaymentId,
          status: 'completed',
        },
        { new: true }
      );

      const subscription = await Subscription.findById(payment?.subscriptionId);
      if (subscription) {
        subscription.status = 'active';
        subscription.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await subscription.save();
      }

      res.json({ message: 'Payment verified successfully', payment });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPaymentsByCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = (req as any).user.id;
    const payments = await Payment.find({ customerId }).sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const refundPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);

    if (!payment || payment.status !== 'completed') {
      res.status(400).json({ error: 'Payment not eligible for refund' });
      return;
    }

    await razorpayInstance.refunds.create({
      payment_id: payment.razorpayPaymentId,
    });

    payment.status = 'refunded';
    await payment.save();

    res.json({ message: 'Refund processed', payment });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
