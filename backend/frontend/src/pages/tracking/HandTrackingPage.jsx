import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import TrackingCanvas from '../../components/tracking/TrackingCanvas';
import LandmarkPanel from '../../components/tracking/LandmarkPanel';
import TrackingStats from '../../components/tracking/TrackingStats';
import TrackingControls from '../../components/tracking/TrackingControls';
import ConfidenceMeter from '../../components/tracking/ConfidenceMeter';

import {
  HAND_LANDMARKS_DATA,
  HAND_CONNECTIONS,
  GROUP_COLORS,
  TRACKING_STATS_SUMMARY,
} from '../../data/trackingData';

export default function HandTrackingPage() {
  const [isTracking, setIsTracking] = useState(true);
  const [landmarks, setLandmarks] = useState(HAND_LANDMARKS_DATA);
  const [snapshotEffect, setSnapshotEffect] = useState(false);
  const [capturedCount, setCapturedCount] = useState(0);

  // Micro jitter simulation for live realistic coordinate updates
  useEffect(() => {
    if (!isTracking) return;
    const interval = setInterval(() => {
      setLandmarks((prev) =>
        prev.map((lm) => ({
          ...lm,
          x: Math.min(190, Math.max(10, lm.x + (Math.random() * 2 - 1))),
          y: Math.min(190, Math.max(10, lm.y + (Math.random() * 2 - 1))),
          confidence: Math.round((95 + Math.random() * 4.9) * 10) / 10,
        }))
      );
    }, 400);
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleCaptureSnapshot = () => {
    setSnapshotEffect(true);
    setCapturedCount((c) => c + 1);
    setTimeout(() => setSnapshotEffect(false), 400);
  };

  const handleResetLandmarks = () => {
    setLandmarks(HAND_LANDMARKS_DATA);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16 px-4 md:px-8">
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
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
                  Module 5 · Hand Tracking
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {isTracking ? '21 Landmarks Active' : 'Engine Idle'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-space font-bold text-white">
                Real-Time Hand{' '}
                <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Landmark Engine
                </span>
              </h1>
              <p className="text-sm text-white/50 max-w-xl">
                Simulated 21-point hand joint tracking with sub-millimeter precision, joint angles, and depth coordinate feeds.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/tracking/pose"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Switch to Pose Engine →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Stat Widgets */}
        <TrackingStats stats={TRACKING_STATS_SUMMARY} />

        {/* Controls Toolbar */}
        <TrackingControls
          isTracking={isTracking}
          onToggleTracking={() => setIsTracking((t) => !t)}
          onCaptureSnapshot={handleCaptureSnapshot}
          onResetLandmarks={handleResetLandmarks}
          activeModel="MediaPipe Hands v2.4 (Simulated)"
        />

        {/* Main Grid: Live Canvas (Left) & Landmark Coordinates (Right) */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <TrackingCanvas
              isTracking={isTracking}
              landmarks={landmarks}
              connections={HAND_CONNECTIONS}
              groupColors={GROUP_COLORS}
              fps={TRACKING_STATS_SUMMARY.fps}
              confidence={TRACKING_STATS_SUMMARY.avgConfidence}
              snapshotEffect={snapshotEffect}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <ConfidenceMeter value={99.2} label="Palm Stability" color={[34, 197, 94]} />
              <ConfidenceMeter value={97.6} label="Finger Tip Precision" color={[168, 85, 247]} />
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <LandmarkPanel landmarks={landmarks} groupColors={GROUP_COLORS} />

            {capturedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-4 flex items-center justify-between border border-purple-500/30"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">📸</span>
                  <span className="text-xs font-semibold text-white">Snapshots Captured: {capturedCount}</span>
                </div>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Saved to Buffer</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
