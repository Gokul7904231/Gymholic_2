import mongoose, { Schema, Document } from 'mongoose';

export interface ISlot extends Document {
  gymId: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  membersBooked: mongoose.Types.ObjectId[];
  status: 'available' | 'full' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const slotSchema = new Schema<ISlot>(
  {
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    capacity: { type: Number, required: true },
    booked: { type: Number, default: 0 },
    membersBooked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['available', 'full', 'cancelled'], default: 'available' },
  },
  { timestamps: true }
);

slotSchema.index({ gymId: 1, date: 1 });

export default mongoose.model<ISlot>('Slot', slotSchema);
