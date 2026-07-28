import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import CertificatePreview from '../../components/certification/CertificatePreview';
import LoadingSkeleton from '../../components/certification/LoadingSkeleton';
import { certificatesList } from '../../data/assessmentModuleData';

export default function CertificatePreviewPage() {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      const found = certificatesList.find(c => c.id === certificateId);
      setCertificate(found);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [certificateId]);

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
          <button onClick={() => navigate('/certificates')} className="text-white/50 hover:text-white flex items-center gap-2 text-sm transition-colors">
            ← Back to Certifications
          </button>
          <div className="flex gap-4">
            <button className="glass px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-2 border border-white/10 hover:border-white/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-5.368m0 5.368l5.657 5.657a1 1 0 001.414-1.414L10.1 13.9m-1.416-2.558l5.657-5.657a1 1 0 00-1.414-1.414L8.684 9.9" />
              </svg>
              Share
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>

        <CertificatePreview certificate={certificate} />
        
      </div>
    </DashboardLayout>
  );
}
