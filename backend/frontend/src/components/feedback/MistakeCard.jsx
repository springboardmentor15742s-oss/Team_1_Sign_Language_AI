import { motion } from 'framer-motion';

const severityMeta = {
  high: { label: 'High Severity', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', text: '#f87171' },
  medium: { label: 'Medium Severity', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24' },
  low: { label: 'Low Severity', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
};

export default function MistakeCard({ mistake, index }) {
  const sm = severityMeta[mistake.severity] || severityMeta.medium;
  const [r, g, b] = mistake.color || [139, 92, 246];

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-500"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.6) 0%, transparent 70%)`, filter: 'blur(15px)' }}
      />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{mistake.icon}</span>
          <div>
            <h4 className="text-sm font-space font-bold text-white">{mistake.label}</h4>
            <span className="text-[10px] text-white/40 font-medium">Gesture: {mistake.gesture}</span>
          </div>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
          style={{ background: sm.bg, border: `1px solid ${sm.border}`, color: sm.text }}
        >
          {sm.label}
        </span>
      </div>

      <p className="text-xs text-white/70 leading-relaxed relative z-10">{mistake.description}</p>

      <div
        className="p-3 rounded-xl relative z-10 flex items-start gap-2 text-xs"
        style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
      >
        <span className="text-purple-400 font-bold">💡 Hint:</span>
        <span className="text-white/80">{mistake.hint}</span>
      </div>
    </motion.div>
  );
}
