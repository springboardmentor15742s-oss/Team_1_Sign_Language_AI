import { motion } from 'framer-motion';

export default function ForecastCard({ forecast }) {
  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 flex flex-col gap-6 border border-white/10 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="relative z-10">
        <h3 className="text-xl font-space font-bold text-white">AI Performance Forecast</h3>
        <p className="text-xs text-white/40">Predictive growth projection powered by historical learning velocity</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4 border border-white/5 flex flex-col gap-1">
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Current Band</span>
          <span className="text-base font-space font-bold text-white">{forecast.currentLevel}</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4 border border-purple-500/30 flex flex-col gap-1">
          <span className="text-[10px] text-purple-300 uppercase tracking-widest font-semibold">Predicted Next Level</span>
          <span className="text-base font-space font-bold text-purple-400">{forecast.predictedNextLevel}</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-4 border border-blue-500/30 flex flex-col gap-1">
          <span className="text-[10px] text-blue-300 uppercase tracking-widest font-semibold">Est. Target Date</span>
          <span className="text-base font-space font-bold text-blue-400">{forecast.estimatedCompletionDate}</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-4 border border-green-500/30 flex flex-col gap-1">
          <span className="text-[10px] text-green-300 uppercase tracking-widest font-semibold">Success Probability</span>
          <span className="text-base font-space font-bold text-green-400">{forecast.successProbability}</span>
        </motion.div>
      </div>

      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs relative z-10">
        <span className="text-white/60">Learning Confidence Index: <strong className="text-white">{forecast.learningConfidence}</strong></span>
        <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Predictive Model Active</span>
      </div>
    </div>
  );
}
