import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

// Mock Data
import {
  OVERALL_ACCURACY_SUMMARY,
  ACCURACY_METRICS_BREAKDOWN,
  SKILLS_PERFORMANCE,
  MOCK_GESTURE_COMPARISON,
  MOCK_MISTAKE_ANALYSIS,
  ACCURACY_HISTORY_LIST,
  ACCURACY_TREND_DATA,
} from '../../data/accuracyData';

// Components
import AccuracyHeader from '../../components/accuracy/AccuracyHeader';
import AccuracyCard from '../../components/accuracy/AccuracyCard';
import MetricCard from '../../components/accuracy/MetricCard';
import GestureComparison from '../../components/accuracy/GestureComparison';
import MistakeCard from '../../components/accuracy/MistakeCard';
import AccuracyChart from '../../components/accuracy/AccuracyChart';
import RecommendationPanel from '../../components/accuracy/RecommendationPanel';
import AccuracyHistoryTable from '../../components/accuracy/AccuracyHistoryTable';

export default function AccuracyDashboardPage() {
  const navigate = useNavigate();
  const [exportedNotice, setExportedNotice] = useState(null);

  const handleExport = () => {
    setExportedNotice('Full Accuracy Assessment Report exported (PDF format).');
    setTimeout(() => setExportedNotice(null), 3500);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <a href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </a>
          <span>/</span>
          <span className="text-purple-400">Accuracy Assessment</span>
        </div>

        {/* Export Notification Toast */}
        {exportedNotice && (
          <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-sm font-semibold flex items-center justify-between shadow-xl">
            <span>🎉 {exportedNotice}</span>
            <button onClick={() => setExportedNotice(null)} className="text-white/40 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Top Header */}
        <AccuracyHeader
          overallScore={OVERALL_ACCURACY_SUMMARY.overallAccuracy}
          grade={OVERALL_ACCURACY_SUMMARY.performanceGrade}
          status={OVERALL_ACCURACY_SUMMARY.status}
          streak={OVERALL_ACCURACY_SUMMARY.improvementStreak}
          onExport={handleExport}
          onHistoryClick={() => navigate('/accuracy/history')}
        />

        {/* Top Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <AccuracyCard
            title="Overall Sign Accuracy"
            value={`${OVERALL_ACCURACY_SUMMARY.overallAccuracy}%`}
            change="+2.4% vs last wk"
            color={[168, 85, 247]}
            icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            index={0}
          />
          <AccuracyCard
            title="Hand Shape Accuracy"
            value={`${OVERALL_ACCURACY_SUMMARY.handShapeAccuracy}%`}
            change="Grade A+"
            color={[59, 130, 246]}
            icon="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5a1.5 1.5 0 013 0v4.5"
            index={1}
          />
          <AccuracyCard
            title="Motion Accuracy"
            value={`${OVERALL_ACCURACY_SUMMARY.motionAccuracy}%`}
            change="Smooth Trajectory"
            color={[245, 158, 11]}
            icon="M13 10V3L4 14h7v7l9-11h-7z"
            index={2}
          />
          <AccuracyCard
            title="Position Accuracy"
            value={`${OVERALL_ACCURACY_SUMMARY.positionAccuracy}%`}
            change="High Precision"
            color={[34, 197, 94]}
            icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            index={3}
          />
          <AccuracyCard
            title="Timing Accuracy"
            value={`${OVERALL_ACCURACY_SUMMARY.timingAccuracy}%`}
            change="Paced Well"
            color={[236, 72, 153]}
            icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            index={4}
          />
          <AccuracyCard
            title="Gesture Confidence"
            value={`${OVERALL_ACCURACY_SUMMARY.gestureConfidence}%`}
            change="AI Confidence"
            color={[6, 182, 212]}
            icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            index={5}
          />
        </div>

        {/* Main Grid: Left Column & Right Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 spans) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Gesture Comparison Overlay Section */}
            <GestureComparison comparisonData={MOCK_GESTURE_COMPARISON} />

            {/* Assessment Metrics Breakdown */}
            <MetricCard metrics={ACCURACY_METRICS_BREAKDOWN} />

            {/* Mistake Analysis */}
            <MistakeCard mistakes={MOCK_MISTAKE_ANALYSIS} />

            {/* History Table preview */}
            <AccuracyHistoryTable historyData={ACCURACY_HISTORY_LIST} />
          </div>

          {/* Right Column (1 span) */}
          <div className="flex flex-col gap-8">
            {/* Accuracy Trend Chart */}
            <AccuracyChart trendData={ACCURACY_TREND_DATA} title="Accuracy Progression" />

            {/* Skills & Recommendations Panel */}
            <RecommendationPanel skillsPerformance={SKILLS_PERFORMANCE} />

            {/* Recent Assessments List */}
            <div className="glass rounded-3xl p-6 flex flex-col gap-4 border border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-space font-bold text-white">Recent Assessments</h3>
                <a href="/accuracy/history" className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
                  View All →
                </a>
              </div>

              <div className="flex flex-col gap-3">
                {ACCURACY_HISTORY_LIST.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/accuracy/report/${item.reportId}`)}
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white/90">{item.gestureName}</span>
                      <span className="text-[10px] text-white/40">{item.date} · {item.timeTaken}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-space font-bold text-purple-300">{item.accuracy}%</span>
                      <div className="text-[10px] font-semibold text-green-400">{item.performanceGrade}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
