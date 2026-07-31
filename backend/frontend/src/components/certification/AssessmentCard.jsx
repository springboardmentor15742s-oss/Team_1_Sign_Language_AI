import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AssessmentCard({ assessment, index }) {
  const navigate = useNavigate();
  const [r, g, b] = assessment.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      onClick={() => navigate(`/assessments/${assessment.id}`)}
    >
      <div
        className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150 pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`,
          filter: 'blur(15px)'
        }}
      />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="flex gap-2 items-center">
          <span className="text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider bg-white/10 text-white/80 border border-white/20">
            {assessment.level}
          </span>
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: `rgba(${r},${g},${b},0.15)`,
              color: `rgb(${r},${g},${b})`,
              border: `1px solid rgba(${r},${g},${b},0.3)`
            }}
          >
            {assessment.status}
          </span>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-space font-bold text-white mb-2">{assessment.title}</h3>
        <p className="text-sm text-white/50 mb-4">{assessment.category} · {assessment.difficulty}</p>
        
        <div className="flex items-center gap-4 text-xs text-white/70">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{assessment.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{assessment.questionsCount} Qs</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
        <span className="text-xs text-white/40">Pass Score: {assessment.passingScore}%</span>
        <button
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          style={{
            background: `rgba(${r},${g},${b},0.1)`,
            color: `rgb(${r},${g},${b})`
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = `rgba(${r},${g},${b},0.2)`}
          onMouseLeave={(e) => e.currentTarget.style.background = `rgba(${r},${g},${b},0.1)`}
        >
          Start <span className="text-lg leading-none">→</span>
        </button>
      </div>
    </motion.div>
  );
}
