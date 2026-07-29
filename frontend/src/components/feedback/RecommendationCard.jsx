import { motion } from 'framer-motion';

const priorityMeta = {
  Critical: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', text: '#f87171' },
  High: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#fbbf24' },
  Medium: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', text: '#60a5fa' },
  Info: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', text: '#4ade80' },
};

export default function RecommendationCard({ rec, index }) {
  const [r, g, b] = rec.color || [139, 92, 246];
  const pm = priorityMeta[rec.priority] || priorityMeta.Medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-start gap-4 p-4 rounded-2xl relative overflow-hidden group"
      style={{ background: `rgba(${r},${g},${b},0.05)`, border: `1px solid rgba(${r},${g},${b},0.18)` }}
    >
      <div
        className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.6) 0%, transparent 70%)`, filter: 'blur(15px)' }}
      />
      <div className="text-2xl flex-shrink-0">{rec.icon}</div>
      <div className="flex flex-col gap-1.5 flex-1 relative z-10">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-space font-bold text-white/90">{rec.title}</h4>
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0"
            style={{ background: pm.bg, border: `1px solid ${pm.border}`, color: pm.text }}
          >
            {rec.priority}
          </span>
        </div>
        <p className="text-xs text-white/55 leading-relaxed">{rec.description}</p>
        {rec.estimatedTime && (
          <span className="text-[10px] text-purple-400 font-semibold mt-0.5">⏱️ Target: {rec.estimatedTime}</span>
        )}
      </div>
    </motion.div>
  );
}
