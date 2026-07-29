import React from 'react';
import { motion } from 'framer-motion';

export default function MetricCard({ metrics = [] }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Assessment Metrics Breakdown</h3>
          <p className="text-xs text-white/50 mt-0.5">Real-time evaluation scores across key gesture dimensions</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full text-purple-300 bg-purple-500/10 border border-purple-500/30">
          6 Key Dimensions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, i) => {
          const [r, g, b] = metric.color || [168, 85, 247];
          return (
            <motion.div
              key={metric.id || metric.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all flex flex-col gap-3 relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 pointer-events-none group-hover:scale-125 transition-transform"
                style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(10px)' }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.icon || 'M9 12l2 2 4-4'} />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-semibold text-white/90">{metric.name}</h4>
                    <span className="text-[10px] text-white/40">{metric.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-space font-bold" style={{ color: `rgb(${r},${g},${b})` }}>
                    {metric.score}%
                  </span>
                  <div className="text-[10px] font-semibold text-white/40">Grade {metric.grade}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, rgba(${r},${g},${b},0.6), rgb(${r},${g},${b}))` }}
                />
              </div>

              {metric.description && (
                <p className="text-[11px] text-white/40 leading-relaxed mt-1">{metric.description}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
