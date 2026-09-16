import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import TimerCard from './TimerCard';

export default function AssessmentPlayer({ assessment, questions = [], onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : [];
  const currentQuestion = safeQuestions[currentIndex] || null;
  const progress = safeQuestions.length > 0 ? ((currentIndex + 1) / safeQuestions.length) * 100 : 0;

  const handleAnswer = (answer) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < safeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      let correct = 0;
      safeQuestions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) correct++;
      });
      const total = safeQuestions.length || 1;
      const score = Math.round((correct / total) * 100);
      onComplete({ score, correct, total: safeQuestions.length });
    }, 1200);
  }, [answers, safeQuestions, onComplete]);

  if (!currentQuestion) {
    return (
      <div className="glass rounded-3xl p-10 text-center flex flex-col items-center gap-4">
        <h3 className="text-xl font-space font-bold text-white">Preparing Assessment Questions...</h3>
        <p className="text-sm text-white/50">Questions are being initialized for this assessment.</p>
        <button onClick={() => window.location.reload()} className="btn-primary text-xs mt-2">
          Reload Questions
        </button>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        <h3 className="text-xl font-space text-white animate-pulse">Analyzing results...</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-space font-bold text-white">{assessment.title}</h2>
          <p className="text-sm text-white/50">Question {currentIndex + 1} of {safeQuestions.length}</p>
        </div>
        <TimerCard durationStr={assessment.duration} onTimeUp={handleSubmit} />
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          currentAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
        />
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border border-white/10 text-white/70 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
        >
          ← Previous
        </button>

        {currentIndex === safeQuestions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < safeQuestions.length}
            className="px-8 py-2 rounded-xl text-sm font-bold bg-green-500 text-white hover:bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-200 disabled:opacity-50 disabled:shadow-none"
          >
            Submit Assessment
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-2 rounded-xl text-sm font-bold bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-200"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
