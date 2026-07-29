import { motion } from 'framer-motion';

export default function TrackingStats({ stats }) {
  const cards = [
    { label: 'Avg Confidence',  value: `${stats.avgConfidence}%`, color: [34, 197, 94],  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Tracked Frames',  value: stats.trackedFrames.toLocaleString(), color: [168, 85, 247], icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { label: 'Accuracy',        value: `${stats.accuracy}%`,      color: [59, 130, 246], icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Tracking FPS',    value: `${stats.fps} FPS`,        color: [245, 158, 11], icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Hand Stability',  value: `${stats.handStability}%`, color: [236, 72, 153], icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11' },
    { label: 'Pose Stability',  value: `${stats.poseStability}%`, color: [6, 182, 212],  icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => {
        const [r, g, b] = card.color;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div
              className="absolute -right-4 -top-4 w-16 h-16 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500"
              style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.3) 0%, transparent 70%)`, filter: 'blur(10px)' }}
            />
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center relative z-10"
              style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-xl font-space font-bold text-white tracking-tight">{card.value}</p>
              <p className="text-[10px] text-white/40 mt-0.5 leading-tight font-medium">{card.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
