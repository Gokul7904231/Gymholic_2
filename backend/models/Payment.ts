import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  customerId: mongoose.Types.ObjectId;
  subscriptionId: mongoose.Types.ObjectId;
  razorpayPaymentId: string;
  razorpayOrderId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: string;
  description: string;
  notes?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', required: true },
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: String,
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    paymentMethod: String,
    description: { type: String, required: true },
    notes: Schema.Types.Mixed,
  },
  { timestamps: true }
);

paymentSchema.index({ customerId: 1, razorpayPaymentId: 1 });

export default mongoose.model<IPayment>('Payment', paymentSchema);
