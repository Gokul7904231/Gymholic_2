import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, BadgeCheck, Users, Zap } from 'lucide-react';
import CustomerLayout from '@/components/layouts/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockGyms } from '@/data/mockData';

const ExploreGyms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const visibleGyms = mockGyms.filter(g => g.isVisible && g.subscriptionStatus === 'active');
  const filteredGyms = visibleGyms.filter(gym => 
    gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-accent/20 text-accent';
      case 'medium': return 'bg-gym-warning/20 text-gym-warning';
      case 'high': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-display font-bold mb-4">Explore Gyms</h1>
          
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search gyms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Filter Options */}
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 flex flex-wrap gap-2"
            >
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Near Me
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                High Rated
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Low Crowd
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Verified Only
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-4">
          {filteredGyms.length} gyms found near you
        </p>

        {/* Gym List */}
        <div className="space-y-4">
          {filteredGyms.map((gym, index) => (
            <motion.div
              key={gym.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/customer/gym/${gym.id}`}>
                <Card className="overflow-hidden gym-card-hover">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={gym.image} 
                        alt={gym.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        {gym.isVerified && (
                          <Badge className="bg-primary text-primary-foreground">
                            <BadgeCheck className="w-3 h-3 mr-1" /> Verified
                          </Badge>
                        )}
                        {gym.availableSlots <= 3 && (
                          <Badge variant="destructive">
                            🔥 {gym.availableSlots} slots left
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className={getCrowdColor(gym.crowdLevel)}>
                          <Users className="w-3 h-3 mr-1" />
                          {gym.crowdLevel.charAt(0).toUpperCase() + gym.crowdLevel.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{gym.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-gym-warning text-gym-warning" />
                          <span className="font-medium">{gym.rating}</span>
                          <span className="text-muted-foreground text-sm">({gym.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{gym.address}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">{gym.distance} • </span>
                          <span className="text-primary font-medium">{gym.walkTime}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-primary">
                            ₹{gym.pricePerSession}
                          </span>
                          <Button variant="gym" size="sm">
                            <Zap className="w-4 h-4 mr-1" /> Quick Book
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {gym.amenities.slice(0, 4).map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {gym.amenities.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{gym.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredGyms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No gyms found matching your search</p>
            <Button variant="gymOutline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default ExploreGyms;
