import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ReportHeader from '../../components/reports/ReportHeader';
import StatisticsCard from '../../components/reports/StatisticsCard';
import ExportPanel from '../../components/reports/ExportPanel';
import ReportSummary from '../../components/reports/ReportSummary';
import { PERFORMANCE_REPORT_DATA } from '../../data/reportData';

export default function PerformanceReportPage() {
  const data = PERFORMANCE_REPORT_DATA;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <span>/</span>
          <a href="/reports" className="hover:text-white transition-colors">Reports</a>
          <span>/</span>
          <span className="text-purple-400">Performance Report</span>
        </div>

        {/* Header */}
        <ReportHeader
          title="Weighted Performance Scoring Report"
          subtitle="Comprehensive multi-factor performance evaluation algorithm breaking down accuracy, consistency, growth rate, and community rank."
          badge="Performance Engine"
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatisticsCard title="Overall Score" value={data.overallScore} change={`Grade ${data.performanceGrade}`} color={[168, 85, 247]} icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" index={0} />
          <StatisticsCard title="Gesture Accuracy" value={data.gestureAccuracy} change="Top Tier" color={[59, 130, 246]} icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" index={1} />
          <StatisticsCard title="Practice Consistency" value={data.practiceConsistency} change="Optimal Habit" color={[34, 197, 94]} icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" index={2} />
          <StatisticsCard title="Skill Growth" value={data.skillGrowth} change="MoM Increase" color={[245, 158, 11]} icon="M13 10V3L4 14h7v7l9-11h-7z" index={3} />
          <StatisticsCard title="Leaderboard Rank" value={data.leaderboardPosition} change="Global Top 5" color={[236, 72, 153]} icon="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" index={4} />
        </div>

        {/* Summary */}
        <ReportSummary
          summary={data.summary}
          metrics={[
            { label: 'Overall Score', value: data.overallScore },
            { label: 'Weekly Performance', value: data.weeklyPerformance },
            { label: 'Monthly Performance', value: data.monthlyPerformance },
          ]}
        />

        {/* Weighted Components Breakdown */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 border border-white/10">
          <h3 className="text-xl font-space font-bold text-white">Algorithm Score Weight Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.weightedComponents.map((comp, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{comp.name}</span>
                  <span className="text-[10px] text-white/40">Weight Contribution: {comp.weight}</span>
                </div>
                <span className="text-lg font-space font-bold text-purple-300">{comp.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Panel */}
        <ExportPanel reportTitle="Performance Scoring Report" />
      </div>
    </DashboardLayout>
  );
}
