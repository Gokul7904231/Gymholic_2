import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import TrainerLayout from '@/components/layouts/TrainerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrial } from '@/hooks/useTrial';
import LockedFeature from '@/components/saas/LockedFeature';


const recentBookings = [
  {
    id: 1,
    name: "John Doe",
    email: "customer1@example.com",
    date: "1/19/2026",
    time: "18:00 - 19:00",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "customer2@example.com",
    date: "1/19/2026",
    time: "19:00 - 20:00",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "customer3@example.com",
    date: "1/18/2026",
    time: "06:00 - 07:00",
    status: "completed",
  },
];

const TrainerDashboard = () => {
  const stats = [
    { title: 'Total Bookings', value: '156', icon: Calendar, change: '+12%' },
    { title: 'Active Members', value: '89', icon: Users, change: '+5%' },
    { title: 'Revenue', value: '₹23,400', icon: DollarSign, change: '+18%' },
    { title: 'Occupancy Rate', value: '78%', icon: TrendingUp, change: '+8%' },
  ];

  const { isExpired } = useTrial();

  return (
    <TrainerLayout gymName="PowerFit Elite" subscriptionStatus="active">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>
        {isExpired ? (
          <LockedFeature>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <Card key={stat.title} className="border border-slate-900 shadow-sm hover:shadow-md transition">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-accent">{stat.change} this month</p>
                      </div>
                      <stat.icon className="w-10 h-10 text-primary/20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </LockedFeature>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title} className="border border-slate-900 shadow-sm hover:shadow-md transition">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-accent">{stat.change} this month</p>
                    </div>
                    <stat.icon className="w-10 h-10 text-primary/20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="border border-slate-900 shadow-sm">
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your gym is performing well! Check analytics for detailed insights.</p>
          </CardContent>
        </Card>
        {/* Recent Bookings */}
<div className="mt-8">
  <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

  <div className="rounded-xl border border-slate-900 bg-background overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-slate-50 text-slate-600">
        <tr>
          <th className="text-left px-6 py-3">Customer</th>
          <th className="text-left px-6 py-3">Date</th>
          <th className="text-left px-6 py-3">Time</th>
          <th className="text-left px-6 py-3">Status</th>
        </tr>
      </thead>

      <tbody>
        {recentBookings.map((booking) => (
          <tr
            key={booking.id}
            className="border-t hover:bg-muted/30 transition"
          >
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.email}
                  </p>
                </div>
              </div>
            </td>

            <td className="px-6 py-4">{booking.date}</td>
            <td className="px-6 py-4">{booking.time}</td>

            <td className="px-6 py-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === "upcoming"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {booking.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      </motion.div>
    </TrainerLayout>
  );
};

export default TrainerDashboard;
