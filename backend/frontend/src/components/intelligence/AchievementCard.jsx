import { motion } from 'framer-motion';

export default function AchievementCard({ achievements }) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5 border border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-space font-bold text-white">Achievements & Badges</h3>
        <span className="text-xs text-white/40">{achievements.filter(a => a.unlocked).length} of {achievements.length} Unlocked</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className={`p-3.5 rounded-2xl flex flex-col items-center text-center gap-2 border transition-all ${
              item.unlocked
                ? 'bg-purple-500/[0.08] border-purple-500/30 hover:bg-purple-500/15'
                : 'bg-white/[0.02] border-white/5 opacity-40 grayscale'
            }`}
          >
            <span className="text-3xl">{item.icon}</span>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs font-space font-bold text-white leading-tight">{item.title}</h4>
              <p className="text-[10px] text-white/50 leading-tight mt-0.5">{item.desc}</p>
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase mt-1 ${item.unlocked ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/30'}`}>
              {item.unlocked ? `Unlocked · ${item.date}` : 'Locked'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
