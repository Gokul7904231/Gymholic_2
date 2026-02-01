import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building2, TrendingUp, Users, DollarSign, 
  Activity, Search, MoreVertical, LogIn, AlertOctagon, 
  CreditCard, XCircle, Filter, Crown, ChevronLeft, ChevronRight,
  ArrowUpDown, Megaphone, Settings, Server, Receipt, CheckCircle2,
  Edit, Shield, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- INITIAL MOCK DATA ---
const INITIAL_GYMS = [
  { id: 1, name: "Iron Pump Gym", owner: "Rajesh K.", email: "raj@ironpump.com", plan: "Elite Yearly", status: "Active", revenue: 12000, slots: { used: 450, total: 500 }, health: 95, features: { ai: true, beta: false, api: true } },
  { id: 2, name: "FitLife Studio", owner: "Sarah M.", email: "sarah@fitlife.com", plan: "Monthly Pro", status: "Active", revenue: 4500, slots: { used: 85, total: 100 }, health: 88, features: { ai: false, beta: false, api: true } },
  { id: 3, name: "Zen Yoga", owner: "Priya D.", email: "priya@zen.com", plan: "Free Trial", status: "Pending", revenue: 0, slots: { used: 12, total: 50 }, health: 45, features: { ai: false, beta: false, api: false } },
  { id: 4, name: "CrossFit Alpha", owner: "Mike T.", email: "mike@alpha.com", plan: "Elite Yearly", status: "Active", revenue: 24000, slots: { used: 890, total: 1000 }, health: 98, features: { ai: true, beta: true, api: true } },
  { id: 5, name: "Old School Gym", owner: "Vikram S.", email: "vik@oldschool.com", plan: "Monthly Pro", status: "Suspended", revenue: 2100, slots: { used: 45, total: 100 }, health: 20, features: { ai: false, beta: false, api: false } },{ id: 6, name: "Old School Gym", owner: "Vikram S.", email: "vik@oldschool.com", plan: "Monthly Pro", status: "Suspended", revenue: 2100, slots: { used: 45, total: 100 }, health: 20, features: { ai: false, beta: false, api: false } },
  { id: 6, name: "Old School Gym", owner: "Vikram S.", email: "vik@oldschool.com", plan: "Monthly Pro", status: "Suspended", revenue: 2100, slots: { used: 45, total: 100 }, health: 20, features: { ai: false, beta: false, api: false } },
];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 850000 },
  { month: 'Feb', revenue: 920000 },
  { month: 'Mar', revenue: 1100000 },
  { month: 'Apr', revenue: 1050000 },
  { month: 'May', revenue: 1240000 },
  { month: 'Jun', revenue: 1450000 },
];

const SUBSCRIPTION_DATA = [
  { name: 'Elite Yearly', value: 35, color: '#f97316' },
  { name: 'Monthly Pro', value: 45, color: '#3b82f6' },
  { name: 'Free Trial', value: 20, color: '#94a3b8' }, 
];

const API_USAGE_DATA = [
  { name: 'Iron Pump', reqs: 4500 },
  { name: 'CrossFit A', reqs: 3800 },
  { name: 'FitLife', reqs: 2100 },
  { name: 'Urban Fit', reqs: 1800 },
  { name: 'Zen Yoga', reqs: 500 },
];

