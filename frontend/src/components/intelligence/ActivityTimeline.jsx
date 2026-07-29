import { motion } from 'framer-motion';

export default function ActivityTimeline({ timeline }) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5 border border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-space font-bold text-white">Recent Activity Timeline</h3>
        <span className="text-xs text-white/40">Latest 4 Activities</span>
      </div>

      <div className="flex flex-col gap-4 relative pl-4 border-l border-white/10">
        {timeline.map((item, i) => {
          const [r, g, b] = item.color;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative flex flex-col gap-1 pl-4 group"
            >
              {/* Timeline Bullet */}
              <div
                className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-[#050505]"
                style={{ backgroundColor: `rgb(${r},${g},${b})`, boxShadow: `0 0 10px rgb(${r},${g},${b})` }}
              />

              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white/90 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <span className="text-[10px] text-white/40">{item.time}</span>
              </div>

              <div className="flex items-center gap-2 mt-0.5">
                {item.score && <span className="text-[10px] font-bold text-green-400">{item.score}</span>}
                {item.duration && <span className="text-[10px] font-medium text-blue-400">{item.duration}</span>}
                {item.achievement && <span className="text-[10px] font-bold text-purple-400">{item.achievement}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
