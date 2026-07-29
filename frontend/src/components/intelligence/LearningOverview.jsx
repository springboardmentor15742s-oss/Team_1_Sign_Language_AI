import { motion } from 'framer-motion';

export default function LearningOverview({ overview }) {
  const cards = [
    { label: 'Current Level', value: overview.level, color: [168, 85, 247], icon: '🎓' },
    { label: 'Overall Progress', value: `${overview.overallProgress}%`, color: [59, 130, 246], icon: '📈' },
    { label: 'Skill Mastery', value: `${overview.skillMastery}%`, color: [34, 197, 94], icon: '⭐' },
    { label: 'Weekly Improvement', value: overview.weeklyImprovement, color: [245, 158, 11], icon: '⚡' },
    { label: 'Learning Streak', value: `${overview.learningStreak} Days 🔥`, color: [236, 72, 153], icon: '🔥' },
    { label: 'Est. Completion', value: overview.estimatedCompletion, color: [6, 182, 212], icon: '⌛' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
                Module 8 · Learning Intelligence
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live Telemetry Active
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-space font-bold text-white">
              Progress & Skill{' '}
              <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Intelligence Dashboard
              </span>
            </h1>
            <p className="text-sm text-white/50 mt-1">
              AI-driven insights into your ASL skill velocity, gesture accuracy trends, and personalized mastery forecasts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cards.map((card, i) => {
            const [r, g, b] = card.color;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group border border-white/5"
              >
                <div
                  className="absolute -right-4 -top-4 w-16 h-16 rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500"
                  style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.3) 0%, transparent 70%)`, filter: 'blur(10px)' }}
                />
                <span className="text-2xl relative z-10">{card.icon}</span>
                <div className="relative z-10">
                  <p className="text-lg font-space font-bold text-white tracking-tight">{card.value}</p>
                  <p className="text-[10px] text-white/40 mt-0.5 leading-tight font-medium">{card.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
