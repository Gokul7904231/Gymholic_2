import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Camera, Edit2, LogOut, 
  Trophy, Flame, Building2, ChevronRight, Activity, 
  CreditCard, Bell, Shield, Smartphone, Dumbbell, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock User Data
const USER = {
  name: "Arjun Mehta",
  email: "arjun@gymholic.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  tier: "Pro Member",
  joinDate: "Jan 2024",
  stats: {
    workouts: 142,
    streak: 12,
    gymsVisited: 8,
    calories: "12.5k"
  }
};

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(USER);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* 1. NEW GLOBAL HEADER (Sticky) */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Gymholic</span>
          </Link>

{/* Nav Links - Added Home and Orange Glow on Profile */}
    <div className="hidden md:flex items-center gap-6">
      <Link to="/customer/home" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
      <Link to="/customer/explore" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Explore</Link>
      <Link to="/customer/bookings" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Bookings</Link>
      <Link to="/customer/saved" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Saved</Link>
      
      {/* Profile item with Orange Glow (matching Image 10) */}
      <Link to="/customer/profile">
        <Button variant="ghost" className="bg-orange-50 text-orange-600 border border-orange-100 font-bold hover:bg-orange-100 gap-2">
           <User className="w-4 h-4" /> Profile
        </Button>
      </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8 border border-slate-200 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      {/* 2. HERO BACKGROUND (Sits below header) */}
      <div className="h-48 bg-slate-900 w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 3. LEFT SIDEBAR (Identity & Nav) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Identity Card - UPDATED BORDER */}
            <Card className="border border-slate-900 shadow-xl shadow-slate-200/50 overflow-hidden bg-white">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="relative mb-4 group">
                  <div className="w-28 h-28 rounded-full p-1.5 bg-white border border-slate-200 shadow-sm">
                    <Avatar className="w-full h-full">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-2xl">AM</AvatarFallback>
                    </Avatar>
                  </div>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-9 w-9 shadow-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-transform group-hover:scale-110">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{formData.name}</h2>
                <p className="text-sm text-slate-500 font-medium mb-4 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> {formData.location}
                </p>
                <Badge className="bg-slate-900 text-white hover:bg-slate-800 border-0 px-4 py-1.5 text-[10px] tracking-widest font-bold uppercase shadow-md shadow-slate-900/20">
                  {formData.tier}
                </Badge>

                <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-8 border-t border-slate-100">
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Joined</p>
                      <p className="text-sm font-bold text-slate-900">{formData.joinDate}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Plan</p>
                      <p className="text-sm font-bold text-slate-900">Yearly Elite</p>
                   </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Menu - UPDATED BORDERS */}
            <nav className="hidden lg:block space-y-2">
               {['Profile Settings', 'Booking History', 'Payment Methods', 'Notifications', 'Security'].map((item, i) => (
                 <button key={item} className={`w-full text-left px-4 py-3.5 rounded-lg text-sm font-bold flex items-center justify-between group transition-all border ${i === 0 ? 'bg-white border-slate-200 shadow-sm text-slate-900' : 'border-transparent text-slate-500 hover:bg-white hover:border-slate-200 hover:text-slate-900'}`}>
                    {item}
                    <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform group-hover:translate-x-1 ${i===0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                 </button>
               ))}
               <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex items-center gap-2 text-red-600 hover:bg-red-50 mt-4 transition-colors border border-transparent hover:border-red-100">
                  <LogOut className="w-4 h-4" /> Sign Out
               </button>
            </nav>
          </div>

          {/* 4. RIGHT CONTENT (Stats & Form) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Fitness Stats - UPDATED BORDERS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <StatsCard icon={Trophy} label="Total Workouts" value={formData.stats.workouts} color="text-yellow-600" bg="bg-yellow-50" />
               <StatsCard icon={Flame} label="Day Streak" value={formData.stats.streak} color="text-orange-600" bg="bg-orange-50" />
               <StatsCard icon={Building2} label="Gyms Visited" value={formData.stats.gymsVisited} color="text-blue-600" bg="bg-blue-50" />
               <StatsCard icon={Activity} label="Calories" value={formData.stats.calories} color="text-emerald-600" bg="bg-emerald-50" />
            </div>

            {/* Main Settings Panel - UPDATED BORDERS */}
            <Card className="border border-slate-900 shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold text-slate-900">Personal Information</CardTitle>
                  <CardDescription className="text-slate-500">Manage your personal details and public profile.</CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className={`font-bold transition-all ${isEditing ? "bg-slate-900 text-white shadow-md" : "border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                >
                  {isEditing ? 'Save Changes' : <><Edit2 className="w-3 h-3 mr-2" /> Edit Profile</>}
                </Button>
              </CardHeader>
              
              <CardContent className="pt-8 space-y-8">
                
                {/* Section 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                      <Input 
                        disabled={!isEditing} 
                        defaultValue={formData.name} 
                        className="pl-9 h-11 bg-white border-slate-300 focus:border-slate-900 focus:ring-slate-900/10 font-medium transition-all disabled:bg-slate-50 disabled:text-slate-500" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                      <Input 
                        disabled={!isEditing} 
                        defaultValue={formData.email} 
                        className="pl-9 h-11 bg-white border-slate-300 focus:border-slate-900 focus:ring-slate-900/10 font-medium transition-all disabled:bg-slate-50 disabled:text-slate-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</Label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                      <Input 
                        disabled={!isEditing} 
                        defaultValue={formData.phone} 
                        className="pl-9 h-11 bg-white border-slate-300 focus:border-slate-900 focus:ring-slate-900/10 font-medium transition-all disabled:bg-slate-50 disabled:text-slate-500" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</Label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                      <Input 
                        disabled={!isEditing} 
                        defaultValue={formData.location} 
                        className="pl-9 h-11 bg-white border-slate-300 focus:border-slate-900 focus:ring-slate-900/10 font-medium transition-all disabled:bg-slate-50 disabled:text-slate-500" 
                      />
                    </div>
                  </div>
                </div>

                {/* Linked Accounts */}
                <div className="pt-6 border-t border-slate-100">
                   <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Shield className="w-4 h-4"/> Connected Devices</h3>
                   <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
                            <Smartphone className="w-5 h-5 text-slate-900" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">Apple Health</p>
                            <p className="text-xs text-slate-500 font-medium">Syncs workouts & calories</p>
                         </div>
                      </div>
                      <Switch checked />
                   </div>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats - UPDATED BORDERS
const StatsCard = ({ icon: Icon, label, value, color, bg }: any) => (
  <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
    <Card className="border border-slate-900 shadow-sm bg-white h-full hover:border-slate-700 transition-colors">
      <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full gap-3">
        <div className={`p-3 rounded-full ${bg} ${color} ring-1 ring-inset ring-black/5`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Toggle Switch Component
const Switch = ({ checked }: { checked: boolean }) => (
  <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors border ${checked ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-200 border-slate-300'}`}>
    <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </div>
);

export default CustomerProfile;
