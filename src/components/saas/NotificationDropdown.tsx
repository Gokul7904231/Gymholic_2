import { motion } from 'framer-motion';

const notifications = [
  '2 new bookings today',
  'Occupancy crossed 75%',
  'Trial expires soon',
];

const NotificationDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-50"
    >
      <div className="p-4 text-sm font-semibold border-b">Notifications</div>
      <ul className="divide-y">
        {notifications.map((n, i) => (
          <li key={i} className="px-4 py-3 text-sm hover:bg-slate-50">{n}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NotificationDropdown;
