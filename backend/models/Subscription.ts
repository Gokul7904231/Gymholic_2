import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  customerId: mongoose.Types.ObjectId;
  gymId: mongoose.Types.ObjectId;
  razorpaySubscriptionId: string;
  plan: 'trial' | 'monthly' | 'quarterly' | 'yearly';
  amount: number;
  currency: string;
  status: 'trial' | 'active' | 'past_due' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  nextBillingDate?: Date;
  cancelledDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    razorpaySubscriptionId: { type: String, required: true, unique: true },
    plan: { type: String, enum: ['trial', 'monthly', 'quarterly', 'yearly'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['trial', 'active', 'past_due', 'cancelled', 'expired'], default: 'trial' },
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    nextBillingDate: Date,
    cancelledDate: Date,
  },
  { timestamps: true }
);

subscriptionSchema.index({ customerId: 1, gymId: 1 });

export default mongoose.model<ISubscription>('Subscription', subscriptionSchema);
