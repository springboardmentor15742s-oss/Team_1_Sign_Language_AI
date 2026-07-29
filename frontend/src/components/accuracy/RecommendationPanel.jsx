import React from 'react';
import { motion } from 'framer-motion';

export default function RecommendationPanel({ skillsPerformance, onPracticeClick }) {
  const weakest = skillsPerformance?.weakest || [];
  const best = skillsPerformance?.best || [];

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div>
        <h3 className="text-xl font-space font-bold text-white">Skill Insights & Recommendations</h3>
        <p className="text-xs text-white/50 mt-0.5">Automated skill diagnostics pinpointing focus areas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weakest Skills Card */}
        <div className="p-5 rounded-2xl bg-red-500/[0.03] border border-red-500/20 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-sm">
                ⚠️
              </div>
              <h4 className="text-sm font-space font-bold text-white">Weakest Skills (Needs Focus)</h4>
            </div>
            <span className="text-[10px] text-red-300 font-semibold px-2 py-0.5 rounded bg-red-500/15">
              Priority Review
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {weakest.map((skill) => (
              <div key={skill.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white/90">{skill.name}</span>
                  <span className="text-[10px] text-white/40">{skill.category} · Priority: {skill.priority}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-space font-bold text-red-400">{skill.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Performing Skills Card */}
        <div className="p-5 rounded-2xl bg-green-500/[0.03] border border-green-500/20 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-sm">
                🌟
              </div>
              <h4 className="text-sm font-space font-bold text-white">Best Performing Skills</h4>
            </div>
            <span className="text-[10px] text-green-300 font-semibold px-2 py-0.5 rounded bg-green-500/15">
              High Mastery
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {best.map((skill) => (
              <div key={skill.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white/90">{skill.name}</span>
                  <span className="text-[10px] text-white/40">{skill.category} · {skill.status}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-space font-bold text-green-400">{skill.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
