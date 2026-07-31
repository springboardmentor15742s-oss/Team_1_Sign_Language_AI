import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccuracyHistoryTable({ historyData = [] }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(historyData.map((item) => item.category))];

  const filteredHistory = historyData.filter((item) => {
    const matchesSearch =
      item.gestureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Header with Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Accuracy History</h3>
          <p className="text-xs text-white/50 mt-0.5">Historical log of all AI-evaluated sign language assessments</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search gesture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 w-48"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500/50"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0f0b21] text-white">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-widest">
              <th className="py-3 px-4">Assessment Date</th>
              <th className="py-3 px-4">Gesture Name</th>
              <th className="py-3 px-4">Accuracy</th>
              <th className="py-3 px-4">Time Taken</th>
              <th className="py-3 px-4">Grade</th>
              <th className="py-3 px-4">Improvement Trend</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((row) => (
                <tr
                  key={row.id}
                  className="group border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-4 px-4 text-xs font-medium text-white/60">{row.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {row.gestureName}
                      </span>
                      <span className="text-[10px] text-white/40">{row.category} · {row.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-space font-bold text-purple-300">{row.accuracy}%</span>
                  </td>
                  <td className="py-4 px-4 text-xs font-mono text-white/70">{row.timeTaken}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-space bg-purple-500/15 border border-purple-500/30 text-purple-300">
                      {row.performanceGrade}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        row.improvementTrend.startsWith('+')
                          ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {row.improvementTrend}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => navigate(`/accuracy/report/${row.reportId || 'ACC-RPT-001'}`)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-all"
                    >
                      View Report →
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-xs text-white/40">
                  No matching assessment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
