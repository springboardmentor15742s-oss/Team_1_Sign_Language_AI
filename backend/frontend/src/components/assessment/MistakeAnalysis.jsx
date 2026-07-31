// src/components/assessment/MistakeAnalysis.jsx
import { motion } from 'framer-motion';

const SEVERITY_META = {
  high:   { label: 'High',   bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.3)',  text: '#f87171', dot: '#ef4444' },
  medium: { label: 'Medium', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24', dot: '#f59e0b' },
  low:    { label: 'Low',    bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa', dot: '#3b82f6' },
};

export default function MistakeAnalysis({ mistakes, visible }) {
  if (!visible) return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <h3 className="text-lg font-space font-bold text-white">Mistake Analysis</h3>
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <span className="text-4xl">🎯</span>
        <p className="text-sm text-white/40 text-center">Complete a gesture attempt to see detailed mistake analysis here.</p>
      </div>
    </div>
  );

  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-space font-bold text-white">Mistake Analysis</h3>
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{mistakes.length} issues found</span>
      </div>

      <div className="flex flex-col gap-3">
        {mistakes.map((mistake, i) => {
          const sv = SEVERITY_META[mistake.severity] || SEVERITY_META.low;
          return (
            <motion.div
              key={mistake.key}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-3.5 rounded-xl"
              style={{ background: sv.bg, border: `1px solid ${sv.border}` }}
            >
              {/* Severity dot */}
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sv.dot, boxShadow: `0 0 8px ${sv.dot}` }} />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: sv.text }}>{mistake.label}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                    style={{ background: `${sv.bg}`, color: sv.text, border: `1px solid ${sv.border}` }}
                  >
                    {sv.label}
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{mistake.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
