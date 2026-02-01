import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, MapPin, Clock, ChevronRight, Star, BadgeCheck, Users, Activity } from 'lucide-react';
import CustomerLayout from '@/components/layouts/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockGyms, mockBookings } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import BmiCalculator from './BmiCalculator';

const CustomerHome = () => {
  const { user } = useAuth();
  const [workoutStreak] = useState(3);
  const [totalWorkouts] = useState(24);
  const [caloriesBurned] = useState(12000);
  
  const upcomingBooking = mockBookings.find(b => b.status === 'upcoming');
  const recommendedGyms = mockGyms.filter(g => g.isVisible && g.subscriptionStatus === 'active').slice(0, 3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-accent';
      case 'medium': return 'text-gym-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            {getGreeting()}, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-muted-foreground">Ready for today's workout?</p>
        </motion.div>

        {/* Stats Cards */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
>
  {/* Day Streak */}
  <Card className="text-white bg-gradient-to-r from-orange-500 to-orange-600 border border-slate-900">
    <CardContent className="p-6 flex justify-between items-start">
      <div>
        <p className="text-sm opacity-90">Day Streak</p>
        <p className="text-xs opacity-80 mt-1">
          You've worked out {workoutStreak} days in a row 💪
        </p>
      </div>
      <Flame className="w-8 h-8 opacity-90" />
    </CardContent>
    <div className="px-6 pb-4 text-3xl font-bold">{workoutStreak}</div>
  </Card>

  {/* Total Workouts */}
  <Card className="text-white bg-gradient-to-r from-purple-500 to-pink-500 border border-slate-900">
    <CardContent className="p-6 flex justify-between items-start">
      <div>
        <p className="text-sm opacity-90">Total Workouts</p>
        <p className="text-xs opacity-80 mt-1">This month</p>
      </div>
      <Users className="w-8 h-8 opacity-90" />
    </CardContent>
    <div className="px-6 pb-4 text-3xl font-bold">{totalWorkouts}</div>
  </Card>

  {/* Calories Burned */}
  <Card className="text-white bg-gradient-to-r from-blue-500 to-cyan-500 border border-slate-900">
    <CardContent className="p-6 flex justify-between items-start">
      <div>
        <p className="text-sm opacity-90">Calories Burned</p>
        <p className="text-xs opacity-80 mt-1">Keep going strong!</p>
      </div>
      <Flame className="w-8 h-8 opacity-90" />
    </CardContent>
    <div className="px-6 pb-4 text-3xl font-bold">
      {Math.floor(caloriesBurned / 1000)}K
    </div>
  </Card>
</motion.div>


        {/* Upcoming Booking */}
        {upcomingBooking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold mb-4">Upcoming Workout</h2>
            <Card className="overflow-hidden border border-slate-900">
              <CardContent className="p-0">
                <div className="flex">
                  <img 
                    src={upcomingBooking.gymImage} 
                    alt={upcomingBooking.gymName}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold">{upcomingBooking.gymName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {upcomingBooking.date} • {upcomingBooking.startTime} - {upcomingBooking.endTime}
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Starts in 2 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {/* Find Nearby Gyms */}
          <Link to="/customer/explore">
            <Card className="gym-card-hover cursor-pointer h-full border border-slate-900">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
                <MapPin className="w-8 h-8 text-primary" />
                <span className="font-medium">Find Nearby Gyms</span>
              </CardContent>
            </Card>
          </Link>

          {/* BMI Calculator (NEW) */}
          <Link to="/customer/bmi">
            <Card className="gym-card-hover cursor-pointer h-full border-primary/30 border border-slate-900">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
                <Activity className="w-8 h-8 text-primary" />
                <span className="font-medium">BMI Calculator</span>
                <span className="text-xs text-muted-foreground">
                  Check your fitness level
                </span>
              </CardContent>
            </Card>
          </Link>

          {/* My Bookings */}
          <Link to="/customer/bookings">
            <Card className="gym-card-hover cursor-pointer h-full border border-slate-900">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
                <Clock className="w-8 h-8 text-primary" />
                <span className="font-medium">My Bookings</span>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Recommended Gyms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recommended for You</h2>
            <Link to="/customer/explore" className="text-primary text-sm font-medium flex items-center gap-1">
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recommendedGyms.map((gym, index) => (
              <motion.div
                key={gym.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link to={`/customer/gym/${gym.id}`}>
                  <Card className="overflow-hidden gym-card-hover border border-slate-900">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="relative">
                          <img 
                            src={gym.image} 
                            alt={gym.name}
                            className="w-28 h-28 object-cover"
                          />
                          {gym.availableSlots <= 2 && (
                            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
                              🔥 {gym.availableSlots} slots left
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{gym.name}</h3>
                                {gym.isVerified && (
                                  <BadgeCheck className="w-4 h-4 text-primary" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{gym.distance} • {gym.walkTime}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-gym-warning text-gym-warning" />
                              <span className="text-sm font-medium">{gym.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span className={`text-sm font-medium ${getCrowdColor(gym.crowdLevel)}`}>
                                {gym.crowdLevel.charAt(0).toUpperCase() + gym.crowdLevel.slice(1)} crowd
                              </span>
                            </div>
                            <span className="font-semibold text-primary">₹{gym.pricePerSession}/session</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nudge Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="border-dashed border-2 border-slate-900">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                💡 Pro tip: Book slots during off-peak hours for a better workout experience!
              </p>
              <Link to="/customer/explore">
                <Button variant="gymOutline">Explore Off-Peak Slots</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerHome;
