import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, BadgeCheck, MapPin, Clock, Users, Navigation, Heart, Share2, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockGyms, mockSlots } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';


const GymDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const gym = mockGyms.find(g => g.id === id);
  const slots = mockSlots.filter(s => s.gymId === id);

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Gym not found</p>
      </div>
    );
  }

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-accent/20 text-accent';
      case 'medium': return 'bg-gym-warning/20 text-gym-warning';
      case 'high': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleBookSlot = () => {
    if (!selectedSlot) {
      toast({
        title: 'Select a slot',
        description: 'Please select a time slot to book.',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Booking Confirmed! 🎉',
      description: `Your slot at ${gym.name} has been booked.`,
    });
    setSelectedSlot(null);
  };

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gym.coordinates.lat},${gym.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="relative h-72">
        <img 
          src={gym.image} 
          alt={gym.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link to="/customer/explore">
            <Button variant="secondary" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-destructive text-destructive' : ''}`} />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        {/* Gym Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-display font-bold">{gym.name}</h1>
                    {gym.isVerified && (
                      <BadgeCheck className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{gym.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-gym-warning text-gym-warning" />
                    <span className="text-xl font-bold">{gym.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{gym.reviews} reviews</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className={getCrowdColor(gym.crowdLevel)}>
                  <Users className="w-3 h-3 mr-1" />
                  {gym.crowdLevel.charAt(0).toUpperCase() + gym.crowdLevel.slice(1)} crowd
                </Badge>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {gym.openTime} - {gym.closeTime}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-muted-foreground">Distance: </span>
                  <span className="font-medium">{gym.distance} ({gym.walkTime})</span>
                </div>
                <Button variant="outline" onClick={handleNavigate}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-muted-foreground text-sm mb-1">Per Session</p>
                <p className="text-2xl font-bold text-primary">₹{gym.pricePerSession}</p>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardContent className="p-4 text-center">
                <p className="text-muted-foreground text-sm mb-1">Monthly</p>
                <p className="text-2xl font-bold text-primary">₹{gym.pricePerMonth}</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">Features</h2>
          <div className="flex flex-wrap gap-2">
            {gym.features.map((feature) => (
              <Badge key={feature} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">Amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            {gym.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available Slots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">Available Slots Today</h2>
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => {
              const isFull = slot.booked >= slot.capacity;
              const isSelected = selectedSlot === slot.id;
              const slotsLeft = slot.capacity - slot.booked;
              
              return (
                <button
                  key={slot.id}
                  onClick={() => !isFull && setSelectedSlot(isSelected ? null : slot.id)}
                  disabled={isFull}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    isFull 
                      ? 'bg-muted border-muted cursor-not-allowed opacity-50' 
                      : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold">{slot.startTime}</p>
                  <p className="text-xs text-muted-foreground">
                    {isFull ? 'Full' : `${slotsLeft} left`}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">Location</h2>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-48 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-muted-foreground">{gym.address}</p>
                  <Button variant="link" onClick={handleNavigate} className="mt-2">
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Per session</p>
            <p className="text-2xl font-bold text-primary">₹{gym.pricePerSession}</p>
          </div>
          <Button variant="gym" size="lg" onClick={handleBookSlot} className="flex-1 max-w-xs">
            <Zap className="w-5 h-5 mr-2" />
            {selectedSlot ? 'Book Selected Slot' : 'Book Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GymDetails;
