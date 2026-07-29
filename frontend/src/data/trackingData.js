// src/data/trackingData.js
// Mock data for Module 5: Pose & Hand Tracking Engine

export const HAND_LANDMARKS_DATA = [
  { id: 0,  name: 'Wrist',      group: 'wrist',  x: 100, y: 180, z: 0.00, confidence: 99.4 },
  { id: 1,  name: 'Thumb CMC',  group: 'thumb',  x: 75,  y: 155, z: -0.02, confidence: 97.8 },
  { id: 2,  name: 'Thumb MCP',  group: 'thumb',  x: 55,  y: 130, z: -0.04, confidence: 98.1 },
  { id: 3,  name: 'Thumb IP',   group: 'thumb',  x: 38,  y: 108, z: -0.05, confidence: 96.5 },
  { id: 4,  name: 'Thumb Tip',  group: 'thumb',  x: 25,  y: 88,  z: -0.06, confidence: 95.9 },
  { id: 5,  name: 'Index MCP',  group: 'index',  x: 80,  y: 130, z: -0.01, confidence: 99.1 },
  { id: 6,  name: 'Index PIP',  group: 'index',  x: 75,  y: 100, z: -0.03, confidence: 98.7 },
  { id: 7,  name: 'Index DIP',  group: 'index',  x: 72,  y: 72,  z: -0.04, confidence: 97.4 },
  { id: 8,  name: 'Index Tip',  group: 'index',  x: 70,  y: 50,  z: -0.05, confidence: 98.9 },
  { id: 9,  name: 'Middle MCP', group: 'middle', x: 100, y: 125, z: 0.00, confidence: 99.5 },
  { id: 10, name: 'Middle PIP', group: 'middle', x: 100, y: 93,  z: -0.02, confidence: 99.0 },
  { id: 11, name: 'Middle DIP', group: 'middle', x: 100, y: 65,  z: -0.03, confidence: 98.3 },
  { id: 12, name: 'Middle Tip', group: 'middle', x: 100, y: 40,  z: -0.04, confidence: 99.2 },
  { id: 13, name: 'Ring MCP',   group: 'ring',   x: 120, y: 128, z: 0.01, confidence: 98.6 },
  { id: 14, name: 'Ring PIP',   group: 'ring',   x: 124, y: 97,  z: -0.01, confidence: 97.9 },
  { id: 15, name: 'Ring DIP',   group: 'ring',   x: 126, y: 70,  z: -0.02, confidence: 96.8 },
  { id: 16, name: 'Ring Tip',   group: 'ring',   x: 128, y: 48,  z: -0.03, confidence: 97.7 },
  { id: 17, name: 'Pinky MCP',  group: 'pinky',  x: 140, y: 135, z: 0.02, confidence: 97.1 },
  { id: 18, name: 'Pinky PIP',  group: 'pinky',  x: 147, y: 108, z: 0.00, confidence: 96.4 },
  { id: 19, name: 'Pinky DIP',  group: 'pinky',  x: 152, y: 84,  z: -0.01, confidence: 95.8 },
  { id: 20, name: 'Pinky Tip',  group: 'pinky',  x: 155, y: 62,  z: -0.02, confidence: 96.3 },
];

export const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],       // Index
  [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
  [0, 13], [13, 14], [14, 15], [15, 16],// Ring
  [0, 17], [17, 18], [18, 19], [19, 20],// Pinky
  [5, 9], [9, 13], [13, 17],            // Palm Base
];

