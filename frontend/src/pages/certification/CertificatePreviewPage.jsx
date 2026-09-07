import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import CertificatePreview from '../../components/certification/CertificatePreview';
import LoadingSkeleton from '../../components/certification/LoadingSkeleton';
import { getUserCertificates } from '../../data/assessmentModuleData';
import { useAuth } from '../../context/AuthContext';

export default function CertificatePreviewPage() {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userEmail = user?.email || 'default';
  
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userCerts = getUserCertificates(userEmail);
    const found = userCerts.find(
      c => c.id === certificateId || c.verificationId === certificateId || c.courseId === certificateId
    );
    setCertificate(found || null);
    setLoading(false);
  }, [certificateId, userEmail]);

  const handleDownloadPDF = async () => {
    if (!certificate) return;
    setIsDownloading(true);

    // Format: starts with "<learner name_> and ends with "course name_level name"
    const cleanLearner = (certificate.learnerName || user?.name || 'Learner').replace(/[\\/*?:"<>|]/g, '').trim();
    const cleanCourse = (certificate.courseName || 'ASL Course').replace(/[\\/*?:"<>|]/g, '').trim();
    const cleanLevel = (certificate.level || 'Certificate').replace(/[\\/*?:"<>|]/g, '').trim();
    const downloadFileName = `${cleanLearner}_${cleanCourse}_${cleanLevel}.pdf`;

    try {
      // Backend API certificate generation
      const issueUrl = `http://localhost:8000/certificate/issue?user_name=${encodeURIComponent(cleanLearner)}&score=${certificate.score || 95}&course_name=${encodeURIComponent(cleanCourse)}&level=${encodeURIComponent(cleanLevel)}`;
      const res = await fetch(issueUrl, { method: 'POST' });
      
      if (res.ok) {
        const data = await res.json();
        const rawDownloadPath = data?.certificate?.download_url || `/certificate/download/${encodeURIComponent(downloadFileName)}`;
        const downloadUrl = rawDownloadPath.startsWith('http') ? rawDownloadPath : `http://localhost:8000${rawDownloadPath}`;

        const blobRes = await fetch(downloadUrl);
        if (blobRes.ok) {
          const blob = await blobRes.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = downloadFileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          setIsDownloading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend download endpoint failed, invoking print dialog with customized title:', e);
    }

    // Fallback: window print dialog with customized title
    const prevTitle = document.title;
    document.title = `${cleanLearner}_${cleanCourse}_${cleanLevel}`;
    window.print();
    document.title = prevTitle;
    setIsDownloading(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <DashboardLayout><LoadingSkeleton /></DashboardLayout>;
  }

  if (!certificate || certificate.status !== 'Unlocked') {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-4">Certificate Not Found or Locked</h2>
          <button onClick={() => navigate('/certificates')} className="btn-primary">Go Back</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto w-full pb-10">
        
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/certificates')} className="text-white/50 hover:text-white flex items-center gap-2 text-sm transition-colors cursor-pointer">
            ← Back to Certifications
          </button>
          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="glass px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-2 border border-white/10 hover:border-white/30 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l5.657 5.657a1 1 0 001.414-1.414L10.1 13.9m-1.416-2.558l5.657-5.657a1 1 0 00-1.414-1.414L8.684 9.9" />
              </svg>
              {copied ? 'Link Copied!' : 'Share'}
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* Certificate filename indicator */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white/50 font-medium">Export File Name:</span>
            <span className="font-mono text-purple-300 font-semibold">
              {`${(certificate?.learnerName || user?.name || 'Learner').replace(/[\\/*?:"<>|]/g, '').trim()}_${(certificate?.courseName || 'ASL Course').replace(/[\\/*?:"<>|]/g, '').trim()}_${(certificate?.level || 'Certificate').replace(/[\\/*?:"<>|]/g, '').trim()}.pdf`}
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            ✓ Starts with &lt;learner name_&gt; · Ends with course name_level name
          </span>
        </div>

        <CertificatePreview certificate={certificate} />
        
      </div>
    </DashboardLayout>
  );
}
