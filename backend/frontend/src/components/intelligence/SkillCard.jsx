import { motion } from 'framer-motion';

export default function SkillCard({ skill, index }) {
  const [r, g, b] = skill.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group border border-white/5 hover:border-white/10 transition-all"
    >
      <div
        className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-500"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.6) 0%, transparent 70%)`, filter: 'blur(15px)' }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
          >
            {skill.icon}
          </div>
          <div>
            <h4 className="text-sm font-space font-bold text-white">{skill.category}</h4>
            <span className="text-[10px] text-white/40 font-medium">{skill.masteredSigns} of {skill.totalSigns} Signs Mastered</span>
          </div>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})`, border: `1px solid rgba(${r},${g},${b},0.3)` }}
        >
          {skill.currentLevel}
        </span>
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex justify-between items-center text-xs">
          <span className="text-white/50">Completion</span>
          <span className="font-bold text-white">{skill.completion}%</span>
        </div>
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${skill.completion}%`, background: `rgb(${r},${g},${b})` }} />
        </div>

        <div className="flex justify-between items-center text-xs mt-1">
          <span className="text-white/50">Mastery Index</span>
          <span className="font-bold text-purple-400">{skill.mastery}%</span>
        </div>
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-400" style={{ width: `${skill.mastery}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
