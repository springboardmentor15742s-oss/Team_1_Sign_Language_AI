import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { STATUS_CONFIG } from '../../data/reportData';

export default function ReportCard({ report, index = 0 }) {
  const navigate = useNavigate();
  const [r, g, b] = report?.color || [139, 92, 246];
  const status = STATUS_CONFIG[report?.status] || STATUS_CONFIG.generated;
  const genDate = report?.generatedDate || report?.date || 'Jul 28, 2026';
  const downloads = report?.downloads ?? 12;
  const views = report?.views ?? 45;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={() => navigate(`/reports/${report.id}`)}
      className="glass rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group cursor-pointer hover:bg-white/[0.04] transition-all duration-300"
      style={{ border: `1px solid rgba(${r},${g},${b},0.15)` }}
    >
      {/* Glow */}
      <div
        className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(20px)' }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${r},${g},${b},0.15)`, boxShadow: `0 0 16px rgba(${r},${g},${b},0.2)` }}
        >
          <svg className="w-5 h-5" style={{ color: `rgb(${r},${g},${b})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0 border ${status.color} ${status.bg} ${status.border}`}
        >
          {status.label}
        </span>
      </div>

      {/* Title & Type */}
      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug line-clamp-2">
          {report?.title}
        </h3>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
          style={{ background: `rgba(${r},${g},${b},0.12)`, color: `rgb(${r},${g},${b})` }}
        >
          {report?.type}
        </span>
      </div>

      {/* Mini bar chart */}
      {report?.chartData && report.chartData.length > 0 && (
        <div className="flex items-end gap-1 h-8 relative z-10">
          {report.chartData.slice(-7).map((val, i) => {
            const max = Math.max(...report.chartData);
            const pct = max > 0 ? (val / max) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex items-end">
                <div
                  className="w-full rounded-sm opacity-60 group-hover:opacity-90 transition-opacity"
                  style={{
                    height: `${Math.max(pct * 0.32, 4)}px`,
                    background: `rgb(${r},${g},${b})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between relative z-10 pt-1 border-t border-white/5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-white/30">Generated</span>
          <span className="text-xs text-white/60 font-medium">{genDate}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-white/30">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-[10px]">{downloads}</span>
          </div>
          <div className="flex items-center gap-1 text-white/30">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-[10px]">{views}</span>
          </div>
          <span
            className="text-[10px] font-bold group-hover:gap-2 transition-all flex items-center gap-1"
            style={{ color: `rgb(${r},${g},${b})` }}
          >
            View →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
