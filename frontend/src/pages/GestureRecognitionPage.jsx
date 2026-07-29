import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CameraCard,
  RecognitionCard,
  LandmarkViewer,
  GestureInfoCard,
  SessionStats,
  RecognitionHistory,
} from '../components/gesture/GestureComponents';
import {
  GESTURES,
  RECOGNITION_HISTORY,
  HAND_LANDMARKS,
  LANDMARK_CONNECTIONS,
  GROUP_COLORS,
  SESSION_STATS_INITIAL,
  PRACTICE_TIPS,
} from '../data/gestureData';

// ─── Utility ─────────────────────────────────────────────────────────────────
function getRandomGesture() {
  return GESTURES[Math.floor(Math.random() * GESTURES.length)];
}
function getRandomConfidence(min = 70, max = 99) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}
function getTimestamp() {
  return new Date().toLocaleTimeString('en-GB');
}

// ─── Page Header ─────────────────────────────────────────────────────────────
function PageHeader({ sessionStatus }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
              Module 4
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {sessionStatus}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-space font-bold text-white">
            Gesture{' '}
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Recognition
            </span>
          </h1>
          <p className="text-sm text-white/50 max-w-xl">
            Real-time AI-powered sign language gesture recognition. Position your hand in frame and let the engine identify your signs.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)' }}>
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/40">Recognition Engine</p>
              <p className="text-sm font-semibold text-white">Sign Language AI v2.0</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Gesture Selector ─────────────────────────────────────────────────────────
function GestureSelector({ gestures, selected, onSelect }) {
  return (
    <div className="glass rounded-3xl p-5 flex flex-col gap-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 className="text-base font-space font-bold text-white">Gesture Library</h3>
      <p className="text-xs text-white/40">Click a gesture to simulate recognition</p>
      <div className="flex flex-wrap gap-2">
        {gestures.map((g) => {
          const [r, g2, b] = g.color;
          const isSelected = selected?.id === g.id;
          return (
            <button
              key={g.id}
              onClick={() => onSelect(g)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
              style={{
                background: isSelected ? `rgba(${r},${g2},${b},0.25)` : 'rgba(255,255,255,0.04)',
                border: isSelected ? `1px solid rgba(${r},${g2},${b},0.5)` : '1px solid rgba(255,255,255,0.08)',
                color: isSelected ? `rgb(${r},${g2},${b})` : 'rgba(255,255,255,0.6)',
                boxShadow: isSelected ? `0 0 16px rgba(${r},${g2},${b},0.2)` : 'none',
              }}
            >
              <span>{g.emoji}</span>
              <span>{g.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Practice Tips ────────────────────────────────────────────────────────────
function PracticeTips({ tips }) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 className="text-lg font-space font-bold text-white">Practice Tips</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span className="text-xl flex-shrink-0">{tip.icon}</span>
            <p className="text-xs text-white/60 leading-relaxed">{tip.tip}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GestureRecognitionPage() {
  const [cameraState, setCameraState] = useState('idle'); // idle | loading | active
  const [currentGesture, setCurrentGesture] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [recognitionStatus, setRecognitionStatus] = useState('Idle');
  const [timestamp, setTimestamp] = useState(null);
  const [history, setHistory] = useState(RECOGNITION_HISTORY);
  const [stats, setStats] = useState(SESSION_STATS_INITIAL);
  const [sessionStatus, setSessionStatus] = useState('System Ready');
  const [simulatingAuto, setSimulatingAuto] = useState(false);

  // Simulate a recognition event
  const simulateRecognition = useCallback((gesture) => {
    const target = gesture || getRandomGesture();
    setRecognitionStatus('processing');
    setTimeout(() => {
      const conf = getRandomConfidence();
      setCurrentGesture(target);
      setConfidence(conf);
      setTimestamp(getTimestamp());
      setRecognitionStatus(conf > 80 ? 'Recognized' : conf > 60 ? 'Partial Match' : 'Low Confidence');
      // Append to history
      const result = conf > 80 ? 'Correct' : conf > 60 ? 'Partial' : 'Incorrect';
      const col = conf > 80 ? [34, 197, 94] : conf > 60 ? [245, 158, 11] : [239, 68, 68];
      setHistory(prev => [{ id: Date.now(), time: getTimestamp(), gesture: target.name, confidence: conf, result, color: col }, ...prev.slice(0, 9)]);
      setStats(prev => ({
        ...prev,
        recognized: prev.recognized + 1,
        attempts: prev.attempts + 1,
        successful: conf > 80 ? prev.successful + 1 : prev.successful,
        avgAccuracy: Math.round(((prev.avgAccuracy * prev.attempts + conf) / (prev.attempts + 1)) * 10) / 10,
      }));
    }, 1200);
  }, []);

  // Auto-simulate when camera is active
  useEffect(() => {
    if (cameraState === 'active' && simulatingAuto) {
      const interval = setInterval(() => simulateRecognition(), 4000);
      return () => clearInterval(interval);
    }
  }, [cameraState, simulatingAuto, simulateRecognition]);

  const handleStartCamera = () => {
    setCameraState('loading');
    setSessionStatus('Initializing...');
    setTimeout(() => {
      setCameraState('active');
      setSessionStatus('Session Active');
      setSimulatingAuto(true);
    }, 2000);
  };

  const handleStopCamera = () => {
    setCameraState('idle');
    setSessionStatus('Session Paused');
    setSimulatingAuto(false);
    setCurrentGesture(null);
    setConfidence(0);
    setRecognitionStatus('Idle');
  };

  const handleCapture = () => {
    if (cameraState === 'active') simulateRecognition();
  };

  const handleSwitch = () => {
    if (cameraState === 'active') {
      setCameraState('loading');
      setTimeout(() => setCameraState('active'), 1000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16 px-4 md:px-8">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/3 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.5) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <PageHeader sessionStatus={sessionStatus} />

        {/* Session Statistics */}
        <div className="mb-8">
          <SessionStats stats={stats} />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Camera + Gesture Selector (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <CameraCard
              cameraState={cameraState}
              onStart={handleStartCamera}
              onStop={handleStopCamera}
              onCapture={handleCapture}
              onSwitch={handleSwitch}
            />
            <GestureSelector
              gestures={GESTURES}
              selected={currentGesture}
              onSelect={(g) => { if (cameraState === 'active') simulateRecognition(g); }}
            />
          </div>

          {/* Recognition + Landmarks (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <RecognitionCard
              gesture={currentGesture}
              confidence={confidence}
              status={recognitionStatus}
              timestamp={timestamp}
              category={currentGesture?.category}
            />
            <LandmarkViewer
              landmarks={HAND_LANDMARKS}
              connections={LANDMARK_CONNECTIONS}
              groupColors={GROUP_COLORS}
              isActive={cameraState === 'active'}
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Gesture Info (2 cols) */}
          <div className="lg:col-span-2">
            <GestureInfoCard gesture={currentGesture} />
          </div>
          {/* Recognition History (3 cols) */}
          <div className="lg:col-span-3">
            <RecognitionHistory history={history} />
          </div>
        </div>

        {/* Practice Tips */}
        <PracticeTips tips={PRACTICE_TIPS} />
      </div>
    </div>
  );
}
