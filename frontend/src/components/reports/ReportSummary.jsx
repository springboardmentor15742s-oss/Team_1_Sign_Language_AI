import { motion } from 'framer-motion';
import { STATUS_CONFIG } from '../../data/reportData';

export default function ReportSummary({ report }) {
  const [r, g, b] = report.color;
  const status = STATUS_CONFIG[report.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      {/* Glow blob */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(60px)' }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${r},${g},${b},0.15)`, boxShadow: `0 0 24px rgba(${r},${g},${b},0.3)` }}
        >
          <svg className="w-7 h-7" style={{ color: `rgb(${r},${g},${b})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})`, border: `1px solid rgba(${r},${g},${b},0.3)` }}
            >
              {report.type}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${status.color} ${status.bg} ${status.border}`}>
              {status.label}
            </span>
            <span className="text-[10px] text-white/30 font-medium">Report ID: {report.id}</span>
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-space font-bold text-white leading-tight">
            {report.title}
          </h1>

          {/* Summary text */}
          <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
            {report.summary}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mt-1">
            <div className="flex items-center gap-2 text-white/40">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Generated: <strong className="text-white/70">{report.generatedDate}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-xs">Last viewed: <strong className="text-white/70">{report.lastViewed}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-xs">Downloads: <strong className="text-white/70">{report.downloads}</strong></span>
            </div>
          </div>

          {/* Notes */}
          {report.notes && (
            <div className="mt-2 p-3 rounded-xl text-xs text-white/40 leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="font-semibold text-white/50">Note: </span>{report.notes}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
