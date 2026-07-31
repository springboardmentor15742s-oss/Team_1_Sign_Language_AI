export const performanceScoreWeights = {
  gestureAccuracy: 0.40,
  assessmentPerformance: 0.25,
  lessonCompletion: 0.15,
  practiceConsistency: 0.10,
  skillImprovementRate: 0.10,
};

export const componentScores = {
  gestureAccuracy: 88,
  assessmentPerformance: 92,
  lessonCompletion: 76,
  practiceConsistency: 95,
  skillImprovementRate: 82,
};

// Calculated: (88 * 0.4) + (92 * 0.25) + (76 * 0.15) + (95 * 0.1) + (82 * 0.1) = 35.2 + 23 + 11.4 + 9.5 + 8.2 = 87.3
export const overallScore = 87;

export function getPerformanceGrade(score) {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 85) return 'B+';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'Needs Improvement';
}

export const performanceGrade = getPerformanceGrade(overallScore);

export const performanceInsights = {
  strongestSkill: 'Timing & Rhythm',
  weakestSkill: 'Complex Hand Shapes',
  suggestedFocusArea: 'Facial Expressions & Grammar',
  expectedImprovement: '+4.5% in 7 days',
};

export const previousWeekComparison = {
  previousScore: 82,
  currentScore: overallScore,
  percentageImprovement: '+6.1%',
  isUp: true,
};

export const skillBreakdown = [
  { name: 'Hand Shape', score: 82, trend: '+2%', strength: 'Good', color: [139, 92, 246] }, // Purple
  { name: 'Finger Position', score: 75, trend: '-1%', strength: 'Needs Work', color: [244, 63, 94] }, // Rose
  { name: 'Motion', score: 89, trend: '+4%', strength: 'Strong', color: [16, 185, 129] }, // Emerald
  { name: 'Timing', score: 94, trend: '+5%', strength: 'Excellent', color: [59, 130, 246] }, // Blue
  { name: 'Accuracy', score: 88, trend: '+1.5%', strength: 'Strong', color: [245, 158, 11] }, // Amber
  { name: 'Confidence', score: 91, trend: '+3%', strength: 'Excellent', color: [236, 72, 153] }, // Pink
];

export const weeklyPerformanceData = [
  { week: 'Week 1', score: 72 },
  { week: 'Week 2', score: 75 },
  { week: 'Week 3', score: 79 },
  { week: 'Week 4', score: 82 },
  { week: 'Week 5', score: overallScore },
];

export const scoreDistribution = [
  { range: '90-100', percentage: 15 },
  { range: '80-89', percentage: 45 },
  { range: '70-79', percentage: 25 },
  { range: '<70', percentage: 15 },
];

export const recommendations = [
  { id: 1, type: 'Practice', title: 'Complex Hand Shapes Drill', description: 'Focus on transitioning between multi-finger signs.', targetScore: '85+', estimatedTime: '15 mins', color: [244, 63, 94] },
  { id: 2, type: 'Lesson', title: 'Facial Expressions Masterclass', description: 'Learn to convey tone and grammar through facial cues.', targetScore: '90+', estimatedTime: '25 mins', color: [59, 130, 246] },
];

export const achievements = {
  highestScore: 94,
  bestWeek: 'Week 4 (Feb 2026)',
  longestStreak: '14 Days',
  topSkill: 'Timing',
  recentUnlock: 'Precision Master (Gold)',
};

export const performanceHistory = [
  { id: 1, date: 'Feb 24, 2026', assessment: 'Level 2 Mid-Term', score: 92, status: 'Passed' },
  { id: 2, date: 'Feb 17, 2026', assessment: 'Weekly Practice Drill', score: 85, status: 'Passed' },
  { id: 3, date: 'Feb 10, 2026', assessment: 'Alphabet Speed Test', score: 88, status: 'Passed' },
  { id: 4, date: 'Feb 03, 2026', assessment: 'Level 1 Final Exam', score: 95, status: 'Passed (Honors)' },
];

export const leaderboardStats = {
  rank: 142,
  totalUsers: 12500,
  percentile: 'Top 2%',
  pointsToNextRank: 150,
};
