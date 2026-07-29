// src/components/assessment/PerformanceSummary.jsx
import { motion } from 'framer-motion';

export default function PerformanceSummary({ stats }) {
  const cards = [
    { label: 'Gestures Attempted', value: stats.attempted,                   color: [139, 92, 246], icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    { label: 'Passed',             value: stats.passed,                       color: [34, 197, 94],  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Failed',             value: stats.failed,                       color: [239, 68, 68],  icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Avg Accuracy',       value: `${stats.avgAccuracy}%`,            color: [59, 130, 246], icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Best Score',         value: `${stats.bestScore}%`,              color: [245, 158, 11], icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { label: 'Current Streak',     value: `${stats.currentStreak} 🔥`,        color: [236, 72, 153], icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
  ];

  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <h3 className="text-lg font-space font-bold text-white">Performance Summary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cards.map((card, i) => {
          const [r, g, b] = card.color;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group"
              style={{ background: `rgba(${r},${g},${b},0.06)`, border: `1px solid rgba(${r},${g},${b},0.2)` }}
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500"
                style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.3) 0%, transparent 70%)`, filter: 'blur(10px)' }}
              />
              <div className="w-8 h-8 rounded-lg flex items-center justify-center relative z-10"
                style={{ background: `rgba(${r},${g},${b},0.18)`, color: `rgb(${r},${g},${b})` }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-xl font-space font-bold text-white">{card.value}</p>
                <p className="text-[10px] text-white/40 mt-0.5 leading-tight">{card.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
