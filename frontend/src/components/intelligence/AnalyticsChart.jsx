import { motion } from 'framer-motion';

export default function AnalyticsChart({ weeklyData, monthlyData }) {
  const maxHrs = Math.max(...weeklyData.map((d) => d.hrs), 1);

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 border border-white/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Learning Analytics & Velocity</h3>
          <p className="text-xs text-white/40 font-medium">Practice hours vs accuracy consistency tracking</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-white/70">Practice Hrs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-white/70">Accuracy %</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Weekly Chart Bar View */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <span className="text-xs font-semibold text-white/50">Weekly Practice Distribution</span>
          <div className="flex items-end justify-between gap-2 h-44 pt-6 relative border-b border-white/10">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
            </div>

            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 relative z-10 group">
                <div className="w-full max-w-[36px] bg-purple-500/20 rounded-t-lg relative flex items-end justify-center group-hover:bg-purple-500/30 transition-all h-36">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.hrs / maxHrs) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-blue-400"
                  />
                </div>
                <span className="text-[10px] text-white/40 font-mono">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend List */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-white/50">Monthly Accuracy Growth</span>
          <div className="flex flex-col gap-3">
            {monthlyData.map((m, i) => (
              <div key={i} className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70 font-medium">{m.month}</span>
                  <span className="font-bold text-blue-400">{m.score}% Accuracy</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
