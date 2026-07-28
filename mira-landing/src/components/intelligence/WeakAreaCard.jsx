import { motion } from 'framer-motion';

const severityMeta = {
  High: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', text: '#f87171' },
  Medium: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24' },
  Low: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
};

export default function WeakAreaCard({ area, index }) {
  const [r, g, b] = area.color;
  const sm = severityMeta[area.severity] || severityMeta.Medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group border border-white/5"
    >
      <div
        className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-500"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.6) 0%, transparent 70%)`, filter: 'blur(15px)' }}
      />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{area.icon}</span>
          <div>
            <h4 className="text-sm font-space font-bold text-white">{area.title}</h4>
            <span className="text-[10px] text-white/40">{area.metric}</span>
          </div>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
          style={{ background: sm.bg, border: `1px solid ${sm.border}`, color: sm.text }}
        >
          {area.severity} Priority
        </span>
      </div>

      <div className="flex flex-col gap-1.5 relative z-10">
        <div className="flex justify-between items-center text-xs">
          <span className="text-white/50">Current Accuracy</span>
          <span className="font-bold" style={{ color: `rgb(${r},${g},${b})` }}>{area.accuracy}%</span>
        </div>
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${area.accuracy}%`, background: `rgb(${r},${g},${b})` }} />
        </div>
        <span className="text-[10px] text-green-400 font-semibold">{area.improvement} vs last week</span>
      </div>

      <div
        className="p-3 rounded-xl relative z-10 flex items-start gap-2 text-xs"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="text-amber-400 font-bold">💡 Practice:</span>
        <span className="text-white/70">{area.recommendation}</span>
      </div>
    </motion.div>
  );
}
