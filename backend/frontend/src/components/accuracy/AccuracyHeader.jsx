import React from 'react';
import { motion } from 'framer-motion';

export default function AccuracyHeader({
  overallScore = 94.2,
  grade = 'A',
  status = 'Mastered',
  streak = '8 Days 🔥',
  onExport,
  onHistoryClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
              Module 6 · Accuracy Assessment Engine
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {streak}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/30">
              Grade {grade} · {status}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">
            Sign Accuracy{' '}
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Assessment Engine
            </span>
          </h1>
          <p className="text-xs md:text-sm text-white/50 max-w-2xl">
            Real-time multi-dimensional scoring engine evaluating hand shape, finger positions, 3D palm orientation, motion trajectories, and gesture timing.
          </p>
        </div>

        {/* Score Quick Pill & Actions */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="glass rounded-2xl p-4 flex items-center gap-4 border border-purple-500/30 bg-purple-500/5">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase font-semibold tracking-wider">Overall Accuracy</span>
              <span className="text-3xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                {overallScore}%
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl font-bold font-space text-purple-300">
              {grade}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onHistoryClick && (
              <button
                onClick={onHistoryClick}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </button>
            )}
            {onExport && (
              <button
                onClick={onExport}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/30 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Report
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
