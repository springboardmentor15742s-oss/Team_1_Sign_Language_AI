import { motion } from 'framer-motion';

export default function WeightedScoreCard({ weights, scores, overallScore }) {
  const components = [
    { key: 'gestureAccuracy', label: 'Gesture Accuracy', weight: weights.gestureAccuracy, score: scores.gestureAccuracy, color: '#8b5cf6' },
    { key: 'assessmentPerformance', label: 'Assessment Perf.', weight: weights.assessmentPerformance, score: scores.assessmentPerformance, color: '#3b82f6' },
    { key: 'lessonCompletion', label: 'Lesson Completion', weight: weights.lessonCompletion, score: scores.lessonCompletion, color: '#ec4899' },
    { key: 'practiceConsistency', label: 'Practice Consistency', weight: weights.practiceConsistency, score: scores.practiceConsistency, color: '#10b981' },
    { key: 'skillImprovementRate', label: 'Skill Improvement', weight: weights.skillImprovementRate, score: scores.skillImprovementRate, color: '#f59e0b' },
  ];

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Scoring Breakdown</h3>
          <p className="text-sm text-white/50 mt-1">Based on official weighted model</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Total Score</span>
          <span className="text-3xl font-space font-bold text-white">{overallScore}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {components.map((comp, i) => (
          <motion.div 
            key={comp.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/80 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.color }} />
                {comp.label} <span className="text-white/30">({comp.weight * 100}%)</span>
              </span>
              <div className="flex items-center gap-3">
                <span className="font-space font-bold text-white">{comp.score}</span>
                <span className="text-xs text-white/30 font-mono w-16 text-right">
                  + {(comp.score * comp.weight).toFixed(1)}
                </span>
              </div>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 h-full rounded-full opacity-30"
                style={{ width: `${comp.score}%`, backgroundColor: comp.color }}
              />
              <div 
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ width: `${comp.score * comp.weight}%`, backgroundColor: comp.color, boxShadow: `0 0 10px ${comp.color}` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
