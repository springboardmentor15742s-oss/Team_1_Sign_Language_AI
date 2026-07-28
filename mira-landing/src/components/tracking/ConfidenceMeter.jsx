import { motion } from 'framer-motion';

export default function ConfidenceMeter({ value = 98.4, label = 'Tracking Confidence', color = [34, 197, 94] }) {
  const [r, g, b] = color;
  const rating = value >= 95 ? 'Optimal' : value >= 85 ? 'Good' : value >= 70 ? 'Fair' : 'Low';

  return (
    <div
      className="glass rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="absolute -right-4 -top-4 w-16 h-16 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.3) 0%, transparent 70%)`, filter: 'blur(10px)' }}
      />

      <div className="flex items-center justify-between text-xs relative z-10">
        <span className="text-white/60 font-medium">{label}</span>
        <span
          className="font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})`, border: `1px solid rgba(${r},${g},${b},0.3)` }}
        >
          {rating} ({value.toFixed(1)}%)
        </span>
      </div>

      <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, rgb(${r},${g},${b}), rgba(${r},${g},${b},0.6))`,
            boxShadow: `0 0 10px rgba(${r},${g},${b},0.5)`,
          }}
        />
      </div>
    </div>
  );
}
