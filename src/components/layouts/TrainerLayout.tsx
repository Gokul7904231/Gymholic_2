import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, LayoutDashboard, Building2, Clock, BarChart3, CreditCard, LogOut, Menu, X, Bell, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTrial } from '@/hooks/useTrial';
import TrialBadge from '@/components/saas/TrialBadge';
import NotificationDropdown from '@/components/saas/NotificationDropdown';
import UpgradeModal from '@/components/saas/UpgradeModal';

interface TrainerLayoutProps {
  children: React.ReactNode;
  gymName: string;
  subscriptionStatus: 'active' | 'trial' | 'expired';
  showCustomerNav?: boolean;
}

const TrainerLayout = ({
  children,
  gymName,
  subscriptionStatus = 'active',
  showCustomerNav = false,
}: TrainerLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navItems = [
    { path: '/trainer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/trainer/gym-details', label: 'Gym Details', icon: Building2 },
    { path: '/trainer/slots', label: 'Slots & Capacity', icon: Clock },
    { path: '/trainer/analytics', label: 'Slot Analytics', icon: BarChart3 },
    { path: '/trainer/subscription', label: 'Subscription', icon: CreditCard },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const { daysLeft, isTrialActive } = useTrial();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <Link to="/trainer/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gym-coral flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">Gymholic</span>
            </Link>
          </div>
          
          {/* Gym Info */}
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold truncate">{gymName}</h3>
            <Badge 
              variant={subscriptionStatus === 'active' ? 'default' : 'destructive'}
              className="mt-2"
            >
              {subscriptionStatus === 'active' ? '✓ Active' : 'Expired'}
            </Badge>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3" 
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
          <header className="md:hidden sticky top-0 bg-background border-b border-border z-30">
            <div className="flex items-center justify-between px-4 h-16">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            
              <div className="flex items-center gap-2">
                <span className="font-semibold">{gymName}</span>
                <Badge variant={subscriptionStatus === 'active' ? 'default' : 'destructive'}>
                  {subscriptionStatus === 'active' ? 'Active' : 'Expired'}
                </Badge>
              </div>
            </div>
          </header>


        
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default TrainerLayout;
