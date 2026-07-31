// src/data/gestureData.js
// Mock data for the Gesture Recognition Engine

export const GESTURES = [
  {
    id: 1,
    name: 'Hello',
    asl: 'Hi / Hello',
    category: 'Greeting',
    difficulty: 'Beginner',
    description: 'Open hand with fingers together, palm facing outward. Wave gently from left to right.',
    meaning: 'A standard greeting in American Sign Language, used to say hello or hi to someone.',
    commonUsage: 'Meeting people, starting conversations, acknowledging someone from a distance.',
    tips: ['Keep fingers straight and together', 'Palm should face outward', 'Wave smoothly from wrist, not elbow'],
    color: [168, 85, 247],
    emoji: '👋',
  },
  {
    id: 2,
    name: 'Thank You',
    asl: 'Thank You',
    category: 'Politeness',
    difficulty: 'Beginner',
    description: 'Touch fingertips to your chin, then move your hand outward and downward.',
    meaning: 'Expression of gratitude, acknowledgment of a kind gesture or help from someone.',
    commonUsage: 'Expressing gratitude, acknowledging a gift, showing appreciation.',
    tips: ['Start at chin level', 'Move hand smoothly outward', 'Facial expression should match sincerity'],
    color: [34, 197, 94],
    emoji: '🙏',
  },
  {
    id: 3,
    name: 'Yes',
    asl: 'Yes / Affirmative',
    category: 'Response',
    difficulty: 'Beginner',
    description: 'Make a fist and nod it up and down like a head nodding.',
    meaning: 'Affirmation or agreement. Equivalent to a head nod.',
    commonUsage: 'Agreeing, answering yes/no questions, confirming information.',
    tips: ['Keep wrist relaxed', 'Motion is up and down', 'Smaller for casual, larger for emphasis'],
    color: [59, 130, 246],
    emoji: '✅',
  },
  {
    id: 4,
    name: 'No',
    asl: 'No / Negative',
    category: 'Response',
    difficulty: 'Beginner',
    description: 'Extend index and middle finger, then bring them together repeatedly against thumb.',
    meaning: 'Negation or disagreement. Equivalent to shaking your head no.',
    commonUsage: 'Refusing, disagreeing, answering no/no questions.',
    tips: ['Two fingers extend initially', 'Tap thumb quickly', 'Combine with head shake for emphasis'],
    color: [239, 68, 68],
    emoji: '❌',
  },
  {
    id: 5,
    name: 'Help',
    asl: 'Help / Assist',
    category: 'Emergency',
    difficulty: 'Intermediate',
    description: 'Make a thumbs-up with one hand and place it on your open flat palm, then lift both upward.',
    meaning: 'A request for assistance or aid. Can also mean to assist someone else.',
    commonUsage: 'Asking for help, indicating emergency, requesting assistance.',
    tips: ['Flat palm faces up first', 'Thumb-up rests on palm', 'Both hands lift together'],
    color: [245, 158, 11],
    emoji: '🆘',
  },
  {
    id: 6,
    name: 'Please',
    asl: 'Please',
    category: 'Politeness',
    difficulty: 'Beginner',
    description: 'Place flat palm on chest and move it in a circular motion.',
    meaning: 'A polite request, showing courtesy and respect.',
    commonUsage: 'Making polite requests, asking for something nicely.',
    tips: ['Flat open hand on chest', 'Circular motion is clockwise', 'Slight forward lean shows sincerity'],
    color: [236, 72, 153],
    emoji: '🙂',
  },
  {
    id: 7,
    name: 'I Love You',
    asl: 'ILY',
    category: 'Emotion',
    difficulty: 'Beginner',
    description: 'Extend thumb, index finger, and pinky while keeping middle and ring fingers down.',
    meaning: 'A combined expression of I, L, and Y handshapes indicating love.',
    commonUsage: 'Expressing love and affection to family and close ones.',
    tips: ['Three fingers: thumb, index, pinky', 'Hold steady for clarity', 'Can be directed at person'],
    color: [168, 85, 247],
    emoji: '🤟',
  },
];

