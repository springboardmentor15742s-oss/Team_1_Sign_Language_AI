import { motion } from 'framer-motion';

export default function PerformanceHeader({ 
  overallScore, 
  performanceGrade,
  skillLevel,
  rank,
  consistencyScore,
  improvementRate,
  previousWeekComparison
}) {
  // Calculate SVG stroke offset for the circular gauge
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;
  
  // Grade Color mapping
  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A+': case 'A': return '#22c55e'; // Green
      case 'B+': case 'B': return '#3b82f6'; // Blue
      case 'C': return '#f59e0b'; // Amber
      default: return '#ef4444'; // Red
    }
  };
  const gradeColor = getGradeColor(performanceGrade);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center lg:items-stretch"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${gradeColor} 0%, transparent 70%)`, filter: 'blur(50px)' }}
      />
      
      {/* ─── OVERALL SCORE GAUGE ────────────────────────────────── */}
      <div className="relative flex flex-col items-center justify-center min-w-[200px]">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Background Circle */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle 
              cx="60" cy="60" r={radius} 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="10" 
            />
            {/* Progress Circle */}
            <motion.circle 
              cx="60" cy="60" r={radius} 
              fill="none" 
              stroke={gradeColor} 
              strokeWidth="10" 
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ filter: `drop-shadow(0 0 10px ${gradeColor})` }}
            />
          </svg>
          
          <div className="flex flex-col items-center justify-center absolute inset-0 text-center">
            <span className="text-4xl font-space font-bold text-white tracking-tighter" style={{ textShadow: `0 0 20px ${gradeColor}` }}>
              {overallScore}
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-white/50">Score</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col items-center">
          <span className="text-2xl font-space font-bold" style={{ color: gradeColor }}>
            Grade {performanceGrade}
          </span>
          <span className="text-xs text-white/50 mt-1 uppercase tracking-wider">{skillLevel}</span>
        </div>
      </div>
      
      {/* ─── QUICK STATS & COMPARISON ───────────────────────────── */}
      <div className="flex-1 w-full flex flex-col justify-between gap-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Compare With Previous Week */}
          <div className="glass flex-1 rounded-2xl p-5 border border-white/5 flex flex-col gap-3 relative overflow-hidden bg-white/[0.02]">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Weekly Comparison
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-white/40">Last Week</span>
                <span className="text-lg font-space font-bold text-white/80">{previousWeekComparison.previousScore}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center px-4">
                <svg className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-xs text-white/40">This Week</span>
                <span className="text-lg font-space font-bold text-white">{previousWeekComparison.currentScore}</span>
              </div>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${previousWeekComparison.isUp ? 'bg-green-500/20 text-green-400' : 'bg-rose-500/20 text-rose-400'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {previousWeekComparison.isUp 
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  }
                </svg>
                {previousWeekComparison.percentageImprovement}
              </span>
              <span className="text-xs text-white/40 font-medium">Growth vs last week</span>
            </div>
          </div>
          
          {/* Quick Metrics */}
          <div className="flex-1 grid grid-cols-2 gap-3 w-full">
            <div className="glass rounded-xl p-4 border border-white/5 flex flex-col justify-center bg-white/[0.02]">
              <span className="text-xs text-white/40 mb-1">Consistency Score</span>
              <span className="text-lg font-space font-bold text-white">{consistencyScore}%</span>
            </div>
            <div className="glass rounded-xl p-4 border border-white/5 flex flex-col justify-center bg-white/[0.02]">
              <span className="text-xs text-white/40 mb-1">Improvement Rate</span>
              <span className="text-lg font-space font-bold text-white">{improvementRate}%</span>
            </div>
            <div className="glass rounded-xl p-4 border border-white/5 flex flex-col justify-center col-span-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs text-white/60 font-medium flex items-center gap-1">
                  <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                  Global Rank
                </span>
                <span className="text-lg font-space font-bold text-white">#{rank}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
