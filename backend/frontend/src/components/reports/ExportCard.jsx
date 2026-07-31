import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPORT_FORMATS } from '../../data/reportData';

export default function ExportCard({ reportTitle = 'this report' }) {
  const [toast, setToast] = useState(null);

  const handleExport = (fmt) => {
    setToast(`${fmt.label} action initiated for "${reportTitle}"${fmt.ext ? ` (${fmt.ext})` : ''}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-3 left-3 right-3 z-20 px-4 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
            style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-300">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(139,92,246,0.15)' }}
        >
          <svg className="w-4.5 h-4.5 text-purple-400" style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-space font-bold text-white">Export Center</h3>
          <p className="text-xs text-white/40">Choose an export format</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {EXPORT_FORMATS.map((fmt) => {
          const [r, g, b] = fmt.color;
          return (
            <motion.button
              key={fmt.id}
              id={`export-${fmt.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleExport(fmt)}
              className="flex items-center gap-2.5 p-3 rounded-xl text-left transition-all"
              style={{
                background: `rgba(${r},${g},${b},0.08)`,
                border: `1px solid rgba(${r},${g},${b},0.2)`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `rgba(${r},${g},${b},0.15)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `rgba(${r},${g},${b},0.08)`;
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${r},${g},${b},0.2)` }}
              >
                <svg className="w-3.5 h-3.5" style={{ color: `rgb(${r},${g},${b})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={fmt.icon} />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white/90 leading-tight truncate">{fmt.label}</span>
                <span className="text-[10px] text-white/30 truncate">{fmt.desc}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
