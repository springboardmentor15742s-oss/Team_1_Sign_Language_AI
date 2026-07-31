import { useState } from 'react';
import { motion } from 'framer-motion';

import FeedbackHeader from '../components/feedback/FeedbackHeader';
import AISummaryCard from '../components/feedback/AISummaryCard';
import MistakeCard from '../components/feedback/MistakeCard';
import ComparisonViewer from '../components/feedback/ComparisonViewer';
import RecommendationCard from '../components/feedback/RecommendationCard';
import PredictionCard from '../components/feedback/PredictionCard';
import FeedbackHistory from '../components/feedback/FeedbackHistory';
import LessonRecommendation from '../components/feedback/LessonRecommendation';

import {
  FEEDBACK_SUMMARY,
  AI_SUMMARY_MESSAGES,
  DETECTED_MISTAKES,
  IMPROVEMENT_SUGGESTIONS,
  PROGRESS_PREDICTIONS,
  FEEDBACK_HISTORY,
  LESSON_RECOMMENDATIONS,
} from '../data/feedbackData';

export default function FeedbackPage() {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(0);
  const activeMessage = AI_SUMMARY_MESSAGES[selectedMessageIndex] || AI_SUMMARY_MESSAGES[0];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16 px-4 md:px-8">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-10 left-1/3 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        {/* 1. Header */}
        <FeedbackHeader summary={FEEDBACK_SUMMARY} />

        {/* 2. AI Overall Feedback Card */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-space font-bold text-white">AI Overall Feedback Summary</h2>
            <div className="flex gap-2">
              {AI_SUMMARY_MESSAGES.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMessageIndex(i)}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-all ${
                    selectedMessageIndex === i
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                      : 'bg-white/5 text-white/40 border border-white/10 hover:text-white'
                  }`}
                >
                  Feedback #{i + 1}
                </button>
              ))}
            </div>
          </div>
          <AISummaryCard
            messageObj={activeMessage}
            aiConfidence={FEEDBACK_SUMMARY.aiConfidence}
            estimatedSkillLevel={FEEDBACK_SUMMARY.estimatedSkillLevel}
          />
        </div>

        {/* 3. Progress Prediction */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-space font-bold text-white">Progress Predictions & Readiness</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRESS_PREDICTIONS.map((pred, i) => (
              <PredictionCard key={pred.label} prediction={pred} index={i} />
            ))}
          </div>
        </div>

        {/* 4. Main Grid: Mistake Detection Panel (Left) & Gesture Comparison (Right) */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-space font-bold text-white">Detected Issues & Mistakes</h3>
              <span className="text-xs text-white/40">{DETECTED_MISTAKES.length} Items</span>
            </div>
            <div className="flex flex-col gap-3">
              {DETECTED_MISTAKES.map((mistake, i) => (
                <MistakeCard key={mistake.id} mistake={mistake} index={i} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Gesture Comparison Visualizer */}
            <ComparisonViewer selectedGesture="Help" />

            {/* Improvement Suggestions */}
            <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-5 border border-white/10">
              <h3 className="text-lg font-space font-bold text-white">Personalized Improvement Recommendations</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {IMPROVEMENT_SUGGESTIONS.map((rec, i) => (
                  <RecommendationCard key={rec.id} rec={rec} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Recommended Lessons */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-space font-bold text-white">Targeted Course Lessons</h3>
            <a href="/courses" className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
              Browse All Courses →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LESSON_RECOMMENDATIONS.map((lesson, i) => (
              <LessonRecommendation key={lesson.id} lesson={lesson} index={i} />
            ))}
          </div>
        </div>

        {/* 6. Feedback History */}
        <FeedbackHistory history={FEEDBACK_HISTORY} />
      </div>
    </div>
  );
}
