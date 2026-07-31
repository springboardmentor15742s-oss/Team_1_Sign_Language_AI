import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

// Components
import ReportSummary from '../components/reports/ReportSummary';
import ReportChart from '../components/reports/ReportChart';
import ReportTable from '../components/reports/ReportTable';
import ExportCard from '../components/reports/ExportCard';
import { STATUS_CONFIG } from '../data/reportData';

// Data
import { reports, analyticsData } from '../data/reportData';

/* ─── Metric Card ────────────────────────────────────────────────────── */
function MetricCard({ metric, color, index }) {
  const [r, g, b] = color;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group"
      style={{ border: `1px solid rgba(${r},${g},${b},0.12)` }}
    >
      <div
        className="absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(16px)' }}
      />
      <span className="text-xs text-white/40 font-medium relative z-10">{metric.label}</span>
      <span className="text-2xl font-space font-bold text-white relative z-10">{metric.value}</span>
      {metric.change && (
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full w-fit relative z-10 flex items-center gap-1"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
        >
          {metric.changeDir === 'up' && '↑ '}
          {metric.change}
        </span>
      )}
    </motion.div>
  );
}

/* ─── Pending / Not Found States ─────────────────────────────────────── */
function PendingState({ report }) {
  const [r, g, b] = report.color;
  return (
    <div className="glass rounded-3xl p-12 text-center border border-white/10 flex flex-col items-center gap-5"
      style={{ borderColor: `rgba(${r},${g},${b},0.2)` }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: `rgba(${r},${g},${b},0.15)` }}
      >
        <svg className="w-8 h-8 animate-spin" style={{ color: `rgb(${r},${g},${b})` }} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-space font-bold text-white mb-2">Report Generating…</h3>
        <p className="text-sm text-white/50 max-w-sm">
          This report is currently being generated. It will be ready within a few minutes. Check back soon!
        </p>
      </div>
    </div>
  );
}

