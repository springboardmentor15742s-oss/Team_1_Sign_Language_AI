import React from 'react';
import { motion } from 'framer-motion';

export default function AccuracyChart({ trendData = [], title = 'Weekly Accuracy Trend' }) {
  const maxScore = 100;
  const minScore = 80;

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-space font-bold text-white">{title}</h3>
          <p className="text-xs text-white/50 mt-0.5">Overall accuracy vs hand shape accuracy progression over time</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-purple-300">Overall Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="text-blue-300">Hand Shape</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[220px] flex items-end justify-between gap-3 mt-4 relative pt-6">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
        </div>

        {trendData.map((d, i) => {
          const overallPct = ((d.overall - minScore) / (maxScore - minScore)) * 100;
          const handShapePct = ((d.handShape - minScore) / (maxScore - minScore)) * 100;

          return (
            <div key={d.day || i} className="flex flex-col items-center gap-2 group w-full relative z-10">
              {/* Tooltip on hover */}
              <div className="absolute -top-10 bg-white/10 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-lg text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 whitespace-nowrap">
                Overall: {d.overall}% · Hand: {d.handShape}%
              </div>

              {/* Bar Group */}
              <div className="w-full max-w-[48px] h-[180px] bg-white/[0.02] rounded-t-xl relative flex items-end justify-center gap-1 p-1">
                {/* Overall bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(overallPct, 15)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className="w-1/2 rounded-t-md bg-gradient-to-t from-purple-600 to-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                />
                {/* Hand shape bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(handShapePct, 15)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 + 0.04 }}
                  className="w-1/2 rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 opacity-80"
                />
              </div>

              <span className="text-[10px] font-medium text-white/40 group-hover:text-white/90 transition-colors">
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
