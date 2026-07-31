import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExportPanel({ reportTitle = 'Report' }) {
  const [feedback, setFeedback] = useState(null);

  const handleAction = (actionName) => {
    setFeedback({
      message: `${actionName} initiated for "${reportTitle}". (Mock Action Completed)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    });

    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  const exportActions = [
    {
      id: 'pdf',
      label: 'Export PDF',
      color: 'from-purple-600 to-indigo-600',
      textColor: 'text-purple-300',
      icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
      badge: 'PDF Format',
    },
    {
      id: 'excel',
      label: 'Export Excel',
      color: 'from-emerald-600 to-teal-600',
      textColor: 'text-emerald-300',
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      badge: 'XLSX Spreadsheet',
    },
    {
      id: 'print',
      label: 'Print Report',
      color: 'from-blue-600 to-cyan-600',
      textColor: 'text-blue-300',
      icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z',
      badge: 'Printer Ready',
    },
    {
      id: 'share',
      label: 'Share Report',
      color: 'from-pink-600 to-rose-600',
      textColor: 'text-pink-300',
      icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
      badge: 'Shareable Link',
    },
    {
      id: 'email',
      label: 'Email Report',
      color: 'from-amber-600 to-orange-600',
      textColor: 'text-amber-300',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      badge: 'Direct Dispatch',
    },
  ];

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Export & Actions</h3>
          <p className="text-xs text-white/50 mt-0.5">Download, print, or share formatted reports (UI Simulation)</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full text-purple-300 bg-purple-500/10 border border-purple-500/30">
          5 Action Modes
        </span>
      </div>

      {/* Toast Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🎉</span>
              <span>{feedback.message}</span>
              <span className="text-[10px] text-purple-400 font-mono">({feedback.timestamp})</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-white/40 hover:text-white">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {exportActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action.label)}
            className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-3 text-center group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} opacity-80 group-hover:opacity-100 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-space font-bold text-white group-hover:text-purple-300 transition-colors">
                {action.label}
              </span>
              <span className="text-[10px] text-white/40">{action.badge}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
