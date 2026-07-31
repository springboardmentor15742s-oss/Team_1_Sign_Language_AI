import { motion } from 'framer-motion';

export default function PredictionCard({ prediction, index }) {
  const [r, g, b] = prediction.color || [139, 92, 246];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="absolute -right-4 -top-4 w-16 h-16 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.3) 0%, transparent 70%)`, filter: 'blur(10px)' }}
      />

      <div className="flex items-center justify-between relative z-10">
        <span className="text-2xl">{prediction.icon}</span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
        >
          {prediction.sub}
        </span>
      </div>

      <div className="relative z-10">
        <h4 className="text-xl font-space font-bold text-white">{prediction.value}</h4>
        <p className="text-xs text-white/40 mt-0.5 font-medium">{prediction.label}</p>
      </div>
    </motion.div>
  );
}
