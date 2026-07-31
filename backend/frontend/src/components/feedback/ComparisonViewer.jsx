import { motion } from 'framer-motion';

export default function ComparisonViewer({ selectedGesture = 'Help' }) {
  return (
    <div
      className="glass-strong rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-space font-bold text-white">Gesture Comparison & Difference Analysis</h3>
          <p className="text-xs text-white/40">Side-by-side pose overlay comparison for gesture &quot;{selectedGesture}&quot;</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full text-purple-300 bg-purple-500/10 border border-purple-500/30">
          AI Motion Delta: 18° Offset
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 items-center">
        {/* Left: Reference Gesture */}
        <div className="glass rounded-2xl p-4 flex flex-col items-center gap-3 border border-white/5 relative overflow-hidden">
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/30">
            Target Reference
          </span>
          <div className="w-full aspect-square max-w-[180px] rounded-xl bg-black/40 flex flex-col items-center justify-center relative border border-white/10">
            <span className="text-6xl">🤟</span>
            <div className="absolute inset-0 border-2 border-green-400/40 rounded-xl" />
          </div>
          <div className="text-center">
            <span className="text-xs font-bold text-white block">Perfect Form</span>
            <span className="text-[10px] text-white/40">100% Geometry Alignment</span>
          </div>
        </div>

        {/* Center: Difference Visualization */}
        <div className="glass rounded-2xl p-4 flex flex-col items-center gap-3 border border-purple-500/20 bg-purple-500/[0.03] relative overflow-hidden">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-widest bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/30">
            AI Delta Heatmap
          </span>
          <div className="w-full aspect-square max-w-[180px] rounded-xl bg-black/60 flex flex-col items-center justify-center relative overflow-hidden border border-purple-500/30">
            {/* Simulated Heatmap Overlay */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 45% 40%, rgba(239,68,68,0.6) 0%, rgba(245,158,11,0.4) 35%, transparent 70%)',
              }}
            />
            <span className="text-6xl opacity-40 relative z-10">🤟</span>
            <div className="absolute bottom-2 left-2 right-2 text-center z-10">
              <span className="text-[10px] font-bold text-red-400 bg-black/80 px-2 py-0.5 rounded-full border border-red-500/30">
                Thumb Deviation Detected
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs font-bold text-amber-400 block">Variance: 15.8%</span>
            <span className="text-[10px] text-white/40">Wrist Angle & Thumb Incline</span>
          </div>
        </div>

        {/* Right: User Gesture */}
        <div className="glass rounded-2xl p-4 flex flex-col items-center gap-3 border border-white/5 relative overflow-hidden">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/30">
            Your Attempt
          </span>
          <div className="w-full aspect-square max-w-[180px] rounded-xl bg-black/40 flex flex-col items-center justify-center relative border border-white/10">
            <span className="text-6xl transform rotate-12">🤟</span>
            <div className="absolute inset-0 border-2 border-amber-400/40 rounded-xl" />
          </div>
          <div className="text-center">
            <span className="text-xs font-bold text-white block">Captured Frame</span>
            <span className="text-[10px] text-white/40">Accuracy Score: 84.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
