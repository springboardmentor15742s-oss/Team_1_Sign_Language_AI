// src/data/feedbackData.js
// Mock data for the AI Feedback & Correction Engine

export const FEEDBACK_SUMMARY = {
  assessmentName: 'Beginner ASL Assessment — Session 4',
  completedAt: '18:44 · July 28, 2026',
  overallAccuracy: 84.2,
  grade: 'B+',
  gradeColor: [59, 130, 246],
  improvementScore: '+12.4% vs last session',
  aiConfidence: 97.1,
  overallRating: 4.2,
  estimatedSkillLevel: 'Intermediate Beginner',
};

export const AI_SUMMARY_MESSAGES = [
  {
    text: 'Excellent hand shape on "Hello" and "Thank You". Your wrist rotation needs improvement — the hand angle was consistently 18° off target. Focus on slowing down the gesture timing to improve fluidity and detection accuracy.',
    tone: 'balanced',
    color: [59, 130, 246],
  },
  {
    text: 'Strong progress since your last session! Your finger extension clarity improved by 24%. Minor issues remain with thumb positioning on closed fist signs. Practice the "Help" sign 10 times daily this week.',
    tone: 'positive',
    color: [34, 197, 94],
  },
  {
    text: 'Two critical errors detected in motion path during "Please" — the circular motion was incomplete. Your position accuracy needs focused practice. Review the reference animations in the lesson library.',
    tone: 'critical',
    color: [239, 68, 68],
  },
];

export const DETECTED_MISTAKES = [
  {
    id: 1,
    type: 'Hand Shape',
    label: 'Incorrect Hand Shape',
    gesture: 'Help',
    severity: 'high',
    description: 'The thumb was folded inward during the "Help" sign. The thumbs-up position requires the thumb fully extended upward.',
    hint: 'Practice the thumbs-up shape 20 times independently before combining with the full gesture.',
    icon: '✋',
    color: [239, 68, 68],
  },
  {
    id: 2,
    type: 'Motion Path',
    label: 'Incorrect Motion',
    gesture: 'Please',
    severity: 'high',
    description: 'The circular motion for "Please" was cut short — only 60% of the full circle was traced.',
    hint: 'Use a mirror to practice the full clockwise circular motion until it feels natural.',
    icon: '🔄',
    color: [239, 68, 68],
  },
  {
    id: 3,
    type: 'Position',
    label: 'Incorrect Position',
    gesture: 'Thank You',
    severity: 'medium',
    description: 'Hand start position was 8cm below chin level. The sign should initiate at the chin.',
    hint: 'Place your hand at chin height before beginning the outward motion.',
    icon: '📍',
    color: [245, 158, 11],
  },
  {
    id: 4,
    type: 'Timing',
    label: 'Timing Issue',
    gesture: 'Hello',
    severity: 'low',
    description: 'The wave motion was held for 3.2s vs the expected 1.5s. Prolonged holds can indicate uncertainty.',
    hint: 'Practice with a metronome or beat to develop consistent timing.',
    icon: '⏱️',
    color: [245, 158, 11],
  },
  {
    id: 5,
    type: 'Missing Component',
    label: 'Missing Gesture Component',
    gesture: 'Help',
    severity: 'medium',
    description: 'The upward lift phase of "Help" was not detected. The thumbs-up must visibly rise together with the supporting palm.',
    hint: 'Emphasize the lifting motion — both hands should clearly rise upward together.',
    icon: '⚠️',
    color: [245, 158, 11],
  },
];

export const IMPROVEMENT_SUGGESTIONS = [
  { id: 1, title: 'Practice Thumb Positioning', description: 'Daily thumb isolation exercises will improve accuracy on closed-fist and open-hand signs.', priority: 'Critical', icon: '👍', color: [239, 68, 68], estimatedTime: '10 min/day' },
  { id: 2, title: 'Slow Down Wrist Movement', description: 'Reduce speed by 30% and focus on deliberate, controlled wrist rotation. Speed follows accuracy.', priority: 'High', icon: '🔄', color: [245, 158, 11], estimatedTime: '15 min/day' },
  { id: 3, title: 'Improve Finger Extension', description: 'Practice fully extending all fingers on open-hand signs. Partial extension reduces recognition confidence.', priority: 'High', icon: '🖐️', color: [245, 158, 11], estimatedTime: '10 min/day' },
  { id: 4, title: 'Repeat Lesson 3: Politeness Signs', description: 'Your "Please" accuracy was 61%. Completing Lesson 3 again will reinforce the circular motion pattern.', priority: 'Medium', icon: '📚', color: [59, 130, 246], estimatedTime: '25 min' },
  { id: 5, title: 'Practice Beginner Module 2', description: 'Module 2 covers positional accuracy and anchor points — directly targeting your detected weaknesses.', priority: 'Medium', icon: '🎯', color: [59, 130, 246], estimatedTime: '30 min' },
  { id: 6, title: 'Film and Review Your Signs', description: 'Record yourself practicing and compare side-by-side with reference videos to self-correct form.', priority: 'Info', icon: '🎥', color: [34, 197, 94], estimatedTime: 'Anytime' },
];

export const PROGRESS_PREDICTIONS = [
  { label: 'Current Skill Level', value: 'Intermediate Beginner', sub: 'Level 2 of 6', icon: '📊', color: [168, 85, 247] },
  { label: 'Predicted Next Level', value: 'Early Intermediate', sub: 'Estimated in 3 weeks', icon: '🚀', color: [59, 130, 246] },
  { label: 'Est. Practice Needed', value: '~18 hours', sub: 'At current pace', icon: '⏰', color: [245, 158, 11] },
  { label: 'Readiness Score', value: '68 / 100', sub: 'For next assessment', icon: '🎯', color: [34, 197, 94] },
];

export const FEEDBACK_HISTORY = [
  { id: 1, session: 'Session 1 — Greetings',      date: 'Jul 21, 2026', accuracy: 68.4, grade: 'C+', gestures: 4, color: [245, 158, 11] },
  { id: 2, session: 'Session 2 — Basic Responses', date: 'Jul 23, 2026', accuracy: 74.1, grade: 'B',  gestures: 5, color: [59, 130, 246]  },
  { id: 3, session: 'Session 3 — Polite Signs',    date: 'Jul 25, 2026', accuracy: 71.8, grade: 'B-', gestures: 5, color: [59, 130, 246]  },
  { id: 4, session: 'Session 4 — Mixed Beginner',  date: 'Jul 28, 2026', accuracy: 84.2, grade: 'B+', gestures: 5, color: [34, 197, 94]   },
];

export const LESSON_RECOMMENDATIONS = [
  { id: 1, title: 'ASL Basics: Politeness Signs',          module: 'Module 2 · Beginner',     duration: '25 min', tags: ['Please', 'Thank You', 'Sorry'], color: [168, 85, 247], emoji: '🙏' },
  { id: 2, title: 'Hand Shape Mastery',                    module: 'Module 4 · Beginner',     duration: '30 min', tags: ['Thumb', 'Fist', 'Open Hand'],   color: [59, 130, 246],  emoji: '✋' },
  { id: 3, title: 'Emergency & Help Signs',                module: 'Module 6 · Intermediate', duration: '20 min', tags: ['Help', 'Emergency', 'Doctor'],  color: [239, 68, 68],   emoji: '🆘' },
  { id: 4, title: 'Gesture Timing & Fluency Drills',       module: 'Module 8 · Intermediate', duration: '40 min', tags: ['Timing', 'Rhythm', 'Flow'],    color: [34, 197, 94],   emoji: '🎵' },
];
