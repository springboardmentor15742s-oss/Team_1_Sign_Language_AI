// src/data/intelligenceData.js
// Mock data for Module 8: Learning Progress Intelligence Engine

export const LEARNING_OVERVIEW = {
  level: 'Level 3 · Intermediate',
  overallProgress: 72.4,
  skillMastery: 84.8,
  weeklyImprovement: '+14.2%',
  learningStreak: 18,
  estimatedCompletion: '3 Weeks',
  totalHoursPracticed: 34.5,
  gesturesLearned: 142,
};

export const WEAK_AREAS = [
  {
    id: 1,
    title: 'Hand Shape Clarity',
    metric: 'Finger Position Accuracy',
    accuracy: 64.2,
    improvement: '+5.1%',
    severity: 'High',
    color: [239, 68, 68],
    recommendation: 'Practice 10-min daily thumb and pinky isolation drills.',
    icon: '✋',
  },
  {
    id: 2,
    title: 'Wrist Rotation Angle',
    metric: 'Position Accuracy',
    accuracy: 71.8,
    improvement: '+8.4%',
    severity: 'Medium',
    color: [245, 158, 11],
    recommendation: 'Review Module 2 rotation video at 0.5x speed.',
    icon: '🔄',
  },
  {
    id: 3,
    title: 'Motion Trajectory Arc',
    metric: 'Motion Path Accuracy',
    accuracy: 78.5,
    improvement: '+12.0%',
    severity: 'Medium',
    color: [59, 130, 246],
    recommendation: 'Perform sweeping motion exercises in front of mirror.',
    icon: '📈',
  },
  {
    id: 4,
    title: 'Gesture Hold Timing',
    metric: 'Timing Accuracy',
    accuracy: 82.1,
    improvement: '+4.2%',
    severity: 'Low',
    color: [168, 85, 247],
    recommendation: 'Use built-in metronome feature during practice drills.',
    icon: '⏱️',
  },
];

export const SKILL_CATEGORIES = [
  {
    id: 1,
    category: 'Alphabet & Fingerspelling',
    completion: 96,
    mastery: 98,
    currentLevel: 'Advanced',
    color: [34, 197, 94],
    icon: '🔤',
    totalSigns: 26,
    masteredSigns: 25,
  },
  {
    id: 2,
    category: 'Numbers & Quantities',
    completion: 90,
    mastery: 92,
    currentLevel: 'Advanced',
    color: [59, 130, 246],
    icon: '🔢',
    totalSigns: 20,
    masteredSigns: 18,
  },
  {
    id: 3,
    category: 'Greetings & Introductions',
    completion: 85,
    mastery: 88,
    currentLevel: 'Intermediate',
    color: [168, 85, 247],
    icon: '👋',
    totalSigns: 18,
    masteredSigns: 15,
  },
  {
    id: 4,
    category: 'Everyday Communication',
    completion: 68,
    mastery: 74,
    currentLevel: 'Intermediate',
    color: [245, 158, 11],
    icon: '💬',
    totalSigns: 35,
    masteredSigns: 24,
  },
  {
    id: 5,
    category: 'Professional & Workplace',
    completion: 42,
    mastery: 51,
    currentLevel: 'Beginner',
    color: [236, 72, 153],
    icon: '💼',
    totalSigns: 30,
    masteredSigns: 12,
  },
  {
    id: 6,
    category: 'Educational Vocabulary',
    completion: 35,
    mastery: 40,
    currentLevel: 'Beginner',
    color: [6, 182, 212],
    icon: '🎓',
    totalSigns: 25,
    masteredSigns: 9,
  },
];

export const AI_RECOMMENDATIONS = {
  dailyGoal: '25 mins practice / 4 lessons',
  estimatedPracticeTime: '2.5 hrs remaining this week',
  recommendedLessons: [
    { id: 1, title: 'Politeness & Etiquette Signs', duration: '15 min', type: 'Lesson', color: [168, 85, 247] },
    { id: 2, title: 'Emergency Gesture Mastery', duration: '20 min', type: 'Drill', color: [239, 68, 68] },
    { id: 3, title: 'Workplace Terminology Basics', duration: '25 min', type: 'Course', color: [59, 130, 246] },
  ],
  recommendedPracticeSessions: [
    { id: 1, title: 'Fingerspelling Speed Test', duration: '10 min', target: '95% Accuracy' },
    { id: 2, title: 'Wrist Rotation Calibration', duration: '15 min', target: 'Smooth Arc' },
  ],
};

export const ANALYTICS_DATA = {
  weeklyProgress: [
    { day: 'Mon', hrs: 1.5, accuracy: 88 },
    { day: 'Tue', hrs: 2.1, accuracy: 92 },
    { day: 'Wed', hrs: 1.8, accuracy: 90 },
    { day: 'Thu', hrs: 2.5, accuracy: 94 },
    { day: 'Fri', hrs: 2.0, accuracy: 95 },
    { day: 'Sat', hrs: 3.2, accuracy: 97 },
    { day: 'Sun', hrs: 1.4, accuracy: 93 },
  ],
  monthlyAccuracy: [
    { month: 'Week 1', score: 76 },
    { month: 'Week 2', score: 81 },
    { month: 'Week 3', score: 86 },
    { month: 'Week 4', score: 92 },
  ],
};

export const FORECAST_DATA = {
  currentLevel: 'Level 3 · Intermediate',
  predictedNextLevel: 'Level 4 · Advanced Practitioner',
  estimatedCompletionDate: 'August 18, 2026',
  successProbability: '94.2%',
  learningConfidence: 'High (Optimal Consistency)',
};

export const ACHIEVEMENTS = [
  { id: 1, title: '18-Day Learning Streak', desc: 'Practiced consistently for 18 days', icon: '🔥', unlocked: true, date: 'Today' },
  { id: 2, title: 'Alphabet Master', desc: 'Achieved 98% accuracy on ASL Alphabet', icon: '🔤', unlocked: true, date: 'Jul 25' },
  { id: 3, title: 'Fast Fingers', desc: 'Completed 50 gestures in under 3 minutes', icon: '⚡', unlocked: true, date: 'Jul 20' },
  { id: 4, title: 'Century Classifier', desc: 'Recognized over 100 signs with AI', icon: '💯', unlocked: true, date: 'Jul 15' },
  { id: 5, title: 'Workplace Veteran', desc: 'Complete 30 workplace gestures', icon: '💼', unlocked: false, date: 'Locked' },
  { id: 6, title: 'Fluency Certificate', desc: 'Pass Level 4 Certification Assessment', icon: '📜', unlocked: false, date: 'Locked' },
];

export const ACTIVITY_TIMELINE = [
  { id: 1, title: 'Completed Assessment: Polite Signs', score: '94% Accuracy', time: '2 hours ago', type: 'assessment', color: [34, 197, 94] },
  { id: 2, title: 'Finished Lesson: Emergency Gestures', duration: '20 mins', time: 'Yesterday', type: 'lesson', color: [59, 130, 246] },
  { id: 3, title: 'Unlocked Badge: 18-Day Streak', achievement: '18 Days 🔥', time: '2 days ago', type: 'badge', color: [168, 85, 247] },
  { id: 4, title: 'Completed Practice: Alphabet Speed Test', score: '98% Accuracy', time: '3 days ago', type: 'practice', color: [245, 158, 11] },
];
