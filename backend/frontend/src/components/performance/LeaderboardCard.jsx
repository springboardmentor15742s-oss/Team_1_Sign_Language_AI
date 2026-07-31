import { motion } from 'framer-motion';

export default function LeaderboardCard({ stats }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 h-full relative overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex justify-between items-center relative z-10">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Global Leaderboard</h3>
          <p className="text-sm text-white/50 mt-1">Your standing among peers</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-6 relative z-10 flex-1">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-[spin_10s_linear_infinite]" border-style="dashed" />
          <div className="absolute inset-2 border-2 border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" border-style="dotted" />
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)]">
            <span className="text-3xl font-space font-bold text-white tracking-tighter">#{stats.rank}</span>
          </div>
        </motion.div>
        
        <div className="mt-6 flex flex-col items-center text-center">
          <span className="text-lg font-bold text-white/90">You are in the {stats.percentile}</span>
          <span className="text-sm text-white/50 mt-1">out of {stats.totalUsers.toLocaleString()} learners</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 relative z-10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-white/60">Points to next rank</span>
          <span className="font-bold text-purple-400">{stats.pointsToNextRank} pts</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-[70%]" />
        </div>
      </div>
    </div>
  );
}
