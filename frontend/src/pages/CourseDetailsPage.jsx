import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ChevronRight
} from 'lucide-react';

import { getCourseById } from '../data/courses';
import LearningPath from '../components/course/LearningPath';
import LessonCard from '../components/course/LessonCard';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const foundCourse = getCourseById(id);
    if (foundCourse) {
      setCourse(foundCourse);
      setIsEnrolled(foundCourse.progress > 0);
    }
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        <p>Loading course details...</p>
      </div>
    );
  }

  // Get total lessons count
  const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id || 'les-101-1';

  const handleEnrollOrStart = () => {
    setIsEnrolled(true);
    navigate(`/learn/${firstLessonId}`);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white mb-6 glass px-4 py-2 rounded-full border border-white/10 w-fit transition-colors"
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
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>{totalLessons} Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certificate Included</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-3 rounded-2xl glass border transition-colors ${
                isBookmarked ? 'text-amber-400 border-amber-400/40 bg-amber-500/10' : 'text-white/60 border-white/10 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={handleEnrollOrStart}
              className="btn-primary text-sm flex items-center justify-center gap-2 flex-1 md:flex-none"
              style={{ padding: '12px 32px' }}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isEnrolled ? 'Continue Course' : 'Enroll Now Free'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar Header if Enrolled */}
        {course.progress > 0 && (
          <div className="px-6 md:px-8 py-3 bg-purple-900/20 border-t border-purple-500/20 flex items-center justify-between gap-4">
            <span className="text-xs text-purple-300 font-semibold">Your Learning Progress</span>
            <div className="flex items-center gap-3 flex-1 max-w-xs">
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
              <span className="text-xs font-bold text-white">{course.progress}%</span>
            </div>
          </div>
        )}
      </motion.div>

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
                <h3 className="font-space font-bold text-xl text-white">Course Syllabus</h3>
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

          {/* Enrollment Card */}
          <div className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-6 sticky top-28">
            <h3 className="font-space font-bold text-lg text-white">Course Summary</h3>

            <div className="flex flex-col gap-4 text-xs text-white/70">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span>Estimated Duration</span>
                <span className="font-bold text-white">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span>Difficulty Level</span>
                <span className="font-bold text-purple-300">{course.difficulty}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span>Total Modules</span>
                <span className="font-bold text-white">{course.modules?.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span>Total Lessons</span>
                <span className="font-bold text-white">{totalLessons}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span>Access</span>
                <span className="font-bold text-emerald-400">Full Lifetime Access</span>
              </div>
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

            <button
              onClick={handleEnrollOrStart}
              className="btn-primary text-xs w-full py-3"
            >
              <span>{isEnrolled ? 'Resume Learning' : 'Start Learning Now'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
