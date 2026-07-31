import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './index.css';

// Shared layout components
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

// Components & Pages
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import LearnerDashboard from './pages/LearnerDashboard';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';

// Module 11: Dashboards
import InstructorDashboard from './pages/InstructorDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Module 3: Course Management Pages
import CourseCatalogPage from './pages/CourseCatalogPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import LessonPlayerPage from './pages/LessonPlayerPage';

// Module 4: Gesture Recognition Engine
import GestureRecognitionPage from './pages/GestureRecognitionPage';

// Module 6: Sign Accuracy Assessment Engine
import AssessmentPage from './pages/AssessmentPage';
import AccuracyDashboardPage from './pages/accuracy/AccuracyDashboardPage';
import AccuracyHistoryPage from './pages/accuracy/AccuracyHistoryPage';
import AccuracyReportDetailsPage from './pages/accuracy/AccuracyReportDetailsPage';

// Module 7: AI Feedback & Correction Engine
import FeedbackPage from './pages/FeedbackPage';

// Module 5: Pose & Hand Tracking Engine
import HandTrackingPage from './pages/tracking/HandTrackingPage';
import PoseTrackingPage from './pages/tracking/PoseTrackingPage';
import TrackingHistoryPage from './pages/tracking/TrackingHistoryPage';

// Module 8: Learning Progress Intelligence Engine
import LearningIntelligencePage from './pages/LearningIntelligencePage';

// Module 9: Assessment & Certification Module
import AssessmentDashboardPage from './pages/certification/AssessmentDashboardPage';
import AssessmentDetailsPage from './pages/certification/AssessmentDetailsPage';
import CertificationDashboardPage from './pages/certification/CertificationDashboardPage';
import CertificatePreviewPage from './pages/certification/CertificatePreviewPage';

// Module 10: Performance Scoring Engine
import PerformancePage from './pages/PerformancePage';

// Module 12: Notification & Reminder System
import NotificationPage from './pages/NotificationPage';
import ReminderPage from './pages/ReminderPage';

// Module 13: Reports & Export System
import ReportsPage from './pages/ReportsPage';
import ReportDetailsPage from './pages/ReportDetailsPage';
import LearningReportPage from './pages/reports/LearningReportPage';
import AssessmentReportPage from './pages/reports/AssessmentReportPage';
import PerformanceReportPage from './pages/reports/PerformanceReportPage';
import ProgressReportPage from './pages/reports/ProgressReportPage';
import CertificateReportPage from './pages/reports/CertificateReportPage';

/* ─── Landing Page ─────────────────────────────────────────── */
function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}

/* ─── Unauthorized Access Page ─────────────────────────────── */
function UnauthorizedPage() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-4">
      <div className="relative z-10 max-w-xl mx-auto w-full text-center">
        <div className="glass-strong rounded-3xl p-10 md:p-12 flex flex-col items-center gap-5"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #ef4444, #f59e0b)', boxShadow: '0 0 40px rgba(239,68,68,0.4)' }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase"
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: 'rgba(239,68,68,0.9)' }}
          >
            Access Denied
          </span>
          <h1 className="text-3xl font-space font-bold text-white leading-tight">
            Unauthorized Access
          </h1>
          <p className="text-sm text-white/50 leading-relaxed">
            Your account role does not have permission to access this page.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a href="/select-role" className="btn-primary text-sm" style={{ padding: '10px 24px' }}>
              Switch Role
            </a>
            <a href="/login" className="btn-secondary text-sm" style={{ padding: '10px 24px' }}>
              Re-login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Dashboard Placeholder ────────────────────────────────── */
function DashboardPlaceholder({ title, description, roleBadge }) {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-4">
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <div className="glass-strong rounded-3xl p-10 md:p-14 flex flex-col items-center gap-6"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase"
            style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: 'rgba(168,85,247,0.9)' }}
          >
            {roleBadge} Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-space font-bold text-white leading-tight">
            {title}
          </h1>
          <p className="text-sm text-white/50 max-w-md leading-relaxed">
            {description}
          </p>
          <a href="/select-role" className="btn-secondary text-sm mt-2">
            ← Switch Role
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Animated Routes wrapper (needs to be inside Router) ──── */
function AnimatedRoutes() {
  const location = useLocation();

  // These routes get the sidebar-layout chrome (no shared Footer)
  const isDashboardRoute = [
    '/dashboard',
    '/instructor-dashboard',
    '/trainer-dashboard',
    '/admin-dashboard',
    '/profile',
    '/edit-profile',
    '/assessments',
    '/certificates',
    '/performance',
    '/notifications',
    '/reminders',
    '/reports',
    '/accuracy',
  ].some(p => location.pathname.startsWith(p));

  if (isDashboardRoute) {
    return (
      <div className="relative min-h-screen" style={{ backgroundColor: '#050505' }}>
        <ParticleBackground />
        <div className="fixed inset-0 pointer-events-none z-[1] opacity-30 noise-overlay" />
        <div className="relative z-10">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Learner']}>
                    <LearnerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accuracy"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <AccuracyDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accuracy/history"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <AccuracyHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accuracy/report/:reportId"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <AccuracyReportDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/performance"
                element={
                  <ProtectedRoute allowedRoles={['Learner']}>
                    <PerformancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <NotificationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reminders"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <ReminderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/edit"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <EditProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <EditProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/instructor-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Instructor']}>
                    <InstructorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Accessibility Trainer']}>
                    <TrainerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Administrator']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <AssessmentDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/:assessmentId"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <AssessmentDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/certificates"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <CertificationDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/certificates/:certificateId"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <CertificatePreviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <ReportsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/learning"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <LearningReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/assessment"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <AssessmentReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/performance"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <PerformanceReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/progress"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <ProgressReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/certificates"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <CertificateReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/:reportId"
                element={
                  <ProtectedRoute allowedRoles={['Learner', 'Instructor', 'Accessibility Trainer', 'Administrator']}>
                    <ReportDetailsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    // Shared chrome: background + navbar + footer wrap all non-dashboard pages
    <div className="relative min-h-screen" style={{ backgroundColor: '#050505' }}>
      {/* Neural network particle canvas — shared, never unmounts */}
      <ParticleBackground />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-30 noise-overlay" />

      {/* Shared navbar — always visible */}
      <div className="relative z-10">
        <Navbar />

        {/* Page content transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<CourseCatalogPage />} />
            <Route path="/courses/:id" element={<CourseDetailsPage />} />
            <Route path="/learn/:lessonId" element={<LessonPlayerPage />} />
            <Route path="/gesture-recognition" element={<GestureRecognitionPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/tracking/hand" element={<HandTrackingPage />} />
            <Route path="/tracking/pose" element={<PoseTrackingPage />} />
            <Route path="/tracking/history" element={<TrackingHistoryPage />} />
            <Route path="/learning-intelligence" element={<LearningIntelligencePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/select-role" element={<RoleSelectionPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </AnimatePresence>

        {/* Shared footer — always visible */}
        <Footer />
      </div>
    </div>
  );
}

// Context
import { AuthProvider } from './context/AuthContext';

/* ─── Root App ─────────────────────────────────────────────── */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

