import { motion } from 'framer-motion';
import { STATUS_CONFIG } from '../../data/reportData';

export default function ReportPreview({ report, onView }) {
  if (!report) return null;
  const [r, g, b] = report.color;
  const status = STATUS_CONFIG[report.status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden cursor-pointer"
      style={{ border: `1px solid rgba(${r},${g},${b},0.2)`, boxShadow: `0 8px 32px rgba(${r},${g},${b},0.08)` }}
      onClick={onView}
    >
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(30px)' }}
      />

      <div className="relative z-10 flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${r},${g},${b},0.15)` }}
        >
          <svg className="w-5 h-5" style={{ color: `rgb(${r},${g},${b})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white/90 leading-snug truncate">{report.title}</h4>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
            >
              {report.type}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.color} ${status.bg} ${status.border}`}>
              {status.label}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-xs text-white/40 line-clamp-2 leading-relaxed">
        {report.summary}
      </div>

      {/* Mini metric chips */}
      {report.metrics.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2">
          {report.metrics.slice(0, 2).map((m, i) => (
            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-[10px] text-white/40">{m.label}:</span>
              <span className="text-[10px] font-bold text-white/80">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      <button
        className="relative z-10 text-xs font-semibold flex items-center gap-1.5 mt-1 transition-all"
        style={{ color: `rgb(${r},${g},${b})` }}
      >
        Open Full Report →
      </button>
    </motion.div>
  );
}
