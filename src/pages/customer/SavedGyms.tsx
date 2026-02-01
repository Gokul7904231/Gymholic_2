import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, BadgeCheck, Trash2 } from 'lucide-react';
import CustomerLayout from '@/components/layouts/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockGyms } from '@/data/mockData';

const SavedGyms = () => {
  const [savedGyms, setSavedGyms] = useState(mockGyms.slice(0, 2));

  const handleRemove = (gymId: string) => {
    setSavedGyms(savedGyms.filter(g => g.id !== gymId));
  };

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display font-bold mb-6">Saved Gyms</h1>
          
          {savedGyms.length > 0 ? (
            <div className="space-y-4">
              {savedGyms.map((gym, index) => (
                <motion.div
                  key={gym.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <Link to={`/customer/gym/${gym.id}`} className="flex-1">
                          <div className="flex">
                            <img 
                              src={gym.image} 
                              alt={gym.name}
                              className="w-28 h-28 object-cover"
                            />
                            <div className="flex-1 p-4">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{gym.name}</h3>
                                {gym.isVerified && (
                                  <BadgeCheck className="w-4 h-4 text-primary" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4" />
                                <span>{gym.distance}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-gym-warning text-gym-warning" />
                                <span className="text-sm">{gym.rating}</span>
                                <span className="text-primary font-semibold ml-auto">
                                  ₹{gym.pricePerSession}/session
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemove(gym.id)}
                          className="m-2"
                        >
                          <Trash2 className="w-5 h-5 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No saved gyms yet</p>
              <Link to="/customer/explore">
                <Button variant="gym">Explore Gyms</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </CustomerLayout>
  );
};

export default SavedGyms;
