import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import AssessmentPlayer from '../../components/certification/AssessmentPlayer';
import ResultCard from '../../components/certification/ResultCard';
import LoadingSkeleton from '../../components/certification/LoadingSkeleton';
import { assessmentsList, assessmentQuestions } from '../../data/assessmentModuleData';

export default function AssessmentDetailsPage() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [state, setState] = useState('intro'); // intro, playing, result
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const found = assessmentsList.find(a => a.id === assessmentId);
      const qs = assessmentQuestions[assessmentId] || [];
      
      setAssessment(found);
      setQuestions(qs);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [assessmentId]);

  const handleStart = () => {
    setState('playing');
  };

  const handleComplete = (assessmentResult) => {
    setResult(assessmentResult);
    setState('result');
  };

  if (loading) {
    return <DashboardLayout><LoadingSkeleton /></DashboardLayout>;
  }

  if (!assessment) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-4">Assessment Not Found</h2>
          <button onClick={() => navigate('/assessments')} className="btn-primary">Go Back</button>
        </div>
      </DashboardLayout>
    );
  }

  const [r, g, b] = assessment.color;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto w-full pb-10">
        
        {state === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20 pointer-events-none blur-3xl"
              style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)` }}
            />
            
            <button onClick={() => navigate('/assessments')} className="text-white/50 hover:text-white mb-8 flex items-center gap-2 text-sm transition-colors">
              ← Back to Assessments
            </button>
            
            <div className="flex gap-3 items-center mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-white/10 text-white/80 border border-white/20">
                {assessment.level}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-white/10 text-white/80 border border-white/20">
                {assessment.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
              {assessment.title}
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass p-4 rounded-xl flex flex-col gap-1 border border-white/5">
                <span className="text-xs text-white/40">Duration</span>
                <span className="font-bold text-white">{assessment.duration}</span>
              </div>
              <div className="glass p-4 rounded-xl flex flex-col gap-1 border border-white/5">
                <span className="text-xs text-white/40">Questions</span>
                <span className="font-bold text-white">{assessment.questionsCount}</span>
              </div>
              <div className="glass p-4 rounded-xl flex flex-col gap-1 border border-white/5">
                <span className="text-xs text-white/40">Passing Score</span>
                <span className="font-bold text-white">{assessment.passingScore}%</span>
              </div>
              <div className="glass p-4 rounded-xl flex flex-col gap-1 border border-white/5">
                <span className="text-xs text-white/40">Difficulty</span>
                <span className="font-bold text-white">{assessment.difficulty}</span>
              </div>
            </div>

            <div className="mb-10 bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Instructions</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                {assessment.instructions}
              </p>
              
              <h3 className="text-sm font-bold text-white mb-2">Skills Covered:</h3>
              <ul className="flex flex-wrap gap-2">
                {assessment.skillsCovered.map((skill, i) => (
                  <li key={i} className="text-xs bg-black/40 px-3 py-1.5 rounded-lg text-white/60 border border-white/5">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleStart}
                className="px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, rgb(${r},${g},${b}), #000)`, color: 'white' }}
              >
                Start Assessment →
              </button>
            </div>
          </motion.div>
        )}

        {state === 'playing' && (
          <AssessmentPlayer 
            assessment={assessment} 
            questions={questions} 
            onComplete={handleComplete} 
          />
        )}

        {state === 'result' && result && (
          <ResultCard 
            result={result} 
            assessment={assessment} 
          />
        )}
        
      </div>
    </DashboardLayout>
  );
}
