import { motion } from 'framer-motion';

export default function LandmarkPanel({ landmarks, groupColors }) {
  return (
    <div
      className="glass-strong rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-space font-bold text-white">Live Landmark Coordinates</h3>
          <p className="text-xs text-white/40">Real-time X, Y, Z coordinates per node</p>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
          21 Nodes Active
        </span>
      </div>

      <div className="overflow-y-auto max-h-[340px] pr-1">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#050510] z-10">
            <tr>
              {['ID', 'Joint Name', 'Group', 'X', 'Y', 'Confidence'].map((h) => (
                <th key={h} className="py-2 px-3 text-[10px] font-bold text-white/30 uppercase tracking-widest border-b border-white/10">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {landmarks.map((lm, i) => {
              const col = groupColors[lm.group] || '#a855f7';
              return (
                <tr key={lm.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-xs font-mono">
                  <td className="py-2 px-3 text-white/40">#{lm.id}</td>
                  <td className="py-2 px-3 font-semibold text-white/90 font-sans">{lm.name}</td>
                  <td className="py-2 px-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full uppercase font-bold" style={{ background: `${col}20`, color: col, border: `1px solid ${col}40` }}>
                      {lm.group}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-white/70">{lm.x}px</td>
                  <td className="py-2 px-3 text-white/70">{lm.y}px</td>
                  <td className="py-2 px-3 font-bold" style={{ color: col }}>
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
