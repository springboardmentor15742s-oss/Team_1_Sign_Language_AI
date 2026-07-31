import { motion } from 'framer-motion';

export default function AchievementSummary({ achievements }) {
  const items = [
    { label: 'Highest Score', value: achievements.highestScore, icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Best Week', value: achievements.bestWeek, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Longest Streak', value: achievements.longestStreak, icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { label: 'Top Skill', value: achievements.topSkill, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Achievements</h3>
          <p className="text-sm text-white/50 mt-1">Your learning milestones</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {items.map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col gap-2"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg} ${item.color}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{item.label}</span>
              <span className="text-sm font-bold text-white/90">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-amber-400/80 uppercase tracking-wider font-semibold">Latest Unlock</span>
          <span className="text-sm font-bold text-white">{achievements.recentUnlock}</span>
        </div>
      </div>
    </div>
  );
}
