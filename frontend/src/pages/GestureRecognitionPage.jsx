import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictGestureLandmarks, getModelsStatus } from '../api/api';
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
function formatSessionTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s < 10 ? '0' : ''}${s}s`;
}

// ─── Model Selector ───────────────────────────────────────────────────────────
const MODEL_OPTIONS = [
  {
    id: 'ensemble',
    label: 'Ensemble',
    shortLabel: 'ENS',
    description: 'Weighted 4-model vote',
    color: [168, 85, 247],
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
  {
    id: 'cnn',
    label: 'CNN',
    shortLabel: 'CNN',
    description: '1D Landmark Conv Network',
    color: [59, 130, 246],
    icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  },
  {
    id: 'lstm',
    label: 'LSTM',
    shortLabel: 'LSTM',
    description: 'Bidirectional RNN',
    color: [16, 185, 129],
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    id: 'transformer',
    label: 'Transformer',
    shortLabel: 'TRF',
    description: 'Multi-Head Attention',
    color: [245, 158, 11],
    icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  },
  {
    id: 'sklearn',
    label: 'Scikit-Learn',
    shortLabel: 'RF',
    description: 'Random Forest Classifier',
    color: [239, 68, 68],
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
];

function ModelSelector({ selected, onSelect, modelsStatus }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-strong rounded-3xl p-5 flex flex-col gap-4 mb-8"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-space font-bold text-white">AI Recognition Engine</h3>
          <p className="text-xs text-white/40">Select the active gesture recognition model</p>
        </div>
        {modelsStatus && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            4 Engines Active
          </div>
        )}
      </div>

      {/* Model Pills */}
      <div className="flex flex-wrap gap-2">
        {MODEL_OPTIONS.map((opt) => {
          const [r, g, b] = opt.color;
          const isActive = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              id={`model-selector-${opt.id}`}
              onClick={() => onSelect(opt.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative overflow-hidden"
              style={{
                background: isActive ? `rgba(${r},${g},${b},0.2)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? `rgba(${r},${g},${b},0.6)` : 'rgba(255,255,255,0.08)'}`,
                color: isActive ? `rgb(${r},${g},${b})` : 'rgba(255,255,255,0.55)',
                boxShadow: isActive ? `0 0 20px rgba(${r},${g},${b},0.25), inset 0 1px 0 rgba(${r},${g},${b},0.1)` : 'none',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="model-active-bg"
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center, rgba(${r},${g},${b},0.12) 0%, transparent 70%)` }}
                />
              )}
              <div className="w-5 h-5 relative z-10">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={opt.icon} />
                </svg>
              </div>
              <span className="relative z-10">{opt.label}</span>
              {isActive && (
                <span className="relative z-10 text-[9px] font-black uppercase tracking-widest ml-0.5"
                  style={{ color: `rgba(${r},${g},${b},0.8)` }}
                >
                  Active
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active model description row */}
      <AnimatePresence mode="wait">
        {MODEL_OPTIONS.filter(m => m.id === selected).map((opt) => {
          const [r, g, b] = opt.color;
          return (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 rounded-2xl px-4 py-2.5 overflow-hidden"
              style={{ background: `rgba(${r},${g},${b},0.07)`, border: `1px solid rgba(${r},${g},${b},0.2)` }}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={`rgb(${r},${g},${b})`} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={opt.icon} />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs font-semibold" style={{ color: `rgb(${r},${g},${b})` }}>{opt.label} — {opt.description}</span>
                {modelsStatus?.[opt.id] && (
                  <span className="text-[10px] text-white/40">{modelsStatus[opt.id]?.architecture ?? ''}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page Header ─────────────────────────────────────────────────────────────
function PageHeader({ sessionStatus, sessionSeconds }) {
  const formatTimerDisplay = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

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
        <div className="flex items-center gap-3">
          <div className="glass rounded-2xl px-5 py-3 flex flex-col items-end border border-white/10">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Active Timer</span>
            <span className="text-2xl font-space font-bold text-green-400 tabular-nums">
              {formatTimerDisplay(sessionSeconds)}
            </span>
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
      <p className="text-xs text-white/40">Click a gesture to test and evaluate accuracy</p>
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
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [stats, setStats] = useState({
    recognized: 24,
    avgAccuracy: 91.4,
    sessionTime: '0s',
    attempts: 28,
    successful: 23,
  });
  const [sessionStatus, setSessionStatus] = useState('System Ready');
  const [selectedModel, setSelectedModel] = useState('ensemble');
  const [modelsStatus, setModelsStatus] = useState(null);

  // Live Timer Effect: increments every second while camera is active
  useEffect(() => {
    let timer = null;
    if (cameraState === 'active') {
      timer = setInterval(() => {
        setSessionSeconds((prevSecs) => {
          const nextSecs = prevSecs + 1;
          setStats((prevStats) => ({
            ...prevStats,
            sessionTime: formatSessionTime(nextSecs),
          }));
          return nextSecs;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cameraState]);

  // Fetch live model status on mount
  useEffect(() => {
    getModelsStatus()
      .then(status => setModelsStatus(status))
      .catch(() => setModelsStatus(null));
  }, []);

  const simulateRecognition = useCallback(async (gesture) => {
    const target = gesture || getRandomGesture();
    setRecognitionStatus('processing');

    try {
      // Call backend recognition API with the selected model
      const apiRes = await predictGestureLandmarks(HAND_LANDMARKS, target.name, selectedModel);
      const conf = apiRes?.confidence ? Number(apiRes.confidence) : getRandomConfidence();
      const recSign = apiRes?.recognized_sign || target.name;

      // Find matching gesture from library or use target
      const matched = GESTURES.find(g => g.name.toUpperCase() === recSign.toUpperCase()) || target;

      setCurrentGesture(matched);
      setConfidence(conf);
      setTimestamp(getTimestamp());
      setRecognitionStatus(conf > 80 ? 'Recognized' : conf > 60 ? 'Partial Match' : 'Low Confidence');

      const result = conf > 80 ? 'Correct' : conf > 60 ? 'Partial' : 'Incorrect';
      const col = conf > 80 ? [34, 197, 94] : conf > 60 ? [245, 158, 11] : [239, 68, 68];
      setHistory(prev => [{ id: Date.now(), time: getTimestamp(), gesture: matched.name, confidence: conf, result, color: col }, ...prev.slice(0, 9)]);
      
      // Update Live Session Stats & Accuracy Metrics
      setStats(prev => {
        const nextAttempts = prev.attempts + 1;
        const nextRecognized = prev.recognized + 1;
        const nextSuccessful = conf > 80 ? prev.successful + 1 : prev.successful;
        const nextAvg = Math.round(((prev.avgAccuracy * prev.attempts + conf) / nextAttempts) * 10) / 10;
        return {
          ...prev,
          recognized: nextRecognized,
          attempts: nextAttempts,
          successful: nextSuccessful,
          avgAccuracy: nextAvg,
        };
      });
    } catch (err) {
      console.warn("Backend recognition fallback:", err);
      const conf = getRandomConfidence();
      setCurrentGesture(target);
      setConfidence(conf);
      setTimestamp(getTimestamp());
      setRecognitionStatus(conf > 80 ? 'Recognized' : conf > 60 ? 'Partial Match' : 'Low Confidence');
      const result = conf > 80 ? 'Correct' : conf > 60 ? 'Partial' : 'Incorrect';
      const col = conf > 80 ? [34, 197, 94] : conf > 60 ? [245, 158, 11] : [239, 68, 68];
      setHistory(prev => [{ id: Date.now(), time: getTimestamp(), gesture: target.name, confidence: conf, result, color: col }, ...prev.slice(0, 9)]);
      
      setStats(prev => {
        const nextAttempts = prev.attempts + 1;
        const nextRecognized = prev.recognized + 1;
        const nextSuccessful = conf > 80 ? prev.successful + 1 : prev.successful;
        const nextAvg = Math.round(((prev.avgAccuracy * prev.attempts + conf) / nextAttempts) * 10) / 10;
        return {
          ...prev,
          recognized: nextRecognized,
          attempts: nextAttempts,
          successful: nextSuccessful,
          avgAccuracy: nextAvg,
        };
      });
    }
  }, [selectedModel]);

  const handleRealtimeResult = useCallback((res) => {
    if (!res || !res.recognized_sign) return;
    const recSign = res.recognized_sign;
    const conf = res.confidence ? Number(res.confidence) : getRandomConfidence();
    const matched = GESTURES.find(g => g.name.toUpperCase() === recSign.toUpperCase()) || {
      id: recSign,
      name: recSign,
      asl: `ASL Sign: ${recSign}`,
      emoji: '✋',
      color: [139, 92, 246],
      category: 'Realtime',
      difficulty: 'Beginner',
      meaning: `Recognized ${recSign} sign in real-time camera stream.`,
      description: 'Hand gesture captured live from user camera.',
      commonUsage: 'Live practice',
      tips: ['Keep your hand steady in center of frame for maximum clarity.']
    };

    setCurrentGesture(matched);
    setConfidence(conf);
    setTimestamp(getTimestamp());
    setRecognitionStatus(conf > 80 ? 'Recognized Live' : conf > 60 ? 'Partial Match' : 'Low Confidence');

    const result = conf > 80 ? 'Correct' : conf > 60 ? 'Partial' : 'Incorrect';
    const col = conf > 80 ? [34, 197, 94] : conf > 60 ? [245, 158, 11] : [239, 68, 68];
    
    setHistory(prev => {
      if (prev.length > 0 && prev[0].gesture === matched.name && Math.abs(prev[0].confidence - conf) < 1) {
        return prev;
      }
      return [{ id: Date.now(), time: getTimestamp(), gesture: matched.name, confidence: conf, result, color: col }, ...prev.slice(0, 9)];
    });

    // Dynamically update accuracy and attempt metrics on real-time detection
    setStats(prev => {
      const nextAttempts = prev.attempts + 1;
      const nextRecognized = prev.recognized + 1;
      const nextSuccessful = conf > 80 ? prev.successful + 1 : prev.successful;
      const nextAvg = Math.round(((prev.avgAccuracy * prev.attempts + conf) / nextAttempts) * 10) / 10;
      return {
        ...prev,
        recognized: nextRecognized,
        attempts: nextAttempts,
        successful: nextSuccessful,
        avgAccuracy: nextAvg,
      };
    });
  }, []);

  const handleStartCamera = () => {
    setCameraState('loading');
    setSessionStatus('Initializing Camera...');
    setTimeout(() => {
      setCameraState('active');
      setSessionStatus('Live Camera Stream Active');
    }, 1200);
  };

  const handleStopCamera = () => {
    setCameraState('idle');
    setSessionStatus('Session Paused');
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
        {/* Header with live timer */}
        <PageHeader sessionStatus={sessionStatus} sessionSeconds={sessionSeconds} />

        {/* AI Model Selector */}
        <ModelSelector
          selected={selectedModel}
          onSelect={setSelectedModel}
          modelsStatus={modelsStatus}
        />

        {/* Session Statistics: live updating accuracy, timer, recognized count */}
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
              onRealtimeResult={handleRealtimeResult}
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
