import React from 'react';
import { motion } from 'framer-motion';
import ComparisonViewer from './ComparisonViewer';

export default function GestureComparison({ comparisonData }) {
  if (!comparisonData) return null;

  const {
    gestureName,
    category,
    matchingPercentage,
    differenceIndicator,
    confidenceScore,
    referenceGesture,
    userGesture,
    pointDifferences = [],
  } = comparisonData;

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
              {category}
            </span>
            <span className="text-xs text-white/40">Gesture Comparison Module</span>
          </div>
          <h3 className="text-2xl font-space font-bold text-white">{gestureName}</h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="text-xs text-white/40 font-medium">Matching Percentage</span>
            <span className="text-2xl font-space font-bold text-green-400">{matchingPercentage}%</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-lg">
            ✓
          </div>
        </div>
      </div>

      {/* Side-by-side Placeholders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reference Gesture Placeholder */}
        <div className="glass rounded-2xl p-5 border border-blue-500/20 bg-blue-500/[0.02] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <h4 className="text-sm font-semibold text-white">{referenceGesture?.title || 'Reference Gesture'}</h4>
            </div>
            <span className="text-[10px] text-blue-300 font-mono px-2 py-0.5 rounded bg-blue-500/15">
              {referenceGesture?.landmarksCount || 21} Keypoints
            </span>
          </div>

          <div className="w-full h-44 rounded-xl bg-black/40 border border-blue-500/20 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-2 text-blue-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5a1.5 1.5 0 013 0v4.5" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-white/80">Reference Pose Skeleton</span>
            <p className="text-[10px] text-white/40 mt-1 max-w-xs">{referenceGesture?.description}</p>
          </div>

          <div className="flex items-center justify-between text-xs text-white/50 pt-1">
            <span>Source: {referenceGesture?.author || 'ASL Master DB'}</span>
            <span className="text-blue-400 font-medium">100% Benchmark</span>
          </div>
        </div>

        {/* User Gesture Placeholder */}
        <div className="glass rounded-2xl p-5 border border-pink-500/20 bg-pink-500/[0.02] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-500" />
              <h4 className="text-sm font-semibold text-white">{userGesture?.title || 'User Gesture'}</h4>
            </div>
            <span className="text-[10px] text-pink-300 font-mono px-2 py-0.5 rounded bg-pink-500/15">
              {userGesture?.keypointsMatched || 19}/{userGesture?.landmarksCount || 21} Matched
            </span>
          </div>

          <div className="w-full h-44 rounded-xl bg-black/40 border border-pink-500/20 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-2 text-pink-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-white/80">User AI Extracted Frame</span>
            <p className="text-[10px] text-white/40 mt-1 max-w-xs">{userGesture?.description}</p>
          </div>

          <div className="flex items-center justify-between text-xs text-white/50 pt-1">
            <span>Confidence: {confidenceScore || 98.2}%</span>
            <span className="text-pink-400 font-medium">Attempt #{userGesture?.timestamp || 'Latest'}</span>
          </div>
        </div>
      </div>

      {/* Difference Indicator Alert */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold flex-shrink-0">
          !
        </div>
        <div className="flex flex-col gap-0.5">
          <h5 className="text-xs font-semibold text-amber-300">Difference Indicator</h5>
          <p className="text-xs text-white/70">{differenceIndicator}</p>
        </div>
      </div>

      {/* Visual Overlay Comparison Viewer Component */}
      <div className="flex flex-col gap-3 pt-2">
        <h4 className="text-sm font-space font-semibold text-white">Visual Skeleton Overlay</h4>
        <ComparisonViewer comparisonData={comparisonData} />
      </div>

      {/* Point-by-Point Keypoint Deviations Table */}
      {pointDifferences.length > 0 && (
        <div className="flex flex-col gap-3 pt-2">
          <h4 className="text-sm font-space font-semibold text-white">Keypoint Deviation Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase">
                  <th className="py-2.5 px-3">Landmark ID</th>
                  <th className="py-2.5 px-3">Keypoint Name</th>
                  <th className="py-2.5 px-3">Spatial Deviation</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pointDifferences.map((pt, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-mono text-purple-300">ID: #{pt.pointId}</td>
                    <td className="py-2.5 px-3 font-semibold text-white">{pt.name}</td>
                    <td className="py-2.5 px-3 text-white/70">{pt.deviation}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        pt.status === 'Aligned'
                          ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}>
                        {pt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
