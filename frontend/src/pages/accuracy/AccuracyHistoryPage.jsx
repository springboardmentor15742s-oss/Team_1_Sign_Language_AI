import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import AccuracyHistoryTable from '../../components/accuracy/AccuracyHistoryTable';
import AccuracyChart from '../../components/accuracy/AccuracyChart';
import { ACCURACY_HISTORY_LIST, ACCURACY_TREND_DATA } from '../../data/accuracyData';

export default function AccuracyHistoryPage() {
  const navigate = useNavigate();
  const [exportedNotice, setExportedNotice] = useState(null);

  const handleExportAll = () => {
    setExportedNotice('All historical assessment logs exported (CSV & JSON format).');
    setTimeout(() => setExportedNotice(null), 3500);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <a href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </a>
          <span>/</span>
          <a href="/accuracy" className="hover:text-white transition-colors">
            Accuracy Assessment
          </a>
          <span>/</span>
          <span className="text-purple-400">History Log</span>
        </div>

        {/* Notice */}
        {exportedNotice && (
          <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-sm font-semibold flex items-center justify-between shadow-xl">
            <span>🎉 {exportedNotice}</span>
            <button onClick={() => setExportedNotice(null)} className="text-white/40 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full text-purple-300 bg-purple-500/10 border border-purple-500/30 uppercase tracking-wider">
                Module 6 · History & Analytics
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full text-green-400 bg-green-500/10 border border-green-500/30">
                {ACCURACY_HISTORY_LIST.length} Sessions Logged
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-space font-bold text-white">
              Accuracy Assessment{' '}
              <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                History
              </span>
            </h1>
            <p className="text-xs md:text-sm text-white/50 max-w-xl">
              Track historical sign language performance, review past mistake patterns, and inspect detailed evaluation reports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/accuracy')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={handleExportAll}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/30 transition-all"
            >
              📥 Export All Logs
            </button>
          </div>
        </div>

        {/* Historical Trend Chart */}
        <AccuracyChart trendData={ACCURACY_TREND_DATA} title="Historical Accuracy Trend Analysis" />

        {/* History Table */}
        <AccuracyHistoryTable historyData={ACCURACY_HISTORY_LIST} />
      </div>
    </DashboardLayout>
  );
}
