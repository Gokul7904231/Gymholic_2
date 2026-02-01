import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AddGym = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gymData, setGymData] = useState({ name: '', address: '', city: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Gym Created!', description: 'Complete your subscription to go live.' });
    navigate('/trainer/subscription');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gym-coral flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold">Add Your Gym</h1>
          <p className="text-muted-foreground">One email can add only one gym</p>
        </div>
        <Card>
          <CardHeader><CardTitle>Gym Information</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label>Gym Name</Label><Input required value={gymData.name} onChange={e => setGymData({...gymData, name: e.target.value})} placeholder="PowerFit Elite" /></div>
              <div><Label>Address</Label><Input required value={gymData.address} onChange={e => setGymData({...gymData, address: e.target.value})} placeholder="123 Fitness Ave" /></div>
              <div><Label>City</Label><Input required value={gymData.city} onChange={e => setGymData({...gymData, city: e.target.value})} placeholder="Mumbai" /></div>
              <Button type="submit" variant="gym" className="w-full">Continue to Subscription</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddGym;
