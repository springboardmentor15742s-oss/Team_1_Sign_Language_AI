import React from 'react';
import { motion } from 'framer-motion';

export default function AchievementPanel({ achievements = [] }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Achievements & Honors</h3>
          <p className="text-xs text-white/50 mt-0.5">Badges and milestones earned during learning & assessments</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full text-amber-300 bg-amber-500/10 border border-amber-500/30">
          {achievements.length} Badges
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach, index) => (
          <motion.div
            key={ach.id || index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col gap-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {ach.icon || '🏆'}
              </div>
              <span className="text-[10px] text-white/30 font-mono">{ach.date}</span>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-space font-bold text-white group-hover:text-amber-300 transition-colors">
                {ach.title}
              </h4>
              <p className="text-[11px] text-white/50 leading-relaxed">{ach.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
