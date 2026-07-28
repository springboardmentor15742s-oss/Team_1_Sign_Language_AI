import { motion } from 'framer-motion';

// ─── Camera Card ────────────────────────────────────────────────────────────
export function CameraCard({ cameraState, onStart, onStop, onCapture, onSwitch }) {
  const isActive = cameraState === 'active';
  const isLoading = cameraState === 'loading';

  return (
    <div
      className="glass-strong rounded-3xl overflow-hidden flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
    >
      {/* Camera Viewport */}
      <div className="relative bg-black" style={{ aspectRatio: '16/9', minHeight: 300 }}>
        {/* Inactive / Idle State */}
        {cameraState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <div className="text-center">
              <p className="text-white/60 text-sm font-medium">Camera is off</p>
              <p className="text-white/30 text-xs mt-1">Click &quot;Start Camera&quot; to begin gesture recognition</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.1) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="w-14 h-14 rounded-full border-2 border-blue-500/30 border-t-blue-400"
            />
            <p className="text-blue-300 text-sm font-medium">Initializing camera...</p>
          </div>
        )}

        {/* Active State (simulated feed) */}
        {isActive && (
          <div className="absolute inset-0 bg-[#0a0a12] overflow-hidden">
            {/* Simulated camera noise */}
            <div className="absolute inset-0 opacity-5 noise-overlay" />
            {/* Green scanning grid */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Scanning beam animation */}
            <motion.div
              animate={{ top: ['5%', '95%', '5%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-px opacity-60"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.8), transparent)' }}
            />
            {/* Hand silhouette placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [0.97, 1.03, 0.97] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[120px] select-none"
              >
                🤚
              </motion.div>
            </div>
            {/* Corner brackets (like a real scanner UI) */}
            {[
              'top-4 left-4 border-t-2 border-l-2',
              'top-4 right-4 border-t-2 border-r-2',
              'bottom-4 left-4 border-b-2 border-l-2',
              'bottom-4 right-4 border-b-2 border-r-2',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-8 h-8 border-green-400 ${cls}`} />
            ))}
            {/* Live indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-green-500/30">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-bold tracking-widest uppercase">Live</span>
            </div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <ControlPanel
        isActive={isActive}
        isLoading={isLoading}
        onStart={onStart}
        onStop={onStop}
        onCapture={onCapture}
        onSwitch={onSwitch}
      />
    </div>
  );
}

// ─── Control Panel ───────────────────────────────────────────────────────────
export function ControlPanel({ isActive, isLoading, onStart, onStop, onCapture, onSwitch }) {
  return (
    <div className="p-5 flex flex-wrap items-center gap-3 border-t border-white/10">
      {!isActive ? (
        <button
          onClick={onStart}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}
        >
          {isLoading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
          {isLoading ? 'Starting...' : 'Start Camera'}
        </button>
      ) : (
        <button
          onClick={onStop}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 transition-all duration-200 hover:bg-rose-500/10 border border-rose-500/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M10 9v6m4-6v6" />
          </svg>
          Stop Camera
        </button>
      )}

      <button
        onClick={onCapture}
        disabled={!isActive}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        style={isActive ? { background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Capture Gesture
      </button>

      <button
        onClick={onSwitch}
        disabled={!isActive}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 disabled:opacity-30"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        Switch Camera
      </button>
    </div>
  );
}

// ─── Recognition Card ────────────────────────────────────────────────────────
export function RecognitionCard({ gesture, confidence, status, timestamp, category }) {
  const [r, g, b] = gesture ? gesture.color : [139, 92, 246];
  const isProcessing = status === 'processing';

  return (
    <div
      className="glass-strong rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden h-full"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.15) 0%, transparent 70%)`, filter: 'blur(20px)' }}
      />

      <div className="flex items-center justify-between relative z-10">
        <h3 className="text-lg font-space font-bold text-white">Recognition Engine</h3>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{ background: isProcessing ? 'rgba(59,130,246,0.15)' : `rgba(${r},${g},${b},0.15)`, border: `1px solid ${isProcessing ? 'rgba(59,130,246,0.3)' : `rgba(${r},${g},${b},0.3)`}`, color: isProcessing ? '#60a5fa' : `rgb(${r},${g},${b})` }}
        >
          {isProcessing && (
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-2.5 h-2.5 border border-blue-400/40 border-t-blue-400 rounded-full"
            />
          )}
          {status}
        </div>
      </div>

      {/* Current gesture display */}
      <div className="flex flex-col items-center text-center py-6 relative z-10 rounded-2xl"
        style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)' }}
      >
        <motion.div
          key={gesture?.name}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl mb-3"
        >
          {gesture?.emoji || '✋'}
        </motion.div>
        <motion.h2
          key={gesture?.name + '-text'}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-space font-bold text-white"
        >
          {gesture?.name || 'Waiting...'}
        </motion.h2>
        <p className="text-sm text-white/40 mt-1">{gesture?.asl || 'No gesture detected'}</p>
        {category && (
          <span className="mt-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})`, border: `1px solid rgba(${r},${g},${b},0.3)` }}
          >
            {category}
          </span>
        )}
      </div>

      {/* Confidence meter */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60 font-medium">Confidence Score</span>
          <span className="font-space font-bold text-white">{confidence?.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
          <motion.div
            key={confidence}
            initial={{ width: 0 }}
            animate={{ width: `${confidence || 0}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, rgb(${r},${g},${b}), rgba(${r},${g},${b},0.6))`, boxShadow: `0 0 12px rgba(${r},${g},${b},0.5)` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/30 font-medium">
          <span>0%</span>
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
          <span>100%</span>
        </div>
      </div>

      {timestamp && (
        <p className="text-[10px] text-white/30 text-center relative z-10">
          Last recognized at {timestamp}
        </p>
      )}
    </div>
  );
}

// ─── Landmark Viewer ─────────────────────────────────────────────────────────
export function LandmarkViewer({ landmarks, connections, groupColors, isActive }) {
  const WIDTH = 200;
  const HEIGHT = 200;

  return (
    <div
      className="glass-strong rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-space font-bold text-white">Hand Landmarks</h3>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
          style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#c084fc' }}
        >
          21 Points
        </span>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative" style={{ width: WIDTH, height: HEIGHT }}>
          {!isActive ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
              <p className="text-xs text-white/20 mt-2 text-center">Start camera to see landmarks</p>
            </div>
          ) : (
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
              {/* Connections */}
              {connections.map(([a, b], i) => {
                const la = landmarks[a];
                const lb = landmarks[b];
                const col = groupColors[la.group] || '#ffffff';
                return (
                  <motion.line
                    key={i}
                    x1={la.x} y1={la.y}
                    x2={lb.x} y2={lb.y}
                    stroke={col}
                    strokeWidth={1.5}
                    strokeOpacity={0.4}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ delay: i * 0.02, duration: 0.4 }}
                  />
                );
              })}
              {/* Landmark nodes */}
              {landmarks.map((lm) => {
                const col = groupColors[lm.group] || '#a855f7';
                const isTip = [4, 8, 12, 16, 20].includes(lm.id);
                return (
                  <motion.circle
                    key={lm.id}
                    cx={lm.x}
                    cy={lm.y}
                    r={isTip ? 5 : 3.5}
                    fill={col}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: lm.id * 0.03, duration: 0.3 }}
                    style={{ filter: `drop-shadow(0 0 4px ${col})` }}
                  />
                );
              })}
            </svg>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(groupColors).map(([group, color]) => (
          <div key={group} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
            <span className="text-[10px] text-white/50 capitalize">{group}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gesture Info Card ────────────────────────────────────────────────────────
export function GestureInfoCard({ gesture }) {
  if (!gesture) return (
    <div className="glass rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-center" style={{ border: '1px solid rgba(255,255,255,0.05)', minHeight: 200 }}>
      <span className="text-4xl">✋</span>
      <p className="text-white/40 text-sm">Perform a gesture to see details here</p>
    </div>
  );

  const [r, g, b] = gesture.color;
  const difficultyColors = { Beginner: [34, 197, 94], Intermediate: [245, 158, 11], Advanced: [239, 68, 68] };
  const [dr, dg, db] = difficultyColors[gesture.difficulty] || [139, 92, 246];

  return (
    <motion.div
      key={gesture.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.2) 0%, transparent 70%)`, filter: 'blur(25px)' }}
      />
      <div className="flex items-start gap-4 relative z-10">
        <div className="text-5xl">{gesture.emoji}</div>
        <div>
          <h3 className="text-xl font-space font-bold text-white">{gesture.name}</h3>
          <p className="text-sm text-white/40">{gesture.asl}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
              style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})`, border: `1px solid rgba(${r},${g},${b},0.3)` }}
            >{gesture.category}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
              style={{ background: `rgba(${dr},${dg},${db},0.15)`, color: `rgb(${dr},${dg},${db})`, border: `1px solid rgba(${dr},${dg},${db},0.3)` }}
            >{gesture.difficulty}</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-3 text-sm">
        <div><p className="text-white/40 text-xs uppercase tracking-wider mb-1">Meaning</p><p className="text-white/80">{gesture.meaning}</p></div>
        <div><p className="text-white/40 text-xs uppercase tracking-wider mb-1">How to Sign</p><p className="text-white/80">{gesture.description}</p></div>
        <div><p className="text-white/40 text-xs uppercase tracking-wider mb-1">Common Usage</p><p className="text-white/80">{gesture.commonUsage}</p></div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Tips</p>
          <ul className="flex flex-col gap-1.5">
            {gesture.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5 text-xs">▸</span>
                <span className="text-white/70 text-xs">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Session Stats ────────────────────────────────────────────────────────────
export function SessionStats({ stats }) {
  const cards = [
    { label: 'Gestures Recognized', value: stats.recognized, color: [168, 85, 247], icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Average Accuracy', value: `${stats.avgAccuracy}%`, color: [34, 197, 94], icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Session Time', value: stats.sessionTime, color: [59, 130, 246], icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Total Attempts', value: stats.attempts, color: [245, 158, 11], icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    { label: 'Successful', value: stats.successful, color: [16, 185, 129], icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => {
        const [r, g, b] = card.color;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden group"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-150"
              style={{ background: `radial-gradient(circle, rgba(${r},${g},${b},0.2) 0%, transparent 70%)`, filter: 'blur(12px)' }}
            />
            <div className="w-9 h-9 rounded-xl flex items-center justify-center relative z-10"
              style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
            >
              <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-xl font-space font-bold text-white">{card.value}</p>
              <p className="text-[10px] text-white/40 mt-0.5 font-medium leading-tight">{card.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Recognition History ──────────────────────────────────────────────────────
export function RecognitionHistory({ history }) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-space font-bold text-white">Recognition History</h3>
        <span className="text-xs text-white/40">{history.length} records</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {['Time', 'Gesture', 'Confidence', 'Result'].map((h) => (
                <th key={h} className="py-3 px-4 text-[10px] font-semibold text-white/30 uppercase tracking-widest border-b border-white/10">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3.5 px-4 text-xs text-white/40 font-mono">{row.time}</td>
                <td className="py-3.5 px-4 text-sm font-semibold text-white">{row.gesture}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${row.confidence}%`, background: `rgb(${row.color.join(',')})` }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: `rgb(${row.color.join(',')})` }}>{row.confidence}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: `rgba(${row.color.join(',')},0.15)`, color: `rgb(${row.color.join(',')})`, border: `1px solid rgba(${row.color.join(',')},0.3)` }}
                  >{row.result}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
