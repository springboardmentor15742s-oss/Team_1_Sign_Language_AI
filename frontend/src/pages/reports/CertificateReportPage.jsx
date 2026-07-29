import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ReportHeader from '../../components/reports/ReportHeader';
import StatisticsCard from '../../components/reports/StatisticsCard';
import ExportPanel from '../../components/reports/ExportPanel';
import ReportSummary from '../../components/reports/ReportSummary';
import { CERTIFICATE_REPORT_DATA } from '../../data/reportData';

export default function CertificateReportPage() {
  const data = CERTIFICATE_REPORT_DATA;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
          <span>/</span>
          <a href="/reports" className="hover:text-white transition-colors">Reports</a>
          <span>/</span>
          <span className="text-purple-400">Certificate Report</span>
        </div>

        {/* Header */}
        <ReportHeader
          title="Digital Certificate & Credential Audit Report"
          subtitle="Verified registry of earned sign language certificates, issue dates, and credential authentication status."
          badge="Certification Registry"
        />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatisticsCard title="Certificates Earned" value={data.certificatesEarned} change="100% Verified" color={[168, 85, 247]} icon="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" index={0} />
          <StatisticsCard title="Certification Levels" value="3 Levels" subtitle="Fundamentals, Conv, Specialist" color={[59, 130, 246]} icon="M13 10V3L4 14h7v7l9-11h-7z" index={1} />
          <StatisticsCard title="Completion Status" value="Active" subtitle="All Criteria Met" color={[34, 197, 94]} icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" index={2} />
          <StatisticsCard title="Latest Issue Date" value="Jul 25, 2026" subtitle="Healthcare Specialist" color={[245, 158, 11]} icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" index={3} />
        </div>

        {/* Summary */}
        <ReportSummary
          summary={data.summary}
          metrics={[
            { label: 'Earned Certificates', value: `${data.certificatesEarned} Credentials` },
            { label: 'Certification Levels', value: data.certificationLevels },
            { label: 'Completion Status', value: data.completionStatus },
          ]}
        />

        {/* Certificates List */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6 border border-white/10">
          <h3 className="text-xl font-space font-bold text-white">Issued Credentials & Verification Audit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.certificatesList.map((cert) => {
              const [r, g, b] = cert.color;
              return (
                <div key={cert.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between gap-4 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: `rgba(${r},${g},${b},0.2)` }}>
                      🎓
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
                      {cert.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h4 className="text-base font-space font-bold text-white group-hover:text-purple-300 transition-colors">
                      {cert.title}
                    </h4>
                    <span className="text-xs text-white/50">Issued: {cert.issuedDate}</span>
                    <span className="text-[10px] text-white/30 font-mono mt-1">ID: {cert.credentialId}</span>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-purple-300 font-semibold">{cert.downloadStatus}</span>
                    <a href={`/certificates/${cert.id}`} className="text-xs text-purple-400 hover:text-white font-semibold">
                      View Certificate →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Panel */}
        <ExportPanel reportTitle="Certificate Registry Audit" />
      </div>
    </DashboardLayout>
  );
}
