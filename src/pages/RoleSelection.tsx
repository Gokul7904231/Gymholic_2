import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setRole, user } = useAuth();

  const handleRoleSelect = (role: 'customer' | 'trainer') => {
    setRole(role);
    
    if (role === 'customer') {
      navigate('/customer/home');
    } else {
      // Check if trainer has a gym (simulated - always go to add gym for new trainers)
      navigate('/trainer/add-gym');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-gym-coral flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Welcome, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            How would you like to use Gymholic?
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Option */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <button
              onClick={() => handleRoleSelect('customer')}
              className="w-full bg-card border-2 border-border hover:border-primary rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-gym-coral/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-2xl font-display font-bold mb-3">Customer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Find and book gym sessions near you. Track your workouts and achieve your fitness goals.
              </p>
              
              <div className="mt-6 text-primary font-semibold flex items-center gap-2">
                Continue as Customer
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </motion.div>
          
          {/* Trainer Option */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button
              onClick={() => handleRoleSelect('trainer')}
              className="w-full bg-card border-2 border-border hover:border-primary rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-gym-coral/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-2xl font-display font-bold mb-3">Gym Trainer</h2>
              <p className="text-muted-foreground leading-relaxed">
                List your gym, manage slots, and grow your business with powerful analytics.
              </p>
              
              <div className="mt-6 text-primary font-semibold flex items-center gap-2">
                Continue as Gym Trainer
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
