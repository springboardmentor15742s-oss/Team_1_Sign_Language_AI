import { motion } from 'framer-motion';

export default function SkeletonViewer({ isTracking, landmarks, connections, groupColors }) {
  const WIDTH = 300;
  const HEIGHT = 400;

  return (
    <div
      className="glass-strong rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(59,130,246,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="flex items-center justify-between w-full mb-4">
        <div>
          <h3 className="text-lg font-space font-bold text-white">Full Body Pose Mesh</h3>
          <p className="text-xs text-white/40">33 MediaPipe BlazePose Landmark Nodes</p>
        </div>
        <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30">
          Pose Engine Active
        </span>
      </div>

      <div className="relative bg-[#050512] rounded-2xl p-4 border border-white/5 flex items-center justify-center" style={{ width: WIDTH, height: HEIGHT }}>
        {!isTracking ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-4xl">🧍</span>
            <p className="text-xs text-white/40">Start Pose Tracking to view live skeleton</p>
          </div>
        ) : (
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
            {/* Bone Connections */}
            {connections.map(([a, b], i) => {
              const la = landmarks[a];
              const lb = landmarks[b];
              if (!la || !lb) return null;
              const col = groupColors[la.group] || '#3b82f6';
              return (
                <motion.line
                  key={i}
                  x1={la.x}
                  y1={la.y}
                  x2={lb.x}
                  y2={lb.y}
                  stroke={col}
                  strokeWidth={2}
                  strokeOpacity={0.7}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.4, delay: i * 0.01 }}
                />
              );
            })}

            {/* Joint Landmark Nodes */}
            {landmarks.map((lm) => {
              const col = groupColors[lm.group] || '#3b82f6';
              return (
                <motion.circle
                  key={lm.id}
                  cx={lm.x}
                  cy={lm.y}
                  r={lm.id <= 10 ? 3 : 4.5}
                  fill={col}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: lm.id * 0.03 }}
                  style={{ filter: `drop-shadow(0 0 6px ${col})` }}
                />
              );
            })}
          </svg>
        )}
      </div>

      {/* Group Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {['head', 'torso', 'arm', 'hand', 'leg'].map((grp) => (
          <div key={grp} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: groupColors[grp] }} />
            <span className="text-[10px] text-white/50 capitalize">{grp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
