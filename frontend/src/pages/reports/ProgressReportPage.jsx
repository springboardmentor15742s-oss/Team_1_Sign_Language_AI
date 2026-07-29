import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ReportHeader from '../../components/reports/ReportHeader';
import StatisticsCard from '../../components/reports/StatisticsCard';
import ExportPanel from '../../components/reports/ExportPanel';
import ReportSummary from '../../components/reports/ReportSummary';
import { PROGRESS_REPORT_DATA } from '../../data/reportData';

export default function ProgressReportPage() {
  const data = PROGRESS_REPORT_DATA;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <span>/</span>
          <a href="/reports" className="hover:text-white transition-colors">Reports</a>
          <span>/</span>
          <span className="text-purple-400">Progress Report</span>
        </div>

        {/* Header */}
        <ReportHeader
          title="Curriculum Progress & Timeline Report"
          subtitle="Real-time audit of completed skills, remaining learning milestones, and projected course completion dates."
          badge="Progress Intelligence"
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatisticsCard title="Overall Progress" value={`${data.overallProgress}%`} change="On Track" color={[168, 85, 247]} icon="M13 10V3L4 14h7v7l9-11h-7z" index={0} />
          <StatisticsCard title="Completed Skills" value={data.completedSkills} change="Verified" color={[34, 197, 94]} icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" index={1} />
          <StatisticsCard title="Remaining Skills" value={data.remainingSkills} subtitle="In Progress" color={[245, 158, 11]} icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" index={2} />
          <StatisticsCard title="Est. Completion" value="3 Weeks" subtitle="Aug 20, 2026" color={[59, 130, 246]} icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" index={3} />
          <StatisticsCard title="Weekly Improvement" value={data.weeklyImprovement} change="Paced Well" color={[236, 72, 153]} icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" index={4} />
        </div>

        {/* Summary */}
        <ReportSummary
          summary={data.summary}
          metrics={[
            { label: 'Overall Completion', value: `${data.overallProgress}%` },
            { label: 'Completed Skills', value: `${data.completedSkills} Modules` },
            { label: 'Estimated Completion', value: data.estimatedCompletion },
          ]}
        />

        {/* Learning Timeline */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 border border-white/10">
          <h3 className="text-xl font-space font-bold text-white">Learning Timeline & Milestone Audit</h3>
          <div className="flex flex-col gap-4 relative">
            <div className="absolute top-2 bottom-2 left-4 w-0.5 bg-white/10 pointer-events-none" />
            {data.learningTimeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4 relative z-10 pl-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  item.status === 'Completed' ? 'bg-green-500 text-black' : 'bg-white/20 text-white'
                }`}>
                  {item.status === 'Completed' ? '✓' : '•'}
                </div>
                <div className="flex-1 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{item.milestone}</span>
                    <span className="text-[10px] text-white/40">{item.date}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase w-fit ${
                    item.status === 'Completed' ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Panel */}
        <ExportPanel reportTitle="Progress & Mastery Report" />
      </div>
    </DashboardLayout>
  );
}
