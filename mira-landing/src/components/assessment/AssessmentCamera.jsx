// src/components/assessment/AssessmentCamera.jsx
import { motion } from 'framer-motion';

// captureState: 'idle' | 'ready' | 'recording' | 'processing' | 'done'
export default function AssessmentCamera({ captureState, onStart, onCapture, onRetry, onSkip, onNext, canGoNext }) {
  const stateConfig = {
    idle:       { label: 'Assessment Not Started', sublabel: 'Click "Start Assessment" to begin', ringColor: 'rgba(139,92,246,0.4)', gridColor: 'rgba(139,92,246,0.15)', emoji: '🎯' },
    ready:      { label: 'Ready to Capture',        sublabel: 'Position your hand and click Capture',    ringColor: 'rgba(34,197,94,0.5)',   gridColor: 'rgba(34,197,94,0.08)',  emoji: '✋' },
    recording:  { label: 'Recording Gesture...',    sublabel: 'Hold the gesture steady',                 ringColor: 'rgba(239,68,68,0.6)',   gridColor: 'rgba(239,68,68,0.08)', emoji: '📸' },
    processing: { label: 'Analyzing Sign...',       sublabel: 'AI engine processing your gesture',      ringColor: 'rgba(59,130,246,0.5)',  gridColor: 'rgba(59,130,246,0.08)', emoji: '⚙️' },
    done:       { label: 'Gesture Captured!',       sublabel: 'Results ready below',                    ringColor: 'rgba(34,197,94,0.6)',   gridColor: 'rgba(34,197,94,0.1)',   emoji: '✅' },
  };
  const cfg = stateConfig[captureState] || stateConfig['idle'];
  const isActive = captureState !== 'idle';

  return (
    <div className="glass-strong rounded-3xl overflow-hidden flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Viewport */}
      <div className="relative bg-[#050510]" style={{ aspectRatio: '4/3', minHeight: 240 }}>
        {/* Grid */}
        {isActive && (
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${cfg.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${cfg.gridColor} 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          {/* Animated ring */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: captureState === 'recording' ? 0.8 : 2, repeat: Infinity }}
              className="absolute w-28 h-28 rounded-full border-2"
              style={{ borderColor: cfg.ringColor }}
            />
            <motion.div
              animate={captureState === 'processing' ? { rotate: 360 } : { scale: [0.97, 1.03, 0.97] }}
              transition={{ duration: captureState === 'processing' ? 1 : 2, repeat: Infinity, ease: captureState === 'processing' ? 'linear' : 'easeInOut' }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${cfg.ringColor}` }}
            >
              {cfg.emoji}
            </motion.div>
          </div>

          <div className="text-center">
            <p className="text-white text-sm font-semibold">{cfg.label}</p>
            <p className="text-white/40 text-xs mt-0.5">{cfg.sublabel}</p>
          </div>

          {/* Live indicator */}
          {captureState === 'recording' && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-red-400 text-[10px] font-bold tracking-widest uppercase">Recording</span>
            </div>
          )}
        </div>

        {/* Scan line on recording */}
        {captureState === 'recording' && (
          <motion.div
            animate={{ top: ['5%', '95%', '5%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.7), transparent)' }}
          />
        )}

        {/* Corner brackets */}
        {isActive && (
          <>
            {[
              'top-3 left-3 border-t-2 border-l-2',
              'top-3 right-3 border-t-2 border-r-2',
              'bottom-3 left-3 border-b-2 border-l-2',
              'bottom-3 right-3 border-b-2 border-r-2',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 ${cls}`} style={{ borderColor: cfg.ringColor }} />
            ))}
          </>
        )}
      </div>

      {/* Controls */}
      <AssessmentControls
        captureState={captureState}
        onStart={onStart}
        onCapture={onCapture}
        onRetry={onRetry}
        onSkip={onSkip}
        onNext={onNext}
        canGoNext={canGoNext}
      />
    </div>
  );
}

// ─── Assessment Controls ──────────────────────────────────────────────────────
export function AssessmentControls({ captureState, onStart, onCapture, onRetry, onSkip, onNext, canGoNext }) {
  const btnBase = 'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200';

  return (
    <div className="p-4 border-t border-white/10 flex flex-wrap items-center gap-3">
      {captureState === 'idle' && (
        <button onClick={onStart}
          className={`${btnBase} text-white`}
          style={{ background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', boxShadow: '0 0 20px rgba(139,92,246,0.35)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Start Assessment
        </button>
      )}

      {captureState === 'ready' && (
        <>
          <button onClick={onCapture}
            className={`${btnBase}`}
            style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Capture Gesture
          </button>
          <button onClick={onSkip}
            className={`${btnBase} text-white/50 hover:text-white hover:bg-white/5`}
          >
            Skip
          </button>
        </>
      )}

      {(captureState === 'recording' || captureState === 'processing') && (
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 rounded-full border-2 border-blue-500/30 border-t-blue-400"
          />
          <span className="text-sm text-white/60">{captureState === 'recording' ? 'Recording...' : 'Analyzing...'}</span>
        </div>
      )}

      {captureState === 'done' && (
        <>
          <button onClick={onRetry}
            className={`${btnBase} text-white/60 hover:text-white border border-white/10 hover:bg-white/5`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
          <button onClick={onNext} disabled={!canGoNext}
            className={`${btnBase} text-white disabled:opacity-40 disabled:cursor-not-allowed`}
            style={{ background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', boxShadow: '0 0 16px rgba(139,92,246,0.3)' }}
          >
            Next Gesture
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <a href="/feedback"
            className={`${btnBase} text-green-400 bg-green-500/10 border border-green-500/30 hover:bg-green-500/20`}
          >
            View AI Feedback →
          </a>
        </>
      )}
    </div>
  );
}
