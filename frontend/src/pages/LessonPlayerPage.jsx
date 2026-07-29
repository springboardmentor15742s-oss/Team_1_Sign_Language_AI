import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Camera,
  FileText,
  Download,
  BookOpen,
  Settings,
  Maximize,
  Volume2,
  Sparkles,
  Layers,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

import { getLessonById, MOCK_COURSES } from '../data/courses';
import CourseSidebar from '../components/course/CourseSidebar';

export default function LessonPlayerPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lessonData, setLessonData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'resources' | 'practice'
  const [isCompleted, setIsCompleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [practiceStatus, setPracticeStatus] = useState('idle'); // 'idle' | 'detecting' | 'success'

  useEffect(() => {
    const data = getLessonById(lessonId);
    if (data) {
      setLessonData(data);
      setIsCompleted(!!data.lesson.completed);
    }
  }, [lessonId]);

  if (!lessonData || !lessonData.lesson) {
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        <p>Loading lesson contents...</p>
      </div>
    );
  }

  const { lesson, module: currentModule, course } = lessonData;

  // Flatten all lessons across modules to find prev / next
  const allLessons = [];
  course.modules?.forEach((m) => {
    m.lessons?.forEach((l) => {
      allLessons.push(l);
    });
  });

  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    lesson.completed = nextState;
  };

  const handleRunPractice = () => {
    setPracticeStatus('detecting');
    setTimeout(() => {
      setPracticeStatus('success');
    }, 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col pt-20">

      {/* ─── TOP BREADCRUMB & NAVIGATION BAR ───────────────────── */}
      <div className="w-full glass border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="p-2 rounded-xl glass border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-colors flex-shrink-0"
            title="Back to Course Details"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-white/50 truncate">
            <Link to="/courses" className="hover:text-white transition-colors hidden sm:inline">
              Courses
            </Link>
            <span className="hidden sm:inline">/</span>
            <Link to={`/courses/${course.id}`} className="hover:text-white transition-colors truncate">
              {course.title}
            </Link>
            <span>/</span>
            <span className="text-purple-300 font-semibold truncate">{lesson.title}</span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2.5 rounded-xl glass border border-white/10 text-white/70 hover:text-white flex items-center gap-2 text-xs font-semibold"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Modules</span>
          </button>

          <button
            onClick={handleToggleComplete}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
              isCompleted
                ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                : 'btn-primary'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isCompleted ? 'Lesson Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* ─── MAIN PLAYER WORKSPACE ───────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

        {/* LEFT / MAIN WORKSPACE AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">

          {/* ─── VIDEO PLAYER PLACEHOLDER ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden glass-strong border border-white/10 aspect-video w-full flex items-center justify-center group"
            style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
          >
            {/* Background Video Poster Image */}
            <img
              src={lesson.videoPoster || course.thumbnail}
              alt={lesson.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* AI Gesture Tracking Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 border-2 border-purple-500/30 rounded-3xl m-4 flex items-center justify-center">
              <div className="w-48 h-48 border border-dashed border-purple-400/50 rounded-full animate-ping opacity-25" />
            </div>

            {/* Center Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative z-10 w-20 h-20 rounded-full bg-purple-600/80 hover:bg-purple-500 border-2 border-white/40 flex items-center justify-center text-white shadow-2xl shadow-purple-900/60 transform group-hover:scale-110 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-white" />
              ) : (
                <Play className="w-8 h-8 fill-white ml-1" />
              )}
            </button>

            {/* Video Controls Bottom Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-3 z-10">
              <div className="w-full bg-white/20 h-1.5 rounded-full cursor-pointer relative overflow-hidden">
                <div className="bg-purple-500 h-full w-2/5 rounded-full" />
              </div>

              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <Volume2 className="w-4 h-4 text-white/60" />
                  <span>02:45 / {lesson.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/30 border border-purple-400/40 text-purple-200">
                    AI Gesture Overlay Active
                  </span>
                  <Settings className="w-4 h-4 text-white/60 cursor-pointer hover:text-white" />
                  <Maximize className="w-4 h-4 text-white/60 cursor-pointer hover:text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── LESSON HEADER & PRACTICE ACTION ROW ───────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-strong p-6 rounded-3xl border border-white/10">
            <div>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                {currentModule?.title}
              </span>
              <h1 className="font-space font-bold text-xl md:text-2xl text-white mt-1">
                {lesson.title}
              </h1>
            </div>

            <button
              onClick={() => setShowPracticeModal(true)}
              className="btn-primary text-xs flex items-center gap-2"
              style={{ padding: '10px 24px' }}
            >
              <Camera className="w-4 h-4" />
              <span>Practice Gestures with AI</span>
            </button>
          </div>

          {/* ─── LESSON TABS: NOTES, RESOURCES, PRACTICE ───────────── */}
          <div className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'notes'
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lesson Notes & Tips</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'resources'
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resources ({lesson.resources?.length || 0})</span>
              </button>
            </div>

            {/* TAB CONTENT: NOTES */}
            {activeTab === 'notes' && (
              <div className="flex flex-col gap-4 text-sm text-white/80 leading-relaxed font-sans">
                <div className="p-4 rounded-2xl glass border border-purple-500/30 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-space font-bold text-white text-xs uppercase tracking-wider mb-1">
                      Key Gesture Focus
                    </h4>
                    <p className="text-xs text-white/70">{lesson.notes}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-space font-bold text-white text-sm">Instructor Tips & Best Practices</h4>
                  <ul className="flex flex-col gap-2 text-xs text-white/70">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>Ensure your lighting is even and your camera frames your face and upper torso clearly.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>Maintain steady non-manual markers (facial expressions) while producing signs.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="flex flex-col gap-3">
                {lesson.resources && lesson.resources.length > 0 ? (
                  lesson.resources.map((res, i) => (
                    <div
                      key={i}
                      className="glass p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-white">{res.name}</span>
                          <span className="text-[10px] text-white/40">{res.type} · {res.size}</span>
                        </div>
                      </div>

                      <a
                        href={res.url}
                        download
                        className="p-2.5 rounded-xl glass border border-white/10 text-purple-300 hover:text-white transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-white/40">No supplementary downloads for this lesson.</p>
                )}
              </div>
            )}
          </div>

          {/* ─── NEXT & PREVIOUS LESSON NAVIGATION FOOTER ────────── */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
            {prevLesson ? (
              <button
                onClick={() => navigate(`/learn/${prevLesson.id}`)}
                className="glass px-5 py-3 rounded-2xl border border-white/10 hover:border-purple-500/40 text-xs font-semibold flex items-center gap-2 text-white/80 hover:text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: {prevLesson.title}</span>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => navigate(`/learn/${nextLesson.id}`)}
                className="btn-primary text-xs flex items-center gap-2"
                style={{ padding: '12px 24px' }}
              >
                <span>Next: {nextLesson.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                className="btn-primary text-xs flex items-center gap-2"
              >
                <span>Finish Module & Back to Course</span>
              </button>
            )}
          </div>

        </div>

        {/* RIGHT SIDEBAR MODULE SYLLABUS TREE (DESKTOP) */}
        <CourseSidebar
          course={course}
          activeLessonId={lesson.id}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* ─── AI GESTURE PRACTICE INTERACTIVE MODAL ───────────────── */}
      <AnimatePresence>
        {showPracticeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-strong rounded-3xl p-6 md:p-8 border border-purple-500/40 max-w-xl w-full flex flex-col gap-6 relative"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-400" />
                  <h3 className="font-space font-bold text-lg text-white">AI Gesture Practice Drill</h3>
                </div>
                <button
                  onClick={() => {
                    setShowPracticeModal(false);
                    setPracticeStatus('idle');
                  }}
                  className="text-xs text-white/50 hover:text-white px-2 py-1"
                >
                  ✕ Close
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs text-white/70">
                  <strong>Task Prompt:</strong> {lesson.practicePrompt || 'Perform the requested sign in front of the camera.'}
                </p>

                {/* Simulated Webcam Vision Window */}
                <div className="relative h-64 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/20 opacity-60" />
                  <div className="absolute inset-4 border border-dashed border-purple-400/40 rounded-xl pointer-events-none flex items-center justify-center">
                    <span className="text-[10px] text-purple-300/60 uppercase tracking-widest">Hand Alignment Zone</span>
                  </div>

                  {practiceStatus === 'idle' && (
                    <div className="flex flex-col items-center gap-3 z-10 text-center px-4">
                      <Camera className="w-10 h-10 text-purple-400 animate-pulse" />
                      <span className="text-xs text-white/70">Ready to start AI gesture detection</span>
                      <button
                        onClick={handleRunPractice}
                        className="btn-primary text-xs"
                      >
                        Start Camera Scan
                      </button>
                    </div>
                  )}

                  {practiceStatus === 'detecting' && (
                    <div className="flex flex-col items-center gap-3 z-10">
                      <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
                      <span className="text-xs text-purple-300 font-semibold">Sign Language AI Vision Engine Analyzing Sign...</span>
                    </div>
                  )}

                  {practiceStatus === 'success' && (
                    <div className="flex flex-col items-center gap-3 z-10 text-center p-4">
                      <CheckCircle className="w-12 h-12 text-emerald-400" />
                      <span className="text-base font-bold text-white">98.4% Match Accuracy!</span>
                      <span className="text-xs text-emerald-300">Perfect Handshape & Landmark Alignment</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowPracticeModal(false);
                    setPracticeStatus('idle');
                  }}
                  className="btn-secondary text-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
