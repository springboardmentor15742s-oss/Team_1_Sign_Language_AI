import { motion } from 'framer-motion';

export default function ReportStatistics({ stats }) {
  const items = [
    {
      label: 'Total Reports',
      value: stats.total,
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: [139, 92, 246],
    },
    {
      label: 'Total Downloads',
      value: stats.totalDownloads,
      icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
      color: [59, 130, 246],
    },
    {
      label: 'Most Viewed',
      value: stats.mostViewed,
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      color: [16, 185, 129],
      small: true,
    },
    {
      label: 'Last Generated',
      value: stats.lastGenerated,
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: [245, 158, 11],
      small: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => {
        const [r, g, b] = item.color;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group"
            style={{ border: `1px solid rgba(${r},${g},${b},0.12)` }}
          >
            <div
              className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(16px)' }}
            />
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: `rgba(${r},${g},${b},0.15)` }}
            >
              <svg className="w-4.5 h-4.5" style={{ color: `rgb(${r},${g},${b})`, width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </div>
            <div className="relative z-10">
              <div className={`font-space font-bold text-white ${item.small ? 'text-sm leading-tight' : 'text-2xl'}`}>
                {item.value}
              </div>
              <div className="text-xs text-white/40 mt-0.5 font-medium">{item.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
