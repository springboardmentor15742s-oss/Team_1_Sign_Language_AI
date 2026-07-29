// src/components/feedback/FeedbackHeader.jsx
import { motion } from 'framer-motion';

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className="w-4 h-4" fill={i <= Math.round(value) ? '#f59e0b' : 'none'} stroke="#f59e0b" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
      <span className="text-xs text-white/50 ml-1">{value}/5</span>
    </div>
  );
}

export default function FeedbackHeader({ summary }) {
  const { overallAccuracy, grade, gradeColor, improvementScore, assessmentName, completedAt, aiConfidence, overallRating, estimatedSkillLevel } = summary;
  const [r, g, b] = gradeColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none rounded-full opacity-15"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.5) 0%, transparent 70%)`, filter: 'blur(70px)' }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 justify-between">
        {/* Left — Meta */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
              Module 7 · AI Feedback
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Completed
            </span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-white">{assessmentName}</h1>
            <p className="text-sm text-white/40 mt-1">Generated at {completedAt}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-1">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Overall Rating</span>
              <StarRating value={overallRating} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Skill Level</span>
              <span className="text-sm font-semibold text-white/80">{estimatedSkillLevel}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">AI Confidence</span>
              <span className="text-sm font-semibold" style={{ color: '#60a5fa' }}>{aiConfidence}%</span>
            </div>
          </div>
        </div>

        {/* Right — Score Block */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Grade badge */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
            style={{ background: `rgba(${r},${g},${b},0.15)`, border: `2px solid rgba(${r},${g},${b},0.4)`, boxShadow: `0 0 30px rgba(${r},${g},${b},0.25)` }}
          >
            <span className="text-3xl font-space font-black" style={{ color: `rgb(${r},${g},${b})` }}>{grade}</span>
          </div>

          {/* Accuracy */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Overall Accuracy</span>
            <span className="text-4xl font-space font-bold text-white">{overallAccuracy}%</span>
            <span className="text-xs font-semibold text-green-400">{improvementScore}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
