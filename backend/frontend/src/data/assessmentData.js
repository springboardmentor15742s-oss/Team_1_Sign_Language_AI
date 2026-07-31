// src/data/assessmentData.js
// Mock data for the Sign Accuracy Assessment Engine

export const ASSESSMENT_LEVELS = [
  { id: 1, label: 'Beginner',     description: 'Basic signs and alphabets',         color: [34, 197, 94],   total: 5  },
  { id: 2, label: 'Intermediate', description: 'Common phrases and sentences',       color: [59, 130, 246],  total: 8  },
  { id: 3, label: 'Advanced',     description: 'Complex grammar and fluency',        color: [168, 85, 247],  total: 10 },
  { id: 4, label: 'Professional', description: 'Workplace and academic communication', color: [245, 158, 11], total: 12 },
];

export const ASSESSMENT_GESTURES = [
  {
    id: 1,
    name: 'Hello',
    meaning: 'A greeting used to say hi',
    category: 'Greeting',
    difficulty: 'Beginner',
    instructions: 'Open your hand with all fingers together. Face the palm outward toward the person and wave gently from left to right at face level.',
    tips: 'Keep fingers straight and together. Motion should come from the wrist, not the elbow.',
    emoji: '👋',
    color: [168, 85, 247],
  },
  {
    id: 2,
    name: 'Thank You',
    meaning: 'An expression of gratitude',
    category: 'Politeness',
    difficulty: 'Beginner',
    instructions: 'Touch the fingertips of your flat hand to your chin, then move the hand forward and slightly downward in one smooth motion.',
    tips: 'Start with all fingers touching your chin. Keep the motion smooth and fluid.',
    emoji: '🙏',
    color: [34, 197, 94],
  },
  {
    id: 3,
    name: 'Please',
    meaning: 'A polite request',
    category: 'Politeness',
    difficulty: 'Beginner',
    instructions: 'Place your open hand flat on your chest and move it in a slow clockwise circular motion two to three times.',
    tips: 'The circular motion should be smooth and controlled. Keep hand flat against chest.',
    emoji: '🙂',
    color: [59, 130, 246],
  },
  {
    id: 4,
    name: 'Help',
    meaning: 'A request for assistance',
    category: 'Emergency',
    difficulty: 'Intermediate',
    instructions: 'Form a thumbs-up shape with one hand and place the thumb side on your open flat palm. Lift both hands upward together.',
    tips: 'Both hands should rise simultaneously. The thumbs-up rests on the open palm before lifting.',
    emoji: '🆘',
    color: [245, 158, 11],
  },
  {
    id: 5,
    name: 'I Love You',
    meaning: 'Combined expression of love',
    category: 'Emotion',
    difficulty: 'Beginner',
    instructions: 'Extend your thumb, index finger, and pinky finger while keeping the middle and ring fingers folded down. Hold steady.',
    tips: 'The three extended fingers — thumb, index, pinky — should be clearly visible and separated.',
    emoji: '🤟',
    color: [236, 72, 153],
  },
];

export const ACCURACY_CATEGORIES = [
  { key: 'handShape',  label: 'Hand Shape',   icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11', color: [168, 85, 247] },
  { key: 'motion',     label: 'Motion Path',  icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',                                                                                                                                                         color: [59, 130, 246] },
  { key: 'position',  label: 'Position',     icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',                                                                   color: [34, 197, 94]  },
  { key: 'timing',    label: 'Timing',       icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',                                                                                                                                             color: [245, 158, 11] },
  { key: 'overall',   label: 'Overall',      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',                                                                                                                                           color: [16, 185, 129] },
];

export const MISTAKE_TYPES = [
  { key: 'fingerPos',  label: 'Incorrect Finger Position', description: 'Middle and ring fingers are not fully folded.',          severity: 'high',   color: [239, 68, 68]  },
  { key: 'rotation',  label: 'Hand Rotation Issue',        description: 'Palm angle is approximately 15° off from target.',       severity: 'medium', color: [245, 158, 11] },
  { key: 'motionPath', label: 'Motion Path Error',         description: 'Motion trajectory deviates from the expected arc.',      severity: 'low',    color: [59, 130, 246] },
  { key: 'timing',    label: 'Timing Delay',               description: 'Gesture held for too long (2.3s vs expected 1.5s).',     severity: 'low',    color: [245, 158, 11] },
  { key: 'missing',   label: 'Missing Gesture Component',  description: 'Wrist extension phase was not detected by the engine.',  severity: 'high',   color: [239, 68, 68]  },
];

export const ASSESSMENT_HISTORY_MOCK = [
  { id: 1, gesture: 'Hello',       accuracy: 95, attempt: 1, time: '0:24', result: 'Pass',  color: [34, 197, 94]  },
  { id: 2, gesture: 'Thank You',   accuracy: 88, attempt: 1, time: '0:31', result: 'Pass',  color: [34, 197, 94]  },
  { id: 3, gesture: 'Please',      accuracy: 61, attempt: 2, time: '1:05', result: 'Fail',  color: [239, 68, 68]  },
  { id: 4, gesture: 'Please',      accuracy: 82, attempt: 3, time: '1:43', result: 'Pass',  color: [34, 197, 94]  },
  { id: 5, gesture: 'Help',        accuracy: 74, attempt: 1, time: '0:44', result: 'Partial', color: [245, 158, 11] },
];

export const RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Improve Hand Shape Clarity',
    description: 'Practice holding each handshape in front of a mirror for 10 seconds to train muscle memory.',
    priority: 'High',
    icon: '✋',
    color: [239, 68, 68],
  },
  {
    id: 2,
    title: 'Work on Motion Fluidity',
    description: 'Slow down the practice speed by 50% and focus on smooth transitions between gesture phases.',
    priority: 'Medium',
    icon: '🔄',
    color: [245, 158, 11],
  },
  {
    id: 3,
    title: 'Practice "Please" Sign',
    description: 'You attempted "Please" 3 times. Review the reference video and practice the circular motion.',
    priority: 'High',
    icon: '🎯',
    color: [59, 130, 246],
  },
  {
    id: 4,
    title: 'Excellent Greeting Signs',
    description: '"Hello" scored 95%. Keep up this accuracy and move on to the next level of greetings.',
    priority: 'Info',
    icon: '⭐',
    color: [34, 197, 94],
  },
];

export const PERFORMANCE_SUMMARY_INITIAL = {
  attempted:       5,
  passed:          4,
  failed:          1,
  avgAccuracy:     80.0,
  bestScore:       95,
  currentStreak:   3,
};

export const SCORE_DISTRIBUTION = [
  { range: '90–100%', count: 1, color: [34, 197, 94]  },
  { range: '80–89%',  count: 2, color: [59, 130, 246] },
  { range: '70–79%',  count: 1, color: [245, 158, 11] },
  { range: '60–69%',  count: 1, color: [239, 68, 68]  },
];
