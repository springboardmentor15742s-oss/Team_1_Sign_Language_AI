import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// Components
import ReportCard from '../components/reports/ReportCard';
import ReportFilter from '../components/reports/ReportFilter';
import ReportSearch from '../components/reports/ReportSearch';
import ReportStatistics from '../components/reports/ReportStatistics';
import ReportChart from '../components/reports/ReportChart';
import ExportHistory from '../components/reports/ExportHistory';
import LoadingSkeleton from '../components/reports/LoadingSkeleton';
import ExportCard from '../components/reports/ExportCard';

// Data
import {
  reports,
  reportStats,
  exportHistory,
  analyticsData,
} from '../data/reportData';

/* ─── Analytics Section ─────────────────────────────────────────────── */
function AnalyticsSection() {
  const charts = [
    {
      title: 'Weekly Progress',
      subtitle: 'Accuracy over weeks',
      data: analyticsData.weeklyProgress,
      color: [139, 92, 246],
      type: 'area',
    },
    {
      title: 'Monthly Growth',
      subtitle: 'Learning score trend',
      data: analyticsData.monthlyProgress,
      color: [59, 130, 246],
      type: 'line',
    },
    {
      title: 'Gesture Accuracy',
      subtitle: 'Daily accuracy this week',
      data: analyticsData.gestureAccuracyTrend,
      color: [16, 185, 129],
      type: 'area',
    },
    {
      title: 'Assessment Trend',
      subtitle: 'Scores per assessment',
      data: analyticsData.assessmentTrend,
      color: [245, 158, 11],
      type: 'bar',
    },
    {
      title: 'Practice Consistency',
      subtitle: 'Hours per day this week',
      data: analyticsData.practiceConsistency,
      color: [236, 72, 153],
      type: 'bar',
    },
    {
      title: 'Learning Growth',
      subtitle: 'Overall growth by month',
      data: analyticsData.learningGrowth,
      color: [99, 102, 241],
      type: 'line',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-space font-bold text-white">Report Analytics</h2>
          <p className="text-xs text-white/40 mt-0.5">Visual breakdown of your progress metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {charts.map((chart, i) => {
          const [r, g, b] = chart.color;
          return (
            <motion.div
              key={chart.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 flex flex-col gap-4"
              style={{ border: `1px solid rgba(${r},${g},${b},0.12)` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-space font-semibold text-white">{chart.title}</h3>
                  <p className="text-xs text-white/40">{chart.subtitle}</p>
                </div>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `rgba(${r},${g},${b},0.15)` }}
                >
                  <svg className="w-4 h-4" style={{ color: `rgb(${r},${g},${b})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="pb-4">
                <ReportChart
                  data={chart.data}
                  color={chart.color}
                  type={chart.type}
                  height={90}
                />
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-xs text-white/30">Peak: <strong className="text-white/60">
                  {Math.max(...chart.data.map(d => typeof d === 'object' ? d.value : d)).toFixed(1)}
                </strong></span>
                <span className="text-xs text-white/30">Avg: <strong className="text-white/60">
                  {(chart.data.reduce((s, d) => s + (typeof d === 'object' ? d.value : d), 0) / chart.data.length).toFixed(1)}
                </strong></span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skill Improvement */}
      <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(139,92,246,0.12)' }}>
        <div className="mb-5">
          <h3 className="text-base font-space font-semibold text-white">Skill Improvement Overview</h3>
          <p className="text-xs text-white/40 mt-0.5">Current vs. previous period scores</p>
        </div>
        <ReportChart
          data={analyticsData.skillImprovement}
          color={[139, 92, 246]}
          type="horizontal-bar"
          height={200}
        />
      </div>
    </div>
  );
}

/* ─── Main Reports Page ─────────────────────────────────────────────── */
export default function ReportsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('reports'); // 'reports' | 'analytics' | 'export'

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = reports.filter(r => {
    const matchCat = filter === 'all' || r.category === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const tabs = [
    { id: 'reports',   label: 'All Reports',   icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'analytics', label: 'Analytics',     icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { id: 'export',    label: 'Export Center', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">

        {/* ─── Header ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
                  Module 13
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {reports.filter(r => r.status === 'generated').length} Generated
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">
                Reports &{' '}
                <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Export Center
                </span>
              </h1>
              <p className="text-sm text-white/50 max-w-xl">
                View, analyze, and export your learning progress reports, assessment results, and performance analytics.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button
                id="generate-report-btn"
                onClick={() => {}}
                className="btn-primary text-sm flex items-center gap-2 justify-center whitespace-nowrap"
                style={{ padding: '10px 20px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Generate Report
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className="btn-secondary text-sm flex items-center gap-2 justify-center whitespace-nowrap"
                style={{ padding: '10px 20px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Quick Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* ─── Statistics ───────────────────────────────────── */}
        <ReportStatistics stats={reportStats} />

        {/* ─── 6 Key Report Portals ─────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-space font-bold text-white">Report Categories</h2>
            <span className="text-xs text-white/40">Select a category to view detailed reports</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/reports/learning"
              className="glass p-5 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 bg-purple-500/[0.02] flex flex-col gap-3 group transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center font-bold">
                  📚
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  Interactive
                </span>
              </div>
              <div>
                <h3 className="text-base font-space font-bold text-white group-hover:text-purple-300 transition-colors">Learning Report</h3>
                <p className="text-xs text-white/50 mt-1">Course completion, practice hours, and streak metrics.</p>
              </div>
              <span className="text-xs font-semibold text-purple-400 flex items-center gap-1 group-hover:gap-2 transition-all mt-1">
                Open Learning Report →
              </span>
            </a>

            <a
              href="/reports/assessment"
              className="glass p-5 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 bg-blue-500/[0.02] flex flex-col gap-3 group transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-300 flex items-center justify-center font-bold">
                  📝
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  Exam Logs
                </span>
              </div>
              <div>
                <h3 className="text-base font-space font-bold text-white group-hover:text-blue-300 transition-colors">Assessment Report</h3>
                <p className="text-xs text-white/50 mt-1">Pass rates, score distribution, and test history.</p>
              </div>
              <span className="text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all mt-1">
                Open Assessment Report →
              </span>
            </a>

            <a
              href="/reports/performance"
              className="glass p-5 rounded-2xl border border-green-500/20 hover:border-green-500/50 bg-green-500/[0.02] flex flex-col gap-3 group transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 text-green-300 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-green-500/20 text-green-300">
                  Algorithmic
                </span>
              </div>
              <div>
                <h3 className="text-base font-space font-bold text-white group-hover:text-green-300 transition-colors">Performance Report</h3>
                <p className="text-xs text-white/50 mt-1">Weighted scoring, accuracy trends, and leaderboard rank.</p>
              </div>
              <span className="text-xs font-semibold text-green-400 flex items-center gap-1 group-hover:gap-2 transition-all mt-1">
                Open Performance Report →
              </span>
            </a>

            <a
              href="/reports/progress"
              className="glass p-5 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 bg-amber-500/[0.02] flex flex-col gap-3 group transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center font-bold">
                  📈
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Timeline
                </span>
              </div>
              <div>
                <h3 className="text-base font-space font-bold text-white group-hover:text-amber-300 transition-colors">Progress Report</h3>
                <p className="text-xs text-white/50 mt-1">Curriculum milestones, remaining skills, and target completion.</p>
              </div>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all mt-1">
                Open Progress Report →
              </span>
            </a>

            <a
              href="/accuracy"
              className="glass p-5 rounded-2xl border border-pink-500/20 hover:border-pink-500/50 bg-pink-500/[0.02] flex flex-col gap-3 group transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-300 flex items-center justify-center font-bold">
                  🎯
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                  AI Engine
                </span>
              </div>
              <div>
                <h3 className="text-base font-space font-bold text-white group-hover:text-pink-300 transition-colors">Accuracy Report</h3>
                <p className="text-xs text-white/50 mt-1">Hand shape, 3D orientation, and keypoint trajectory overlays.</p>
              </div>
              <span className="text-xs font-semibold text-pink-400 flex items-center gap-1 group-hover:gap-2 transition-all mt-1">
                Open Accuracy Engine →
              </span>
            </a>

            <a
              href="/reports/certificates"
              className="glass p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 bg-cyan-500/[0.02] flex flex-col gap-3 group transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-bold">
                  🎓
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  Verified
                </span>
              </div>
              <div>
                <h3 className="text-base font-space font-bold text-white group-hover:text-cyan-300 transition-colors">Certification Report</h3>
                <p className="text-xs text-white/50 mt-1">Digital certificates, credential verification, and issue dates.</p>
              </div>
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all mt-1">
                Open Certificate Report →
              </span>
            </a>
          </div>
        </div>

        {/* ─── Tab Navigation ───────────────────────────────── */}
        <div className="flex items-center gap-2 p-1 rounded-2xl w-fit"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600/25 text-white border border-purple-500/40'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Tab: All Reports ─────────────────────────────── */}
        {activeTab === 'reports' && (
          <div className="flex flex-col gap-6">
            {/* Search & Filter */}
            <div className="flex flex-col gap-4">
              <ReportSearch value={search} onChange={setSearch} />
              <ReportFilter active={filter} onChange={setFilter} />
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">
                Showing <strong className="text-white/70">{filtered.length}</strong> of {reports.length} reports
                {search && <> for "<span className="text-purple-400">{search}</span>"</>}
              </span>
              {(search || filter !== 'all') && (
                <button
                  onClick={() => { setSearch(''); setFilter('all'); }}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Cards */}
            {loading ? (
              <LoadingSkeleton rows={6} />
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((report, i) => (
                  <ReportCard key={report.id} report={report} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-3xl p-12 text-center border border-white/10 flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5">
                  <svg className="w-7 h-7 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm">No reports found matching your criteria.</p>
                <button
                  onClick={() => { setSearch(''); setFilter('all'); }}
                  className="text-sm text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {/* Recent Reports & Export History side-by-side */}
            <div className="grid lg:grid-cols-2 gap-6 mt-2">
              {/* Most Viewed */}
              <div className="glass rounded-2xl p-6 flex flex-col gap-4"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-space font-bold text-white">Most Viewed Reports</h3>
                  <span className="text-xs text-white/30">All time</span>
                </div>
                <div className="flex flex-col gap-2">
                  {[...reports]
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 4)
                    .map((r, i) => {
                      const [red, grn, blu] = r.color;
                      const maxViews = Math.max(...reports.map(x => x.views), 1);
                      return (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          onClick={() => navigate(`/reports/${r.id}`)}
                          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/[0.04]"
                          style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                        >
                          <span className="text-lg font-space font-bold text-white/20 w-5 text-center">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white/80 truncate">{r.title}</p>
                            <div className="mt-1.5 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(r.views / maxViews) * 100}%` }}
                                transition={{ duration: 0.8, delay: i * 0.06 }}
                                className="h-full rounded-full"
                                style={{ background: `rgb(${red},${grn},${blu})` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-white/40 font-medium flex-shrink-0">{r.views} views</span>
                        </motion.div>
                      );
                    })}
                </div>
              </div>

              {/* Export History */}
              <div className="glass rounded-2xl p-6 flex flex-col gap-4"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-space font-bold text-white">Export History</h3>
                  <button
                    onClick={() => setActiveTab('export')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    View All →
                  </button>
                </div>
                <ExportHistory history={exportHistory.slice(0, 4)} />
              </div>
            </div>
          </div>
        )}

        {/* ─── Tab: Analytics ───────────────────────────────── */}
        {activeTab === 'analytics' && <AnalyticsSection />}

        {/* ─── Tab: Export Center ───────────────────────────── */}
        {activeTab === 'export' && (
          <div className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Export for each report */}
              {reports.filter(r => r.status === 'generated').map((r, i) => {
                const [red, grn, blu] = r.color;
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass rounded-2xl p-5 flex flex-col gap-4"
                    style={{ border: `1px solid rgba(${red},${grn},${blu},0.15)` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `rgba(${red},${grn},${blu},0.15)` }}
                      >
                        <svg className="w-5 h-5" style={{ color: `rgb(${red},${grn},${blu})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white/90 leading-tight truncate">{r.title}</h4>
                        <p className="text-[10px] text-white/40 mt-0.5">{r.type} · {r.generatedDate}</p>
                      </div>
                    </div>
                    <ExportCard reportTitle={r.title} />
                  </motion.div>
                );
              })}
            </div>

            {/* Full Export History */}
            <div className="glass rounded-2xl p-6 flex flex-col gap-4"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h3 className="text-base font-space font-bold text-white">Full Export History</h3>
              <ExportHistory history={exportHistory} />
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
