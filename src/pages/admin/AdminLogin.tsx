import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Define authorized credentials
  const ADMIN_EMAIL = "gokul32499@gmail.com";
  const ADMIN_PASS = "Aveon#333";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT CHECK: Only allow if inputs match the hardcoded credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      toast({ 
        title: 'Welcome Admin!', 
        description: 'Access granted successfully.',
        className: "bg-green-600 text-white border-none" // Optional styling for success
      });
      navigate('/admin/dashboard');
    } else {
      // Show error if credentials do not match
      toast({ 
        variant: "destructive", 
        title: 'Access Denied', 
        description: 'Invalid email or password.' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-secondary-foreground">Admin Login</h1>
          <p className="text-muted-foreground">Gymholic Administration</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl space-y-4 shadow-lg border border-border/50">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                id="email"
                type="email" 
                required 
                placeholder="admin@example.com"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="pl-11" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                id="password"
                type="password" 
                required 
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="pl-11" 
              />
            </div>
          </div>
          <Button type="submit" variant="gym" className="w-full font-bold mt-2">
            Login to Dashboard
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;