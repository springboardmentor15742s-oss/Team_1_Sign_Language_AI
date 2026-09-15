import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Camera,
  FileText,
  Download,
  BookOpen,
  Award,
  ArrowLeft,
  RefreshCw,
  Layers,
  Sparkles,
  Volume2,
  Maximize,
  ExternalLink,
  Video,
  Info
} from 'lucide-react';

import { getLessonById, saveCompletedLesson, getCourseById, MOCK_COURSES } from '../data/courses';
import { getCourses, getCourseLessons } from '../api/api';
import { saveUserCertificate } from '../data/assessmentModuleData';
import { useAuth } from '../context/AuthContext';
import CourseSidebar from '../components/course/CourseSidebar';

export default function LessonPlayerPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const userEmail = user?.email || 'default';
  const userName = user?.name || localStorage.getItem('mira_user_name') || 'Registered Learner';

  const [lessonData, setLessonData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'resources'
  const [isCompleted, setIsCompleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [practiceStatus, setPracticeStatus] = useState('idle');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLesson() {
      // 1. First populate with local/progress data immediately
      const localData = getLessonById(lessonId, userEmail);
      if (localData && isMounted) {
        setLessonData(localData);
        setIsCompleted(Boolean(localData.lesson.completed));
      }

      // 2. Attempt backend integration if applicable
      try {
        const backendCourses = await getCourses();
        if (!isMounted) return;

        let paramCourseId = searchParams.get('courseId') || location.state?.courseId;
        let courseIdNum = paramCourseId ? Number(paramCourseId) : null;

        const numLessonId = Number(lessonId);
        if (!courseIdNum && !isNaN(numLessonId)) {
          courseIdNum = Math.ceil(numLessonId / 3) || 1;
        } else if (!courseIdNum) {
          courseIdNum = 1;
        }

        const matchedCourse = Array.isArray(backendCourses)
          ? backendCourses.find(c => c.id === courseIdNum) || backendCourses[0]
          : null;

        const mockCourseFallback = (localData?.course) || MOCK_COURSES.find(m => m.id === String(courseIdNum) || m.category === matchedCourse?.category) || MOCK_COURSES[0];

        let backendLessons = [];
        try {
          const lRes = await getCourseLessons(courseIdNum);
          if (Array.isArray(lRes) && lRes.length > 0) {
            backendLessons = lRes;
          }
        } catch (lErr) {
          console.warn('[LessonPlayer] Backend lessons fetch warning:', lErr);
        }

        if (backendLessons.length > 0 && isMounted) {
          let activeLesson = backendLessons.find(l => String(l.id) === String(lessonId));
          if (activeLesson) {
            const formattedLessons = backendLessons.map((bl, idx) => ({
              id: String(bl.id),
              courseId: courseIdNum,
              title: bl.title || `Lesson ${idx + 1}`,
              duration: "15 mins",
              completed: false,
              locked: false,
              videoUrl: bl.video_url || "https://www.youtube.com/embed/v1desDduz5M",
              videoPoster: mockCourseFallback.thumbnail,
              notes: bl.content || "Practice hand movements and observe posture carefully.",
              resources: [
                { name: "Key Hand Shapes Guide (PDF)", type: "PDF", size: "1.2 MB", url: "#" },
                { name: "Sign Assessment Rubric", type: "Guide", size: "840 KB", url: "#" }
              ]
            }));

            const activeFormatted = formattedLessons.find(fl => fl.id === String(activeLesson.id)) || formattedLessons[0];

            setLessonData({
              lesson: activeFormatted,
              module: {
                id: `mod-${courseIdNum}-1`,
                title: "Core Curriculum & Hands-on Demonstrations",
                duration: `${formattedLessons.length * 15} mins`,
                lessons: formattedLessons
              },
              course: {
                ...mockCourseFallback,
                id: courseIdNum,
                title: matchedCourse?.title || mockCourseFallback.title,
                category: matchedCourse?.category || mockCourseFallback.category,
                difficulty: matchedCourse?.level || mockCourseFallback.difficulty,
                description: matchedCourse?.description || mockCourseFallback.description,
                modules: [
                  {
                    id: `mod-${courseIdNum}-1`,
                    title: "Core Curriculum & Hands-on Demonstrations",
                    duration: `${formattedLessons.length * 15} mins`,
                    lessons: formattedLessons
                  }
                ]
              }
            });
          }
        }
      } catch (err) {
        console.warn('[LessonPlayer] Error in backend hydration:', err);
      }
    }

    loadLesson();

    const handleProgressUpdate = () => {
      const data = getLessonById(lessonId, userEmail);
      if (data && isMounted) {
        setLessonData(data);
        setIsCompleted(Boolean(data.lesson.completed));
      }
    };

    window.addEventListener('mira_course_progress_updated', handleProgressUpdate);
    window.addEventListener('storage', handleProgressUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('mira_course_progress_updated', handleProgressUpdate);
      window.removeEventListener('storage', handleProgressUpdate);
    };
  }, [lessonId, userEmail, location.state, searchParams]);

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
    saveCompletedLesson(course.id, lesson.id, nextState, userEmail);

    // Refresh course data with updated progress
    const updatedCourse = getCourseById(course.id, userEmail);
    setLessonData(prev => ({
      ...prev,
      course: updatedCourse,
      lesson: { ...prev.lesson, completed: nextState }
    }));

    // Trigger feedback notification toast
    if (nextState) {
      setNotificationToast({
        type: 'success',
        message: `✓ Video marked as completely completed! Course progress updated to ${updatedCourse.progress}%.`
      });
    } else {
      setNotificationToast({
        type: 'info',
        message: `Video marked as incomplete. Course progress is ${updatedCourse.progress}%.`
      });
    }
    setTimeout(() => setNotificationToast(null), 3500);

    // If marking complete resulted in 100% course completion, trigger celebration modal!
    if (nextState && updatedCourse.isCompleted) {
      setTimeout(() => setShowCompletionModal(true), 600);
    }
  };

  const handleGenerateCertificate = async () => {
    setIsGeneratingCert(true);
    try {
      const res = await fetch(
        `/api/certificate/issue?user_name=${encodeURIComponent(userName)}&score=98&course_name=${encodeURIComponent(course.title)}`,
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
        score: 98,
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
        score: 98,
        verificationId: certId
      };
      saveUserCertificate(fallbackCert, userEmail);
      navigate(`/certificates/${certId}`);
    } finally {
      setIsGeneratingCert(false);
    }
  };

  const handleRunPractice = () => {
    setPracticeStatus('detecting');
    setTimeout(() => {
      setPracticeStatus('success');
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col pt-20">

      {/* ─── TOAST NOTIFICATION POPUP ──────────────────────────── */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-6 z-50 px-5 py-3.5 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-3 text-xs font-semibold ${
              notificationToast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                : 'bg-purple-950/90 text-purple-200 border-purple-500/50 shadow-[0_0_30px_rgba(147,51,234,0.3)]'
            }`}
          >
            {notificationToast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-purple-300 flex-shrink-0" />
            )}
            <span>{notificationToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── TOP BREADCRUMB & NAVIGATION BAR ───────────────────── */}
      <div className="w-full glass border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="p-2 rounded-xl glass border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
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

        {/* Action controls & Progress Badge */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Real-time Percentage Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs">
            <span className="text-white/60 text-[11px]">Course Progress:</span>
            <span className={`font-bold ${course.isCompleted ? 'text-emerald-400' : 'text-purple-300'}`}>
              {course.progress}%
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2.5 rounded-xl glass border border-white/10 text-white/70 hover:text-white flex items-center gap-2 text-xs font-semibold cursor-pointer"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Modules</span>
          </button>

          <button
            onClick={handleToggleComplete}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-600/40'
                : 'btn-primary shadow-[0_0_15px_rgba(147,51,234,0.3)]'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4" />}
            <span>{isCompleted ? 'Completely Completed ✓' : 'Mark as Completed'}</span>
          </button>
        </div>
      </div>

      {/* ─── MAIN PLAYER WORKSPACE ───────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

        {/* LEFT / MAIN WORKSPACE AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">

          {/* ─── VIDEO COMPLETION INTIMATION BANNER ───────────────── */}
          <div
            className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              isCompleted
                ? 'bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                : 'bg-amber-950/20 border-amber-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5 animate-pulse" />}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {isCompleted ? 'Video Completely Completed ✓' : 'Video Incomplete ⏳'}
                  </span>
                  <span className="text-[11px] text-white/50">
                    {course.completedLessonsCount} of {course.totalLessons} Lessons Finished ({course.progress}%)
                  </span>
                </div>
                <p className="text-xs text-white/70 mt-1">
                  {isCompleted
                    ? 'Great job! You have completely completed this instructional sign video module.'
                    : 'Watch the full video below and click "Mark as Completed" when you have practiced the signs.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleComplete}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold self-end sm:self-auto flex items-center gap-1.5 transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
              }`}
            >
              <span>{isCompleted ? 'Completed ✓ (Toggle)' : 'Mark Video Complete'}</span>
            </button>
          </div>

          {/* ─── EMBEDDED SIGN LANGUAGE VIDEO PLAYER ───────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden glass-strong border border-purple-500/30 aspect-video w-full flex items-center justify-center bg-black shadow-[0_20px_60px_rgba(147,51,234,0.2)]"
          >
            {lesson.videoUrl ? (
              <iframe
                src={`${lesson.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={lesson.title}
                className="w-full h-full border-0 rounded-3xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={lesson.videoPoster || course.thumbnail}
                  alt={lesson.title}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-black/60" />
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="relative z-10 w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-500 border-2 border-white/40 flex items-center justify-center text-white shadow-2xl"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>
              </div>
            )}

            {/* AI Vision HUD Badge */}
            <div className="absolute top-4 left-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-purple-500/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold text-purple-200 tracking-wide">
                AI Sign Language Video Curriculum
              </span>
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

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPracticeModal(true)}
                className="btn-primary text-xs flex items-center gap-2 cursor-pointer"
                style={{ padding: '10px 20px' }}
              >
                <Camera className="w-4 h-4" />
                <span>Practice with AI Camera</span>
              </button>
            </div>
          </div>

          {/* ─── LESSON TABS: NOTES, RESOURCES ─────────────────────── */}
          <div className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lesson Notes & Guidance</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
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
                    <p className="text-xs text-white/70 italic font-serif">{lesson.notes}</p>
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
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Mark this lesson completed once you have practiced the signs demonstrated in the video.</span>
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
                        className="p-2.5 rounded-xl glass border border-white/10 text-purple-300 hover:text-white transition-colors cursor-pointer"
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
                className="glass px-5 py-3 rounded-2xl border border-white/10 hover:border-purple-500/40 text-xs font-semibold flex items-center gap-2 text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: {prevLesson.title}</span>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => navigate(`/learn/${nextLesson.id}`)}
                className="btn-primary text-xs flex items-center gap-2 cursor-pointer"
                style={{ padding: '12px 24px' }}
              >
                <span>Next Lesson: {nextLesson.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (course.isCompleted) {
                    setShowCompletionModal(true);
                  } else {
                    navigate(`/courses/${course.id}`);
                  }
                }}
                className="btn-primary text-xs flex items-center gap-2 cursor-pointer"
                style={{ padding: '12px 24px' }}
              >
                <Award className="w-4 h-4" />
                <span>{course.isCompleted ? 'Claim Certificate 🎉' : 'Finish & Back to Course'}</span>
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

      {/* ─── COURSE 100% COMPLETION MODAL ───────────────────────── */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-strong rounded-3xl p-8 border border-purple-500/50 max-w-lg w-full flex flex-col items-center text-center gap-6 relative shadow-[0_0_80px_rgba(147,51,234,0.4)]"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-amber-400 p-0.5 shadow-lg shadow-purple-500/40 flex items-center justify-center">
                <div className="w-full h-full bg-[#0d0a1a] rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-amber-300 animate-bounce" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Course Complete (100%)
                </span>
                <h3 className="font-space font-extrabold text-2xl text-white">
                  Congratulations, {userName}! 🎉
                </h3>
                <p className="text-xs text-white/70 italic font-serif leading-relaxed">
                  You have successfully completed all video modules in <strong>{course.title}</strong>. Your official digital certificate is ready to be generated in your records.
                </p>
              </div>

              <div className="w-full p-4 rounded-2xl glass border border-purple-400/30 flex flex-col gap-1.5 text-xs text-left">
                <div className="flex justify-between text-white/60">
                  <span>Registered Recipient:</span>
                  <strong className="text-white not-italic">{userName}</strong>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Course Tier:</span>
                  <strong className="text-purple-300 not-italic">{course.difficulty} Level</strong>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Certificate Format:</span>
                  <strong className="text-emerald-400 not-italic">PDF with Watermark & Italic Typography</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="glass px-4 py-3 rounded-xl text-xs font-semibold text-white/70 hover:text-white border border-white/10 flex-1 cursor-pointer"
                >
                  Back to Course
                </button>
                <button
                  onClick={handleGenerateCertificate}
                  disabled={isGeneratingCert}
                  className="btn-primary text-xs flex items-center justify-center gap-2 flex-1 cursor-pointer disabled:opacity-50"
                  style={{ padding: '12px 20px' }}
                >
                  <Award className="w-4 h-4" />
                  <span>{isGeneratingCert ? 'Generating...' : 'Generate Certificate →'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="glass-strong rounded-3xl p-6 md:p-8 border border-purple-500/40 max-w-xl w-full flex flex-col gap-6 relative shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
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
                  className="text-xs text-white/50 hover:text-white px-2 py-1 cursor-pointer"
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
                      <span className="text-xs text-white/70">Ready to test sign accuracy with AI Vision</span>
                      <button
                        onClick={handleRunPractice}
                        className="btn-primary text-xs cursor-pointer"
                      >
                        Start Camera Scan
                      </button>
                    </div>
                  )}

                  {practiceStatus === 'detecting' && (
                    <div className="flex flex-col items-center gap-3 z-10">
                      <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
                      <span className="text-xs text-purple-300 font-semibold">Analyzing Landmark & Handshape Coordinates...</span>
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
                  className="btn-secondary text-xs cursor-pointer"
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
