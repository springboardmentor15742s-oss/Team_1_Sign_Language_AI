import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ReportHeader from '../../components/reports/ReportHeader';
import StatisticsCard from '../../components/reports/StatisticsCard';
import ExportPanel from '../../components/reports/ExportPanel';
import ReportSummary from '../../components/reports/ReportSummary';
import { ASSESSMENT_REPORT_DATA } from '../../data/reportData';

export default function AssessmentReportPage() {
  const data = ASSESSMENT_REPORT_DATA;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <span>/</span>
          <a href="/reports" className="hover:text-white transition-colors">Reports</a>
          <span>/</span>
          <span className="text-purple-400">Assessment Report</span>
        </div>

        {/* Header */}
        <ReportHeader
          title="Assessment & Exam Performance Report"
          subtitle="Comprehensive analytics covering test results, passage rates, score distributions, and recent exam logs."
          badge="Assessment Analytics"
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatisticsCard title="Assessments Taken" value={data.assessmentsTaken} change="100% Completed" color={[168, 85, 247]} icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" index={0} />
          <StatisticsCard title="Average Score" value={data.averageScore} change="Grade A" color={[59, 130, 246]} icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" index={1} />
          <StatisticsCard title="Highest Score" value={data.highestScore} change="Personal Record" color={[34, 197, 94]} icon="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" index={2} />
          <StatisticsCard title="Lowest Score" value={data.lowestScore} change="Pass Threshold 80%" color={[245, 158, 11]} icon="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" index={3} />
          <StatisticsCard title="Pass Rate" value={data.passRate} change="Perfect Record" color={[236, 72, 153]} icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" index={4} />
        </div>

        {/* Summary */}
        <ReportSummary
          summary={data.summary}
          recommendations={data.recommendations}
          metrics={[
            { label: 'Pass Rate', value: data.passRate },
            { label: 'Average Score', value: data.averageScore },
            { label: 'Assessments Taken', value: `${data.assessmentsTaken} Exams` },
          ]}
        />

        {/* Recent Assessments Table */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-4 border border-white/10">
          <h3 className="text-xl font-space font-bold text-white">Recent Assessment Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase">
                  <th className="py-3 px-4">Exam Title</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentAssessments.map((a, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-semibold text-white">{a.title}</td>
                    <td className="py-3.5 px-4 text-white/50">{a.date}</td>
                    <td className="py-3.5 px-4 font-space font-bold text-purple-300">{a.score}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{a.grade}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/15 text-green-400 border border-green-500/30">
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Panel */}
        <ExportPanel reportTitle="Assessment Performance Report" />
      </div>
    </DashboardLayout>
  );
}
