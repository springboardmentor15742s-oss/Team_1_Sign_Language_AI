import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import AccuracyReport from '../../components/accuracy/AccuracyReport';
import { DETAILED_ACCURACY_REPORTS } from '../../data/accuracyData';

export default function AccuracyReportDetailsPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();

  // Find report or fallback to default report 'ACC-RPT-001'
  const report = DETAILED_ACCURACY_REPORTS[reportId] || DETAILED_ACCURACY_REPORTS['ACC-RPT-001'];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <a href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </a>
            <span>/</span>
            <a href="/accuracy" className="hover:text-white transition-colors">
              Accuracy Assessment
            </a>
            <span>/</span>
            <a href="/accuracy/history" className="hover:text-white transition-colors">
              History
            </a>
            <span>/</span>
            <span className="text-purple-400">{report.reportId}</span>
          </div>

          <button
            onClick={() => navigate('/accuracy/history')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 transition-colors"
          >
            ← Back to History
          </button>
        </div>

        {/* Detailed Report View */}
        <AccuracyReport reportData={report} />
      </div>
    </DashboardLayout>
  );
}
