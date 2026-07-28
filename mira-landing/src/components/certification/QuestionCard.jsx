import { motion } from 'framer-motion';

export default function QuestionCard({ question, currentAnswer, onAnswer }) {
  if (!question) return null;

  const isMultipleChoice = question.type === 'multiple-choice';

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 w-full max-w-3xl mx-auto border border-white/10"
    >
      <h3 className="text-2xl font-space font-bold text-white text-center mb-4">
        {question.prompt}
      </h3>

      {isMultipleChoice ? (
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Mock Image Placeholder */}
          <div className="w-full md:w-1/2 aspect-video bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden relative group">
             <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
             <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
             <span className="absolute bottom-2 right-3 text-[10px] text-white/30 tracking-widest uppercase">Sign Reference</span>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onAnswer(opt)}
                className={`p-4 rounded-xl text-left font-medium transition-all duration-200 border ${
                  currentAnswer === opt
                    ? 'bg-purple-500/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-lg aspect-video bg-black rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
            {/* Mock Camera View */}
            <div className="absolute inset-0 border-4 border-dashed border-white/20 rounded-2xl m-4" />
            <div className="text-center flex flex-col items-center gap-2">
              <svg className="w-12 h-12 text-white/20 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-white/50">Camera Active (Simulated)</span>
            </div>
          </div>
          <button
            onClick={() => onAnswer(question.correctAnswer)} // auto answer correct for mock
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
              currentAnswer
                ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.4)]'
            }`}
          >
            {currentAnswer ? 'Gesture Captured ✓' : 'Capture Gesture'}
          </button>
        </div>
      )}
    </motion.div>
  );
}
