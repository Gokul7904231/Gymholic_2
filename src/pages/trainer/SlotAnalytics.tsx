import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import TrainerLayout from '@/components/layouts/TrainerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  TrendingUp, Users, Download, Sparkles, 
  ArrowUpRight, ArrowDown, Zap, IndianRupee,
  FileText, AlertTriangle, Lightbulb, Activity, BarChart3,
  AlertCircle, UserX, Phone, Mail, Star, MessageCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

// --- MOCK DATASETS ---
const DATA_SETS = {
  today: {
    chart: [
      { label: '6AM', bookings: 12, revenue: 1800 },
      { label: '8AM', bookings: 18, revenue: 2700 },
      { label: '10AM', bookings: 8, revenue: 1200 },
      { label: '12PM', bookings: 5, revenue: 750 },
      { label: '4PM', bookings: 10, revenue: 1500 },
      { label: '6PM', bookings: 20, revenue: 3000 },
      { label: '8PM', bookings: 15, revenue: 2250 },
    ],
    kpi: { total: 88, util: '65%', revenue: '₹13.2k', growth: '+5%', noshow: '12%' },
    extremes: { peak: '6:00 PM', low: '2:00 PM' },
    waitlist: { count: 8, lostRevenue: '₹2,400' },
    insights: [
      { type: 'alert', title: "Surge Detected", text: "Evening slots are filling 40% faster than usual.", icon: Zap, color: "text-amber-400" },
      { type: 'tip', title: "Staffing Tip", text: "Expect a rush at 6PM. Ensure 2 trainers are on floor.", icon: Users, color: "text-blue-400" },
    ]
  },
  weekly: {
    chart: [
      { label: 'Mon', bookings: 145, revenue: 21750 },
      { label: 'Tue', bookings: 132, revenue: 19800 },
      { label: 'Wed', bookings: 148, revenue: 22200 },
      { label: 'Thu', bookings: 160, revenue: 24000 },
      { label: 'Fri', bookings: 155, revenue: 23250 },
      { label: 'Sat', bookings: 90, revenue: 13500 },
      { label: 'Sun', bookings: 75, revenue: 11250 },
    ],
    kpi: { total: 905, util: '78%', revenue: '₹1.35L', growth: '+12%', noshow: '8%' },
    extremes: { peak: 'Thursday', low: 'Sunday' },
    waitlist: { count: 42, lostRevenue: '₹12,600' },
    insights: [
      { type: 'opportunity', title: "Pricing Opportunity", text: "Thursday is your peak. Increase price by 10% for evening slots.", icon: IndianRupee, color: "text-green-400" },
      { type: 'alert', title: "Capacity Warning", text: "Monday Morning slots are hitting 95% capacity.", icon: AlertTriangle, color: "text-orange-400" },
      { type: 'tip', title: "Engagement", text: "Weekend attendance is low. Launch a 'Sunday Warrior' challenge.", icon: Lightbulb, color: "text-purple-400" }
    ]
  },
  monthly: {
    chart: [
      { label: 'Week 1', bookings: 850, revenue: 127500 },
      { label: 'Week 2', bookings: 920, revenue: 138000 },
      { label: 'Week 3', bookings: 880, revenue: 132000 },
      { label: 'Week 4', bookings: 1050, revenue: 157500 },
    ],
    kpi: { total: 3700, util: '82%', revenue: '₹5.55L', growth: '+8%', noshow: '5%' },
    extremes: { peak: 'Week 4', low: 'Week 1' },
    waitlist: { count: 156, lostRevenue: '₹46,800' },
    insights: [
      { type: 'trend', title: "Strong Finish", text: "End-of-month bookings are trending up by 20%.", icon: TrendingUp, color: "text-blue-400" },
      { type: 'opportunity', title: "Package Upsell", text: "High frequency users detected. Push 'Quarterly Pass' promo.", icon: Sparkles, color: "text-pink-400" }
    ]
  }
};

const WAITLIST_USERS = [
  { id: 1, name: "Rahul Verma", slot: "06:00 PM Today", status: "Missed", phone: "+91 98765 43210" },
  { id: 2, name: "Sarah Khan", slot: "07:00 PM Today", status: "Missed", phone: "+91 98765 43211" },
  { id: 3, name: "Amit Patel", slot: "06:00 AM Tomorrow", status: "Pending", phone: "+91 98765 43212" },
  { id: 4, name: "Priya Singh", slot: "06:00 PM Today", status: "Missed", phone: "+91 98765 43213" },
  { id: 5, name: "Vikram Malhotra", slot: "08:00 AM Today", status: "Missed", phone: "+91 98765 43214" },
];

