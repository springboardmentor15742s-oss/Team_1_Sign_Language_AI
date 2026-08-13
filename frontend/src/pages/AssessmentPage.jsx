import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { evaluateAssessment } from '../api/api';

import AssessmentHeader   from '../components/assessment/AssessmentHeader';
import ReferenceGestureCard from '../components/assessment/ReferenceGestureCard';
import AssessmentCamera   from '../components/assessment/AssessmentCamera';
import AccuracyCard       from '../components/assessment/AccuracyCard';
import MistakeAnalysis    from '../components/assessment/MistakeAnalysis';
import PerformanceSummary from '../components/assessment/PerformanceSummary';
import AssessmentHistory  from '../components/assessment/AssessmentHistory';
import RecommendationCard from '../components/assessment/RecommendationCard';

import {
  ASSESSMENT_LEVELS,
  ASSESSMENT_GESTURES,
  ACCURACY_CATEGORIES,
  MISTAKE_TYPES,
  ASSESSMENT_HISTORY_MOCK,
  RECOMMENDATIONS,
  PERFORMANCE_SUMMARY_INITIAL,
} from '../data/assessmentData';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function randomScore(min = 55, max = 99) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomSubset(arr, n) { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }
function getTimestamp() { return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); }

const TIMER_TOTAL = 600; // 10-minute session

