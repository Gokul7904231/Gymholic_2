import express, { Request, Response } from 'express';
import crypto from 'crypto';
import Subscription from '../models/Subscription';
import Payment from '../models/Payment';

const router = express.Router();

router.post('/razorpay', async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      res.status(400).json({ error: 'Invalid signature' });
      return;
    }

    const { event, payload } = req.body;

    switch (event) {
      case 'subscription.charged':
        await handleSubscriptionCharged(payload.subscription.entity);
        break;

      case 'payment.failed':
        await handlePaymentFailed(payload.payment.entity);
        break;

      case 'subscription.activated':
        await handleSubscriptionActivated(payload.subscription.entity);
        break;

      case 'subscription.cancelled':
        await handleSubscriptionCancelled(payload.subscription.entity);
        break;

      default:
        console.log(`Unhandled event: ${event}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
});

async function handleSubscriptionCharged(subscription: any): Promise<void> {
  try {
    const sub = await Subscription.findOne({ razorpaySubscriptionId: subscription.id });
    if (sub) {
      sub.status = 'active';
      sub.nextBillingDate = new Date(subscription.expire_by * 1000);
      await sub.save();

      const payment = new Payment({
        customerId: sub.customerId,
        subscriptionId: sub._id,
        razorpayPaymentId: subscription.short_url,
        amount: subscription.total_count > 1 ? subscription.amount / 100 : 0,
        currency: 'INR',
        status: 'completed',
        description: `Auto-charged for ${sub.plan} subscription`,
      });
      await payment.save();
    }
  } catch (error) {
    console.error('Error handling subscription charged:', error);
  }
}

async function handlePaymentFailed(payment: any): Promise<void> {
  try {
    const existingPayment = await Payment.findOne({ razorpayPaymentId: payment.id });
    if (existingPayment) {
      existingPayment.status = 'failed';
      await existingPayment.save();

      const subscription = await Subscription.findById(existingPayment.subscriptionId);
      if (subscription) {
        subscription.status = 'past_due';
        await subscription.save();
      }
    }
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

async function handleSubscriptionActivated(subscription: any): Promise<void> {
  try {
    const sub = await Subscription.findOne({ razorpaySubscriptionId: subscription.id });
    if (sub) {
      sub.status = 'active';
      await sub.save();
    }
  } catch (error) {
    console.error('Error handling subscription activated:', error);
  }
}

async function handleSubscriptionCancelled(subscription: any): Promise<void> {
  try {
    const sub = await Subscription.findOne({ razorpaySubscriptionId: subscription.id });
    if (sub) {
      sub.status = 'cancelled';
      sub.cancelledDate = new Date();
      await sub.save();
    }
  } catch (error) {
    console.error('Error handling subscription cancelled:', error);
  }
}

export default router;
