import React from 'react';
import { motion } from 'framer-motion';

export default function ReportHeader({
  title = 'Analytics & Reports Dashboard',
  subtitle = 'Generate, view, and export performance reports, assessment data, and learning metrics.',
  badge = 'Module 13 · Reporting Engine',
  stats,
  onExportClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
              {badge}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live Analytics Ready
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs md:text-sm text-white/50 max-w-2xl">{subtitle}</p>
        </div>

        {/* Right actions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {stats && (
            <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-4 border border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-semibold">Total Reports</span>
                <span className="text-xl font-space font-bold text-purple-300">{stats.totalReports || 24}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-semibold">Exports</span>
                <span className="text-xl font-space font-bold text-blue-300">{stats.totalExports || 14}</span>
              </div>
            </div>
          )}

          {onExportClick && (
            <button
              onClick={onExportClick}
              className="px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/30 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Options
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