// ─── Level Selector ───────────────────────────────────────────────────────────
function LevelSelector({ levels, selected, onSelect, disabled }) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-4" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
      <h3 className="text-base font-space font-bold text-white">Select Level</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {levels.map(level => {
          const [r, g, b] = level.color;
          const isActive = selected?.id === level.id;
          return (
            <button
              key={level.id}
              onClick={() => !disabled && onSelect(level)}
              disabled={disabled}
              className="flex flex-col gap-1.5 p-3 rounded-xl text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isActive ? `rgba(${r},${g},${b},0.18)` : 'rgba(255,255,255,0.03)',
                border: isActive ? `1px solid rgba(${r},${g},${b},0.5)` : '1px solid rgba(255,255,255,0.07)',
                boxShadow: isActive ? `0 0 16px rgba(${r},${g},${b},0.2)` : 'none',
              }}
            >
              <span className="text-xs font-bold" style={{ color: isActive ? `rgb(${r},${g},${b})` : 'rgba(255,255,255,0.6)' }}>{level.label}</span>
              <span className="text-[10px] text-white/35 leading-tight">{level.description}</span>
              <span className="text-[10px] font-semibold" style={{ color: `rgb(${r},${g},${b})` }}>{level.total} gestures</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AssessmentPage() {
  const [level, setLevel]               = useState(ASSESSMENT_LEVELS[0]);
  const [gestureIndex, setGestureIndex] = useState(0);
  const [captureState, setCaptureState] = useState('idle');    // idle|ready|recording|processing|done
  const [sessionStatus, setSessionStatus] = useState('Ready');
  const [timeLeft, setTimeLeft]         = useState(TIMER_TOTAL);
  const [timerActive, setTimerActive]   = useState(false);
  const [scores, setScores]             = useState({});        // category.key → value
  const [mistakes, setMistakes]         = useState([]);
  const [showMistakes, setShowMistakes] = useState(false);
  const [history, setHistory]           = useState(ASSESSMENT_HISTORY_MOCK);
  const [summary, setSummary]           = useState(PERFORMANCE_SUMMARY_INITIAL);
  const timerRef = useRef(null);

  const currentGesture = ASSESSMENT_GESTURES[gestureIndex] || null;
  const totalGestures  = level.total;
  const progress       = Math.min(gestureIndex, totalGestures);

  // ─── Timer ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setSessionStatus('Time Up');
      setTimerActive(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [timerActive, timeLeft]);

  // ─── Capture flow with Backend API + local fallback ──────────────────────────
  const simulateCapture = useCallback(async () => {
    setCaptureState('recording');
    setSessionStatus('Recording');
    setTimeout(async () => {
      setCaptureState('processing');
      setSessionStatus('Processing');
      try {
        const apiRes = await evaluateAssessment({
          user_id: 1,
          gesture_name: currentGesture?.name || 'HELLO',
          expected_sign: currentGesture?.name || 'HELLO'
        });
        const resScores = apiRes?.scores || {};
        const newScores = {
          overall:   apiRes?.overall_accuracy    || randomScore(),
          handShape: resScores.hand_shape        || randomScore(),
          motion:    resScores.motion            || randomScore(),
          position:  resScores.position          || randomScore(),
          timing:    resScores.timing            || randomScore(),
        };
        setScores(newScores);
        setMistakes(apiRes?.mistakes || []);
        setShowMistakes(true);

        const overall = newScores.overall;
        const passed  = apiRes?.passed !== undefined ? apiRes.passed : overall >= 70;
        const result  = passed ? 'Pass' : 'Fail';
        const col     = passed ? [34, 197, 94] : [239, 68, 68];

        setHistory(prev => [
          { id: Date.now(), gesture: currentGesture?.name || '-', accuracy: overall, attempt: 1, time: getTimestamp(), result, color: col },
          ...prev.slice(0, 9),
        ]);
        setSummary(prev => ({
          attempted:     prev.attempted + 1,
          passed:        passed ? prev.passed + 1 : prev.passed,
          failed:        !passed ? prev.failed + 1 : prev.failed,
          avgAccuracy:   Math.round(((prev.avgAccuracy * prev.attempted + overall) / (prev.attempted + 1)) * 10) / 10,
          bestScore:     Math.max(prev.bestScore, overall),
          currentStreak: passed ? prev.currentStreak + 1 : 0,
        }));

        setCaptureState('done');
        setSessionStatus('Ready');
      } catch (err) {
        console.warn("Backend assessment evaluation fallback:", err);
        // Fallback: generate mock scores locally when backend is unavailable
        const newScores = {};
        ACCURACY_CATEGORIES.forEach(cat => { newScores[cat.key] = randomScore(); });
        setScores(newScores);
        const numMistakes = Math.floor(Math.random() * 4);
        setMistakes(numMistakes === 0 ? [] : randomSubset(MISTAKE_TYPES, numMistakes));
        setShowMistakes(true);

        const overall = newScores['overall'] || randomScore();
        const passed  = overall >= 70;
        const result  = passed ? 'Pass' : 'Fail';
        const col     = passed ? [34, 197, 94] : [239, 68, 68];

        setHistory(prev => [
          { id: Date.now(), gesture: currentGesture?.name || '-', accuracy: overall, attempt: 1, time: getTimestamp(), result, color: col },
          ...prev.slice(0, 9),
        ]);
        setSummary(prev => ({
          attempted: prev.attempted + 1,
          passed:    passed ? prev.passed + 1 : prev.passed,
          failed:    !passed ? prev.failed + 1 : prev.failed,
          avgAccuracy: Math.round(((prev.avgAccuracy * prev.attempted + overall) / (prev.attempted + 1)) * 10) / 10,
          bestScore:  Math.max(prev.bestScore, overall),
          currentStreak: passed ? prev.currentStreak + 1 : 0,
        }));

        setCaptureState('done');
        setSessionStatus('Ready');
      }
    }, 1500);
  }, [currentGesture]);

  const handleStart = () => {
    setCaptureState('ready');
    setSessionStatus('Ready');
    setTimerActive(true);
    setTimeLeft(TIMER_TOTAL);
  };

  const handleRetry = () => {
    setCaptureState('ready');
    setShowMistakes(false);
    setScores({});
    setMistakes([]);
  };

  const handleNext = () => {
    if (gestureIndex + 1 >= ASSESSMENT_GESTURES.length) {
      setGestureIndex(0);
    } else {
      setGestureIndex(i => i + 1);
    }
    setCaptureState('ready');
    setShowMistakes(false);
    setScores({});
    setMistakes([]);
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16 px-4 md:px-8">
      {/* Bg glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <AssessmentHeader
          title="Sign Accuracy Assessment"
          description="Perform each gesture and receive instant AI-powered accuracy feedback."
          level={level}
          progress={progress}
          total={totalGestures}
          status={sessionStatus}
          timeLeft={timeLeft}
        />

        {/* Level Selector */}
        <div className="mb-8">
          <LevelSelector
            levels={ASSESSMENT_LEVELS}
            selected={level}
            onSelect={setLevel}
            disabled={captureState !== 'idle'}
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Reference Gesture (2 cols) */}
          <div className="lg:col-span-2">
            <ReferenceGestureCard gesture={currentGesture} />
          </div>

          {/* Camera + Controls (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <AssessmentCamera
              captureState={captureState}
              onStart={handleStart}
              onCapture={simulateCapture}
              onRetry={handleRetry}
              onSkip={handleSkip}
              onNext={handleNext}
              canGoNext={captureState === 'done'}
            />

            {/* Accuracy Cards */}
            <AnimatePresence>
              {captureState === 'done' && Object.keys(scores).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-3 sm:grid-cols-5 gap-3"
                >
                  {ACCURACY_CATEGORIES.map((cat, i) => (
                    <AccuracyCard key={cat.key} category={cat} value={scores[cat.key] || 0} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Middle Row — Mistakes + Performance */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <MistakeAnalysis mistakes={mistakes} visible={showMistakes} />
          </div>
          <div className="lg:col-span-2">
            <PerformanceSummary stats={summary} />
          </div>
        </div>

        {/* Bottom Row — History + Recommendations */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <AssessmentHistory history={history} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="glass rounded-3xl p-6 flex flex-col gap-4" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-lg font-space font-bold text-white">Improvement Suggestions</h3>
              {RECOMMENDATIONS.map((rec, i) => (
                <RecommendationCard key={rec.id} rec={rec} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
