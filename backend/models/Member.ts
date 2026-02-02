import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
  gymId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  joinDate: Date;
  status: 'active' | 'inactive' | 'suspended';
  totalBookings: number;
  cancelledBookings: number;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<IMember>(
  {
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    joinDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    totalBookings: { type: Number, default: 0 },
    cancelledBookings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

memberSchema.index({ gymId: 1, customerId: 1 }, { unique: true });

export default mongoose.model<IMember>('Member', memberSchema);
