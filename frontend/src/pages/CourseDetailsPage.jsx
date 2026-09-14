import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  CheckCircle2,
  Play,
  ArrowLeft,
  Share2,
  Bookmark,
  Sparkles,
  ShieldCheck,
  Lock,
  ExternalLink,
  Video
} from 'lucide-react';

import { getCourseById, MOCK_COURSES } from '../data/courses';
import { getCourses, getCourseLessons } from '../api/api';
import { saveUserCertificate, getUserCertificates } from '../data/assessmentModuleData';
import { useAuth } from '../context/AuthContext';
import LearningPath from '../components/course/LearningPath';
import LessonCard from '../components/course/LessonCard';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const userEmail = user?.email || 'default';
  const userName = user?.name || localStorage.getItem('mira_user_name') || 'Registered Learner';

  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);

  const refreshCourse = useCallback(() => {
    const foundCourse = getCourseById(id, userEmail);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [id, userEmail]);

  useEffect(() => {
    refreshCourse();

    const handleProgressUpdate = (e) => {
      if (!e.detail || e.detail.courseId === id) {
        refreshCourse();
      }
    };

    window.addEventListener('mira_course_progress_updated', handleProgressUpdate);
    window.addEventListener('storage', handleProgressUpdate);
    window.addEventListener('focus', handleProgressUpdate);

    return () => {
      window.removeEventListener('mira_course_progress_updated', handleProgressUpdate);
      window.removeEventListener('storage', handleProgressUpdate);
      window.removeEventListener('focus', handleProgressUpdate);
    };
  }, [id, userEmail, refreshCourse]);

  if (!course) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        <p>Loading course details...</p>
      </div>
    );
  }

  // Calculate next incomplete lesson
  let nextLessonId = null;
  for (const mod of course.modules || []) {
    for (const les of mod.lessons || []) {
      if (!les.completed) {
        nextLessonId = les.id;
        break;
      }
    }
    if (nextLessonId) break;
  }
  if (!nextLessonId && course.modules?.[0]?.lessons?.[0]) {
    nextLessonId = course.modules[0].lessons[0].id;
  }

  const totalLessons = course.totalLessons || course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedCount = course.completedLessonsCount || 0;
  const isCourseComplete = course.isCompleted || (completedCount > 0 && completedCount === totalLessons);

  const handleStartOrContinue = () => {
    navigate(`/learn/${nextLessonId}`);
  };

  const handleGenerateCertificate = async () => {
    if (!isCourseComplete) return;
    setIsGeneratingCert(true);

    try {
      // Call backend certificate issue endpoint for the registered user
      const res = await fetch(
        `/api/certificate/issue?user_name=${encodeURIComponent(userName)}&score=96&course_name=${encodeURIComponent(course.title)}`,
        { method: 'POST' }
      );
      let certRecord = null;
      if (res.ok) {
        const data = await res.json();
        certRecord = data.certificate;
      }

      const certId = certRecord?.certificate_id || `CERT-${course.id.toUpperCase()}-${Date.now().toString().slice(-4)}`;

      const newCert = {
        id: certId,
        courseId: course.id,
        courseName: course.title,
        learnerName: userName,
        issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'Unlocked',
        level: course.difficulty || 'Intermediate',
        score: 96,
        verificationId: certRecord?.certificate_id || certId,
        downloadUrl: certRecord?.download_url || `/api/certificate/download/${certId}`
      };

      saveUserCertificate(newCert, userEmail);
      navigate(`/certificates/${certId}`);
    } catch (e) {
      console.warn('Backend certificate issue fallback:', e);
      const certId = `CERT-${course.id.toUpperCase()}-01`;
      const fallbackCert = {
        id: certId,
        courseId: course.id,
        courseName: course.title,
        learnerName: userName,
        issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'Unlocked',
        level: course.difficulty || 'Intermediate',
        score: 96,
        verificationId: certId
      };
      saveUserCertificate(fallbackCert, userEmail);
      navigate(`/certificates/${certId}`);
    } finally {
      setIsGeneratingCert(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white mb-6 glass px-4 py-2 rounded-full border border-white/10 w-fit transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Catalog</span>
      </button>

      {/* ─── COURSE HERO BANNER ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl overflow-hidden border border-white/10 relative mb-8"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.55)' }}
      >
        {/* Banner Background Image with Gradient Overlay */}
        <div className="relative h-72 md:h-96 w-full overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

          {/* Banner Contents */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/30 border border-purple-400/40 backdrop-blur-md">
                {course.category}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-blue-300 bg-blue-500/30 border border-blue-400/40 backdrop-blur-md">
                {course.difficulty} Level
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{course.rating} ({course.totalStudents?.toLocaleString()} students)</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-space font-extrabold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-xs md:text-sm text-white/70 max-w-3xl line-clamp-2">
              {course.description}
            </p>
          </div>
        </div>

        {/* Action Controls & Progress Bar */}
        <div className="p-6 md:p-8 bg-[#0a0718]/80 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Video className="w-4 h-4 text-blue-400" />
              <span>{totalLessons} Video Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Award className={`w-4 h-4 ${isCourseComplete ? 'text-amber-400' : 'text-purple-400'}`} />
              <span>{isCourseComplete ? 'Certificate Unlocked ✓' : 'Certificate Included'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-3 rounded-2xl glass border transition-colors cursor-pointer ${
                isBookmarked ? 'text-amber-400 border-amber-400/40 bg-amber-500/10' : 'text-white/60 border-white/10 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {isCourseComplete ? (
              <button
                onClick={handleGenerateCertificate}
                disabled={isGeneratingCert}
                className="btn-primary text-sm flex items-center justify-center gap-2 flex-1 md:flex-none cursor-pointer shadow-[0_0_25px_rgba(147,51,234,0.5)]"
                style={{ padding: '12px 32px' }}
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>{isGeneratingCert ? 'Generating...' : 'Claim Certificate 🎓'}</span>
              </button>
            ) : (
              <button
                onClick={handleStartOrContinue}
                className="btn-primary text-sm flex items-center justify-center gap-2 flex-1 md:flex-none cursor-pointer"
                style={{ padding: '12px 32px' }}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{completedCount > 0 ? 'Continue Course' : 'Start Course Free'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="px-6 md:px-8 py-3.5 bg-purple-950/30 border-t border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-purple-300 font-semibold">Your Learning Progress:</span>
            <span className="text-white font-bold">{completedCount} of {totalLessons} Lessons Completed</span>
            {isCourseComplete && (
              <span className="text-[10px] uppercase font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/40">
                100% Completed
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1 sm:max-w-xs">
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCourseComplete
                    ? 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-white min-w-[32px] text-right">{course.progress}%</span>
          </div>
        </div>
      </motion.div>

      {/* ─── CERTIFICATE STATUS CALLOUT BANNER ─────────────────────── */}
      <div className="mb-8">
        {isCourseComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-3xl p-6 md:p-8 border border-purple-500/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.25)]"
            style={{
              backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 60%)'
            }}
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    Certificate Unlocked
                  </span>
                  <span className="text-xs text-white/50">100% Course Completion</span>
                </div>
                <h3 className="font-space font-bold text-lg text-white">
                  Official Sign Language Certificate Available for {userName}
                </h3>
                <p className="text-xs text-white/70 italic font-serif">
                  Registered Learner: <strong className="text-purple-200 not-italic">{userName}</strong> ({userEmail}). Certificate will be generated with verification watermark and italic styling.
                </p>
              </div>
            </div>

            <button
              onClick={handleGenerateCertificate}
              disabled={isGeneratingCert}
              className="btn-primary text-xs flex items-center gap-2 px-6 py-3.5 whitespace-nowrap cursor-pointer flex-shrink-0 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            >
              <Award className="w-4 h-4" />
              <span>{isGeneratingCert ? 'Generating...' : 'Generate & View Certificate'}</span>
            </button>
          </motion.div>
        ) : (
          <div className="glass-strong rounded-3xl p-6 md:p-7 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-white/50 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                    Certificate Locked ({course.progress}% Completed)
                  </span>
                </div>
                <h3 className="font-space font-bold text-base text-white/90">
                  Complete all {totalLessons} video lessons to generate your certificate
                </h3>
                <p className="text-xs text-white/50">
                  Certificates are issued only after 100% video completion to registered learner <strong className="text-white/80">{userName}</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={handleStartOrContinue}
              className="glass px-5 py-3 rounded-2xl border border-purple-500/40 text-xs font-semibold text-purple-200 hover:text-white hover:bg-purple-600/30 flex items-center gap-2 transition-all cursor-pointer flex-shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-purple-300" />
              <span>{completedCount > 0 ? 'Continue Course' : 'Start Course'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ─── NAVIGATION TABS ──────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
        {['overview', 'curriculum', 'roadmap', 'instructor'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? 'text-white bg-purple-600/30 border border-purple-500/50 shadow-md shadow-purple-900/30'
                : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── MAIN CONTENT GRID ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left 2 Columns: Detailed Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* OVERVIEW TAB CONTENT */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8">
              {/* Course Description */}
              <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col gap-4">
                <h3 className="font-space font-bold text-xl text-white">Course Overview</h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  {course.longDescription || course.description}
                </p>
              </div>

              {/* Learning Objectives */}
              <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col gap-4">
                <h3 className="font-space font-bold text-xl text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>What You Will Learn</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learningObjectives?.map((obj, i) => (
                    <div key={i} className="glass p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-white/80 leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Covered */}
              <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col gap-4">
                <h3 className="font-space font-bold text-xl text-white">Skills Covered</h3>
                <div className="flex flex-wrap gap-2.5">
                  {course.skillsCovered?.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3.5 py-2 rounded-2xl glass border border-purple-500/30 text-purple-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CURRICULUM TAB CONTENT */}
          {(activeTab === 'curriculum' || activeTab === 'overview') && activeTab !== 'roadmap' && activeTab !== 'instructor' && (
            <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-space font-bold text-xl text-white">Course Video Lessons & Syllabus</h3>
                <span className="text-xs text-white/50">{totalLessons} Total Lessons</span>
              </div>

              <div className="flex flex-col gap-6">
                {course.modules?.map((mod, mIdx) => (
                  <div key={mod.id || mIdx} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3.5 glass rounded-2xl border border-white/10">
                      <span className="font-space font-bold text-sm text-purple-300">
                        {mod.title}
                      </span>
                      <span className="text-xs text-white/40">{mod.duration}</span>
                    </div>

                    <div className="flex flex-col gap-2 pl-2">
                      {mod.lessons?.map((les, lIdx) => (
                        <LessonCard key={les.id} lesson={les} index={lIdx} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ROADMAP TAB CONTENT */}
          {activeTab === 'roadmap' && (
            <LearningPath course={course} />
          )}

          {/* INSTRUCTOR TAB CONTENT */}
          {activeTab === 'instructor' && course.instructor && (
            <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col gap-6">
              <h3 className="font-space font-bold text-xl text-white">Meet Your Educator</h3>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 glass p-6 rounded-2xl border border-white/10">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-3xl object-cover border-2 border-purple-500/40"
                />
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h4 className="font-space font-bold text-lg text-white">{course.instructor.name}</h4>
                  <span className="text-xs text-purple-300 font-medium">{course.instructor.title}</span>
                  <p className="text-xs text-white/60 leading-relaxed mt-1">{course.instructor.bio}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-white/50">
                    <span>★ {course.instructor.rating} Rating</span>
                    <span>• {course.instructor.coursesCount} Courses</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Column: Sidebar Brief */}
        <div className="flex flex-col gap-6">

          {/* Summary Card */}
          <div className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-space font-bold text-lg text-white">Course Summary</h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isCourseComplete ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'}`}>
                {course.progress}% Done
              </span>
            </div>

            <div className="flex flex-col gap-3.5 text-xs text-white/70">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>Estimated Duration</span>
                <span className="font-bold text-white">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>Difficulty Level</span>
                <span className="font-bold text-purple-300">{course.difficulty}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>Total Video Lessons</span>
                <span className="font-bold text-white">{totalLessons} Lessons</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Videos Completed
                </span>
                <span className="font-bold text-emerald-400">{completedCount} of {totalLessons}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>Videos Remaining</span>
                <span className="font-bold text-amber-300">{totalLessons - completedCount} Lessons</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>Certificate Status</span>
                <span className={`font-bold ${isCourseComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isCourseComplete ? 'Unlocked ✓' : 'Requires 100%'}
                </span>
              </div>
            </div>

            {/* Video Intimation Message */}
            <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed border ${isCourseComplete ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' : 'bg-white/5 border-white/10 text-white/60'}`}>
              {isCourseComplete ? (
                <span>🎉 <strong>All videos completed!</strong> You are eligible to generate and claim your official certificate.</span>
              ) : (
                <span>ℹ️ <strong>Video Intimation:</strong> You have {totalLessons - completedCount} video lessons remaining. Watch and complete all videos to unlock your certificate.</span>
              )}
            </div>

            {/* Prerequisites */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-white/50 uppercase">Prerequisites</span>
              <ul className="flex flex-col gap-1.5 text-xs text-white/70">
                {course.prerequisites?.map((pre, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isCourseComplete ? (
              <button
                onClick={handleGenerateCertificate}
                disabled={isGeneratingCert}
                className="btn-primary text-xs w-full py-3 cursor-pointer shadow-[0_0_20px_rgba(147,51,234,0.4)]"
              >
                <span>{isGeneratingCert ? 'Generating Certificate...' : 'Claim Certificate 🎓'}</span>
              </button>
            ) : (
              <button
                onClick={handleStartOrContinue}
                className="btn-primary text-xs w-full py-3 cursor-pointer"
              >
                <span>{completedCount > 0 ? `Continue Course (${course.progress}%)` : 'Start Learning Now'}</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
