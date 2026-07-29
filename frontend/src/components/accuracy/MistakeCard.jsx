import React from 'react';
import { motion } from 'framer-motion';

export default function MistakeCard({ mistakes = [] }) {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Mistake & Error Analysis</h3>
          <p className="text-xs text-white/50 mt-0.5">Detected posture flaws with AI-generated corrective guidance</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full text-amber-300 bg-amber-500/10 border border-amber-500/30">
          {mistakes.length} Detected
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {mistakes.map((mistake, index) => {
          const isHigh = mistake.priority === 'High' || mistake.severity === 'High';
          const isMedium = mistake.priority === 'Medium' || mistake.severity === 'Medium';

          const badgeClass = isHigh
            ? 'bg-red-500/15 text-red-400 border-red-500/30'
            : isMedium
            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
            : 'bg-blue-500/15 text-blue-400 border-blue-500/30';

          return (
            <motion.div
              key={mistake.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all flex flex-col gap-4 relative overflow-hidden group"
            >
              {/* Top Row: Title, Severity, Priority */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    {mistake.id}
                  </span>
                  <h4 className="text-base font-semibold text-white">{mistake.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/40 font-mono">Timestamp: {mistake.detectedAt}</span>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
                    Severity: {mistake.severity}
                  </span>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
                    Priority: {mistake.priority}
                  </span>
                </div>
              </div>

              {/* Recommended Correction */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  💡
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Recommended Correction</span>
                  <p className="text-xs text-white/80 leading-relaxed">{mistake.recommendedCorrection}</p>
                </div>
              </div>

              {/* Practice Recommendation */}
              <div className="p-3.5 rounded-xl bg-purple-500/[0.04] border border-purple-500/20 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  🎯
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Practice Recommendation</span>
                  <p className="text-xs text-white/70 leading-relaxed">{mistake.practiceRecommendation}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
