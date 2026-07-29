import { motion } from 'framer-motion';

export default function RecommendationPanel({ recommendations }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 h-full" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Recommended Action Plan</h3>
          <p className="text-sm text-white/50 mt-1">Personalized paths to boost your score</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {recommendations.map((rec, i) => {
          const [r, g, b] = rec.color;
          const rgbColor = `rgb(${r},${g},${b})`;
          const bgRgb = `rgba(${r},${g},${b},0.15)`;
          
          return (
            <motion.div 
              key={rec.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all border border-white/5 flex flex-col gap-3 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 pointer-events-none transition-transform duration-500 group-hover:scale-150"
                style={{ background: `radial-gradient(circle, ${rgbColor} 0%, transparent 70%)`, filter: 'blur(20px)' }}
              />
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bgRgb, color: rgbColor }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {rec.type === 'Practice' 
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      }
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{rec.title}</span>
                    <span className="text-xs text-white/40 mt-0.5">{rec.description}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {rec.estimatedTime}
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    Target {rec.targetScore}
                  </span>
                </div>
                
                <span className="text-xs font-semibold px-3 py-1 rounded-full transition-colors" style={{ background: bgRgb, color: rgbColor }}>
                  Start {rec.type}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
