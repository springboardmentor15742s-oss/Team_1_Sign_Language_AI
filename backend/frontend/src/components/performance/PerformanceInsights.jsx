import { motion } from 'framer-motion';

export default function PerformanceInsights({ insights }) {
  const insightCards = [
    { 
      label: 'Strongest Skill', 
      value: insights.strongestSkill, 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z', 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    { 
      label: 'Weakest Skill', 
      value: insights.weakestSkill, 
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', 
      color: 'text-rose-400', 
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20'
    },
    { 
      label: 'Suggested Focus Area', 
      value: insights.suggestedFocusArea, 
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    { 
      label: 'Expected Improvement', 
      value: insights.expectedImprovement, 
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', 
      color: 'text-purple-400', 
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    }
  ];

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div>
        <h3 className="text-xl font-space font-bold text-white">Performance Insights</h3>
        <p className="text-sm text-white/50 mt-1">AI-driven analysis of your recent activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insightCards.map((card, i) => (
          <motion.div 
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`p-4 rounded-2xl flex items-start gap-4 border ${card.border} bg-white/[0.02] hover:bg-white/[0.05] transition-colors`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.bg} ${card.color}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">{card.label}</span>
              <span className={`text-sm md:text-base font-bold ${card.color}`}>{card.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
