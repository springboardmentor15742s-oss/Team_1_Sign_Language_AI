// ─── Notification Categories ─────────────────────────────────────────
export const NOTIFICATION_CATEGORIES = [
  { id: 'all', label: 'All', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { id: 'unread', label: 'Unread', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'read', label: 'Read', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'achievements', label: 'Achievements', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { id: 'assessments', label: 'Assessments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'practice', label: 'Practice', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  { id: 'certificates', label: 'Certificates', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { id: 'announcements', label: 'Announcements', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
];

// ─── Priority Config ──────────────────────────────────────────────────
export const PRIORITY_CONFIG = {
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', dot: 'bg-red-400' },
  high:     { label: 'High',     color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/30', dot: 'bg-orange-400' },
  medium:   { label: 'Medium',   color: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', dot: 'bg-yellow-400' },
  low:      { label: 'Low',      color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/30', dot: 'bg-blue-400' },
};

// ─── Category Type Icons & Colors ─────────────────────────────────────
export const CATEGORY_CONFIG = {
  achievements: { color: [245, 158, 11], icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  assessments:  { color: [59, 130, 246], icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  practice:     { color: [139, 92, 246], icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  certificates: { color: [16, 185, 129], icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  announcements:{ color: [236, 72, 153], icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
};

// ─── Notifications ────────────────────────────────────────────────────
export const notifications = [
  // TODAY
  {
    id: 1, group: 'today',
    title: 'Level 2 Assessment Due Tomorrow!',
    message: 'Your "ASL Intermediate Certification Exam" is scheduled for tomorrow at 10:00 AM. Make sure you\'re prepared.',
    category: 'assessments', priority: 'critical', isRead: false,
    time: '2 hours ago', timestamp: '10:00 AM',
    action: { label: 'View Assessment', href: '/assessments' },
  },
  {
    id: 2, group: 'today',
    title: 'Achievement Unlocked: Precision Master!',
    message: 'You earned the "Precision Master (Gold)" badge for achieving 94% accuracy in your last session.',
    category: 'achievements', priority: 'medium', isRead: false,
    time: '4 hours ago', timestamp: '08:15 AM',
    action: { label: 'View Badge', href: '/performance' },
  },
  {
    id: 3, group: 'today',
    title: 'Daily Practice Reminder',
    message: 'You haven\'t practiced today. Your 14-day streak is at risk! Complete at least 15 minutes.',
    category: 'practice', priority: 'high', isRead: false,
    time: '5 hours ago', timestamp: '07:30 AM',
    action: { label: 'Start Practice', href: '/gesture-recognition' },
  },
  {
    id: 4, group: 'today',
    title: 'New Course Available: Medical Sign Language',
    message: 'A new advanced course has been added to your learning path. Enroll now to get early access.',
    category: 'announcements', priority: 'low', isRead: true,
    time: '6 hours ago', timestamp: '06:00 AM',
    action: { label: 'Browse Courses', href: '/courses' },
  },

  // YESTERDAY
  {
    id: 5, group: 'yesterday',
    title: 'Certificate Issued: ASL Level 1',
    message: 'Congratulations! Your "ASL Foundation Certificate" has been issued and is ready for download.',
    category: 'certificates', priority: 'high', isRead: true,
    time: 'Yesterday, 3:00 PM', timestamp: 'Jul 27',
    action: { label: 'View Certificate', href: '/certificates' },
  },
  {
    id: 6, group: 'yesterday',
    title: 'Weekly Progress Report Ready',
    message: 'Your weekly performance summary is ready. You improved by +6.1% this week!',
    category: 'assessments', priority: 'medium', isRead: true,
    time: 'Yesterday, 11:00 AM', timestamp: 'Jul 27',
    action: { label: 'View Report', href: '/performance' },
  },
  {
    id: 7, group: 'yesterday',
    title: 'Practice Streak: 14 Days! 🔥',
    message: 'You\'ve maintained a 14-day consistent practice streak. Keep going — you\'re on fire!',
    category: 'achievements', priority: 'medium', isRead: true,
    time: 'Yesterday, 8:00 PM', timestamp: 'Jul 27',
    action: { label: 'View Streak', href: '/performance' },
  },

  // EARLIER
  {
    id: 8, group: 'earlier',
    title: 'Scheduled Maintenance — Jul 25 at 2 AM',
    message: 'The platform will undergo scheduled maintenance on Jul 25 between 2:00–4:00 AM IST.',
    category: 'announcements', priority: 'medium', isRead: true,
    time: 'Jul 24, 5:00 PM', timestamp: 'Jul 24',
    action: null,
  },
  {
    id: 9, group: 'earlier',
    title: 'Assessment Passed: Gesture Speed Test',
    message: 'You passed the Gesture Speed Test with a score of 88%. Well done!',
    category: 'assessments', priority: 'low', isRead: true,
    time: 'Jul 23, 2:30 PM', timestamp: 'Jul 23',
    action: { label: 'See Scores', href: '/assessments' },
  },
  {
    id: 10, group: 'earlier',
    title: 'New Feature: AI Confidence Tracking',
    message: 'We\'ve added real-time Confidence scoring to your performance dashboard.',
    category: 'announcements', priority: 'low', isRead: true,
    time: 'Jul 20, 10:00 AM', timestamp: 'Jul 20',
    action: { label: 'Explore', href: '/performance' },
  },
];

// ─── Notification Stats ───────────────────────────────────────────────
export const notificationStats = {
  total: notifications.length,
  unread: notifications.filter(n => !n.isRead).length,
  todayCount: notifications.filter(n => n.group === 'today').length,
  critical: notifications.filter(n => n.priority === 'critical').length,
};

// ─── Reminders ────────────────────────────────────────────────────────
export const reminders = [
  { id: 1, title: 'Morning Practice Session', time: '08:00 AM', duration: '20 mins', type: 'practice', day: 'today', color: [139, 92, 246], done: false },
  { id: 2, title: 'Level 2 Exam Prep', time: '10:00 AM', duration: '30 mins', type: 'assessments', day: 'today', color: [59, 130, 246], done: true },
  { id: 3, title: 'Facial Expressions Lesson', time: '03:00 PM', duration: '25 mins', type: 'practice', day: 'today', color: [236, 72, 153], done: false },
  { id: 4, title: 'Evening Review: ASL Numbers', time: '07:00 PM', duration: '15 mins', type: 'practice', day: 'today', color: [245, 158, 11], done: false },

  { id: 5, title: 'Level 2 Certification Exam', time: '10:00 AM', duration: '30 mins', type: 'assessments', day: 'tomorrow', color: [244, 63, 94], done: false },
  { id: 6, title: 'Hand Shape Drill Session', time: '04:00 PM', duration: '20 mins', type: 'practice', day: 'tomorrow', color: [139, 92, 246], done: false },

  { id: 7, title: 'Weekly Goal Check-In', time: '09:00 AM', duration: '10 mins', type: 'assessments', day: 'this-week', color: [16, 185, 129], done: false },
  { id: 8, title: 'Course Deadline: Medical ASL', time: '11:59 PM', duration: 'Deadline', type: 'practice', day: 'this-week', color: [245, 158, 11], done: false },
];

// ─── Weekly Calendar Grid ─────────────────────────────────────────────
export const weeklyCalendar = [
  { day: 'Mon', date: 28, hasReminder: true, isToday: false },
  { day: 'Tue', date: 29, hasReminder: true, isToday: true },
  { day: 'Wed', date: 30, hasReminder: true, isToday: false },
  { day: 'Thu', date: 31, hasReminder: false, isToday: false },
  { day: 'Fri', date: 1, hasReminder: true, isToday: false },
  { day: 'Sat', date: 2, hasReminder: false, isToday: false },
  { day: 'Sun', date: 3, hasReminder: false, isToday: false },
];

// ─── Announcements ────────────────────────────────────────────────────
export const announcements = [
  {
    id: 1, type: 'feature',
    title: 'New Feature: AI Confidence Tracking',
    summary: 'Real-time confidence scoring is now live in your Performance Dashboard.',
    date: 'Jul 28, 2026', priority: 'medium',
    color: [59, 130, 246],
  },
  {
    id: 2, type: 'course',
    title: 'New Course: Medical Sign Language',
    summary: 'A comprehensive course on medical terminology in ASL is now available.',
    date: 'Jul 27, 2026', priority: 'low',
    color: [16, 185, 129],
  },
  {
    id: 3, type: 'maintenance',
    title: 'Scheduled Maintenance Complete',
    summary: 'The scheduled maintenance on Jul 25 was completed successfully. All systems are operational.',
    date: 'Jul 25, 2026', priority: 'low',
    color: [245, 158, 11],
  },
  {
    id: 4, type: 'general',
    title: 'Platform Update v2.4.1',
    summary: 'Performance improvements and bug fixes. Check release notes for details.',
    date: 'Jul 20, 2026', priority: 'low',
    color: [139, 92, 246],
  },
];