/* ─── Report Details Page ─────────────────────────────────────────────── */
export default function ReportDetailsPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  const report = reports.find(r => r.id === reportId);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [reportId]);

  if (!loading && !report) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="glass rounded-3xl p-12 text-center border border-white/10 max-w-md w-full flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-500/15">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-space font-bold text-white">Report Not Found</h2>
            <p className="text-sm text-white/50">The report ID "{reportId}" does not exist.</p>
            <button onClick={() => navigate('/reports')} className="btn-primary text-sm" style={{ padding: '10px 24px' }}>
              ← Back to Reports
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6 animate-pulse max-w-7xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 h-48 border border-white/10" />
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="glass rounded-2xl h-28 border border-white/5" />)}
          </div>
          <div className="glass rounded-2xl h-64 border border-white/5" />
        </div>
      </DashboardLayout>
    );
  }

  const [r, g, b] = report.color;

  const sections = [
    { id: 'overview',  label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'activity',  label: 'Activity' },
    { id: 'export',    label: 'Export' },
  ];

  // Analytics charts for the detail page
  const detailCharts = [
    { title: 'Weekly Progress', data: report.weeklyProgress, color: [139, 92, 246], type: 'area' },
    { title: 'Monthly Trend',   data: report.monthlyProgress, color: [59, 130, 246],  type: 'line' },
    { title: 'Gesture Accuracy', data: report.gestureAccuracy, color: [16, 185, 129], type: 'area' },
    { title: 'Assessment Scores', data: report.assessmentTrend, color: [245, 158, 11], type: 'bar' },
    { title: 'Practice Consistency', data: report.practiceConsistency, color: [236, 72, 153], type: 'bar' },
    { title: 'Learning Growth', data: report.learningGrowth, color: [99, 102, 241], type: 'line' },
  ].filter(c => c.data && c.data.length > 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">

        {/* ─── Back Button ─────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <button
            id="back-to-reports"
            onClick={() => navigate('/reports')}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-medium group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Reports
          </button>
          <span className="text-white/15">/</span>
          <span className="text-sm text-white/60 truncate max-w-xs">{report.title}</span>
        </div>

        {/* ─── Summary Header ───────────────────────────────── */}
        <ReportSummary report={report} />

        {/* ─── Section Tabs ─────────────────────────────────── */}
        <div className="flex items-center gap-2 p-1 rounded-2xl w-fit"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {sections.map(sec => (
            <button
              key={sec.id}
              id={`section-${sec.id}`}
              onClick={() => setActiveSection(sec.id)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeSection === sec.id
                  ? 'text-white border border-purple-500/40'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              style={activeSection === sec.id ? { background: `rgba(${r},${g},${b},0.2)` } : {}}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* ─── Section: Overview ────────────────────────────── */}
        {activeSection === 'overview' && (
          <div className="flex flex-col gap-6">
            {/* Pending state */}
            {report.status === 'pending' ? (
              <PendingState report={report} />
            ) : (
              <>
                {/* Performance Metrics */}
                {report.metrics.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-space font-bold text-white">Performance Metrics</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {report.metrics.map((m, i) => (
                        <MetricCard key={m.label} metric={m} color={report.color} index={i} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Chart */}
                {report.chartData.length > 0 && (
                  <div className="glass rounded-2xl p-6 flex flex-col gap-4"
                    style={{ border: `1px solid rgba(${r},${g},${b},0.12)` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-space font-semibold text-white">{report.type} Trend</h3>
                        <p className="text-xs text-white/40">{report.chartLabels.join(' → ')}</p>
                      </div>
                    </div>
                    <div className="pb-5">
                      <ReportChart
                        data={report.chartLabels.map((l, i) => ({ label: l, value: report.chartData[i] }))}
                        color={report.color}
                        type="area"
                        height={140}
                      />
                    </div>
                  </div>
                )}

                {/* Skill Improvement */}
                {report.skillImprovement && report.skillImprovement.length > 0 && (
                  <div className="glass rounded-2xl p-6 flex flex-col gap-4"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <h3 className="text-base font-space font-semibold text-white">Skill Breakdown</h3>
                    <ReportChart
                      data={report.skillImprovement}
                      color={report.color}
                      type="horizontal-bar"
                      height={160}
                    />
                  </div>
                )}

                {/* Recommendations */}
                {report.recommendations.length > 0 && (
                  <div className="glass rounded-2xl p-6 flex flex-col gap-4"
                    style={{ border: `1px solid rgba(${r},${g},${b},0.12)` }}
                  >
                    <h3 className="text-base font-space font-semibold text-white flex items-center gap-2">
                      <svg className="w-4 h-4" style={{ color: `rgb(${r},${g},${b})` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Recommendations
                    </h3>
                    <div className="flex flex-col gap-3">
                      {report.recommendations.map((rec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-3 p-4 rounded-xl"
                          style={{
                            background: `rgba(${r},${g},${b},0.06)`,
                            border: `1px solid rgba(${r},${g},${b},0.15)`,
                          }}
                        >
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white"
                            style={{ background: `rgba(${r},${g},${b},0.3)` }}
                          >
                            {i + 1}
                          </span>
                          <p className="text-sm text-white/70 leading-relaxed">{rec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ─── Section: Analytics ───────────────────────────── */}
        {activeSection === 'analytics' && (
          <div className="flex flex-col gap-6">
            {report.status === 'pending' ? (
              <PendingState report={report} />
            ) : detailCharts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {detailCharts.map((chart, i) => {
                    const [cr, cg, cb] = chart.color;
                    return (
                      <motion.div
                        key={chart.title}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="glass rounded-2xl p-5 flex flex-col gap-4"
                        style={{ border: `1px solid rgba(${cr},${cg},${cb},0.12)` }}
                      >
                        <h3 className="text-sm font-space font-semibold text-white">{chart.title}</h3>
                        <div className="pb-4">
                          <ReportChart
                            data={chart.data.map((v, idx) => ({ label: `P${idx + 1}`, value: v }))}
                            color={chart.color}
                            type={chart.type}
                            height={90}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Skill improvement */}
                {report.skillImprovement && report.skillImprovement.length > 0 && (
                  <div className="glass rounded-2xl p-6"
                    style={{ border: `1px solid rgba(${r},${g},${b},0.12)` }}
                  >
                    <h3 className="text-base font-space font-semibold text-white mb-5">
                      Skill Improvement This Period
                    </h3>
                    <ReportChart
                      data={report.skillImprovement}
                      color={report.color}
                      type="horizontal-bar"
                      height={200}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="glass rounded-3xl p-10 text-center border border-white/10 text-white/40 text-sm">
                Analytics data not available for this report.
              </div>
            )}
          </div>
        )}

        {/* ─── Section: Activity ────────────────────────────── */}
        {activeSection === 'activity' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-space font-bold text-white">Activity Log</h2>
              <span className="text-xs text-white/40">{report.tableRows.length} entries</span>
            </div>
            <ReportTable rows={report.tableRows} />
          </div>
        )}

        {/* ─── Section: Export ──────────────────────────────── */}
        {activeSection === 'export' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-space font-bold text-white">Export This Report</h2>
              <ExportCard reportTitle={report.title} />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-space font-bold text-white">Report Info</h2>
              <div className="glass rounded-2xl p-5 flex flex-col gap-3"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {[
                  { label: 'Report ID',   value: report.id },
                  { label: 'Type',        value: report.type },
                  { label: 'Category',    value: report.category },
                  { label: 'Status',      value: STATUS_CONFIG[report.status].label },
                  { label: 'Generated',   value: report.generatedDate },
                  { label: 'Downloads',   value: report.downloads },
                  { label: 'Views',       value: report.views },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-xs text-white/40">{item.label}</span>
                    <span className="text-xs font-semibold text-white/70">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
