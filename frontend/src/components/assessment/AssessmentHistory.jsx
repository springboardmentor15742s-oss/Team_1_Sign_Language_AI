// src/components/assessment/AssessmentHistory.jsx
import { motion } from 'framer-motion';

export default function AssessmentHistory({ history }) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-space font-bold text-white">Assessment History</h3>
        <span className="text-xs text-white/40">{history.length} attempts</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {['Gesture', 'Accuracy', 'Attempt', 'Time', 'Result'].map(h => (
                <th key={h} className="py-3 px-4 text-[10px] font-bold text-white/30 uppercase tracking-widest border-b border-white/[0.06]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3.5 px-4 text-sm font-semibold text-white/90">{row.gesture}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-14 bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${row.accuracy}%`, background: `rgb(${row.color.join(',')})` }} />
                    </div>
                    <span className="text-xs font-bold tabular-nums" style={{ color: `rgb(${row.color.join(',')})` }}>{row.accuracy}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs text-white/50">#{row.attempt}</td>
                <td className="py-3.5 px-4 text-xs text-white/40 font-mono">{row.time}</td>
                <td className="py-3.5 px-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: `rgba(${row.color.join(',')},0.15)`, color: `rgb(${row.color.join(',')})`, border: `1px solid rgba(${row.color.join(',')},0.3)` }}
                  >{row.result}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
