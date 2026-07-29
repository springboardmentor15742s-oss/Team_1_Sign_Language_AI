import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ResultCard({ result, assessment }) {
  const navigate = useNavigate();
  const passed = result.score >= assessment.passingScore;
  const color = passed ? 'green' : 'red';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-8 md:p-12 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto border border-white/10 relative overflow-hidden"
    >
      <div
        className={`absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-b from-${color}-500/40 to-transparent`}
      />

      <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-${color}-500/20 text-${color}-400 mb-2 border-4 border-${color}-500/30`}>
        {passed ? (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      <div>
        <h2 className="text-3xl font-space font-bold text-white mb-2">
          {passed ? 'Congratulations!' : 'Keep Practicing'}
        </h2>
        <p className="text-white/60">
          You {passed ? 'passed' : 'did not pass'} the <strong>{assessment.title}</strong> assessment.
        </p>
      </div>

      <div className="flex justify-center gap-8 w-full py-6 border-y border-white/10">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/40 uppercase tracking-wider">Your Score</span>
          <span className={`text-4xl font-space font-bold text-${color}-400`}>{result.score}%</span>
        </div>
        <div className="w-px bg-white/10" />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/40 uppercase tracking-wider">Passing Score</span>
          <span className="text-4xl font-space font-bold text-white/80">{assessment.passingScore}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full text-left bg-white/5 p-4 rounded-xl border border-white/10">
        <h4 className="text-sm font-semibold text-white">Performance Summary</h4>
        <p className="text-xs text-white/60">
          Correct Answers: <strong className="text-white">{result.correct} / {result.total}</strong>
        </p>
        <p className="text-xs text-white/60 mt-1">
          {passed
            ? "Excellent work! You've demonstrated a strong understanding of these concepts."
            : "Review the materials and try again. Focus on accuracy and proper hand positioning."}
        </p>
      </div>

      <div className="flex gap-4 mt-4 w-full">
        {!passed && (
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-3 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
          >
            Retry Assessment
          </button>
        )}
        <button
          onClick={() => navigate('/assessments')}
          className="flex-1 py-3 rounded-xl font-bold bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    </motion.div>
  );
}
