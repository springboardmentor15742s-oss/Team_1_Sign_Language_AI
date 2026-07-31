const STATUS_COLORS = {
  Completed:       { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Passed:          { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  'Passed (Honors)':{ text: 'text-yellow-300', bg: 'bg-yellow-500/10', border: 'border-yellow-400/20' },
  Failed:          { text: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20' },
  Issued:          { text: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  Unlocked:        { text: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20' },
};

export default function ReportTable({ rows = [] }) {
  if (!rows.length) {
    return (
      <div className="text-center py-8 text-white/30 text-sm">
        No activity data available for this report.
      </div>
    );
  }

  const cols = ['Date', 'Activity', 'Duration', 'Score', 'Status'];

  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
      <table className="w-full text-sm min-w-[500px]">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {cols.map(col => (
              <th
                key={col}
                className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const sc = STATUS_COLORS[row.status] || { text: 'text-white/50', bg: 'bg-white/5', border: 'border-white/10' };
            return (
              <tr
                key={i}
                className="transition-colors hover:bg-white/[0.025]"
                style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              >
                <td className="px-4 py-3 text-white/50 text-xs font-medium whitespace-nowrap">{row.date}</td>
                <td className="px-4 py-3 text-white/80 font-medium">{row.activity}</td>
                <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{row.duration}</td>
                <td className="px-4 py-3 text-white font-bold text-xs">{row.score}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${sc.text} ${sc.bg} ${sc.border}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
