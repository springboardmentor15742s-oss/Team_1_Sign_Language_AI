// src/components/assessment/ReferenceGestureCard.jsx
import { motion } from 'framer-motion';

export default function ReferenceGestureCard({ gesture }) {
  if (!gesture) return null;
  const [r, g, b] = gesture.color;
  const diffColors = { Beginner: [34,197,94], Intermediate: [245,158,11], Advanced: [239,68,68] };
  const [dr,dg,db] = diffColors[gesture.difficulty] || [139,92,246];

  return (
    <motion.div
      key={gesture.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden h-full"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Glow */}
      <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.2) 0%, transparent 70%)`, filter: 'blur(30px)' }}
      />

      <div className="flex items-center justify-between relative z-10">
        <h3 className="text-base font-space font-bold text-white">Reference Gesture</h3>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
            style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})`, border: `1px solid rgba(${r},${g},${b},0.3)` }}
          >{gesture.category}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
            style={{ background: `rgba(${dr},${dg},${db},0.15)`, color: `rgb(${dr},${dg},${db})`, border: `1px solid rgba(${dr},${dg},${db},0.3)` }}
          >{gesture.difficulty}</span>
        </div>
      </div>

      {/* Reference animation placeholder */}
      <div className="relative flex flex-col items-center justify-center rounded-2xl py-8 relative z-10"
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', minHeight: 180 }}
      >
        {/* Animated ring */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-32 h-32 rounded-full border"
          style={{ borderColor: `rgba(${r},${g},${b},0.4)` }}
        />
        <motion.div
          animate={{ scale: [1.06, 1, 1.06], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-24 h-24 rounded-full border"
          style={{ borderColor: `rgba(${r},${g},${b},0.3)` }}
        />
        <motion.span
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl relative z-10"
        >{gesture.emoji}</motion.span>
        {/* Scan line */}
        <motion.div
          animate={{ top: ['20%', '80%', '20%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute left-4 right-4 h-px"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${r},${g},${b},0.6), transparent)` }}
        />
        <span className="text-[10px] text-white/30 mt-4 uppercase tracking-widest relative z-10">Reference Animation</span>
      </div>

      {/* Gesture Details */}
      <div className="relative z-10 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-space font-bold text-white">{gesture.name}</h2>
          <p className="text-sm text-white/50 mt-0.5">{gesture.meaning}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Instructions</p>
            <p className="text-sm text-white/70 leading-relaxed">{gesture.instructions}</p>
          </div>
          <div className="p-3 rounded-xl flex items-start gap-2"
            style={{ background: `rgba(${r},${g},${b},0.08)`, border: `1px solid rgba(${r},${g},${b},0.2)` }}
          >
            <span className="text-base flex-shrink-0">💡</span>
            <p className="text-xs text-white/60 leading-relaxed">{gesture.tips}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
