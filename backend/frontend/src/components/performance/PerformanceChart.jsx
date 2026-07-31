import { motion } from 'framer-motion';

export default function PerformanceChart({ data }) {
  // Find max value for scaling
  const maxScore = Math.max(...data.map(d => d.score), 100);
  
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 h-full" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Weekly Performance</h3>
          <p className="text-sm text-white/50 mt-1">Your score trend over the last 5 weeks</p>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] flex items-end justify-between gap-4 mt-4 relative pt-10 pb-6 border-b border-white/10">
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 py-6">
          <div className="w-full h-px bg-white relative"><span className="absolute -left-6 -top-2 text-[10px]">100</span></div>
          <div className="w-full h-px bg-white relative"><span className="absolute -left-6 -top-2 text-[10px]">75</span></div>
          <div className="w-full h-px bg-white relative"><span className="absolute -left-6 -top-2 text-[10px]">50</span></div>
          <div className="w-full h-px bg-white relative"><span className="absolute -left-6 -top-2 text-[10px]">25</span></div>
          <div className="w-full h-px bg-white relative"><span className="absolute -left-6 -top-2 text-[10px]">0</span></div>
        </div>

        {/* Chart Bars */}
        {data.map((d, i) => {
          const heightPct = (d.score / maxScore) * 100;
          
          return (
            <div key={i} className="flex flex-col items-center gap-2 group w-full relative z-10 h-full justify-end">
              <div className="absolute -top-10 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                {d.score}
              </div>
              
              <div className="w-full max-w-[48px] bg-purple-500/10 rounded-t-xl relative flex items-end justify-center group-hover:bg-purple-500/20 transition-all h-full overflow-hidden border border-purple-500/20 border-b-0">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="w-full rounded-t-xl bg-gradient-to-t from-purple-600 to-blue-400 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)' }}
                />
              </div>
              <span className="text-[10px] font-medium text-white/40 group-hover:text-white/80 absolute -bottom-6">{d.week}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
