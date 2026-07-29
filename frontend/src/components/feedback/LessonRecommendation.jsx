import { motion } from 'framer-motion';

export default function LessonRecommendation({ lesson, index }) {
  const [r, g, b] = lesson.color || [139, 92, 246];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-5 flex flex-col justify-between gap-4 border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
          >
            {lesson.emoji}
          </div>
          <div>
            <span className="text-[10px] font-semibold text-white/40 block uppercase tracking-wider">{lesson.module}</span>
            <h4 className="text-sm font-space font-bold text-white group-hover:text-purple-300 transition-colors">{lesson.title}</h4>
          </div>
        </div>
        <span className="text-[10px] font-bold text-white/50 px-2 py-0.5 rounded-full bg-white/5">{lesson.duration}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {lesson.tags.map((tag, i) => (
          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/60">
            #{tag}
          </span>
        ))}
      </div>

      <a
        href="/courses"
        className="w-full text-center py-2 rounded-xl text-xs font-semibold transition-all duration-200 mt-1"
        style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})`, border: `1px solid rgba(${r},${g},${b},0.3)` }}
      >
        Start Recommended Lesson →
      </a>
    </motion.div>
  );
}
