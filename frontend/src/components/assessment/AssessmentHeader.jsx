// src/components/assessment/AssessmentHeader.jsx
import { motion } from 'framer-motion';

export default function AssessmentHeader({ title, description, level, progress, total, status, timeLeft }) {
  const pct = Math.round((progress / total) * 100);
  const [r, g, b] = level?.color || [168, 85, 247];

  const statusColors = {
    'Ready':      { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.35)', text: '#c084fc' },
    'Recording':  { bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.35)',  text: '#f87171' },
    'Processing': { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.35)', text: '#60a5fa' },
    'Completed':  { bg: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.35)',  text: '#4ade80' },
    'Paused':     { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.35)', text: '#fbbf24' },
  };
  const sc = statusColors[status] || statusColors['Ready'];

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const isLow = timeLeft < 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-full opacity-15"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.5) 0%, transparent 70%)`, filter: 'blur(60px)' }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left side */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ background: `rgba(${r},${g},${b},0.15)`, border: `1px solid rgba(${r},${g},${b},0.35)`, color: `rgb(${r},${g},${b})` }}
            >
              {level?.label || 'Assessment'}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider"
              style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}
            >
              {status === 'Recording' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />}
              {status}
            </span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-white">{title}</h1>
            <p className="text-sm text-white/50 mt-1">{description}</p>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-white/40">
              <span>Progress</span>
              <span className="font-semibold text-white/70">{progress} / {total} gestures</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, rgb(${r},${g},${b}), rgba(${r},${g},${b},0.6))`, boxShadow: `0 0 10px rgba(${r},${g},${b},0.4)` }}
              />
            </div>
            <span className="text-[10px] text-white/30">{pct}% complete</span>
          </div>
        </div>

        {/* Right side — Timer */}
        <div className="glass rounded-2xl px-6 py-4 flex flex-col items-center gap-1 flex-shrink-0"
          style={{ border: `1px solid ${isLow ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.07)'}` }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Time Remaining</span>
          <span
            className="text-3xl font-space font-bold tabular-nums"
            style={{ color: isLow ? '#f87171' : 'white' }}
          >
            {mins}:{secs}
          </span>
          {isLow && (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-[10px] font-bold text-red-400 uppercase tracking-wider"
            >
              Time Low!
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