const AdminDashboard = () => {
  // --- STATE ---
  const [gyms, setGyms] = useState(INITIAL_GYMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Broadcast State
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Modal States
  const [selectedGym, setSelectedGym] = useState<any>(null);
  const [modalType, setModalType] = useState<'details' | 'editPlan' | 'refund' | 'suspend' | 'activate' | null>(null);
  const [newPlan, setNewPlan] = useState("");

  // Calculate Total Subscriptions for percentages
  const totalSubscriptions = useMemo(() => SUBSCRIPTION_DATA.reduce((acc, curr) => acc + curr.value, 0), []);

  // --- ACTIONS ---

  const handleBroadcast = () => {
    if (!broadcastMsg.trim()) return;
    setBroadcastSent(true);
    setBroadcastMsg("");
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const executeAction = () => {
    if (!selectedGym || !modalType) return;

    if (modalType === 'suspend') {
      setGyms(prev => prev.map(g => g.id === selectedGym.id ? { ...g, status: 'Suspended' } : g));
    } else if (modalType === 'activate') {
      setGyms(prev => prev.map(g => g.id === selectedGym.id ? { ...g, status: 'Active' } : g));
    } else if (modalType === 'refund') {
      alert(`Refund of ₹${selectedGym.revenue} initiated for ${selectedGym.name}`);
    } else if (modalType === 'editPlan') {
       if (newPlan) {
          setGyms(prev => prev.map(g => g.id === selectedGym.id ? { ...g, plan: newPlan } : g));
       }
    }

    closeModal();
  };

  const toggleGymFeature = (gymId: number, feature: string) => {
    setGyms(prev => prev.map(g => {
        if (g.id === gymId) {
            return { ...g, features: { ...g.features, [feature]: !g.features[feature as keyof typeof g.features] } };
        }
        return g;
    }));
    // Update selected gym in modal too if open
    if (selectedGym && selectedGym.id === gymId) {
        setSelectedGym((prev: any) => ({ ...prev, features: { ...prev.features, [feature]: !prev.features[feature] } }));
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedGym(null);
    setNewPlan("");
  };

  const openModal = (gym: any, type: 'details' | 'editPlan' | 'refund' | 'suspend' | 'activate') => {
      setSelectedGym(gym);
      setModalType(type);
      if (type === 'editPlan') setNewPlan(gym.plan);
  };

  const handleLoginAsOwner = (gymName: string) => {
    const confirm = window.confirm(`Security Alert: Login as ${gymName} owner? This will be logged.`);
    if (confirm) alert("Redirecting...");
  };

  // --- FILTERING & SORTING ---
  const processedGyms = useMemo(() => {
    let result = [...gyms];
    if (searchTerm) {
      result = result.filter(gym => 
        gym.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        gym.owner.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig) {
      result.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [gyms, searchTerm, sortConfig]);

  const totalPages = Math.ceil(processedGyms.length / itemsPerPage);
  const currentGyms = processedGyms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 gap-4">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-xl">GH</div>
            <div><h1 className="text-xl font-bold text-slate-900">Gymholic HQ</h1><p className="text-xs text-slate-500 font-medium">Super Admin Console</p></div>
        </div>
        <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100 gap-2">
                 <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                 System Stable
             </div>
             <Avatar className="w-8 h-8 border border-slate-200"><AvatarImage src="https://github.com/shadcn.png" /><AvatarFallback>AD</AvatarFallback></Avatar>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Gyms", value: gyms.length, growth: "+8 this week", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total MRR", value: "₹12.4L", growth: "+15% vs last mo", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "Total End Users", value: "14,502", growth: "+120 today", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "System Health", value: "99.9%", growth: "All Systems Go", icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="border-2 border-slate-100 shadow-sm hover:border-slate-300 transition-all">
                    <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
                            <Badge variant="outline" className="text-slate-500 border-slate-200">Global</Badge>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1">{stat.label}</p>
                        <p className="text-xs font-medium text-green-600 mt-3 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {stat.growth}</p>
                    </CardContent>
                </Card>
            </motion.div>
        ))}
      </div>

      {/* OPERATIONS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Broadcast System */}
          <Card className="border-2 border-slate-100 shadow-sm bg-blue-50/30">
              <CardHeader className="pb-3 border-b border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600"><Megaphone className="w-5 h-5" /><CardTitle className="text-base font-bold text-slate-900">Global Broadcast</CardTitle></div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                  <AnimatePresence>
                    {broadcastSent ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-green-100 text-green-700 p-2 rounded text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Message Sent Successfully!
                      </motion.div>
                    ) : (
                      <>
                        <Input placeholder="Subject: Maintenance Update..." className="bg-white h-8 text-xs font-bold" />
                        <Textarea 
                          value={broadcastMsg}
                          onChange={(e) => setBroadcastMsg(e.target.value)}
                          placeholder="Message to all gym owners..." 
                          className="bg-white h-20 text-xs resize-none" 
                        />
                        <div className="flex justify-end"><Button size="sm" onClick={handleBroadcast} className="bg-blue-600 hover:bg-blue-700 h-7 text-xs">Send Broadcast</Button></div>
                      </>
                    )}
                  </AnimatePresence>
              </CardContent>
          </Card>

          {/* API Load */}
          <Card className="border-2 border-slate-100 shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-50">
                  <div className="flex items-center gap-2 text-orange-600"><Server className="w-5 h-5" /><CardTitle className="text-base font-bold text-slate-900">API Load</CardTitle></div>
              </CardHeader>
              <CardContent className="h-[140px] pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={API_USAGE_DATA} layout="vertical" barSize={10}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} axisLine={false} tickLine={false} interval={0} />
                          <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '10px'}} />
                          <Bar dataKey="reqs" fill="#f97316" radius={[0, 4, 4, 0]} background={{ fill: '#f1f5f9' }} />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-2 border-2 border-slate-100 shadow-sm">
             <CardHeader><CardTitle className="text-lg font-bold text-slate-900">MRR Growth</CardTitle><CardDescription>Monthly Recurring Revenue</CardDescription></CardHeader>
             <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%"><BarChart data={REVENUE_DATA} barSize={40}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} /><RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} /><Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
             </CardContent>
          </Card>
          <Card className="col-span-2 border-2 border-slate-100 shadow-sm">
             <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">Plan Split</CardTitle>
                <CardDescription>Active Subscription Types</CardDescription>
             </CardHeader>
             <CardContent className="p-0">
                <div className="flex flex-row items-center justify-center h-[300px] pr-6">
                    
                    {/* LEFT: CHART */}
                    <div className="w-[50%] h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={SUBSCRIPTION_DATA} 
                                    innerRadius={60} 
                                    outerRadius={80} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                >
                                    {SUBSCRIPTION_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none"/>
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* RIGHT: CUSTOM LEGEND (Like Img 1) */}
                    <div className="w-[50%] space-y-4">
                        {SUBSCRIPTION_DATA.map((item, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="font-bold text-slate-700 text-sm">{item.name}</span>
                                </div>
                                <div className="pl-5 flex items-baseline justify-between w-full">
                                    <span className="text-xl font-black text-slate-900">{item.value}</span>
                                    <span className="text-sm font-bold text-slate-400">
                                        ({Math.round((item.value / totalSubscriptions) * 100)}%)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
             </CardContent>
          </Card>
      </div>

      {/* CLIENT MANAGEMENT TABLE */}
      <Card className="border-2 border-slate-100 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-b border-slate-50">
             <div><CardTitle className="text-lg font-bold text-slate-900">Client Management</CardTitle><CardDescription>Manage all gym accounts</CardDescription></div>
             <div className="flex items-center gap-3">
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input placeholder="Search gyms..." className="pl-9 w-[250px] bg-slate-50 border-slate-200" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline" className="border-slate-200 gap-2"><Filter className="w-4 h-4" /> Filter / Sort</Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48"><DropdownMenuLabel>Sort By</DropdownMenuLabel><DropdownMenuItem onClick={() => handleSort('revenue')}><ArrowUpDown className="w-4 h-4 mr-2" /> Revenue</DropdownMenuItem><DropdownMenuItem onClick={() => handleSort('health')}><Activity className="w-4 h-4 mr-2" /> Health Score</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuLabel>Filter Status</DropdownMenuLabel><DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem></DropdownMenuContent>
                </DropdownMenu>
             </div>
          </CardHeader>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4 font-bold">Gym Name</th>
                        <th className="px-6 py-4 font-bold">Plan</th>
                        <th className="px-6 py-4 font-bold">Revenue</th>
                        <th className="px-6 py-4 font-bold w-[120px]">Health Score</th>
                        <th className="px-6 py-4 font-bold w-[180px]">Slots Used</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {currentGyms.map((gym) => (
                        <tr key={gym.id} className="bg-white hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => openModal(gym, 'details')}>
                            <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">{gym.name.substring(0,2).toUpperCase()}</div><div><p className="font-bold text-slate-900">{gym.name}</p><p className="text-xs text-slate-400">{gym.owner}</p></div></div></td>
                            <td className="px-6 py-4"><div className="flex items-center gap-1.5">{gym.plan.includes('Elite') && <Crown className="w-3 h-3 text-orange-500 fill-orange-500" />}<span className={`font-bold ${gym.plan.includes('Elite') ? 'text-orange-600' : 'text-slate-600'}`}>{gym.plan}</span></div></td>
                            <td className="px-6 py-4 font-medium text-slate-600">₹{gym.revenue.toLocaleString()}</td>
                            <td className="px-6 py-4"><div className="flex items-center gap-2"><div className={`w-2.5 h-2.5 rounded-full ${getHealthColor(gym.health)}`} /><span className="font-bold text-slate-700">{gym.health}/100</span></div></td>
                            <td className="px-6 py-4"><div className="w-full"><div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1"><span>{Math.round((gym.slots.used/gym.slots.total)*100)}%</span><span>{gym.slots.used}/{gym.slots.total}</span></div><Progress value={(gym.slots.used/gym.slots.total)*100} className="h-1.5" /></div></td>
                            <td className="px-6 py-4"><Badge className={`border-0 ${gym.status === 'Active' ? 'bg-green-100 text-green-700' : gym.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>{gym.status}</Badge></td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                    <Button size="sm" variant="outline" className="h-8 border-slate-200 text-slate-600 hover:bg-slate-100 gap-2" onClick={() => handleLoginAsOwner(gym.name)}><LogIn className="w-3 h-3" /> <span className="hidden xl:inline">Login</span></Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost" className="h-8 w-8"><MoreVertical className="w-4 h-4 text-slate-400" /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openModal(gym, 'details')}>View Details</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => openModal(gym, 'editPlan')}>Edit Plan</DropdownMenuItem>
                                            <DropdownMenuItem className="text-orange-600" onClick={() => openModal(gym, 'refund')}><Receipt className="w-4 h-4 mr-2" /> Issue Refund</DropdownMenuItem>
                                            {gym.status === 'Suspended' ? (
                                                <DropdownMenuItem className="text-green-600" onClick={() => openModal(gym, 'activate')}><CheckCircle2 className="w-4 h-4 mr-2" /> Activate Account</DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem className="text-red-600" onClick={() => openModal(gym, 'suspend')}><XCircle className="w-4 h-4 mr-2" /> Suspend Account</DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
          </div>
          <CardFooter className="flex items-center justify-between border-t border-slate-50 bg-slate-50/50 p-4">
              <div className="text-xs text-slate-500 font-medium">Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, processedGyms.length)} of {processedGyms.length} gyms</div>
              <div className="flex items-center gap-2"><Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)}><ChevronLeft className="w-4 h-4" /></Button><Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={currentPage === totalPages} onClick={() => setCurrentPage(c => c + 1)}><ChevronRight className="w-4 h-4" /></Button></div>
          </CardFooter>
      </Card>

      {/* --- ALL MODALS (DIALOGS) --- */}
      <Dialog open={!!selectedGym} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>
                    {modalType === 'suspend' ? 'Suspend Account' : 
                     modalType === 'refund' ? 'Issue Refund' : 
                     modalType === 'editPlan' ? 'Edit Subscription' : 
                     selectedGym?.name}
                </DialogTitle>
                <DialogDescription>
                    {modalType === 'details' ? 'Manage gym settings and features.' : ''}
                </DialogDescription>
            </DialogHeader>

            {/* MODAL CONTENT SWITCH */}
            {selectedGym && (
                <div className="space-y-4">
                    
                    {/* 1. VIEW DETAILS (Gym-Specific Feature Control) */}
                    {modalType === 'details' && (
                        <>
                           <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                               <Avatar className="h-12 w-12"><AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedGym.name}`} /><AvatarFallback>GYM</AvatarFallback></Avatar>
                               <div>
                                   <p className="font-bold text-slate-900">{selectedGym.owner}</p>
                                   <p className="text-xs text-slate-500">{selectedGym.email}</p>
                                   <div className="flex gap-2 mt-1">
                                       <Badge variant="outline" className="text-[10px]">{selectedGym.plan}</Badge>
                                       <Badge variant="outline" className="text-[10px] text-green-600 bg-green-50 border-green-200">Health: {selectedGym.health}/100</Badge>
                                   </div>
                               </div>
                           </div>
                           
                           <div className="space-y-3">
                               <p className="text-sm font-bold text-slate-900 flex items-center gap-2"><Settings className="w-4 h-4" /> Feature Flags</p>
                               <div className="space-y-2 border rounded-lg p-3">
                                   <div className="flex items-center justify-between">
                                       <Label className="text-xs">AI Insights Beta</Label>
                                       <Switch checked={selectedGym.features.ai} onCheckedChange={() => toggleGymFeature(selectedGym.id, 'ai')} />
                                   </div>
                                   <div className="flex items-center justify-between">
                                       <Label className="text-xs">New Dashboard UI</Label>
                                       <Switch checked={selectedGym.features.beta} onCheckedChange={() => toggleGymFeature(selectedGym.id, 'beta')} />
                                   </div>
                                   <div className="flex items-center justify-between">
                                       <Label className="text-xs">API Access</Label>
                                       <Switch checked={selectedGym.features.api} onCheckedChange={() => toggleGymFeature(selectedGym.id, 'api')} />
                                   </div>
                               </div>
                           </div>

                           <div className="space-y-2">
                               <p className="text-sm font-bold text-slate-900 flex items-center gap-2"><Clock className="w-4 h-4" /> Recent Activity</p>
                               <div className="text-xs text-slate-500 space-y-1 pl-6 border-l-2 border-slate-100 ml-2">
                                   <p>• Updated payment method (2d ago)</p>
                                   <p>• Added 5 new members (5h ago)</p>
                                   <p>• Login from new device (1h ago)</p>
                               </div>
                           </div>
                        </>
                    )}

                    {/* 2. EDIT PLAN */}
                    {modalType === 'editPlan' && (
                        <div className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label>Subscription Plan</Label>
                                <Select value={newPlan} onValueChange={setNewPlan}>
                                    <SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Free Trial">Free Trial</SelectItem>
                                        <SelectItem value="Monthly Pro">Monthly Pro</SelectItem>
                                        <SelectItem value="Elite Yearly">Elite Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <p className="text-xs text-slate-500">
                                Changing the plan will immediately update their billing cycle and feature access.
                            </p>
                        </div>
                    )}

                    {/* 3. SUSPEND / REFUND / ACTIVATE WARNINGS */}
                    {(modalType === 'suspend' || modalType === 'refund' || modalType === 'activate') && (
                        <p className="text-sm text-slate-600">
                             {modalType === 'suspend' 
                                ? `Are you sure you want to suspend access for ${selectedGym.name}? They will lose dashboard access immediately.` 
                                : modalType === 'activate'
                                ? `Are you sure you want to reactivate ${selectedGym.name}? They will regain immediate access to the dashboard.`
                                : `This will initiate a refund of ₹${selectedGym.revenue} for ${selectedGym.name}. This action cannot be undone.`}
                        </p>
                    )}

                </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={closeModal}>Close</Button>
                {modalType !== 'details' && (
                    <Button 
                        variant={modalType === 'suspend' ? "destructive" : "default"} 
                        className={modalType === 'activate' ? "bg-green-600 hover:bg-green-700" : ""}
                        onClick={executeAction}
                    >
                        {modalType === 'suspend' ? 'Suspend' : modalType === 'refund' ? 'Confirm Refund' : modalType === 'activate' ? 'Reactivate Gym' : 'Save Changes'}
                    </Button>
                )}
            </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminDashboard;