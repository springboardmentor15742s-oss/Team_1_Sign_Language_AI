import { motion } from 'framer-motion';

export default function SkillBreakdownCard({ skills }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Skill Breakdown</h3>
          <p className="text-sm text-white/50 mt-1">Detailed view of your signing mechanics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {skills.map((skill, i) => {
          const [r, g, b] = skill.color;
          const rgbColor = `rgb(${r},${g},${b})`;
          const isUp = skill.trend.startsWith('+');
          
          return (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/5 flex flex-col gap-3 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none transition-transform duration-500 group-hover:scale-150"
                style={{ background: `radial-gradient(circle, ${rgbColor} 0%, transparent 70%)`, filter: 'blur(15px)' }}
              />
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{skill.name}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">{skill.strength}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-space font-bold" style={{ color: rgbColor }}>{skill.score}%</span>
                  <span className={`text-[10px] font-bold flex items-center gap-0.5 mt-0.5 ${isUp ? 'text-green-400' : 'text-rose-400'}`}>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isUp 
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                      }
                    </svg>
                    {skill.trend}
                  </span>
                </div>
              </div>

              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative z-10 mt-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.score}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                  className="h-full rounded-full" 
                  style={{ backgroundColor: rgbColor, boxShadow: `0 0 8px ${rgbColor}` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
