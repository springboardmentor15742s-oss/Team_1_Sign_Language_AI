import { motion } from 'framer-motion';

export default function TrackingCanvas({
  isTracking,
  landmarks,
  connections,
  groupColors,
  fps = 59.8,
  confidence = 98.4,
  snapshotEffect,
}) {
  const WIDTH = 200;
  const HEIGHT = 200;

  return (
    <div
      className="glass-strong rounded-3xl overflow-hidden flex flex-col relative"
      style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
    >
      {/* Snapshot flash feedback */}
      {snapshotEffect && (
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-white z-50 pointer-events-none"
        />
      )}

      {/* Camera Viewport */}
      <div className="relative bg-[#050510]" style={{ aspectRatio: '16/9', minHeight: 320 }}>
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(168,85,247,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {!isTracking ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              📷
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm font-medium">Hand Tracking Inactive</p>
              <p className="text-white/30 text-xs mt-1">Click &quot;Start Tracking&quot; to launch live simulation</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* Animated Laser Scanning Beam */}
            <motion.div
              animate={{ top: ['5%', '95%', '5%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-px opacity-70 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent)' }}
            />

            {/* Hand Mesh SVG Overlay */}
            <div className="relative" style={{ width: WIDTH, height: HEIGHT }}>
              <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
                {/* Connections */}
                {connections.map(([a, b], i) => {
                  const la = landmarks[a];
                  const lb = landmarks[b];
                  const col = groupColors[la?.group] || '#a855f7';
                  return (
                    <motion.line
                      key={i}
                      x1={la.x}
                      y1={la.y}
                      x2={lb.x}
                      y2={lb.y}
                      stroke={col}
                      strokeWidth={2}
                      strokeOpacity={0.6}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.02 }}
                    />
                  );
                })}

                {/* Nodes */}
                {landmarks.map((lm) => {
                  const col = groupColors[lm.group] || '#a855f7';
                  const isTip = [4, 8, 12, 16, 20].includes(lm.id);
                  return (
                    <motion.circle
                      key={lm.id}
                      cx={lm.x}
                      cy={lm.y}
                      r={isTip ? 5.5 : 3.5}
                      fill={col}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: lm.id * 0.05 }}
                      style={{ filter: `drop-shadow(0 0 6px ${col})` }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Corner Bracket Frame Elements */}
            {[
              'top-4 left-4 border-t-2 border-l-2',
              'top-4 right-4 border-t-2 border-r-2',
              'bottom-4 left-4 border-b-2 border-l-2',
              'bottom-4 right-4 border-b-2 border-r-2',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-8 h-8 border-purple-500/70 ${cls}`} />
            ))}

            {/* Live Stats Overlay Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-bold tracking-widest uppercase">Live Tracking</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono">
              <span className="text-purple-400 font-bold">{fps} FPS</span>
              <span className="text-white/40">|</span>
              <span className="text-blue-400 font-bold">{confidence}% Confidence</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
