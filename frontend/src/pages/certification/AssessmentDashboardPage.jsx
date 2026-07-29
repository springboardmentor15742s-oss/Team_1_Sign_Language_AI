import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import AssessmentCard from '../../components/certification/AssessmentCard';
import AssessmentHistory from '../../components/certification/AssessmentHistory';
import LoadingSkeleton from '../../components/certification/LoadingSkeleton';
import { assessmentsList, assessmentHistory, assessmentLevels } from '../../data/assessmentModuleData';

export default function AssessmentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAssessments = activeTab === 'All' 
    ? assessmentsList 
    : assessmentsList.filter(a => a.level === activeTab);

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
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30 mb-4 inline-block">
                Module 9
              </span>
              <h1 className="text-3xl md:text-5xl font-space font-bold text-white tracking-tight mb-2">
                Assessments
              </h1>
              <p className="text-sm md:text-base text-white/50 max-w-xl">
                Test your skills, track your progress, and earn certifications. Select an assessment below to begin.
              </p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Assessment Categories / Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveTab('All')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'All' ? 'bg-purple-600 text-white' : 'glass text-white/60 hover:text-white'
                }`}
              >
                All Assessments
              </button>
              {assessmentLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setActiveTab(level.title)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === level.title ? 'bg-purple-600 text-white' : 'glass text-white/60 hover:text-white'
                  }`}
                >
                  {level.title}
                </button>
              ))}
            </div>

            {/* Assessment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assessment, index) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} index={index} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-white/50">No assessments found for this category.</p>
                </div>
              )}
            </div>

            {/* Assessment History */}
            <div className="mt-4">
              <AssessmentHistory history={assessmentHistory} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
