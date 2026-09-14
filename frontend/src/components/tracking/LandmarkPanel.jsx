import { useState } from 'react';
import { motion } from 'framer-motion';
import { TRACKED_LANDMARKS_CATEGORIES } from '../../data/trackingData';

const TRACKED_CATEGORIES = [
  'All',
  'Finger Joints',
  'Palm Position',
  'Wrist Position',
  'Arm Position',
  'Shoulder Position',
];

export default function LandmarkPanel({ landmarks = [], groupColors = {} }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter landmarks based on selected category
  const filteredLandmarks = landmarks.filter((lm) => {
    if (selectedCategory === 'All') return true;
    if (lm.category) return lm.category === selectedCategory;
    // Fallback matching
    if (selectedCategory === 'Finger Joints') {
      return ['thumb', 'index', 'middle', 'ring', 'pinky', 'finger'].includes(lm.group);
    }
    if (selectedCategory === 'Palm Position') return lm.group === 'palm' || lm.name.includes('Palm');
    if (selectedCategory === 'Wrist Position') return lm.group === 'wrist' || lm.name.includes('Wrist');
    if (selectedCategory === 'Arm Position') return lm.group === 'arm' || lm.name.includes('Elbow') || lm.name.includes('Forearm');
    if (selectedCategory === 'Shoulder Position') return lm.group === 'shoulder' || lm.name.includes('Shoulder') || lm.name.includes('Clavicle');
    return true;
  });

  return (
    <div
      className="glass-strong rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-space font-bold text-white">Tracked Landmarks Monitor</h3>
          <p className="text-xs text-white/40">Real-time coordinates and articulation tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
            {filteredLandmarks.length} Nodes Monitored
          </span>
        </div>
      </div>

      {/* 5 Tracked Landmark Categories Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {TRACKED_LANDMARKS_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? 'All' : cat.name)}
              className={`p-2.5 rounded-2xl flex flex-col items-start gap-1 transition-all text-left cursor-pointer ${
                isSelected
                  ? 'bg-white/10 border border-purple-500/60 shadow-lg shadow-purple-500/10'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-base">{cat.icon}</span>
                <span className="text-[10px] font-bold font-mono" style={{ color: cat.color }}>
                  {cat.confidence}%
                </span>
              </div>
              <span className="text-xs font-bold text-white leading-tight mt-0.5">{cat.name}</span>
              <span className="text-[10px] text-white/40 truncate w-full">{cat.count} nodes</span>
            </button>
          );
        })}
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {TRACKED_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Coordinates Table */}
      <div className="overflow-y-auto max-h-[300px] pr-1">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#0A0815] z-10">
            <tr>
              {['ID', 'Landmark', 'Tracked Category', 'X', 'Y', 'Confidence'].map((h) => (
                <th key={h} className="py-2 px-3 text-[10px] font-bold text-white/40 uppercase tracking-widest border-b border-white/10">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLandmarks.map((lm) => {
              const categoryLabel = lm.category || (
                ['thumb', 'index', 'middle', 'ring', 'pinky', 'finger'].includes(lm.group) ? 'Finger Joints' :
                lm.group === 'palm' ? 'Palm Position' :
                lm.group === 'wrist' ? 'Wrist Position' :
                lm.group === 'arm' ? 'Arm Position' :
                lm.group === 'shoulder' ? 'Shoulder Position' : lm.group
              );
              const col = groupColors[categoryLabel] || groupColors[lm.group] || '#a855f7';

              return (
                <tr key={lm.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors text-xs font-mono">
                  <td className="py-2.5 px-3 text-white/40">#{lm.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-white/95 font-sans">
                    {lm.name}
                  </td>
                  <td className="py-2.5 px-3">
                    <span 
                      className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1"
                      style={{ background: `${col}20`, color: col, border: `1px solid ${col}40` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col }} />
                      {categoryLabel}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-white/70">{Math.round(lm.x)}px</td>
                  <td className="py-2.5 px-3 text-white/70">{Math.round(lm.y)}px</td>
                  <td className="py-2.5 px-3 font-bold" style={{ color: col }}>
                    {lm.confidence}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
