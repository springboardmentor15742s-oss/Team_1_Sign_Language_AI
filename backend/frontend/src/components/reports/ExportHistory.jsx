import { motion } from 'framer-motion';

const FORMAT_COLORS = {
  PDF:   { text: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20' },
  Excel: { text: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20' },
  CSV:   { text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20' },
};

export default function ExportHistory({ history = [] }) {
  if (!history.length) {
    return (
      <div className="text-center py-6 text-white/30 text-sm">
        No export history found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {history.map((item, i) => {
        const rawFmt = item.format || 'PDF';
        const keyFmt = rawFmt.includes('PDF') ? 'PDF' : rawFmt.includes('Excel') ? 'Excel' : rawFmt.includes('CSV') ? 'CSV' : 'PDF';
        const fc = FORMAT_COLORS[keyFmt] || { text: 'text-white/50', bg: 'bg-white/5', border: 'border-white/10' };
        const title = item.reportTitle || item.reportName || 'Exported Document';
        const dateStr = item.date || item.timestamp || 'Recently';
        const icon = item.icon || (keyFmt === 'PDF' ? '📄' : keyFmt === 'Excel' ? '📊' : '📁');

        return (
          <motion.div
            key={item.id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center justify-between gap-3 p-3.5 rounded-xl group transition-all"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg flex-shrink-0">{icon}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white/80 truncate">{title}</span>
                <span className="text-[10px] text-white/30">{dateStr} · {item.size || '1.5 MB'}</span>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${fc.text} ${fc.bg} ${fc.border}`}>
              {keyFmt}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
