import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import CertificateCard from '../../components/certification/CertificateCard';
import LoadingSkeleton from '../../components/certification/LoadingSkeleton';
import { certificatesList } from '../../data/assessmentModuleData';

export default function CertificationDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const unlocked = certificatesList.filter(c => c.status === 'Unlocked');
  const locked = certificatesList.filter(c => c.status === 'Locked');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
          <div className="relative z-10">
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/30 mb-4 inline-block">
              Module 9
            </span>
            <h1 className="text-3xl md:text-5xl font-space font-bold text-white tracking-tight mb-2">
              My Certifications
            </h1>
            <p className="text-sm md:text-base text-white/50 max-w-xl">
              View your earned certificates, share them with your network, and track progress towards your next goal.
            </p>
          </div>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="flex flex-col gap-10">
            
            <section>
              <h2 className="text-xl font-space font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Unlocked Certifications
              </h2>
              {unlocked.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {unlocked.map((cert, idx) => (
                    <CertificateCard key={cert.id} certificate={cert} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="glass rounded-3xl p-8 text-center border border-white/10">
                  <p className="text-white/50">You haven't unlocked any certificates yet. Complete an assessment to earn one!</p>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-space font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/10 text-white/40 flex items-center justify-center border border-white/10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                In Progress & Locked
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locked.map((cert, idx) => (
                  <CertificateCard key={cert.id} certificate={cert} index={idx} />
                ))}
              </div>
            </section>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