export const RECOGNITION_HISTORY = [
  { id: 1, time: '18:42:10', gesture: 'Hello', confidence: 98.2, result: 'Correct', color: [34, 197, 94] },
  { id: 2, time: '18:42:32', gesture: 'Thank You', confidence: 95.7, result: 'Correct', color: [34, 197, 94] },
  { id: 3, time: '18:43:01', gesture: 'Yes', confidence: 72.3, result: 'Partial', color: [245, 158, 11] },
  { id: 4, time: '18:43:28', gesture: 'No', confidence: 99.1, result: 'Correct', color: [34, 197, 94] },
  { id: 5, time: '18:44:05', gesture: 'Help', confidence: 45.2, result: 'Incorrect', color: [239, 68, 68] },
  { id: 6, time: '18:44:31', gesture: 'Please', confidence: 91.4, result: 'Correct', color: [34, 197, 94] },
];

// Mock 21 hand landmark positions (normalized 0-1 for a 200x200 canvas)
export const HAND_LANDMARKS = [
  // Wrist
  { id: 0, label: 'Wrist', x: 100, y: 180, group: 'wrist' },
  // Thumb
  { id: 1, label: 'Thumb CMC', x: 75, y: 155, group: 'thumb' },
  { id: 2, label: 'Thumb MCP', x: 55, y: 130, group: 'thumb' },
  { id: 3, label: 'Thumb IP', x: 38, y: 108, group: 'thumb' },
  { id: 4, label: 'Thumb Tip', x: 25, y: 88, group: 'thumb' },
  // Index
  { id: 5, label: 'Index MCP', x: 80, y: 130, group: 'index' },
  { id: 6, label: 'Index PIP', x: 75, y: 100, group: 'index' },
  { id: 7, label: 'Index DIP', x: 72, y: 72, group: 'index' },
  { id: 8, label: 'Index Tip', x: 70, y: 50, group: 'index' },
  // Middle
  { id: 9, label: 'Middle MCP', x: 100, y: 125, group: 'middle' },
  { id: 10, label: 'Middle PIP', x: 100, y: 93, group: 'middle' },
  { id: 11, label: 'Middle DIP', x: 100, y: 65, group: 'middle' },
  { id: 12, label: 'Middle Tip', x: 100, y: 40, group: 'middle' },
  // Ring
  { id: 13, label: 'Ring MCP', x: 120, y: 128, group: 'ring' },
  { id: 14, label: 'Ring PIP', x: 124, y: 97, group: 'ring' },
  { id: 15, label: 'Ring DIP', x: 126, y: 70, group: 'ring' },
  { id: 16, label: 'Ring Tip', x: 128, y: 48, group: 'ring' },
  // Pinky
  { id: 17, label: 'Pinky MCP', x: 140, y: 135, group: 'pinky' },
  { id: 18, label: 'Pinky PIP', x: 147, y: 108, group: 'pinky' },
  { id: 19, label: 'Pinky DIP', x: 152, y: 84, group: 'pinky' },
  { id: 20, label: 'Pinky Tip', x: 155, y: 62, group: 'pinky' },
];

// Connections between landmarks (pairs of landmark IDs)
export const LANDMARK_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],       // Index
  [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
  [0, 13], [13, 14], [14, 15], [15, 16],// Ring
  [0, 17], [17, 18], [18, 19], [19, 20],// Pinky
  [5, 9], [9, 13], [13, 17],            // Palm
];

export const GROUP_COLORS = {
  wrist: '#a855f7',
  thumb: '#f59e0b',
  index: '#3b82f6',
  middle: '#10b981',
  ring: '#ec4899',
  pinky: '#06b6d4',
};

export const SESSION_STATS_INITIAL = {
  recognized: 6,
  avgAccuracy: 83.7,
  sessionTime: '00:04:21',
  attempts: 8,
  successful: 6,
};

export const PRACTICE_TIPS = [
  { icon: '💡', tip: 'Ensure good lighting on your hand for best results.' },
  { icon: '📐', tip: 'Keep your hand within the camera frame at all times.' },
  { icon: '🎯', tip: 'Practice each gesture slowly before attempting at speed.' },
  { icon: '🔄', tip: 'Repeat gestures multiple times to improve accuracy.' },
  { icon: '👁️', tip: 'Watch the landmark visualization to check your form.' },
  { icon: '🤝', tip: 'Facial expressions add important context to many signs.' },
];