const FEEDBACK_DATA = [
  { id: 1, user: "Rahul S.", slot: "06:00 AM", rating: 5, comment: "Trainer energy was amazing today! 🔥", time: "2h ago" },
  { id: 2, user: "Priya K.", slot: "06:00 PM", rating: 3, comment: "A bit too crowded near the cardio section.", time: "Yesterday" },
  { id: 3, user: "Amit V.", slot: "07:00 AM", rating: 5, comment: "Perfect temperature and vibe.", time: "Yesterday" },
  { id: 4, user: "Javid Pandi.", slot: "07:00 AM", rating: 5, comment: "I had an good workout and vibe.", time: "Yesterday" },
];

const SLOT_PERFORMANCE = [
  { time: '06:00 - 07:00', booked: 19, capacity: 20, status: 'critical' },
  { time: '07:00 - 08:00', booked: 20, capacity: 20, status: 'critical' },
  { time: '08:00 - 09:00', booked: 15, capacity: 20, status: 'good' },
  { time: '17:00 - 18:00', booked: 18, capacity: 25, status: 'good' },
  { time: '18:00 - 19:00', booked: 12, capacity: 25, status: 'low' },
];

const HEATMAP_DATA = [
  { time: 'Morning', mon: 90, tue: 85, wed: 88, thu: 95, fri: 80, sat: 60, sun: 40 },
  { time: 'Afternoon', mon: 40, tue: 35, wed: 45, thu: 40, fri: 30, sat: 70, sun: 75 },
  { time: 'Evening', mon: 85, tue: 90, wed: 80, thu: 85, fri: 70, sat: 50, sun: 30 },
];

const TrainerSlotAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'today' | 'weekly' | 'monthly'>('weekly');
  const [showRevenue, setShowRevenue] = useState(false);

  const currentData = useMemo(() => DATA_SETS[timeRange], [timeRange]);

  const handleExport = () => {
    const headers = ["Label,Bookings,Revenue"];
    const rows = currentData.chart.map(row => `${row.label},${row.bookings},${row.revenue}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `slot_analytics_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getUtilColor = (current: number, max: number) => {
    const percent = (current / max) * 100;
    if (percent >= 90) return 'bg-red-600';
    if (percent >= 70) return 'bg-orange-500';
    return 'bg-emerald-500';
  };

  const getHeatmapColor = (val: number) => {
    if (val > 80) return 'bg-orange-600 text-white';
    if (val > 50) return 'bg-orange-400 text-white';
    return 'bg-orange-200 text-orange-900';
  };

  return (
    <TrainerLayout gymName="PowerFit Arena" subscriptionStatus="active">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Slot Analytics</h1>
            <p className="text-slate-500 mt-1">Deep dive into occupancy, revenue, and member behavior</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={(val: any) => setTimeRange(val)}>
              <SelectTrigger className="w-[140px] bg-white border-2 border-slate-900 font-bold text-slate-900 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} variant="outline" className="gap-2 border-2 border-slate-900 rounded-xl font-bold text-slate-900 hover:bg-slate-100">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </div>
        </div>

        {/* --- KPI CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] rounded-2xl bg-white p-2 transform transition-transform hover:-translate-y-1">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-wider">Total Bookings</p>
                  <motion.h3 key={currentData.kpi.total} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-slate-900 mt-2">{currentData.kpi.total}</motion.h3>
                </div>
                <div className="p-2.5 bg-slate-900 text-white rounded-xl"><Users className="w-5 h-5"/></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md border border-emerald-100">
                <ArrowUpRight className="w-3 h-3" /> {currentData.kpi.growth}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] rounded-2xl bg-white p-2 transform transition-transform hover:-translate-y-1">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-wider">Avg Utilization</p>
                  <motion.h3 key={currentData.kpi.util} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-slate-900 mt-2">{currentData.kpi.util}</motion.h3>
                </div>
                <div className="p-2.5 bg-orange-500 text-white rounded-xl"><Activity className="w-5 h-5"/></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 w-fit px-2 py-1 rounded-md border border-orange-100">
                <Zap className="w-3 h-3" /> Optimal
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] rounded-2xl bg-white p-2 transform transition-transform hover:-translate-y-1">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-wider">No-Show Rate</p>
                  <motion.h3 key={currentData.kpi.noshow} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-slate-900 mt-2">{currentData.kpi.noshow}</motion.h3>
                </div>
                <div className="p-2.5 bg-red-100 text-red-600 rounded-xl"><UserX className="w-5 h-5"/></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 w-fit px-2 py-1 rounded-md border border-red-100">
                <ArrowUpRight className="w-3 h-3" /> +2% vs Last
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] rounded-2xl bg-slate-900 text-white p-2 transform transition-transform hover:-translate-y-1">
            <CardContent className="p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-wider">Slot Revenue</p>
                  <motion.h3 key={currentData.kpi.revenue} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-white mt-2">{currentData.kpi.revenue}</motion.h3>
                </div>
                <div className="p-2.5 bg-white/10 text-white rounded-xl backdrop-blur-sm"><IndianRupee className="w-5 h-5"/></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-orange-400 bg-orange-500/10 w-fit px-2 py-1 rounded-md border border-orange-500/20 relative z-10">
                <ArrowUpRight className="w-3 h-3" /> +8.5% Growth
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: CHART & AI & RATINGS --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Main Chart */}
            <Card className="border-2 border-slate-900 shadow-sm rounded-[2rem] bg-white overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900 capitalize flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    {timeRange} Trends
                  </CardTitle>
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                      <Switch id="revenue-mode" checked={showRevenue} onCheckedChange={setShowRevenue} className="data-[state=checked]:bg-green-600"/>
                      <Label htmlFor="revenue-mode" className="text-xs font-bold text-slate-600 cursor-pointer">Show Revenue</Label>
                   </div>
                </div>
              </CardHeader>
              <CardContent className="h-[350px] w-full pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData.chart}>
                    <defs>
                      <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff'}} />
                    <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorBookings)" />
                    {showRevenue && <Area type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 2. AI Insights */}
            <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 px-1">
                    <Sparkles className="w-5 h-5 text-indigo-600 fill-indigo-600" /> Intelligence Feed
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {currentData.insights?.map((insight, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="bg-slate-900 text-white border border-slate-800 p-5 rounded-2xl shadow-lg relative overflow-hidden flex items-start gap-4"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                            <div className={`p-3 rounded-xl bg-white/10 ${insight.color}`}>
                                <insight.icon className="w-6 h-6" />
                            </div>
                            <div className="relative z-10">
                                <h4 className={`font-bold text-sm mb-1 ${insight.color} uppercase tracking-wider`}>{insight.title}</h4>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">{insight.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 3. Member Experience Pulse */}
            <Card className="border-2 border-slate-900 shadow-sm rounded-[2rem] bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-100 pb-4 bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-blue-600" /> Member Experience
                            </CardTitle>
                            <CardDescription>Recent feedback from attended slots</CardDescription>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-black text-slate-900">4.8</span>
                            <span className="text-xs font-bold text-slate-400">/ 5.0</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                        {FEEDBACK_DATA.map((feedback) => (
                            <div key={feedback.id} className="p-5 hover:bg-slate-50 transition-colors flex gap-4">
                                <Avatar className="h-10 w-10 border border-slate-200">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${feedback.id}`} />
                                    <AvatarFallback>{feedback.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-bold text-slate-900">{feedback.user}</h4>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{feedback.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="secondary" className="text-[10px] font-bold bg-slate-100 text-slate-500 h-5 px-1.5">{feedback.slot}</Badge>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">"{feedback.comment}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                        <Button variant="link" className="text-blue-600 font-bold text-xs">View All Reviews</Button>
                    </div>
                </CardContent>
            </Card>

          </div>

          {/* --- RIGHT COLUMN: SIDEBAR METRICS --- */}
          <div className="space-y-8">
            
            {/* 1. PEAK & LOW DEMAND */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="border-2 border-slate-900 rounded-2xl bg-orange-50 overflow-hidden">
                    <CardContent className="p-4 text-center">
                        <div className="mx-auto w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2 text-orange-600"><TrendingUp className="w-5 h-5" /></div>
                        <p className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Peak Time</p>
                        <p className="text-lg font-black text-slate-900">{currentData.extremes.peak}</p>
                    </CardContent>
                </Card>
                <Card className="border-2 border-slate-900 rounded-2xl bg-slate-50 overflow-hidden">
                    <CardContent className="p-4 text-center">
                        <div className="mx-auto w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mb-2 text-slate-600"><ArrowDown className="w-5 h-5" /></div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Low Traffic</p>
                        <p className="text-lg font-black text-slate-900">{currentData.extremes.low}</p>
                    </CardContent>
                </Card>
            </div>

            {/* 2. WAITLIST CARD (Dialog Enabled) */}
            <Card className="border-2 border-dashed border-red-200 bg-red-50/50 rounded-2xl shadow-sm">
                <CardContent className="p-5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <p className="text-xs font-bold text-red-400 uppercase tracking-widest">Missed Revenue</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                             <h3 className="text-2xl font-black text-slate-900">{currentData.waitlist.count}</h3>
                             <span className="text-xs font-bold text-slate-400">Waitlisted</span>
                        </div>
                        <p className="text-xs font-medium text-red-500 mt-1">Est. Loss: {currentData.waitlist.lostRevenue}</p>
                    </div>
                    
                    {/* Waitlist Modal */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-100 h-8 text-xs">View List</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-2xl">
                            <DialogHeader>
                                <DialogTitle>Waitlist Demand</DialogTitle>
                                <DialogDescription>Users who couldn't book a slot recently.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                                {WAITLIST_USERS.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-slate-200">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.slot}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-500 hover:bg-blue-50 rounded-full"><Phone className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500 hover:bg-green-50 rounded-full"><Mail className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl">Notify All via WhatsApp</Button>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            {/* 3. REPORT STATUS */}
            <Card className="border-2 border-slate-900 shadow-sm rounded-[2rem] bg-white">
                <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                        <div>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-wider">Report Status</p>
                        <h3 className="text-lg font-black text-slate-900 mt-2">Up to date</h3>
                        </div>
                        <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl"><FileText className="w-5 h-5"/></div>
                    </div>
                    <div className="mt-5 text-xs text-slate-400 font-medium">
                        Last synced: Just now
                    </div>
                </CardContent>
            </Card>

            {/* 4. HEATMAP */}
            <Card className="border-2 border-slate-900 shadow-sm rounded-[2rem] bg-white h-fit">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-bold text-slate-900">Weekly Heatmap</CardTitle>
                <CardDescription>Traffic intensity visualization</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {HEATMAP_DATA.map((row, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.time}</p>
                      <div className="grid grid-cols-7 gap-2">
                        {['mon','tue','wed','thu','fri','sat','sun'].map((day, dIndex) => (
                          <div 
                            key={dIndex} 
                            className={`h-8 rounded-md flex items-center justify-center text-[10px] font-bold transition-transform hover:scale-110 cursor-help ${getHeatmapColor(row[day as keyof typeof row] as number)}`}
                            title={`${day.toUpperCase()}: ${row[day as keyof typeof row]}% Occupancy`}
                          >
                            {day.charAt(0).toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-200"></div><span className="text-[10px] text-slate-400 font-bold">Low</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400"></div><span className="text-[10px] text-slate-400 font-bold">Med</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-600"></div><span className="text-[10px] text-slate-400 font-bold">Peak</span></div>
                </div>
              </CardContent>
            </Card>

            {/* 5. LIVE STATUS */}
            <Card className="border-2 border-slate-900 shadow-sm rounded-[2rem] bg-white h-fit">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">Live Status</CardTitle>
                <CardDescription>Current slot fill rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {SLOT_PERFORMANCE.map((slot, index) => (
                  <div key={index} className="space-y-2 group">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{slot.time}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{slot.booked}/{slot.capacity} Booked</p>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                        slot.status === 'critical' ? 'bg-red-50 text-red-600 border-red-100' :
                        slot.status === 'good' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                      }`}>
                        {Math.round((slot.booked/slot.capacity)*100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(slot.booked/slot.capacity)*100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${getUtilColor(slot.booked, slot.capacity)}`} 
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </TrainerLayout>
  );
};

export default TrainerSlotAnalytics;