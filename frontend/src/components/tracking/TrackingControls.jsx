import { motion } from 'framer-motion';

export default function TrackingControls({
  isTracking,
  onToggleTracking,
  onCaptureSnapshot,
  onResetLandmarks,
  activeModel = 'MediaPipe Hands v2',
}) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border border-white/10">
      <div className="flex items-center gap-3">
        {!isTracking ? (
          <button
            onClick={onToggleTracking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Tracking Engine
          </button>
        ) : (
          <button
            onClick={onToggleTracking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M10 9v6m4-6v6" />
            </svg>
            Stop Engine
          </button>
        )}

        <button
          onClick={onCaptureSnapshot}
          disabled={!isTracking}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Capture Snapshot
        </button>

        <button
          onClick={onResetLandmarks}
          disabled={!isTracking}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all disabled:opacity-40"
        >
          Reset Mesh
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-white/40 font-medium">Model:</span>
        <span className="text-xs font-bold text-white/80 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
          {activeModel}
        </span>
      </div>
    </div>
  );
}
