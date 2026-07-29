import { motion } from 'framer-motion';

export default function RecommendationCard({ recommendation }) {
  const { dailyGoal, estimatedPracticeTime, recommendedLessons, recommendedPracticeSessions } = recommendation;

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 flex flex-col gap-6 border border-white/10 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-space font-bold text-white">AI Learning Recommendations</h3>
          <p className="text-xs text-white/40">Custom tailored daily targets based on your error profile</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass px-3.5 py-1.5 rounded-xl border border-white/10 text-xs">
            <span className="text-white/40 block text-[9px] uppercase tracking-wider font-semibold">Suggested Daily Goal</span>
            <span className="font-bold text-purple-300">{dailyGoal}</span>
          </div>
          <div className="glass px-3.5 py-1.5 rounded-xl border border-white/10 text-xs">
            <span className="text-white/40 block text-[9px] uppercase tracking-wider font-semibold">Est. Remaining</span>
            <span className="font-bold text-blue-300">{estimatedPracticeTime}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recommended Lessons */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-space font-bold text-white/80">Top Recommended Lessons</h4>
          {recommendedLessons.map((item, i) => {
            const [r, g, b] = item.color;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: `rgb(${r},${g},${b})`, boxShadow: `0 0 8px rgb(${r},${g},${b})` }}
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-white/90">{item.title}</h5>
                    <span className="text-[10px] text-white/40">{item.type}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-400">{item.duration}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Recommended Practice Sessions */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-space font-bold text-white/80">Targeted Practice Sessions</h4>
          {recommendedPracticeSessions.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🎯</span>
                <div>
                  <h5 className="text-xs font-semibold text-white/90">{item.title}</h5>
                  <span className="text-[10px] text-green-400">Target: {item.target}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-400">{item.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
