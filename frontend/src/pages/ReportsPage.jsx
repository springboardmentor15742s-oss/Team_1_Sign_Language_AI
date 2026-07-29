import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  LEARNING_REPORT_DATA,
  ASSESSMENT_REPORT_DATA,
  PERFORMANCE_REPORT_DATA,
  PROGRESS_REPORT_DATA,
  EXPORT_FORMATS,
} from '../data/reportData';

/* ─── Analytics Section ─────────────────────────────────────────────── */
function AnalyticsSection() {
  const charts = [
    {
      title: 'Weekly Progress',
      subtitle: 'Accuracy over weeks',
      data: analyticsData?.weeklyProgress || [72, 75, 79, 82, 87],
      color: [139, 92, 246],
      type: 'area',
    },
    {
      title: 'Monthly Growth',
      subtitle: 'Learning score trend',
      data: analyticsData?.monthlyProgress || [70, 74, 78, 80, 82, 85, 87, 88],
      color: [59, 130, 246],
      type: 'line',
    },
    {
      title: 'Gesture Accuracy',
      subtitle: 'Daily accuracy this week',
      data: analyticsData?.gestureAccuracyTrend || [92, 94, 91, 95, 96],
      color: [16, 185, 129],
      type: 'area',
    },
    {
      title: 'Assessment Trend',
      subtitle: 'Scores per assessment',
      data: analyticsData?.assessmentTrend || [85, 88, 92, 96, 98],
      color: [245, 158, 11],
      type: 'bar',
    },
    {
      title: 'Practice Consistency',
      subtitle: 'Hours per day this week',
      data: analyticsData?.practiceConsistency || [1.8, 2.2, 1.5, 2.8, 2.0, 3.2, 1.0],
      color: [236, 72, 153],
      type: 'bar',
    },
    {
      title: 'Learning Growth',
      subtitle: 'Overall growth by month',
      data: analyticsData?.learningGrowth || [65, 70, 75, 82, 88, 92],
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
          const chartValues = chart.data.map(d => (typeof d === 'object' ? d.value : d));
          const maxVal = Math.max(...chartValues, 1);
          const avgVal = chartValues.reduce((s, d) => s + d, 0) / (chartValues.length || 1);

          return (
            <motion.div
              key={chart.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 flex flex-col gap-4 border border-white/10"
              style={{ border: `1px solid rgba(${r},${g},${b},0.15)` }}
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
                <span className="text-xs text-white/30">Peak: <strong className="text-white/60">{maxVal.toFixed(1)}</strong></span>
                <span className="text-xs text-white/30">Avg: <strong className="text-white/60">{avgVal.toFixed(1)}</strong></span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Skill Improvement */}
      {analyticsData?.skillImprovement && (
        <div className="glass rounded-2xl p-6 border border-purple-500/20">
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
      )}
    </div>
  );
}

/* ─── Main Reports Page ─────────────────────────────────────────────── */
export default function ReportsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reports' | 'analytics' | 'export'
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
    { id: 'overview',  label: 'Overview & Highlights', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'reports',   label: 'All Reports',   icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'analytics', label: 'Analytics',     icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { id: 'export',    label: 'Export Center', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">

        {/* ─── Toast Notification ────────────────────────────── */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-8 z-50 px-5 py-3 rounded-2xl glass-strong border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center gap-3 shadow-2xl"
              style={{ background: 'rgba(5, 40, 20, 0.85)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Header ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                  {reports.length} Reports Ready
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">
                Reports &{' '}
                <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Analytics Hub
                </span>
              </h1>
              <p className="text-sm text-white/50 max-w-xl">
                Track learning progress, review assessment scores, analyze performance trends, and export certified reports.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button
                id="export-report-btn"
                onClick={() => showToast('PDF Export started for Overview Report')}
                className="btn-primary text-sm flex items-center gap-2 justify-center whitespace-nowrap"
                style={{ padding: '10px 22px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Report
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className="btn-secondary text-sm flex items-center gap-2 justify-center whitespace-nowrap"
                style={{ padding: '10px 22px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Export Center
              </button>
            </div>
          </div>
        </motion.div>

        {/* ─── Statistics Cards ─────────────────────────────── */}
        <ReportStatistics stats={reportStats} />

        {/* ─── Main Navigation Tabs ──────────────────────────── */}
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

        {/* ─── Tab 1: Overview & Highlights (Fulfills all 7 requirements) ─── */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8">
            {/* Grid 1: Learning Summary & Course Completion Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Requirement 1: Learning Summary */}
              <div className="glass rounded-3xl p-6 border border-purple-500/20 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center font-bold text-lg">
                      📚
                    </div>
                    <div>
                      <h3 className="text-base font-space font-bold text-white">Learning Summary</h3>
                      <p className="text-xs text-white/40">Current level & streak metrics</p>
                    </div>
                  </div>
                  <a href="/reports/learning" className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
                    Full Details →
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Current Level</span>
                    <span className="text-base font-space font-bold text-white">{LEARNING_REPORT_DATA.currentLevel}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Active Streak</span>
                    <span className="text-base font-space font-bold text-amber-400">{LEARNING_REPORT_DATA.learningStreak}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Practice Time</span>
                    <span className="text-base font-space font-bold text-emerald-400">{LEARNING_REPORT_DATA.practiceHours}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Average Mastery</span>
                    <span className="text-base font-space font-bold text-purple-300">{LEARNING_REPORT_DATA.skillMastery}</span>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                  <span className="text-xs font-semibold text-white/60">Key Recommendations</span>
                  {LEARNING_REPORT_DATA.recommendations.slice(0, 2).map((rec, i) => (
                    <div key={i} className="text-xs text-white/50 flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement 5: Course Completion Statistics */}
              <div className="glass rounded-3xl p-6 border border-blue-500/20 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-300 flex items-center justify-center font-bold text-lg">
                      🎓
                    </div>
                    <div>
                      <h3 className="text-base font-space font-bold text-white">Course Completion Statistics</h3>
                      <p className="text-xs text-white/40">Curriculum progression</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    68% Complete
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60">Overall Course Progress</span>
                    <span className="font-bold text-white">{LEARNING_REPORT_DATA.courseCompletion}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-400 w-[68%]" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/40">
                    <span>48 Lessons Completed</span>
                    <span>24 Lessons Remaining</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  {LEARNING_REPORT_DATA.skillsBreakdown.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/70">{item.skill}</span>
                        <span className="font-semibold text-purple-300">{item.mastery}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{ width: `${item.mastery}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Grid 2: Assessment Report & Performance Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Requirement 2: Assessment Report */}
              <div className="glass rounded-3xl p-6 border border-emerald-500/20 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-300 flex items-center justify-center font-bold text-lg">
                      📝
                    </div>
                    <div>
                      <h3 className="text-base font-space font-bold text-white">Assessment Report</h3>
                      <p className="text-xs text-white/40">Exam passage rates & test scores</p>
                    </div>
                  </div>
                  <a href="/reports/assessment" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold">
                    View Exams →
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-white/40 block">Total Tests</span>
                    <span className="text-lg font-space font-bold text-white">{ASSESSMENT_REPORT_DATA.assessmentsTaken}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-white/40 block">Avg Score</span>
                    <span className="text-lg font-space font-bold text-emerald-400">{ASSESSMENT_REPORT_DATA.averageScore}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-white/40 block">Pass Rate</span>
                    <span className="text-lg font-space font-bold text-blue-400">100%</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-white/60">Recent Exams Log</span>
                  {ASSESSMENT_REPORT_DATA.recentAssessments.slice(0, 3).map((exam, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                      <div className="flex flex-col min-w-0">
                        <span className="text-white/80 font-medium truncate">{exam.title}</span>
                        <span className="text-[10px] text-white/40">{exam.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-400">{exam.score}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">{exam.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement 3: Performance Trends */}
              <div className="glass rounded-3xl p-6 border border-amber-500/20 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center font-bold text-lg">
                      ⚡
                    </div>
                    <div>
                      <h3 className="text-base font-space font-bold text-white">Performance Trends</h3>
                      <p className="text-xs text-white/40">Multi-weighted performance index</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    Grade {PERFORMANCE_REPORT_DATA.performanceGrade}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                    <span className="text-[10px] text-white/40">Overall Score</span>
                    <span className="text-xl font-space font-bold text-amber-400">{PERFORMANCE_REPORT_DATA.overallScore}</span>
                    <span className="text-[10px] text-emerald-400 mt-0.5">{PERFORMANCE_REPORT_DATA.weeklyPerformance}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                    <span className="text-[10px] text-white/40">Leaderboard Position</span>
                    <span className="text-xl font-space font-bold text-purple-300">{PERFORMANCE_REPORT_DATA.leaderboardPosition}</span>
                    <span className="text-[10px] text-white/40 mt-0.5">Top 5% Globally</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-white/60">Scoring Weight Distribution</span>
                  {PERFORMANCE_REPORT_DATA.weightedComponents.slice(0, 3).map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-white/70">{c.name}</span>
                      <span className="font-semibold text-white/90">{c.score}% <span className="text-white/30 text-[10px]">({c.weight})</span></span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Requirement 4: Weekly Progress Chart */}
            <div className="glass rounded-3xl p-6 border border-purple-500/20 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-space font-bold text-white">Weekly Progress Chart</h3>
                  <p className="text-xs text-white/40">Practice hours and accuracy trends per week</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Practice Hours
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Accuracy Rate
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <ReportChart
                  data={[
                    { label: 'Wk 1', value: 72 },
                    { label: 'Wk 2', value: 78 },
                    { label: 'Wk 3', value: 84 },
                    { label: 'Wk 4', value: 89 },
                    { label: 'Wk 5', value: 95 },
                  ]}
                  color={[139, 92, 246]}
                  type="area"
                  height={140}
                />
              </div>
            </div>

            {/* Grid 3: Recent Activity & Export Action */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Requirement 6: Recent Activity */}
              <div className="lg:col-span-2 glass rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-space font-bold text-white">Recent Activity</h3>
                  <span className="text-xs text-white/40">Latest report events & milestones</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {PROGRESS_REPORT_DATA.learningTimeline.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-white/90">{item.milestone}</span>
                          <span className="text-[10px] text-white/40">{item.date}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${item.status === 'Completed' ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/20' : 'text-amber-400 bg-amber-500/15 border border-amber-500/20'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement 7: Export Report Button (UI Only) */}
              <div className="glass rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-space font-bold text-white">Export Report</h3>
                  <span className="text-xs text-purple-400">UI Action</span>
                </div>
                <p className="text-xs text-white/50">
                  Select a format below to export your comprehensive progress report instantly.
                </p>

                <div className="flex flex-col gap-2 mt-1">
                  {EXPORT_FORMATS.map(fmt => (
                    <button
                      key={fmt.id}
                      onClick={() => showToast(`${fmt.label} initiated successfully!`)}
                      className="p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs text-white font-semibold flex items-center justify-between transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <span>{fmt.ext === '.pdf' ? '📄' : fmt.ext === '.xlsx' ? '📊' : fmt.ext === '.csv' ? '📁' : '🖨️'}</span>
                        {fmt.label}
                      </span>
                      <span className="text-[10px] text-white/40">{fmt.ext || 'Printer'}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ─── Tab 2: All Reports Cards ──────────────────────── */}
        {activeTab === 'reports' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <ReportSearch value={search} onChange={setSearch} />
              <ReportFilter active={filter} onChange={setFilter} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">
                Showing <strong className="text-white/70">{filtered.length}</strong> of {reports.length} reports
              </span>
              {(search || filter !== 'all') && (
                <button
                  onClick={() => { setSearch(''); setFilter('all'); }}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <LoadingSkeleton rows={6} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((report, i) => (
                  <ReportCard key={report.id} report={report} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Tab 3: Analytics ─────────────────────────────── */}
        {activeTab === 'analytics' && <AnalyticsSection />}

        {/* ─── Tab 4: Export Center ─────────────────────────── */}
        {activeTab === 'export' && (
          <div className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              {reports.map((r, i) => (
                <div key={r.id} className="glass rounded-2xl p-5 flex flex-col gap-4 border border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center font-bold">
                      📄
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{r.title}</h4>
                      <p className="text-[10px] text-white/40">{r.type} · {r.date}</p>
                    </div>
                  </div>
                  <ExportCard reportTitle={r.title} />
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
              <h3 className="text-base font-space font-bold text-white">Full Export History</h3>
              <ExportHistory history={exportHistory} />
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
