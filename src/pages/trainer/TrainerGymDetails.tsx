import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import TrainerLayout from '@/components/layouts/TrainerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, X, Image as ImageIcon, MapPin, 
  Clock, Info, Dumbbell, Sparkles,
  Instagram, Facebook, Twitter, Youtube, Phone, PhoneCall, Zap, Save,
  Ticket, CalendarRange
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", 
  "Chennai", "Pune", "Kolkata", "Ahmedabad", 
  "Jaipur", "Surat", "Chandigarh", "Indore"
];

const TrainerGymDetails = () => {
  const { toast } = useToast();

  // 1. DRAFT STATE (What you are typing)
  const [gymData, setGymData] = useState({
    name: 'PowerFit Elite',
    address: '123 Fitness Avenue, Downtown',
    city: 'Mumbai',
    openTime: '05:00',
    closeTime: '23:00',
    pricePerSession: '150',
    pricePerMonth: '2500',
    description: 'A premium fitness center with state-of-the-art equipment.',
  });

  // 2. PUBLISHED STATE (What appears in the Hero Banner)
  // Initialized with gymData so it shows data on load
  const [viewData, setViewData] = useState(gymData);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>(['Crossfit', 'Powerlifting']);
  const [amenities, setAmenities] = useState<string[]>(['Steam Room', 'Parking']);
  const [featureInput, setFeatureInput] = useState('');
  const [amenityInput, setAmenityInput] = useState('');
  const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '', twitter: '', youtube: '' });
  const [contacts, setContacts] = useState({ primary: '', secondary: '' });

  // 3. UPDATED BUSINESS HEALTH LOGIC
  // Only counts mandatory fields. Social links are excluded.
  const strength = useMemo(() => {
    const mandatoryFields = [
      gymData.name, 
      gymData.address, 
      gymData.city, 
      gymData.openTime,
      gymData.closeTime,
      gymData.description, 
      gymData.pricePerSession,
      gymData.pricePerMonth,
      imagePreview, 
      contacts.primary, 
      features.length > 0, 
      amenities.length > 0
    ];
    
    // Calculate percentage based on 12 mandatory items
    const filledCount = mandatoryFields.filter(Boolean).length;
    return Math.round((filledCount / mandatoryFields.length) * 100);
  }, [gymData, imagePreview, contacts, features, amenities]);

  // 4. UPDATED SAVE HANDLER WITH 10-DIGIT VALIDATION
  const handleSave = () => {
    const missingFields = [];

    if (!gymData.name.trim()) missingFields.push("Gym Name");
    if (!gymData.city.trim()) missingFields.push("City");
    if (!gymData.address.trim()) missingFields.push("Address");
    if (!gymData.openTime) missingFields.push("Opening Time");
    if (!gymData.closeTime) missingFields.push("Closing Time");
    if (!gymData.description.trim()) missingFields.push("Detailed Bio");
    if (!gymData.pricePerSession) missingFields.push("Session Price");
    if (!gymData.pricePerMonth) missingFields.push("Monthly Price");
    if (!imagePreview) missingFields.push("Cover Photo");
    
    // NEW: Check for exactly 10 digits
    if (contacts.primary.length < 10) missingFields.push("Valid Primary Contact (10 digits)");
    
    if (features.length === 0) missingFields.push("Features");
    if (amenities.length === 0) missingFields.push("Amenities");

    // If there are missing fields, block the save and show the list
    if (missingFields.length > 0) {
      toast({ 
        title: "Missing Information", 
        // Join the array into a readable string
        description: `You are missing: ${missingFields.join(', ')}.`,
        variant: "destructive",
        className: "border-red-500 bg-red-50 text-red-900" // Optional: Styling for better visibility
      });
      return;
    }

    // If validation passes
    setViewData(gymData);
    
    toast({ 
      title: "Profile Synchronized", 
      description: "Your changes are now live on the member app.",
      className: "bg-green-600 text-white border-none"
    });
  };

  return (
    <TrainerLayout gymName={gymData.name} subscriptionStatus="active">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-32">
        
        {/* --- HERO BANNER (Uses viewData) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 group relative h-[350px] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900"
          >
            <img 
              src={imagePreview || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070'} 
              className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" 
              alt="Gym Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
            
            <div className="absolute bottom-8 left-8 space-y-3">
              <Badge className="bg-orange-500 hover:bg-orange-600 border-none px-4 py-1 text-xs font-bold shadow-lg">PREMIUM PARTNER</Badge>
              {/* DYNAMIC NAME (Updates only on Save) */}
              <h1 className="text-4xl font-black text-white tracking-tight leading-none">{viewData.name}</h1>
              
              <div className="flex items-center gap-4 text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                  <MapPin className="w-3.5 h-3.5" /> 
                  {/* DYNAMIC CITY */}
                  {viewData.city}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
                  <Clock className="w-3.5 h-3.5" /> 
                  {/* DYNAMIC TIME */}
                  {viewData.openTime} - {viewData.closeTime}
                </span>
              </div>
            </div>

            <label className="absolute top-8 right-8 cursor-pointer flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-5 py-2.5 rounded-2xl border border-white/20 transition-all font-semibold shadow-2xl">
              <ImageIcon className="w-4 h-4" /> Edit Cover
              <input type="file" hidden onChange={(e) => e.target.files && setImagePreview(URL.createObjectURL(e.target.files[0]))} />
            </label>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <Card className="h-full border border-slate-900 shadow-2xl bg-slate-950 text-white rounded-[2rem] flex flex-col items-center justify-center p-8 relative overflow-hidden text-center">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/10 rounded-full blur-[80px]" />
              <div className="relative z-10 space-y-6">
                <div className="relative inline-block">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <motion.circle 
                      cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                      strokeDasharray={364.4} 
                      animate={{ strokeDashoffset: 364.4 - (364.4 * strength) / 100 }} 
                      className={`${strength === 100 ? 'text-green-500' : 'text-orange-500'}`} 
                      transition={{ duration: 1.5, ease: "circOut" }} 
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-3xl font-black">{strength}%</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold flex items-center justify-center gap-2">Business Health <Zap className="w-5 h-5 text-orange-400 fill-orange-400"/></h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[200px] mx-auto">
                    {strength === 100 ? "Profile Complete! Ready to Publish." : "Fill all mandatory sections to enable saving."}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* --- FORM SECTION (Uses gymData) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            <Card className="border border-slate-900 shadow-sm rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/80 border-b p-8">
                <CardTitle className="text-xl font-bold flex items-center gap-3"><Info className="w-6 h-6 text-orange-600"/> Essential Identity</CardTitle>
                <CardDescription>Update your public branding and location details.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Gym Name</Label>
                    <Input value={gymData.name} onChange={(e) => setGymData({...gymData, name: e.target.value})} className="h-12 bg-slate-50 border-none text-slate-900 font-medium focus:ring-2 focus:ring-orange-500/20" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">City</Label>
                    <Select onValueChange={(value) => setGymData({...gymData, city: value})} defaultValue={gymData.city}>
                      <SelectTrigger className="h-12 bg-slate-50 border-none text-slate-900 font-medium focus:ring-2 focus:ring-orange-500/20">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-100 shadow-xl rounded-xl p-1">
                        {CITIES.map((city) => (
                          <SelectItem key={city} value={city} className="focus:bg-orange-500 focus:text-white cursor-pointer font-medium rounded-lg my-0.5 transition-colors">
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Opening Time</Label>
                    <div className="relative">
                        <Clock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <Input type="time" value={gymData.openTime} onChange={(e) => setGymData({...gymData, openTime: e.target.value})} className="h-12 pl-12 bg-slate-50 border-none text-slate-900 font-medium" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Closing Time</Label>
                    <div className="relative">
                        <Clock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <Input type="time" value={gymData.closeTime} onChange={(e) => setGymData({...gymData, closeTime: e.target.value})} className="h-12 pl-12 bg-slate-50 border-none text-slate-900 font-medium" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Detailed Bio</Label>
                  <Textarea value={gymData.description} onChange={(e) => setGymData({...gymData, description: e.target.value})} className="min-h-[160px] bg-slate-50 border-none text-base leading-relaxed p-4" placeholder="Tell your story..." />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-slate-900 shadow-sm rounded-[2rem] bg-white">
                    <CardHeader><CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Dumbbell className="w-4 h-4"/> Features</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-wrap gap-2 min-h-[50px]">
                            {features.map((f, i) => <Badge key={i} className="bg-orange-50 text-orange-700 hover:bg-orange-100 border-none px-4 py-1.5 rounded-xl font-bold transition-all">{f} <X className="ml-2 w-3.5 h-3.5 cursor-pointer" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}/></Badge>)}
                        </div>
                        <div className="flex gap-2">
                          <Input placeholder="Add skill..." value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="h-11 border-slate-100" />
                          <Button onClick={() => {if(featureInput){setFeatures([...features, featureInput]); setFeatureInput('');}}} >Add</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate-900 shadow-sm rounded-[2rem] bg-white">
                    <CardHeader><CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Sparkles className="w-4 h-4"/> Amenities</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-wrap gap-2 min-h-[50px]">
                            {amenities.map((a, i) => <Badge key={i} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-4 py-1.5 rounded-xl font-bold transition-all">{a} <X className="ml-2 w-3.5 h-3.5 cursor-pointer" onClick={() => setAmenities(amenities.filter((_, idx) => idx !== i))}/></Badge>)}
                        </div>
                        <div className="flex gap-2">
                          <Input placeholder="Add perk..." value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} className="h-11 border-slate-100" />
                          <Button variant="secondary" onClick={() => {if(amenityInput){setAmenities([...amenities, amenityInput]); setAmenityInput('');}}} >Add</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
            
            {/* --- DARK MODE REVENUE CONFIGURATION --- */}
            <Card className="border border-slate-900 shadow-2xl bg-slate-900 text-white rounded-[1.5rem] overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[50px] pointer-events-none" />
              <CardHeader className="pb-2 relative z-10 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400">Financials</CardTitle>
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400 text-[9px] uppercase tracking-widest px-2">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 pb-8 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between group/rate">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-orange-400 group-hover/rate:bg-orange-500 group-hover/rate:text-white transition-colors">
                        <Ticket className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Per Session</span>
                        <span className="text-xs text-slate-500">Walk-in rate</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-slate-500 mr-1">₹</span>
                      <Input className="w-20 bg-transparent border-none text-right text-3xl font-black text-white p-0 h-auto focus-visible:ring-0 placeholder-slate-700" value={gymData.pricePerSession} onChange={(e) => setGymData({...gymData, pricePerSession: e.target.value})} />
                    </div>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex items-center justify-between group/pass">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-orange-400 group-hover/pass:bg-orange-500 group-hover/pass:text-white transition-colors">
                        <CalendarRange className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly</span>
                        <span className="text-xs text-slate-500">Subscription</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-medium text-slate-500 mr-1">₹</span>
                      <Input className="w-24 bg-transparent border-none text-right text-3xl font-black text-white p-0 h-auto focus-visible:ring-0 placeholder-slate-700" value={gymData.pricePerMonth} onChange={(e) => setGymData({...gymData, pricePerMonth: e.target.value})} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-900 shadow-sm rounded-[2rem] bg-white overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-orange-600"/> Direct Reach
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-2 space-y-6">
                    <div className="space-y-4">
                        {/* PRIMARY CONTACT */}
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400">Primary Contact *</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-sm">+91</span>
                                <Input 
                                  placeholder="__________" 
                                  className="h-12 pl-12 bg-slate-50 border-none font-bold tracking-widest" 
                                  type="tel" 
                                  maxLength={10}
                                  value={contacts.primary} 
                                  onChange={(e) => {
                                    // Regex: Remove any non-number character
                                    const value = e.target.value.replace(/\D/g, '');
                                    // Only update if length is <= 10
                                    if (value.length <= 10) {
                                        setContacts({...contacts, primary: value});
                                    }
                                  }} 
                                />
                            </div>
                        </div>

                        {/* SECONDARY CONTACT */}
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400">Secondary Contact</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-sm">+91</span>
                                <Input 
                                  placeholder="__________" 
                                  className="h-12 pl-12 bg-slate-50 border-none tracking-widest" 
                                  type="tel"
                                  maxLength={10}
                                  value={contacts.secondary} 
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value.length <= 10) {
                                        setContacts({...contacts, secondary: value});
                                    }
                                  }} 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <Separator />

                    <div className="grid grid-cols-1 gap-3">
                        {['Instagram', 'Youtube', 'Twitter', 'Facebook'].map((social) => (
                            <div key={social} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                                <div className="p-2 bg-white rounded-xl shadow-sm group-focus-within:text-orange-600 transition-colors">
                                  {social === 'Instagram' && <Instagram className="w-4 h-4 text-pink-500" />}
                                  {social === 'Youtube' && <Youtube className="w-4 h-4 text-red-600" />}
                                  {social === 'Twitter' && <Twitter className="w-4 h-4 text-sky-400" />}
                                  {social === 'Facebook' && <Facebook className="w-4 h-4 text-blue-700" />}
                                </div>
                                <Input 
                                  placeholder={`${social} url (Optional)`} 
                                  className="border-none bg-transparent h-6 text-xs p-0 focus-visible:ring-0 font-medium" 
                                  value={socialLinks[social as keyof typeof socialLinks]}
                                  onChange={(e) => setSocialLinks({...socialLinks, [social]: e.target.value})}
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
        
        {/* --- BOTTOM RIGHT FAB (Only saves if Strength == 100) --- */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              onClick={handleSave} 
              className={`h-16 px-8 rounded-full shadow-[0_10px_40px_-10px_rgba(234,88,12,0.5)] font-bold text-lg flex items-center gap-3 border-4 border-white/10 backdrop-blur-md ${strength === 100 ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-slate-800 text-slate-400 cursor-not-allowed'}`}
            >
              <Save className="w-5 h-5" />
              Save Changes
            </Button>
          </motion.div>
        </div>

      </div>
    </TrainerLayout>
  );
};

export default TrainerGymDetails;