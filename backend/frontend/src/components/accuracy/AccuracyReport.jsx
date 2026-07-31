import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MetricCard from './MetricCard';
import GestureComparison from './GestureComparison';
import MistakeCard from './MistakeCard';

export default function AccuracyReport({ reportData }) {
  const [exportingNotice, setExportingNotice] = useState(null);

  if (!reportData) {
    return (
      <div className="p-8 text-center text-white/50 glass rounded-3xl">
        No detailed report data found for this report ID.
      </div>
    );
  }

  const {
    reportId,
    gestureName,
    category,
    overallScore,
    performanceGrade,
    status,
    evaluatedAt,
    evaluator,
    metrics = [],
    summary,
    suggestions = [],
    comparison,
    mistakes = [],
  } = reportData;

  const handleExport = (type) => {
    setExportingNotice(`Report ${reportId} exported as ${type} successfully!`);
    setTimeout(() => setExportingNotice(null), 3500);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto">
      {/* Toast notification */}
      {exportingNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-sm font-semibold flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-2">
            <span>🎉</span>
            <span>{exportingNotice}</span>
          </div>
          <button onClick={() => setExportingNotice(null)} className="text-white/40 hover:text-white">
            ✕
          </button>
        </motion.div>
      )}

      {/* Top Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden"
        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full text-purple-300 bg-purple-500/15 border border-purple-500/30">
                Detailed Accuracy Report
              </span>
              <span className="text-xs font-mono text-white/50">{reportId}</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full text-green-400 bg-green-500/10 border border-green-500/30">
                {status}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-space font-bold text-white">
              {gestureName}
            </h1>
            <p className="text-xs text-white/50">
              Evaluated on {evaluatedAt} by <span className="text-purple-300">{evaluator}</span>
            </p>
          </div>

          {/* Score & Export Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="glass rounded-2xl p-4 flex items-center gap-4 border border-purple-500/30 bg-purple-500/5">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-semibold">Overall Score</span>
                <span className="text-3xl font-space font-bold text-purple-300">{overallScore}%</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl font-bold font-space text-purple-300">
                {performanceGrade}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExport('PDF')}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/30 transition-all flex items-center gap-2"
              >
                📥 Export PDF
              </button>
              <button
                onClick={() => handleExport('JSON Data')}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Export JSON
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Summary & Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 flex flex-col gap-4 border border-white/10">
          <h3 className="text-xl font-space font-bold text-white">Performance Summary</h3>
          <p className="text-sm text-white/80 leading-relaxed">{summary}</p>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-4 border border-white/10">
          <h3 className="text-lg font-space font-bold text-white">Improvement Suggestions</h3>
          <div className="flex flex-col gap-2.5">
            {suggestions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-white/70">
                <span className="text-purple-400 font-bold">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Breakdown */}
      <MetricCard metrics={metrics} />

      {/* Gesture Comparison Overlay */}
      {comparison && <GestureComparison comparisonData={comparison} />}

      {/* Mistake Analysis */}
      {mistakes.length > 0 && <MistakeCard mistakes={mistakes} />}
    </div>
  );
}
