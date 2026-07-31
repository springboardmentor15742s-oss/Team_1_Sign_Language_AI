import { useState } from 'react';
import { motion } from 'framer-motion';

import TrackingHistoryCard from '../../components/tracking/TrackingHistoryCard';

import {
  TRACKING_HISTORY_DATA,
  TRACKING_STATS_SUMMARY,
  CONFIDENCE_TIMELINE,
} from '../../data/trackingData';

export default function TrackingHistoryPage() {
  const [history, setHistory] = useState(TRACKING_HISTORY_DATA);
  const [exportedNotice, setExportedNotice] = useState(null);

  const handleExport = (session) => {
    setExportedNotice(`Exported session data for "${session.session}" (JSON format).`);
    setTimeout(() => setExportedNotice(null), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16 px-4 md:px-8">
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-10 left-1/3 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <div
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
                  Module 5 · Tracking Logs
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30">
                  {history.length} Sessions Logged
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-space font-bold text-white">
                Tracking Session{' '}
                <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  History & Analytics
                </span>
              </h1>
              <p className="text-sm text-white/50 max-w-xl">
                Review past hand and full body pose tracking sessions, export landmark telemetry, and analyze historical performance.
              </p>
            </div>

            <button
              onClick={() => handleExport({ session: 'All Sessions' })}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/30 transition-all"
            >
              📥 Export All Session Logs
            </button>
          </div>
        </motion.div>

        {exportedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold flex items-center justify-between"
          >
            <span>✅ {exportedNotice}</span>
            <span className="text-[10px] text-green-500/60 uppercase tracking-widest">UI Simulated Action</span>
          </motion.div>
        )}

        {/* Confidence Timeline Chart Widget */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 border border-white/10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-space font-bold text-white">Historical Tracking Stability Chart</h3>
              <p className="text-xs text-white/40">Hand vs Pose tracking confidence timeline</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-white/70">Hand Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-white/70">Pose Skeleton</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 h-48 pt-6 relative border-b border-white/10">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
            </div>

            {CONFIDENCE_TIMELINE.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 relative z-10 group">
                <div className="w-full flex justify-center items-end gap-1.5 h-36">
                  <div
                    className="w-4 rounded-t-md bg-gradient-to-t from-purple-600 to-purple-400 transition-all duration-300 group-hover:brightness-125"
                    style={{ height: `${(item.hand / 100) * 100}%` }}
                  />
                  <div
                    className="w-4 rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-300 group-hover:brightness-125"
                    style={{ height: `${(item.pose / 100) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/40 font-mono">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Session Cards List */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-space font-bold text-white">Logged Tracking Sessions</h3>
          <div className="flex flex-col gap-4">
            {history.map((session) => (
              <TrackingHistoryCard key={session.id} session={session} onExport={handleExport} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
