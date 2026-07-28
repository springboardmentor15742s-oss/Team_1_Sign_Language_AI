// src/components/assessment/AccuracyCard.jsx
import { motion } from 'framer-motion';

// Animated circular progress ring
function CircleProgress({ value, color, size = 80, stroke = 7 }) {
  const [r2, g2, b2] = color;
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background ring */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={`rgb(${r2},${g2},${b2})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 6px rgba(${r2},${g2},${b2},0.6))` }}
        />
      </svg>
      <span className="absolute text-sm font-space font-bold text-white tabular-nums">{value}%</span>
    </div>
  );
}

export default function AccuracyCard({ category, value, index }) {
  const [r, g, b] = category.color;
  const rating = value >= 90 ? 'Excellent' : value >= 75 ? 'Good' : value >= 60 ? 'Needs Work' : 'Poor';
  const ratingColor = value >= 90 ? [34,197,94] : value >= 75 ? [59,130,246] : value >= 60 ? [245,158,11] : [239,68,68];
  const [rr, rg, rb] = ratingColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl p-5 flex flex-col items-center gap-4 relative overflow-hidden group"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Hover glow */}
      <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-[2]"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.8) 0%, transparent 70%)`, filter: 'blur(12px)' }}
      />

      {/* Icon */}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center relative z-10"
        style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
      >
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
        </svg>
      </div>

      {/* Circular progress */}
      <CircleProgress value={value} color={category.color} />

      {/* Label & rating */}
      <div className="text-center relative z-10">
        <p className="text-sm font-semibold text-white/90">{category.label}</p>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
          style={{ background: `rgba(${rr},${rg},${rb},0.15)`, color: `rgb(${rr},${rg},${rb})` }}
        >
          {rating}
        </span>
      </div>
    </motion.div>
  );
}
