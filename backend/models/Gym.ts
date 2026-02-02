import mongoose, { Schema, Document } from 'mongoose';

export interface IGym extends Document {
  name: string;
  description: string;
  trainerId: mongoose.Types.ObjectId;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
  };
  amenities: string[];
  totalSlots: number;
  pricePerSlot: number;
  operatingHours: {
    opening: string;
    closing: string;
  };
  images: string[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const gymSchema = new Schema<IGym>(
  {
    name: { type: String, required: true },
    description: String,
    trainerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      latitude: Number,
      longitude: Number,
    },
    amenities: [String],
    totalSlots: { type: Number, default: 50 },
    pricePerSlot: { type: Number, required: true },
    operatingHours: {
      opening: { type: String, default: '06:00' },
      closing: { type: String, default: '22:00' },
    },
    images: [String],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IGym>('Gym', gymSchema);
