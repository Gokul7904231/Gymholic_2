import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, RefreshCw } from 'lucide-react';
import CustomerLayout from '@/components/layouts/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockBookings } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Bookings = () => {
  const { toast } = useToast();
  const [bookings] = useState(mockBookings);
  
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const handleBookAgain = (gymName: string) => {
    toast({
      title: 'Redirecting...',
      description: `Opening ${gymName} for rebooking.`,
    });
  };

  const getTimeRemaining = (date: string, time: string) => {
    const bookingDate = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = bookingDate.getTime() - now.getTime();
    
    if (diff < 0) return 'Started';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} left`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  const BookingCard = ({ booking, showCountdown = false }: { booking: typeof bookings[0], showCountdown?: boolean }) => (
    <Card className="overflow-hidden gym-card-hover">
      <CardContent className="p-0">
        <div className="flex">
          <img 
            src={booking.gymImage} 
            alt={booking.gymName}
            className="w-24 h-24 object-cover"
          />
          <div className="flex-1 p-4">
            <h3 className="font-semibold mb-1">{booking.gymName}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              <span>{booking.date}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{booking.startTime} - {booking.endTime}</span>
            </div>
            
            {showCountdown && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Clock className="w-4 h-4" />
                {getTimeRemaining(booking.date, booking.startTime)}
              </div>
            )}
            
            {booking.status === 'completed' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleBookAgain(booking.gymName)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Book Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12">
      <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display font-bold mb-6">My Bookings</h1>
          
          <Tabs defaultValue="upcoming">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BookingCard booking={booking} showCountdown />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No upcoming bookings — let's start your fitness journey!" />
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedBookings.length > 0 ? (
                <div className="space-y-4">
                  {completedBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BookingCard booking={booking} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No completed bookings yet." />
              )}
            </TabsContent>
            
            <TabsContent value="cancelled">
              {cancelledBookings.length > 0 ? (
                <div className="space-y-4">
                  {cancelledBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BookingCard booking={booking} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No cancelled bookings." />
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </CustomerLayout>
  );
};

export default Bookings;
