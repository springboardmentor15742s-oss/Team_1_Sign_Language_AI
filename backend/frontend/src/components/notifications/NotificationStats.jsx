import { motion } from 'framer-motion';

export default function NotificationStats({ stats }) {
  const cards = [
    { label: 'Total', value: stats.total, color: [139, 92, 246], icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { label: 'Unread', value: stats.unread, color: [244, 63, 94], icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Today', value: stats.todayCount, color: [59, 130, 246], icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Critical', value: stats.critical, color: [239, 68, 68], icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const [r, g, b] = card.color;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(12px)' }}
            />
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-space font-bold text-white">{card.value}</p>
              <p className="text-xs text-white/40 font-medium mt-0.5">{card.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
