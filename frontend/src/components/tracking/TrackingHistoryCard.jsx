import { motion } from 'framer-motion';

export default function TrackingHistoryCard({ session, onExport }) {
  const [r, g, b] = session.color || [139, 92, 246];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
        >
          {session.type.includes('Hand') ? '🤚' : '🧍'}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})`, border: `1px solid rgba(${r},${g},${b},0.3)` }}
            >
              {session.type}
            </span>
            <span className="text-xs text-white/40 font-mono">{session.date}</span>
          </div>
          <h4 className="text-base font-space font-bold text-white group-hover:text-purple-300 transition-colors">
            {session.session}
          </h4>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 mt-1">
            <span>⏱️ Duration: <strong>{session.duration}</strong></span>
            <span>🎥 Total Frames: <strong>{session.frames.toLocaleString()}</strong></span>
            <span>⚡ Rate: <strong>{session.fps} FPS</strong></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Avg Confidence</span>
          <span className="text-lg font-space font-bold" style={{ color: `rgb(${r},${g},${b})` }}>
            {session.avgConfidence}%
          </span>
        </div>

        <button
          onClick={() => onExport && onExport(session)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Data
        </button>
      </div>
    </motion.div>
  );
}
