import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ReportHeader from '../../components/reports/ReportHeader';
import StatisticsCard from '../../components/reports/StatisticsCard';
import ExportPanel from '../../components/reports/ExportPanel';
import ReportSummary from '../../components/reports/ReportSummary';
import { LEARNING_REPORT_DATA } from '../../data/reportData';

export default function LearningReportPage() {
  const data = LEARNING_REPORT_DATA;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <span>/</span>
          <a href="/reports" className="hover:text-white transition-colors">Reports</a>
          <span>/</span>
          <span className="text-purple-400">Learning Report</span>
        </div>

        {/* Header */}
        <ReportHeader
          title="Learning Progress Report"
          subtitle="Detailed analytics covering course completions, lesson milestones, and practice hours."
          badge="Learning Analytics"
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatisticsCard title="Course Completion" value="68%" subtitle="5 of 7 Completed" color={[168, 85, 247]} icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" index={0} />
          <StatisticsCard title="Lessons Completed" value="48 / 72" change="+6 this week" color={[59, 130, 246]} icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" index={1} />
          <StatisticsCard title="Practice Hours" value="24.5 hrs" change="+3.2 hrs" color={[34, 197, 94]} icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" index={2} />
          <StatisticsCard title="Current Level" value="Level 2" subtitle="Intermediate ASL" color={[245, 158, 11]} icon="M13 10V3L4 14h7v7l9-11h-7z" index={3} />
          <StatisticsCard title="Learning Streak" value="14 Days 🔥" change="Active" color={[236, 72, 153]} icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" index={4} />
        </div>

        {/* Summary & Recommendations */}
        <ReportSummary
          summary={data.summary}
          recommendations={data.recommendations}
          metrics={[
            { label: 'Overall Mastery', value: data.skillMastery },
            { label: 'Current Level', value: data.currentLevel },
            { label: 'Practice Hours', value: data.practiceHours },
          ]}
        />

        {/* Skill Mastery Table & Weekly Learning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-6 flex flex-col gap-4 border border-white/10">
            <h3 className="text-xl font-space font-bold text-white">Skill Mastery Breakdown</h3>
            <div className="flex flex-col gap-3">
              {data.skillsBreakdown.map((s, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{s.skill}</span>
                    <span className="text-[10px] text-white/40">{s.status}</span>
                  </div>
                  <span className="text-base font-space font-bold text-purple-300">{s.mastery}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6 flex flex-col gap-4 border border-white/10">
            <h3 className="text-xl font-space font-bold text-white">Weekly Learning Activity</h3>
            <div className="flex items-end justify-between gap-2 h-44 pt-4 relative">
              {data.weeklyLearning.map((w, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                  <span className="text-[10px] text-purple-300 font-bold">{w.hrs}h</span>
                  <div className="w-full max-w-[32px] bg-purple-500/20 rounded-t-lg flex items-end h-32">
                    <div className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-blue-400" style={{ height: `${(w.hrs / 4) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-white/40">{w.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Panel */}
        <ExportPanel reportTitle="Learning Progress Report" />
      </div>
    </DashboardLayout>
  );
}
