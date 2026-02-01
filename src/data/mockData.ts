export interface Gym {
  id: string;
  name: string;
  address: string;
  city: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  walkTime: string;
  driveTime: string;
  isVerified: boolean;
  isVisible: boolean;
  crowdLevel: 'low' | 'medium' | 'high';
  pricePerMonth: number;
  pricePerSession: number;
  amenities: string[];
  features: string[];
  openTime: string;
  closeTime: string;
  availableSlots: number;
  totalSlots: number;
  coordinates: { lat: number; lng: number };
  ownerId: string;
  subscriptionStatus: 'active' | 'expired';
}

export interface Slot {
  id: string;
  gymId: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  date: string;
}

export interface Booking {
  id: string;
  gymId: string;
  gymName: string;
  gymImage: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookedAt: string;
}

export const mockGyms: Gym[] = [
  {
    id: '1',
    name: 'PowerFit Elite',
    address: '123 Fitness Avenue, Downtown',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    rating: 4.8,
    reviews: 324,
    distance: '0.8 km',
    walkTime: '10 min walk',
    driveTime: '3 min drive',
    isVerified: true,
    isVisible: true,
    crowdLevel: 'low',
    pricePerMonth: 2500,
    pricePerSession: 150,
    amenities: ['Parking', 'Shower', 'Locker', 'AC', 'WiFi'],
    features: ['Personal Training', 'CrossFit', 'Yoga', 'Cardio Zone'],
    openTime: '05:00',
    closeTime: '23:00',
    availableSlots: 8,
    totalSlots: 12,
    coordinates: { lat: 19.076, lng: 72.8777 },
    ownerId: 'owner1',
    subscriptionStatus: 'active',
  },
  {
    id: '2',
    name: 'Iron Paradise Gym',
    address: '456 Muscle Street, Bandra',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    rating: 4.6,
    reviews: 189,
    distance: '1.2 km',
    walkTime: '15 min walk',
    driveTime: '5 min drive',
    isVerified: true,
    isVisible: true,
    crowdLevel: 'medium',
    pricePerMonth: 3000,
    pricePerSession: 200,
    amenities: ['Parking', 'Shower', 'Locker', 'Cafe', 'Steam'],
    features: ['Bodybuilding', 'Powerlifting', 'Functional Training'],
    openTime: '06:00',
    closeTime: '22:00',
    availableSlots: 3,
    totalSlots: 10,
    coordinates: { lat: 19.0596, lng: 72.8295 },
    ownerId: 'owner2',
    subscriptionStatus: 'active',
  },
  {
    id: '3',
    name: 'ZenFit Studio',
    address: '789 Wellness Road, Andheri',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800',
    rating: 4.9,
    reviews: 456,
    distance: '2.1 km',
    walkTime: '25 min walk',
    driveTime: '8 min drive',
    isVerified: false,
    isVisible: true,
    crowdLevel: 'high',
    pricePerMonth: 4000,
    pricePerSession: 300,
    amenities: ['Valet', 'Spa', 'Juice Bar', 'Towel Service'],
    features: ['Yoga', 'Pilates', 'Meditation', 'Dance Fitness'],
    openTime: '05:30',
    closeTime: '21:00',
    availableSlots: 2,
    totalSlots: 8,
    coordinates: { lat: 19.1136, lng: 72.8697 },
    ownerId: 'owner3',
    subscriptionStatus: 'active',
  },
  {
    id: '4',
    name: 'Strength Hub',
    address: '321 Power Lane, Juhu',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800',
    rating: 4.5,
    reviews: 98,
    distance: '3.5 km',
    walkTime: '45 min walk',
    driveTime: '12 min drive',
    isVerified: true,
    isVisible: true,
    crowdLevel: 'low',
    pricePerMonth: 2000,
    pricePerSession: 120,
    amenities: ['Parking', 'Shower', 'AC'],
    features: ['Weight Training', 'Cardio', 'Group Classes'],
    openTime: '06:00',
    closeTime: '22:00',
    availableSlots: 10,
    totalSlots: 15,
    coordinates: { lat: 19.1075, lng: 72.8263 },
    ownerId: 'owner4',
    subscriptionStatus: 'expired',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    gymId: '1',
    gymName: 'PowerFit Elite',
    gymImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    date: '2026-01-04',
    startTime: '07:00',
    endTime: '08:00',
    status: 'upcoming',
    bookedAt: '2026-01-03T10:00:00Z',
  },
  {
    id: 'b2',
    gymId: '2',
    gymName: 'Iron Paradise Gym',
    gymImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    date: '2026-01-05',
    startTime: '18:00',
    endTime: '19:00',
    status: 'upcoming',
    bookedAt: '2026-01-02T14:00:00Z',
  },
  {
    id: 'b3',
    gymId: '1',
    gymName: 'PowerFit Elite',
    gymImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    date: '2026-01-02',
    startTime: '09:00',
    endTime: '10:00',
    status: 'completed',
    bookedAt: '2026-01-01T08:00:00Z',
  },
];

export const mockSlots: Slot[] = [
  { id: 's1', gymId: '1', startTime: '05:00', endTime: '06:00', capacity: 20, booked: 5, date: '2026-01-04' },
  { id: 's2', gymId: '1', startTime: '06:00', endTime: '07:00', capacity: 20, booked: 15, date: '2026-01-04' },
  { id: 's3', gymId: '1', startTime: '07:00', endTime: '08:00', capacity: 20, booked: 18, date: '2026-01-04' },
  { id: 's4', gymId: '1', startTime: '08:00', endTime: '09:00', capacity: 20, booked: 12, date: '2026-01-04' },
  { id: 's5', gymId: '1', startTime: '17:00', endTime: '18:00', capacity: 20, booked: 19, date: '2026-01-04' },
  { id: 's6', gymId: '1', startTime: '18:00', endTime: '19:00', capacity: 20, booked: 20, date: '2026-01-04' },
  { id: 's7', gymId: '1', startTime: '19:00', endTime: '20:00', capacity: 20, booked: 16, date: '2026-01-04' },
];
