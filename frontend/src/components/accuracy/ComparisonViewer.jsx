import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ComparisonViewer({ comparisonData }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState('both'); // 'both' | 'ref' | 'user'

  const refPoints = comparisonData?.referenceGesture?.landmarks || [];
  const userPoints = comparisonData?.userGesture?.landmarks || [];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'both'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            Overlay Both
          </button>
          <button
            onClick={() => setActiveTab('ref')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'ref'
                ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            Reference Only
          </button>
          <button
            onClick={() => setActiveTab('user')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'user'
                ? 'bg-pink-600/30 text-pink-300 border border-pink-500/40'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            User Attempt Only
          </button>
        </div>

        <button
          onClick={() => setShowOverlay(!showOverlay)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 flex items-center gap-1.5"
        >
          <span className={`w-2 h-2 rounded-full ${showOverlay ? 'bg-green-400' : 'bg-white/30'}`} />
          {showOverlay ? 'Hide Keypoint Overlay' : 'Show Keypoint Overlay'}
        </button>
      </div>

      {/* Visual Canvas Area */}
      <div
        className="relative w-full h-[320px] rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center"
        style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)' }}
      >
        {/* Grid lines background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Legend Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 glass p-2.5 rounded-xl border border-white/10 text-[10px]">
          {(activeTab === 'both' || activeTab === 'ref') && (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="text-blue-200 font-semibold">Reference Ideal Mesh</span>
            </div>
          )}
          {(activeTab === 'both' || activeTab === 'user') && (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              <span className="text-pink-200 font-semibold">User Tracked Pose</span>
            </div>
          )}
          {activeTab === 'both' && (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-200 font-semibold">Spatial Difference Vector</span>
            </div>
          )}
        </div>

        {/* Interactive SVG Overlay */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 120 100">
          {showOverlay && (
            <>
              {/* Reference Skeleton Lines (Blue) */}
              {(activeTab === 'both' || activeTab === 'ref') && (
                <g stroke="#3b82f6" strokeWidth="1.2" strokeOpacity="0.7" fill="none">
                  <path d="M 50 80 L 35 50 L 50 25 M 50 80 L 62 20 M 50 80 L 73 25 M 50 80 L 82 35" />
                  <path d="M 35 50 L 50 25 L 62 20 L 73 25 L 82 35" strokeDasharray="1 1" strokeOpacity="0.4" />
                </g>
              )}

              {/* User Skeleton Lines (Pink) */}
              {(activeTab === 'both' || activeTab === 'user') && (
                <g stroke="#ec4899" strokeWidth="1.2" strokeOpacity="0.8" fill="none">
                  <path d="M 50 82 L 37 52 L 54 29 M 50 82 L 63 21 M 50 82 L 74 26 M 50 82 L 83 36" />
                  <path d="M 37 52 L 54 29 L 63 21 L 74 26 L 83 36" strokeDasharray="1 1" strokeOpacity="0.4" />
                </g>
              )}

              {/* Difference Vectors (Amber Dashed Lines) */}
              {activeTab === 'both' && (
                <g stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="1.5 1.5">
                  <line x1="50" y1="25" x2="54" y2="29" />
                  <line x1="35" y1="50" x2="37" y2="52" />
                </g>
              )}

              {/* Reference Landmarks (Blue Dots) */}
              {(activeTab === 'both' || activeTab === 'ref') &&
                refPoints.map((pt) => (
                  <g key={`ref-${pt.id}`}>
                    <circle cx={pt.x} cy={pt.y} r="2.2" fill="#3b82f6" className="animate-pulse" />
                    <circle cx={pt.x} cy={pt.y} r="4" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.6" />
                  </g>
                ))}

              {/* User Landmarks (Pink / Red Dots) */}
              {(activeTab === 'both' || activeTab === 'user') &&
                userPoints.map((pt) => {
                  const isOffset = pt.id === 8;
                  return (
                    <g key={`user-${pt.id}`}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="2.5"
                        fill={isOffset ? '#ef4444' : '#ec4899'}
                      />
                      {isOffset && (
                        <circle cx={pt.x} cy={pt.y} r="5" fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0.8" />
                      )}
                    </g>
                  );
                })}
            </>
          )}
        </svg>

        {/* Difference Tag */}
        <div className="absolute bottom-3 right-3 glass px-3 py-1.5 rounded-xl border border-white/10 text-xs text-white/80 font-mono">
          Difference: <span className="text-amber-400 font-bold">{comparisonData?.differenceIndicator || '0.04m'}</span>
        </div>
      </div>
    </div>
  );
}
