// src/data/reportData.js
// Mock Data for Module 13: Reports & Export System

export const REPORT_CATEGORIES = [
  { id: 'all',          label: 'All Reports',   count: 6, icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'learning',     label: 'Learning',      count: 2, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'assessment',   label: 'Assessment',    count: 1, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'performance',  label: 'Performance',   count: 1, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { id: 'progress',     label: 'Progress',      count: 1, icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  { id: 'certificates', label: 'Certificates',  count: 1, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z' },
];

export const STATUS_CONFIG = {
  generated: { label: 'Generated', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/25' },
  pending:   { label: 'Pending',   color: 'text-amber-400',   bg: 'bg-amber-500/15',   border: 'border-amber-500/25' },
  archived:  { label: 'Archived',  color: 'text-white/40',    bg: 'bg-white/5',         border: 'border-white/10' },
};

export const REPORT_STATISTICS = {
  totalReports: 24,
  generatedThisMonth: 8,
  totalExports: 14,
  avgAccuracy: '94.2%',
  activeCertificates: 3,
  practiceHours: '48.5 hrs',
};

// ─── 1. LEARNING REPORT DATA ──────────────────────────────────────────
export const LEARNING_REPORT_DATA = {
  title: 'Learning Activity & Mastery Report',
  summary: 'Comprehensive analysis of course completion, daily learning habits, and skill mastery milestones across all modules.',
  courseCompletion: '68% (5 of 7 Courses Finished)',
  lessonsCompleted: '48 / 72 Lessons',
  practiceHours: '24.5 hrs total',
  currentLevel: 'Level 2 · Intermediate ASL',
  learningStreak: '14 Days 🔥',
  skillMastery: '88% Average Mastery',
  weeklyLearning: [
    { day: 'Mon', hrs: 1.8, lessons: 3 },
    { day: 'Tue', hrs: 2.2, lessons: 4 },
    { day: 'Wed', hrs: 1.5, lessons: 2 },
    { day: 'Thu', hrs: 2.8, lessons: 5 },
    { day: 'Fri', hrs: 2.0, lessons: 3 },
    { day: 'Sat', hrs: 3.2, lessons: 6 },
    { day: 'Sun', hrs: 1.0, lessons: 1 },
  ],
  skillsBreakdown: [
    { skill: 'Alphabet & Numbers', mastery: 95, status: 'Mastered' },
    { skill: 'Greetings & Phrasals', mastery: 92, status: 'Mastered' },
    { skill: 'Emergency & Health Signs', mastery: 84, status: 'Proficient' },
    { skill: 'Facial Expressions & Non-Manuals', mastery: 78, status: 'Developing' },
  ],
  recommendations: [
    'Sustain current 14-day streak to unlock Advanced Conversational Certificate.',
    'Focus on Facial Expressions module to raise overall mastery above 90%.',
    'Review Emergency Signs twice a week to maintain rapid recall.',
  ],
};

// ─── 2. ASSESSMENT REPORT DATA ───────────────────────────────────────
export const ASSESSMENT_REPORT_DATA = {
  title: 'Assessment & Certification Test Analytics',
  summary: 'Detailed metrics covering exam passage rates, historical score distribution, and evaluation performance.',
  assessmentsTaken: 12,
  averageScore: '92.4%',
  highestScore: '98.5%',
  lowestScore: '85.0%',
  passRate: '100% (12/12 Passed)',
  recentAssessments: [
    { title: 'Level 2 ASL Certification Exam', score: '96.5%', grade: 'A+', date: 'Jul 28, 2026', status: 'Passed' },
    { title: 'Emergency Signs Speed Drill', score: '91.8%', grade: 'A-', date: 'Jul 24, 2026', status: 'Passed' },
    { title: 'Alphabet Keypoint Precision Test', score: '98.5%', grade: 'A+', date: 'Jul 20, 2026', status: 'Passed' },
    { title: 'Conversational ASL Evaluation', score: '88.0%', grade: 'B+', date: 'Jul 15, 2026', status: 'Passed' },
  ],
  performanceTrend: [
    { exam: 'Test 1', score: 85 },
    { exam: 'Test 2', score: 88 },
    { exam: 'Test 3', score: 90 },
    { exam: 'Test 4', score: 92 },
    { exam: 'Test 5', score: 96 },
    { exam: 'Test 6', score: 98 },
  ],
  recommendations: [
    'You are ready to attempt the Level 3 Master ASL Exam.',
    'Maintain response speed under 3 seconds per gesture.',
  ],
};

// ─── 3. PERFORMANCE REPORT DATA ──────────────────────────────────────
export const PERFORMANCE_REPORT_DATA = {
  title: 'Multi-Weighted Performance Scoring Report',
  summary: 'Weighted algorithmic evaluation combining gesture accuracy, practice consistency, exam scores, and skill progression.',
  overallScore: '94.2 / 100',
  performanceGrade: 'A',
  weeklyPerformance: '96.5% (+2.4% vs last week)',
  monthlyPerformance: '92.8% Average',
  gestureAccuracy: '95.1%',
  practiceConsistency: '98.0%',
  skillGrowth: '+12.5% Month-over-Month',
  leaderboardPosition: '#4 Global Rank',
  weeklyTrend: [
    { week: 'Wk 1', score: 88 },
    { week: 'Wk 2', score: 90 },
    { week: 'Wk 3', score: 92 },
    { week: 'Wk 4', score: 94 },
    { week: 'Wk 5', score: 96.5 },
  ],
  weightedComponents: [
    { name: 'Gesture Accuracy', score: 95.1, weight: '30%' },
    { name: 'Practice Consistency', score: 98.0, weight: '25%' },
    { name: 'Assessment Pass Rate', score: 96.5, weight: '20%' },
    { name: 'Skill Growth Rate', score: 90.0, weight: '15%' },
    { name: 'Community Engagement', score: 85.0, weight: '10%' },
  ],
};

// ─── 4. PROGRESS REPORT DATA ─────────────────────────────────────────
export const PROGRESS_REPORT_DATA = {
  title: 'Curriculum & Mastery Progress Report',
  summary: 'Milestone tracking detailing completed skills, upcoming modules, and estimated completion timeline.',
  overallProgress: 76, // Percentage
  completedSkills: 38,
  remainingSkills: 12,
  estimatedCompletion: '3 Weeks (Aug 20, 2026)',
  weeklyImprovement: '+4.2% Growth Rate',
  learningTimeline: [
    { date: 'Jun 1, 2026', milestone: 'Started Beginner ASL Foundations', status: 'Completed' },
    { date: 'Jun 20, 2026', milestone: 'Earned Level 1 ASL Certificate', status: 'Completed' },
    { date: 'Jul 15, 2026', milestone: 'Passed Intermediate Medical Signs', status: 'Completed' },
    { date: 'Jul 28, 2026', milestone: 'Achieved 95%+ Gesture Accuracy Threshold', status: 'Completed' },
    { date: 'Aug 15, 2026', milestone: 'Level 3 Advanced ASL Final Exam', status: 'Upcoming' },
  ],
};

// ─── 5. CERTIFICATE REPORT DATA ──────────────────────────────────────
export const CERTIFICATE_REPORT_DATA = {
  title: 'Official Certification & Credential Report',
  summary: 'Audit log of earned digital certificates, verified credentials, and issuing authority status.',
  certificatesEarned: 3,
  certificationLevels: 'Level 1, Level 2, Emergency Signs Specialist',
  completionStatus: '100% Verified on Blockchain Registry',
  certificatesList: [
    {
      id: 'CERT-101',
      title: 'Level 1: ASL Fundamentals & Alphabet',
      issuedDate: 'Jun 20, 2026',
      credentialId: 'MIRA-ASL-2026-001',
      status: 'Verified',
      downloadStatus: 'Ready (PDF)',
      color: [168, 85, 247],
    },
    {
      id: 'CERT-102',
      title: 'Level 2: Conversational ASL & Grammar',
      issuedDate: 'Jul 10, 2026',
      credentialId: 'MIRA-ASL-2026-042',
      status: 'Verified',
      downloadStatus: 'Ready (PDF)',
      color: [59, 130, 246],
    },
    {
      id: 'CERT-103',
      title: 'Specialist: Emergency & Healthcare Signing',
      issuedDate: 'Jul 25, 2026',
      credentialId: 'MIRA-ASL-2026-089',
      status: 'Verified',
      downloadStatus: 'Ready (PDF)',
      color: [34, 197, 94],
    },
  ],
};

export const ACHIEVEMENTS_DATA = [
  { id: 'ach-1', title: '14-Day Streak Master', icon: '🔥', date: 'Jul 28, 2026', desc: 'Practiced 14 consecutive days without missing.' },
  { id: 'ach-2', title: 'Speed Demon', icon: '⚡', date: 'Jul 25, 2026', desc: 'Recognized 20 gestures in under 30 seconds.' },
  { id: 'ach-3', title: '98%+ Accuracy Club', icon: '🎯', date: 'Jul 20, 2026', desc: 'Achieved 98%+ AI vision accuracy on exam.' },
  { id: 'ach-4', title: 'Top 5 Learner', icon: '🏆', date: 'Jul 15, 2026', desc: 'Ranked in top 5 on global learning leaderboard.' },
];

export const RECENT_REPORTS_LIST = [
  { id: 'RPT-001', title: 'Monthly Learning Progress — July 2026', type: 'Learning', status: 'generated', date: 'Jul 28, 2026', category: 'learning' },
  { id: 'RPT-002', title: 'Level 2 Assessment Summary', type: 'Assessment', status: 'generated', date: 'Jul 25, 2026', category: 'assessment' },
  { id: 'RPT-003', title: 'Weekly Performance Scoring Log', type: 'Performance', status: 'generated', date: 'Jul 22, 2026', category: 'performance' },
  { id: 'RPT-004', title: 'Curriculum Mastery & Progress', type: 'Progress', status: 'generated', date: 'Jul 18, 2026', category: 'progress' },
  { id: 'RPT-005', title: 'Digital Certificates Audit Report', type: 'Certificates', status: 'generated', date: 'Jul 15, 2026', category: 'certificates' },
];

export const EXPORT_FORMATS = [
  { id: 'pdf', label: 'Export PDF', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z', ext: '.pdf', color: [168, 85, 247] },
  { id: 'excel', label: 'Export Excel', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', ext: '.xlsx', color: [34, 197, 94] },
  { id: 'csv', label: 'Export CSV', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', ext: '.csv', color: [59, 130, 246] },
  { id: 'print', label: 'Print Report', icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z', ext: null, color: [245, 158, 11] },
];

export const EXPORT_HISTORY = [
  { id: 'EXP-101', format: 'PDF Document', reportName: 'Monthly Learning Progress', timestamp: 'Jul 28, 2026 · 14:20', size: '2.4 MB' },
  { id: 'EXP-102', format: 'Excel Spreadsheet', reportName: 'Assessment Scores Export', timestamp: 'Jul 25, 2026 · 09:15', size: '850 KB' },
  { id: 'EXP-103', format: 'PDF Document', reportName: 'Certificate Verification Audit', timestamp: 'Jul 20, 2026 · 16:45', size: '1.8 MB' },
];

export const exportHistory = EXPORT_HISTORY;

export const reports = RECENT_REPORTS_LIST;
export const reportStats = REPORT_STATISTICS;
export const analyticsData = {
  weeklyProgress: [72, 75, 79, 82, 87],
  monthlyProgress: [70, 74, 78, 80, 82, 85, 87, 88],
  gestureAccuracyTrend: [92, 94, 91, 95, 96],
  assessmentTrend: [85, 88, 92, 96, 98],
  practiceConsistency: [1.8, 2.2, 1.5, 2.8, 2.0, 3.2, 1.0],
};