export const POSE_LANDMARKS_DATA = [
  // Head
  { id: 0,  name: 'Nose',             x: 150, y: 50,  z: 0.0, group: 'head', confidence: 99.8 },
  { id: 1,  name: 'Left Eye Inner',   x: 142, y: 44,  z: 0.0, group: 'head', confidence: 99.4 },
  { id: 2,  name: 'Left Eye',         x: 138, y: 44,  z: 0.0, group: 'head', confidence: 99.5 },
  { id: 3,  name: 'Left Eye Outer',   x: 134, y: 44,  z: 0.0, group: 'head', confidence: 99.2 },
  { id: 4,  name: 'Right Eye Inner',  x: 158, y: 44,  z: 0.0, group: 'head', confidence: 99.4 },
  { id: 5,  name: 'Right Eye',        x: 162, y: 44,  z: 0.0, group: 'head', confidence: 99.5 },
  { id: 6,  name: 'Right Eye Outer',  x: 166, y: 44,  z: 0.0, group: 'head', confidence: 99.2 },
  { id: 7,  name: 'Left Ear',         x: 125, y: 48,  z: 0.0, group: 'head', confidence: 98.6 },
  { id: 8,  name: 'Right Ear',        x: 175, y: 48,  z: 0.0, group: 'head', confidence: 98.6 },
  { id: 9,  name: 'Mouth Left',       x: 142, y: 62,  z: 0.0, group: 'head', confidence: 99.1 },
  { id: 10, name: 'Mouth Right',      x: 158, y: 62,  z: 0.0, group: 'head', confidence: 99.1 },
  // Upper Body
  { id: 11, name: 'Left Shoulder',    x: 110, y: 95,  z: 0.0, group: 'torso', confidence: 99.7 },
  { id: 12, name: 'Right Shoulder',   x: 190, y: 95,  z: 0.0, group: 'torso', confidence: 99.7 },
  { id: 13, name: 'Left Elbow',       x: 80,  y: 150, z: 0.0, group: 'arm',   confidence: 98.9 },
  { id: 14, name: 'Right Elbow',      x: 220, y: 150, z: 0.0, group: 'arm',   confidence: 98.9 },
  { id: 15, name: 'Left Wrist',       x: 65,  y: 200, z: 0.0, group: 'arm',   confidence: 99.2 },
  { id: 16, name: 'Right Wrist',      x: 235, y: 200, z: 0.0, group: 'arm',   confidence: 99.2 },
  { id: 17, name: 'Left Pinky',       x: 60,  y: 215, z: 0.0, group: 'hand',  confidence: 97.4 },
  { id: 18, name: 'Right Pinky',      x: 240, y: 215, z: 0.0, group: 'hand',  confidence: 97.4 },
  { id: 19, name: 'Left Index',       x: 63,  y: 218, z: 0.0, group: 'hand',  confidence: 97.8 },
  { id: 20, name: 'Right Index',      x: 237, y: 218, z: 0.0, group: 'hand',  confidence: 97.8 },
  { id: 21, name: 'Left Thumb',       x: 68,  y: 210, z: 0.0, group: 'hand',  confidence: 97.1 },
  { id: 22, name: 'Right Thumb',      x: 232, y: 210, z: 0.0, group: 'hand',  confidence: 97.1 },
  // Lower Body
  { id: 23, name: 'Left Hip',         x: 125, y: 220, z: 0.0, group: 'torso', confidence: 99.1 },
  { id: 24, name: 'Right Hip',        x: 175, y: 220, z: 0.0, group: 'torso', confidence: 99.1 },
  { id: 25, name: 'Left Knee',        x: 120, y: 300, z: 0.0, group: 'leg',   confidence: 98.5 },
  { id: 26, name: 'Right Knee',       x: 180, y: 300, z: 0.0, group: 'leg',   confidence: 98.5 },
  { id: 27, name: 'Left Ankle',       x: 118, y: 370, z: 0.0, group: 'leg',   confidence: 97.9 },
  { id: 28, name: 'Right Ankle',      x: 182, y: 370, z: 0.0, group: 'leg',   confidence: 97.9 },
];

export const POSE_CONNECTIONS = [
  // Head
  [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [3, 7], [6, 8], [9, 10],
  // Torso
  [11, 12], [11, 23], [12, 24], [23, 24],
  // Arms
  [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],
  [12, 14], [14, 16], [16, 18], [16, 20], [16, 22],
  // Legs
  [23, 25], [25, 27],
  [24, 26], [26, 28],
];

export const GROUP_COLORS = {
  wrist:  '#a855f7',
  thumb:  '#f59e0b',
  index:  '#3b82f6',
  middle: '#10b981',
  ring:   '#ec4899',
  pinky:  '#06b6d4',
  head:   '#c084fc',
  torso:  '#38bdf8',
  arm:    '#4ade80',
  hand:   '#f472b6',
  leg:    '#fbbf24',
};

export const TRACKING_STATS_SUMMARY = {
  avgConfidence: 97.8,
  trackedFrames: 14280,
  accuracy: 98.6,
  fps: 59.8,
  handStability: 96.4,
  poseStability: 98.1,
  activeModel: 'MediaPipe Hands + BlazePose v2.4 (Simulated)',
  latency: '14.2 ms',
};

export const TRACKING_HISTORY_DATA = [
  { id: 1, type: 'Hand Tracking',  session: 'ASL Alphabet Practice — Session #12', date: 'Jul 28, 2026', duration: '08:45', frames: 31500, avgConfidence: 98.4, fps: 60.0, quality: 'Optimal',  color: [34, 197, 94] },
  { id: 2, type: 'Full Body Pose', session: 'Upper Body Gestures — Session #11',   date: 'Jul 27, 2026', duration: '14:20', frames: 51600, avgConfidence: 96.9, fps: 59.4, quality: 'Optimal',  color: [59, 130, 246] },
  { id: 3, type: 'Hand Tracking',  session: 'Emergency Signs Drill — Session #10', date: 'Jul 26, 2026', duration: '05:12', frames: 18700, avgConfidence: 94.2, fps: 58.2, quality: 'Good',     color: [245, 158, 11] },
  { id: 4, type: 'Full Body Pose', session: 'Conversational ASL — Session #09',   date: 'Jul 24, 2026', duration: '22:10', frames: 79800, avgConfidence: 97.8, fps: 59.9, quality: 'Optimal',  color: [168, 85, 247] },
  { id: 5, type: 'Hand Tracking',  session: 'Finger Spelling Test — Session #08', date: 'Jul 22, 2026', duration: '11:04', frames: 39800, avgConfidence: 92.6, fps: 57.8, quality: 'Good',     color: [245, 158, 11] },
];

export const CONFIDENCE_TIMELINE = [
  { time: '0s',  hand: 96, pose: 98 },
  { time: '5s',  hand: 98, pose: 99 },
  { time: '10s', hand: 97, pose: 97 },
  { time: '15s', hand: 99, pose: 99 },
  { time: '20s', hand: 95, pose: 98 },
  { time: '25s', hand: 98, pose: 99 },
  { time: '30s', hand: 99, pose: 98 },
];
