import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import SkeletonViewer from '../../components/tracking/SkeletonViewer';
import ConfidenceMeter from '../../components/tracking/ConfidenceMeter';
import TrackingStats from '../../components/tracking/TrackingStats';
import TrackingControls from '../../components/tracking/TrackingControls';

import {
  POSE_LANDMARKS_DATA,
  POSE_CONNECTIONS,
  GROUP_COLORS,
} from '../../data/trackingData';

export default function PoseTrackingPage() {
  const [isTracking, setIsTracking] = useState(true);
  const [landmarks, setLandmarks] = useState(POSE_LANDMARKS_DATA);
  const [sessionTime, setSessionTime] = useState(0);

  // Dynamic live tracking statistics
  const [trackingStats, setTrackingStats] = useState({
    avgConfidence: 98.8,
    trackedFrames: 18450,
    accuracy: 96.5,
    fps: 60,
    handStability: 98.4,
    poseStability: 99.2,
  });

  // Timer simulation
  useEffect(() => {
    if (!isTracking) return;
    const timer = setInterval(() => setSessionTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isTracking]);

  // Dynamic live frame increment & micro accuracy fluctuation
  useEffect(() => {
    if (!isTracking) return;
    const frameInterval = setInterval(() => {
      setTrackingStats((prev) => {
        const nextFrames = prev.trackedFrames + 30;
        const confJitter = Math.round((98.5 + Math.random() * 0.7) * 10) / 10;
        const accJitter = Math.round((96.2 + Math.random() * 0.6) * 10) / 10;
        const fpsJitter = Math.round(59 + Math.random() * 2);
        return {
          ...prev,
          trackedFrames: nextFrames,
          avgConfidence: confJitter,
          accuracy: accJitter,
          fps: fpsJitter,
        };
      });
    }, 500);
    return () => clearInterval(frameInterval);
  }, [isTracking]);

  // Micro jitter simulation for body pose nodes
  useEffect(() => {
    if (!isTracking) return;
    const interval = setInterval(() => {
      setLandmarks((prev) =>
        prev.map((lm) => ({
          ...lm,
          x: lm.x + (Math.random() * 1.5 - 0.75),
          y: lm.y + (Math.random() * 1.5 - 0.75),
          confidence: Math.round((96 + Math.random() * 3.8) * 10) / 10,
        }))
      );
    }, 500);
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTimer = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-24 pb-16 px-4 md:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-10 left-1/3 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.5) 0%, transparent 70%)', filter: 'blur(100px)' }}
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
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/30">
                  Module 5 · Body Pose Tracking
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {isTracking ? '33 Landmarks Active' : 'Engine Standby'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-space font-bold text-white">
                Full Body Skeleton{' '}
                <span style={{ background: 'linear-gradient(135deg, #3b82f6, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  BlazePose Engine
                </span>
              </h1>
              <p className="text-sm text-white/50 max-w-xl">
                33-point body skeleton tracking covering shoulders, elbows, wrists, spine, and lower extremities.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="glass rounded-2xl px-5 py-3 flex flex-col items-end border border-white/10">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Active Session Timer</span>
                <span className="text-2xl font-space font-bold text-blue-400 tabular-nums">{formatTimer(sessionTime)}</span>
              </div>
              <a
                href="/tracking/hand"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Switch to Hand Engine →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Widgets */}
        <TrackingStats stats={trackingStats} />

        {/* Controls */}
        <TrackingControls
          isTracking={isTracking}
          onToggleTracking={() => setIsTracking((t) => !t)}
          onCaptureSnapshot={() => {}}
          onResetLandmarks={() => setLandmarks(POSE_LANDMARKS_DATA)}
          activeModel="MediaPipe BlazePose GHUM"
        />

        {/* Skeleton & Joint Data */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <SkeletonViewer
              isTracking={isTracking}
              landmarks={landmarks}
              connections={POSE_CONNECTIONS}
              groupColors={GROUP_COLORS}
            />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass rounded-3xl p-6 flex flex-col gap-4 border border-white/10">
              <h3 className="text-lg font-space font-bold text-white">Upper Body Skeleton Metrics</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Shoulder Alignment', val: '180.2°', status: 'Optimal', col: [34, 197, 94] },
                  { label: 'Elbow Flexion (Left)', val: '142.6°', status: 'Good', col: [59, 130, 246] },
                  { label: 'Elbow Flexion (Right)', val: '144.1°', status: 'Good', col: [59, 130, 246] },
                  { label: 'Spine Posture Angle', val: '89.4°', status: 'Optimal', col: [34, 197, 94] },
                  { label: 'Wrist Altitude Delta', val: '0.4 cm', status: 'Optimal', col: [168, 85, 247] },
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="text-white/70 font-medium">{m.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-space font-bold text-white">{m.val}</span>
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"
                        style={{ background: `rgba(${m.col.join(',')},0.15)`, color: `rgb(${m.col.join(',')})` }}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ConfidenceMeter value={98.8} label="Full Body Pose Stability" color={[59, 130, 246]} />
          </div>
        </div>
      </div>
    </div>
  );
}
