import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, TrendingDown, Minus, Trash2, Info } from 'lucide-react';
import CustomerLayout from '@/components/layouts/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockBookings } from '@/data/mockData';

interface BmiRecord {
  id: string;
  date: string;
  bmi: number;
  height: number;
  weight: number;
}

const BmiCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string; suggestion: string } | null>(null);
  const [history, setHistory] = useState<BmiRecord[]>(() => {
    const stored = localStorage.getItem('gymholic_bmi_history');
    return stored ? JSON.parse(stored) : [];
  });

  // Calculate Monthly Stats based on mockBookings
  const calculateMonthlyStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const userWeight = parseFloat(weight) || 70; // Fallback weight

    const completedSessions = mockBookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return (
        booking.status === 'completed' &&
        bookingDate.getMonth() === currentMonth &&
        bookingDate.getFullYear() === currentYear
      );
    });

    // MET formula for calories: (MET * 3.5 * weight / 200) * 60 mins
    const caloriesPerSession = (6.0 * 3.5 * userWeight / 200) * 60;
    const totalCalories = Math.round(completedSessions.length * caloriesPerSession);

    return {
      sessionCount: completedSessions.length,
      caloriesBurned: totalCalories
    };
  };

  const monthStats = calculateMonthlyStats();

  useEffect(() => {
    localStorage.setItem('gymholic_bmi_history', JSON.stringify(history));
  }, [history]);

  const calculateBmi = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;

    const bmi = w / (h * h);
    const roundedBmi = Math.round(bmi * 10) / 10;

    let category = '';
    let suggestion = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      suggestion = 'Consider increasing your caloric intake with nutrient-rich foods and strength training.';
    } else if (bmi < 25) {
      category = 'Normal';
      suggestion = 'Great job! Maintain your healthy lifestyle with balanced diet and regular exercise.';
    } else if (bmi < 30) {
      category = 'Overweight';
      suggestion = 'Consider a balanced diet with moderate caloric deficit and regular cardio exercises.';
    } else {
      category = 'Obese';
      suggestion = 'Consult a healthcare professional for personalized advice on diet and exercise.';
    }

    setResult({ bmi: roundedBmi, category, suggestion });

    const newRecord: BmiRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      bmi: roundedBmi,
      height: parseFloat(height),
      weight: parseFloat(weight),
    };

    setHistory(prev => [newRecord, ...prev]);
  };

  const clearHistory = () => setHistory([]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-blue-500/20 text-blue-600';
      case 'Normal': return 'bg-green-500/20 text-green-600';
      case 'Overweight': return 'bg-amber-500/20 text-amber-600';
      case 'Obese': return 'bg-red-500/20 text-red-600';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const groupedHistory = history.reduce((acc, record) => {
    const date = new Date(record.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthKey]) acc[monthKey] = { label: monthLabel, records: [] };
    acc[monthKey].records.push(record);
    return acc;
  }, {} as Record<string, { label: string; records: BmiRecord[] }>);

  const getTrend = () => {
    if (history.length < 2) return 'stable';
    const latest = history[0].bmi;
    const previous = history[1].bmi;
    const diff = latest - previous;
    const latestCategory = getBmiCategory(latest);
    if (Math.abs(diff) < 0.3) return 'stable';
    if (latestCategory === 'Underweight') return diff > 0 ? 'improving' : 'declining';
    if (latestCategory === 'Normal') return 'stable';
    return diff < 0 ? 'improving' : 'declining';
  };

  const trend = getTrend();

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <Calculator className="w-8 h-8 text-primary" />
            BMI Calculator
          </h1>
          <p className="text-muted-foreground">Track your Body Mass Index over time to reach your fitness goals.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Calculator */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Calculate Your BMI</CardTitle>
                <CardDescription>Enter your measurements below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input id="height" type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input id="weight" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age (optional)</Label>
                    <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender (optional)</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="gym" className="w-full h-12 text-lg bg-[#ff8a71] hover:bg-[#ff7a5f]" onClick={calculateBmi} disabled={!height || !weight}>
                  Calculate BMI
                </Button>
                {result && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 rounded-xl bg-muted/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Your BMI</span>
                      <span className="text-3xl font-bold text-primary">{result.bmi}</span>
                    </div>
                    <Badge className={`${getCategoryColor(result.category)} border-none`}>{result.category}</Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.suggestion}</p>
                  </motion.div>
                )}
                <Alert className="bg-blue-50/50 border-blue-100">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-xs text-blue-700">
                    BMI is an estimate and not a medical diagnosis. Consult a healthcare professional for personalized advice.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel - History & Stats */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-full border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">BMI History</CardTitle>
                    <CardDescription>Your progress over time</CardDescription>
                  </div>
                  {history.length > 0 && (
                    <div className="flex items-center gap-2">
                      {trend === 'improving' && <Badge className="bg-green-500/20 text-green-600 border-none"><TrendingUp className="w-3 h-3 mr-1" /> Improving</Badge>}
                      {trend === 'stable' && <Badge className="bg-blue-500/20 text-blue-600 border-none"><Minus className="w-3 h-3 mr-1" /> Stable</Badge>}
                      {trend === 'declining' && <Badge className="bg-amber-500/20 text-amber-600 border-none"><TrendingDown className="w-3 h-3 mr-1" /> Needs Attention</Badge>}
                      <Button variant="ghost" size="icon" onClick={clearHistory} className="hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" /></Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Monthly Performance Stats Summary */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-tight text-center">Monthly Sessions</span>
                    <span className="text-2xl font-black text-orange-700">{monthStats.sessionCount}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight text-center">Calories Burned</span>
                    <span className="text-2xl font-black text-emerald-700">{monthStats.caloriesBurned} <small className="text-xs">kcal</small></span>
                  </div>
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Calculator className="w-10 h-10 opacity-20" />
                    </div>
                    <p className="font-semibold text-lg">No BMI records yet</p>
                    <p className="text-sm text-muted-foreground">Calculate your first BMI to start tracking progress.</p>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                    {Object.entries(groupedHistory).map(([key, { label, records }]) => (
                      <div key={key}>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{label}</h4>
                        <div className="space-y-3">
                          {records.map((record) => (
                            <div key={record.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl hover:bg-muted/30 transition-colors">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">{new Date(record.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                                <p className="text-sm font-bold">{record.height}cm • {record.weight}kg</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-black text-primary leading-none mb-1">{record.bmi}</p>
                                <Badge className={`text-[10px] uppercase font-bold border-none ${getCategoryColor(getBmiCategory(record.bmi))}`}>{getBmiCategory(record.bmi)}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default BmiCalculator;