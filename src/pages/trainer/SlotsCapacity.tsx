import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TrainerLayout from '@/components/layouts/TrainerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, Clock, Users, ToggleLeft, Trash2, Calendar, 
  Sparkles, Filter, X 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

// --- TYPES ---
type Slot = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
  isActive: boolean;
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TrainerSlotsCapacity = () => {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // --- INITIALIZE DATE TO TODAY ---
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [viewFilter, setViewFilter] = useState("today"); // Default to 'today' view

  // --- MOCK DATA ---
  const [slots, setSlots] = useState<Slot[]>([
    { id: '1', day: 'Monday', startTime: '06:00', endTime: '08:00', capacity: 20, booked: 19, isActive: true }, 
    { id: '2', day: 'Monday', startTime: '08:00', endTime: '10:00', capacity: 25, booked: 15, isActive: true }, 
    { id: '3', day: 'Monday', startTime: '17:00', endTime: '19:00', capacity: 30, booked: 5, isActive: true }, 
    { id: '4', day: 'Tuesday', startTime: '06:00', endTime: '08:00', capacity: 20, booked: 20, isActive: true }, 
    { id: '5', day: 'Tuesday', startTime: '17:00', endTime: '19:00', capacity: 30, booked: 12, isActive: true },
    { id: '6', day: 'Thursday', startTime: '06:00', endTime: '08:00', capacity: 20, booked: 10, isActive: true }, 
  ]);

  const [newSlot, setNewSlot] = useState({ day: 'Monday', startTime: '', endTime: '', capacity: '' });

  // --- 1. SMART INSIGHTS ---
  const stats = useMemo(() => {
    const total = slots.length;
    const active = slots.filter(s => s.isActive).length;
    const totalCap = slots.reduce((acc, curr) => acc + (curr.isActive ? curr.capacity : 0), 0);
    const totalBooked = slots.reduce((acc, curr) => acc + (curr.isActive ? curr.booked : 0), 0);
    const utilization = totalCap > 0 ? Math.round((totalBooked / totalCap) * 100) : 0;
    
    let suggestion = "Schedule looks balanced.";
    if (utilization > 80) suggestion = "High Demand! Consider adding evening slots.";
    else if (utilization < 30 && total > 0) suggestion = "Low Occupancy. Run a promo.";
    else if (total === 0) suggestion = "Get started by adding your first slot.";

    return { total, active, totalCap, utilization, suggestion };
  }, [slots]);

  // --- 2. DYNAMIC FILTERING LOGIC ---
  const getVisibleDays = () => {
    // Helper to get day name from date object
    const getDayName = (date: Date) => {
        const dayIndex = date.getDay(); // 0 is Sunday
        return dayIndex === 0 ? 'Sunday' : DAYS[dayIndex - 1];
    };

    if (viewFilter === 'all') return DAYS;

    let targetDate = new Date();
    
    if (viewFilter === 'today') {
        // use current date
    } else if (viewFilter === 'tomorrow') {
        targetDate.setDate(targetDate.getDate() + 1);
    } else if (viewFilter === 'specific' && selectedDate) {
        targetDate = new Date(selectedDate);
    }

    const dayName = getDayName(targetDate);
    return [dayName];
  };

  const visibleDays = getVisibleDays();

  // --- HANDLERS ---
  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr);
    setViewFilter(dateStr ? "specific" : "all");
  };

  const toggleSlot = (id: string) => {
    setSlots(slots.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const deleteSlot = (id: string) => {
    setSlots(slots.filter(s => s.id !== id));
    toast({ title: "Slot Deleted", description: "The time slot has been removed." });
  };

  const copyDaySchedule = (sourceDay: string) => {
    const sourceSlots = slots.filter(s => s.day === sourceDay);
    if (sourceSlots.length === 0) {
      toast({ title: "No slots to copy", variant: "destructive" });
      return;
    }
    const targetDays = DAYS.filter(d => d !== sourceDay);
    const newSlots = [...slots];
    targetDays.forEach(day => {
      sourceSlots.forEach(slot => {
        newSlots.push({ ...slot, id: Math.random().toString(36).substr(2, 9), day: day, booked: 0 });
      });
    });
    setSlots(newSlots);
    toast({ title: "Schedule Copied", description: `Copied ${sourceDay}'s slots to all other days.` });
  };

  const getNextOccurrenceOfDay = (dayName: string): string => {
    const targetDayIndex = DAYS.indexOf(dayName);
    let date = new Date();
    
    while (true) {
      const currentDayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
      if (currentDayIndex === targetDayIndex) {
        return date.toISOString().split('T')[0];
      }
      date.setDate(date.getDate() + 1);
    }
  };

  const handleAddSlot = () => {
    if (!newSlot.startTime || !newSlot.endTime || !newSlot.capacity) return;
    if (newSlot.startTime >= newSlot.endTime) {
      toast({ title: "Invalid Time", description: "End time must be after start time", variant: "destructive" });
      return;
    }
    const hasOverlap = slots.some(slot => {
      if (slot.day !== newSlot.day) return false;
      return (newSlot.startTime < slot.endTime && newSlot.endTime > slot.startTime);
    });
    if (hasOverlap) {
      toast({ title: "Time Conflict", description: "This slot overlaps with an existing one.", variant: "destructive" });
      return;
    }
    const slot: Slot = {
      id: Math.random().toString(36).substr(2, 9),
      day: newSlot.day,
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
      capacity: parseInt(newSlot.capacity),
      booked: 0,
      isActive: true,
    };
    setSlots([...slots, slot]);
    setIsAddOpen(false);
    
    // Filter to show only the day the slot was added to
    const nextDate = getNextOccurrenceOfDay(newSlot.day);
    setSelectedDate(nextDate);
    setViewFilter("specific");
    
    toast({ title: "Slot Added", description: "New time slot created successfully." });
  };

  // --- HEATMAP COLOR HELPER ---
  const getSlotStatus = (booked: number, capacity: number) => {
    const percentage = capacity > 0 ? (booked / capacity) * 100 : 0;
    if (percentage >= 100) return { color: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50', label: 'FULL' };
    if (percentage > 75) return { color: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50', label: 'FILLING' };
    return { color: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50', label: 'OPEN' };
  };

  return (
    <TrainerLayout gymName="PowerFit Arena" subscriptionStatus="active">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Slots & Capacity</h1>
                    <p className="text-slate-500 mt-1">Manage your gym's time slots and daily capacity limits</p>
                </div>

                <div className="flex items-center gap-3">
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200 rounded-xl px-6 font-bold">
                            <Plus className="w-5 h-5 mr-2" /> Add Slot
                        </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-2xl">
                            <DialogHeader><DialogTitle>Add New Time Slot</DialogTitle></DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                <Label>Day of Week</Label>
                                <Select onValueChange={(v) => setNewSlot({...newSlot, day: v})} defaultValue={newSlot.day}>
                                    <SelectTrigger><SelectValue placeholder="Select day" /></SelectTrigger>
                                    <SelectContent>{DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2"><Label>Start</Label><Input type="time" onChange={e => setNewSlot({...newSlot, startTime: e.target.value})} /></div>
                                <div className="grid gap-2"><Label>End</Label><Input type="time" onChange={e => setNewSlot({...newSlot, endTime: e.target.value})} /></div>
                                </div>
                                <div className="grid gap-2"><Label>Capacity</Label><Input type="number" placeholder="25" onChange={e => setNewSlot({...newSlot, capacity: e.target.value})} /></div>
                            </div>
                            <DialogFooter><Button onClick={handleAddSlot} className="bg-orange-600 hover:bg-orange-700 w-full">Create Slot</Button></DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Smart Suggestion Banner */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
                <div className="p-2 bg-white rounded-lg shadow-sm text-orange-600"><Sparkles className="w-5 h-5" /></div>
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-orange-900 uppercase tracking-wide">Smart Insight</h4>
                    <p className="text-sm text-orange-700 font-medium">{stats.suggestion}</p>
                </div>
                <div className="flex gap-8 text-right w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-orange-100 pt-2 sm:pt-0">
                    <div><span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Utilization</span><span className="block text-xl font-black text-slate-900">{stats.utilization}%</span></div>
                    <div><span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Cap</span><span className="block text-xl font-black text-slate-900">{stats.totalCap}</span></div>
                </div>
            </motion.div>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-slate-900 shadow-sm rounded-2xl bg-white p-2">
            <CardContent className="p-6 flex items-start justify-between">
              <div>
                <div className="p-3 bg-orange-50 rounded-xl w-fit mb-4"><Clock className="w-6 h-6 text-orange-600" /></div>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Slots</p>
                <p className="text-slate-400 text-xs mt-1">Across all days</p>
              </div>
              <span className="text-4xl font-black text-slate-900">{stats.total}</span>
            </CardContent>
          </Card>
          <Card className="border border-slate-900 shadow-sm rounded-2xl bg-white p-2">
            <CardContent className="p-6 flex items-start justify-between">
              <div>
                <div className="p-3 bg-green-50 rounded-xl w-fit mb-4"><ToggleLeft className="w-6 h-6 text-green-600" /></div>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Active</p>
                <p className="text-slate-400 text-xs mt-1">Accepting bookings</p>
              </div>
              <span className="text-4xl font-black text-slate-900">{stats.active}</span>
            </CardContent>
          </Card>
          <Card className="border border-slate-900 shadow-sm rounded-2xl bg-white p-2">
            <CardContent className="p-6 flex items-start justify-between">
              <div>
                <div className="p-3 bg-amber-50 rounded-xl w-fit mb-4"><Users className="w-6 h-6 text-amber-600" /></div>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Capacity</p>
                <p className="text-slate-400 text-xs mt-1">Maximum bookings</p>
              </div>
              <span className="text-4xl font-black text-slate-900">{stats.totalCap}</span>
            </CardContent>
          </Card>
        </div>

        {/* --- TABS & DATE FILTER --- */}
        <Tabs value={viewFilter} className="w-full" onValueChange={(val) => { setViewFilter(val); }}>
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-6 gap-4">
                <TabsList className="bg-slate-100 p-1 rounded-xl h-auto flex-wrap justify-start">
                    <TabsTrigger value="all" className="rounded-lg px-4 py-2 font-bold data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm">Weekly</TabsTrigger>
                    <TabsTrigger value="today" className="rounded-lg px-4 py-2 font-bold data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm">Today</TabsTrigger>
                    <TabsTrigger value="tomorrow" className="rounded-lg px-4 py-2 font-bold data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm">Tomorrow</TabsTrigger>
                </TabsList>
                
                {/* DATE FILTER SYSTEM */}
                <div className="flex items-center gap-3 bg-white border border-slate-900 p-1.5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 px-3 border-r border-slate-100">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-slate-600 hidden sm:inline-block">Date</span>
                    </div>
                    <Input 
                        type="date" 
                        className="border-none shadow-none h-9 w-auto font-medium text-slate-700 focus-visible:ring-0 cursor-pointer"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                    {selectedDate && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-slate-100 rounded-full" onClick={() => handleDateChange("")}>
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>

            <div className="space-y-8">
                {visibleDays.map((day) => {
                    const daySlots = slots.filter(s => s.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
                    const hasSlots = daySlots.length > 0;

                    // HIDE other days if we are filtering
                    if (viewFilter !== "all") {
                        if (!hasSlots) {
                             return (
                                <Card key={day} className="border border-slate-900 shadow-sm rounded-[1.5rem] bg-white overflow-hidden py-12 text-center">
                                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4"><Calendar className="w-8 h-8 text-orange-300" /></div>
                                    <h3 className="text-xl font-bold text-slate-900">{day}</h3>
                                    <p className="text-slate-400 mt-2">No slots scheduled for this specific date.</p>
                                    <Button variant="link" className="text-orange-600 font-bold mt-2" onClick={() => { setNewSlot({...newSlot, day}); setIsAddOpen(true); }}>+ Add Slot</Button>
                                </Card>
                             )
                        }
                    } else {
                        // Weekly View: Hide empty days or keep condensed
                        if (!hasSlots) return null; 
                    }

                    return (
                    <Card key={day} className="border border-slate-900 shadow-sm rounded-[1.5rem] bg-white overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{day}</h3>
                                    {/* Show date if filtered */}
                                    {viewFilter === 'specific' && <Badge variant="outline" className="mt-1 border-orange-200 text-orange-600">{selectedDate}</Badge>}
                                </div>
                                <Badge variant="secondary" className="bg-slate-100 text-slate-500">{daySlots.length} Slots</Badge>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => copyDaySchedule(day)} className="hidden sm:flex text-xs h-8 text-slate-400 border-slate-200 hover:text-orange-600 hover:border-orange-600">Copy to All</Button>
                                <Button variant="ghost" size="sm" className="text-orange-600 font-bold" onClick={() => { setNewSlot({...newSlot, day}); setIsAddOpen(true); }}>+ Add</Button>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 bg-[#fdfcff] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            <AnimatePresence>
                                {daySlots.map((slot) => {
                                    const status = getSlotStatus(slot.booked, slot.capacity);
                                    const percentage = slot.capacity > 0 ? (slot.booked / slot.capacity) * 100 : 0;

                                    return (
                                        <motion.div 
                                            key={slot.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={`
                                            group relative flex flex-col p-5 pl-14 rounded-2xl border transition-all duration-300 overflow-hidden
                                            ${slot.isActive ? 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-orange-200' : 'bg-slate-50 border-slate-100 opacity-60'}
                                            `}
                                        >
                                            {/* Heatmap Status Bar */}
                                            <div className={`absolute top-0 left-0 w-1.5 h-full ${status.color}`} />

                                            {/* DELETE BUTTON (MOVED LEFT) */}
                                            <div className="absolute top-0 left-3 h-full flex items-center">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-slate-600 hover:text-white hover:bg-red-500 rounded-full transition-all"
                                                    onClick={() => deleteSlot(slot.id)}
                                                    title="Delete Slot"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            {/* Top Row: Time & Toggle */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Clock className={`w-4 h-4 ${slot.isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                                                        <span className="text-lg font-black text-slate-800 tracking-tight">{slot.startTime} - {slot.endTime}</span>
                                                    </div>
                                                    <Badge className={`${status.bg} ${status.text} border-none font-bold text-[10px] tracking-wider`}>{status.label}</Badge>
                                                </div>
                                                <Switch checked={slot.isActive} onCheckedChange={() => toggleSlot(slot.id)} className="data-[state=checked]:bg-orange-600" />
                                            </div>

                                            {/* Capacity Heatmap */}
                                            <div className="space-y-2 mt-auto">
                                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wide">
                                                    <span>Occupancy</span>
                                                    <span className="text-slate-700">{slot.booked} / {slot.capacity}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${status.color}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </Card>
                    );
                })}
            </div>
        </Tabs>
      </div>
    </TrainerLayout>
  );
};

export default TrainerSlotsCapacity;