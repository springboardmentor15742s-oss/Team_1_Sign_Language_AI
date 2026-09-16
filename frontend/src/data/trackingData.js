// src/data/trackingData.js
// Data for Module 5: Pose & Hand Tracking Engine with Tracked Landmarks

export const TRACKED_LANDMARKS_CATEGORIES = [
  {
    id: 'finger_joints',
    name: 'Finger Joints',
    icon: '🖐️',
    count: 20,
    nodes: 'Thumb, Index, Middle, Ring & Pinky DIP/PIP/MCP Joints',
    description: 'Tracks 20 individual phalangeal and interphalangeal articulation points for intricate sign shapes.',
    color: '#f59e0b',
    confidence: 98.6,
  },
  {
    id: 'palm_position',
    name: 'Palm Position',
    icon: '✋',
    count: 3,
    nodes: 'Palm Center, Palm Base, Metacarpal Plane',
    description: 'Tracks orientation, spatial depth, and planar tilt of the palm surface.',
    color: '#ec4899',
    confidence: 99.2,
  },
  {
    id: 'wrist_position',
    name: 'Wrist Position',
    icon: '⌚',
    count: 2,
    nodes: 'Left Wrist, Right Wrist (Radial & Ulnar pivots)',
    description: 'Tracks rotation angle, flexion, extension, and base hand reference coordinates.',
    color: '#a855f7',
    confidence: 99.5,
  },
  {
    id: 'arm_position',
    name: 'Arm Position',
    icon: '💪',
    count: 4,
    nodes: 'Left Elbow, Right Elbow, Left Forearm, Right Forearm',
    description: 'Tracks forearm orientation and elbow joint angles critical for dynamic signs.',
    color: '#3b82f6',
    confidence: 98.9,
  },
  {
    id: 'shoulder_position',
    name: 'Shoulder Position',
    icon: '🦾',
    count: 3,
    nodes: 'Left Shoulder, Right Shoulder, Clavicle Center / Sternum',
    description: 'Monitors torso frame, biacromial axis, and signing space boundary.',
    color: '#10b981',
    confidence: 99.7,
  },
];

export const HAND_LANDMARKS_DATA = [
  // Wrist Position
  { id: 0,  name: 'Wrist (Pivot Base)', group: 'wrist', category: 'Wrist Position', x: 100, y: 180, z: 0.00, confidence: 99.4 },
  
  // Palm Position
  { id: 21, name: 'Palm Center (Planar)', group: 'palm', category: 'Palm Position', x: 100, y: 145, z: -0.01, confidence: 99.2 },
  { id: 22, name: 'Palm Base Arch', group: 'palm', category: 'Palm Position', x: 100, y: 165, z: 0.00, confidence: 98.8 },

  // Finger Joints (Thumb)
  { id: 1,  name: 'Thumb CMC Joint', group: 'thumb', category: 'Finger Joints', x: 75,  y: 155, z: -0.02, confidence: 97.8 },
  { id: 2,  name: 'Thumb MCP Joint', group: 'thumb', category: 'Finger Joints', x: 55,  y: 130, z: -0.04, confidence: 98.1 },
  { id: 3,  name: 'Thumb IP Joint',  group: 'thumb', category: 'Finger Joints', x: 38,  y: 108, z: -0.05, confidence: 96.5 },
  { id: 4,  name: 'Thumb Tip',       group: 'thumb', category: 'Finger Joints', x: 25,  y: 88,  z: -0.06, confidence: 95.9 },

  // Finger Joints (Index)
  { id: 5,  name: 'Index MCP Joint', group: 'index', category: 'Finger Joints', x: 80,  y: 130, z: -0.01, confidence: 99.1 },
  { id: 6,  name: 'Index PIP Joint', group: 'index', category: 'Finger Joints', x: 75,  y: 100, z: -0.03, confidence: 98.7 },
  { id: 7,  name: 'Index DIP Joint', group: 'index', category: 'Finger Joints', x: 72,  y: 72,  z: -0.04, confidence: 97.4 },
  { id: 8,  name: 'Index Tip',       group: 'index', category: 'Finger Joints', x: 70,  y: 50,  z: -0.05, confidence: 98.9 },

  // Finger Joints (Middle)
  { id: 9,  name: 'Middle MCP Joint', group: 'middle', category: 'Finger Joints', x: 100, y: 125, z: 0.00, confidence: 99.5 },
  { id: 10, name: 'Middle PIP Joint', group: 'middle', category: 'Finger Joints', x: 100, y: 93,  z: -0.02, confidence: 99.0 },
  { id: 11, name: 'Middle DIP Joint', group: 'middle', category: 'Finger Joints', x: 100, y: 65,  z: -0.03, confidence: 98.3 },
  { id: 12, name: 'Middle Tip',       group: 'middle', category: 'Finger Joints', x: 100, y: 40,  z: -0.04, confidence: 99.2 },

  // Finger Joints (Ring)
  { id: 13, name: 'Ring MCP Joint', group: 'ring', category: 'Finger Joints', x: 120, y: 128, z: 0.01, confidence: 98.6 },
  { id: 14, name: 'Ring PIP Joint', group: 'ring', category: 'Finger Joints', x: 124, y: 97,  z: -0.01, confidence: 97.9 },
  { id: 15, name: 'Ring DIP Joint', group: 'ring', category: 'Finger Joints', x: 126, y: 70,  z: -0.02, confidence: 96.8 },
  { id: 16, name: 'Ring Tip',       group: 'ring', category: 'Finger Joints', x: 128, y: 48,  z: -0.03, confidence: 97.7 },

  // Finger Joints (Pinky)
  { id: 17, name: 'Pinky MCP Joint', group: 'pinky', category: 'Finger Joints', x: 140, y: 135, z: 0.02, confidence: 97.1 },
  { id: 18, name: 'Pinky PIP Joint', group: 'pinky', category: 'Finger Joints', x: 147, y: 108, z: 0.00, confidence: 96.4 },
  { id: 19, name: 'Pinky DIP Joint', group: 'pinky', category: 'Finger Joints', x: 152, y: 84,  z: -0.01, confidence: 95.8 },
  { id: 20, name: 'Pinky Tip',       group: 'pinky', category: 'Finger Joints', x: 155, y: 62,  z: -0.02, confidence: 96.3 },
];

export const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],       // Index
  [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
  [0, 13], [13, 14], [14, 15], [15, 16],// Ring
  [0, 17], [17, 18], [18, 19], [19, 20],// Pinky
  [5, 9], [9, 13], [13, 17],            // Palm Base
  [0, 22], [22, 21], [21, 9],           // Palm Center Linkages
];

export const POSE_LANDMARKS_DATA = [
  // Shoulder Position
  { id: 11, name: 'Left Shoulder',    x: 110, y: 95,  z: 0.0, group: 'shoulder', category: 'Shoulder Position', confidence: 99.7 },
  { id: 12, name: 'Right Shoulder',   x: 190, y: 95,  z: 0.0, group: 'shoulder', category: 'Shoulder Position', confidence: 99.7 },
  { id: 29, name: 'Clavicle / Sternum Center', x: 150, y: 92, z: 0.0, group: 'shoulder', category: 'Shoulder Position', confidence: 99.4 },

  // Arm Position
  { id: 13, name: 'Left Elbow Joint', x: 80,  y: 150, z: 0.0, group: 'arm', category: 'Arm Position', confidence: 98.9 },
  { id: 14, name: 'Right Elbow Joint', x: 220, y: 150, z: 0.0, group: 'arm', category: 'Arm Position', confidence: 98.9 },
  { id: 30, name: 'Left Forearm Axis', x: 72, y: 175, z: 0.0, group: 'arm', category: 'Arm Position', confidence: 98.4 },
  { id: 31, name: 'Right Forearm Axis', x: 228, y: 175, z: 0.0, group: 'arm', category: 'Arm Position', confidence: 98.4 },

  // Wrist Position
  { id: 15, name: 'Left Wrist',       x: 65,  y: 200, z: 0.0, group: 'wrist', category: 'Wrist Position', confidence: 99.2 },
  { id: 16, name: 'Right Wrist',      x: 235, y: 200, z: 0.0, group: 'wrist', category: 'Wrist Position', confidence: 99.2 },

  // Finger Joints (Pose distal extremities)
  { id: 17, name: 'Left Pinky Base',  x: 60,  y: 215, z: 0.0, group: 'finger', category: 'Finger Joints', confidence: 97.4 },
  { id: 18, name: 'Right Pinky Base', x: 240, y: 215, z: 0.0, group: 'finger', category: 'Finger Joints', confidence: 97.4 },
  { id: 19, name: 'Left Index Tip',   x: 63,  y: 218, z: 0.0, group: 'finger', category: 'Finger Joints', confidence: 97.8 },
  { id: 20, name: 'Right Index Tip',  x: 237, y: 218, z: 0.0, group: 'finger', category: 'Finger Joints', confidence: 97.8 },
  { id: 21, name: 'Left Thumb Tip',   x: 68,  y: 210, z: 0.0, group: 'finger', category: 'Finger Joints', confidence: 97.1 },
  { id: 22, name: 'Right Thumb Tip',  x: 232, y: 210, z: 0.0, group: 'finger', category: 'Finger Joints', confidence: 97.1 },

  // Palm Position (Pose hand centers)
  { id: 32, name: 'Left Palm Root',   x: 64, y: 208, z: 0.0, group: 'palm', category: 'Palm Position', confidence: 98.6 },
  { id: 33, name: 'Right Palm Root',  x: 236, y: 208, z: 0.0, group: 'palm', category: 'Palm Position', confidence: 98.6 },

  // Head context
  { id: 0,  name: 'Nose',             x: 150, y: 50,  z: 0.0, group: 'head', category: 'Head Position', confidence: 99.8 },
  { id: 1,  name: 'Left Eye Inner',   x: 142, y: 44,  z: 0.0, group: 'head', category: 'Head Position', confidence: 99.4 },
  { id: 2,  name: 'Left Eye',         x: 138, y: 44,  z: 0.0, group: 'head', confidence: 99.5 },
  { id: 3,  name: 'Left Eye Outer',   x: 134, y: 44,  z: 0.0, group: 'head', confidence: 99.2 },
  { id: 4,  name: 'Right Eye Inner',  x: 158, y: 44,  z: 0.0, group: 'head', category: 'Head Position', confidence: 99.4 },
  { id: 5,  name: 'Right Eye',        x: 162, y: 44,  z: 0.0, group: 'head', category: 'Head Position', confidence: 99.5 },
  { id: 6,  name: 'Right Eye Outer',  x: 166, y: 44,  z: 0.0, group: 'head', category: 'Head Position', confidence: 99.2 },
  { id: 7,  name: 'Left Ear',         x: 125, y: 48,  z: 0.0, group: 'head', category: 'Head Position', confidence: 98.6 },
  { id: 8,  name: 'Right Ear',        x: 175, y: 48,  z: 0.0, group: 'head', category: 'Head Position', confidence: 98.6 },
  { id: 9,  name: 'Mouth Left',       x: 142, y: 62,  z: 0.0, group: 'head', category: 'Head Position', confidence: 99.1 },
  { id: 10, name: 'Mouth Right',      x: 158, y: 62,  z: 0.0, group: 'head', category: 'Head Position', confidence: 99.1 },

  // Torso context
  { id: 23, name: 'Left Hip',         x: 125, y: 220, z: 0.0, group: 'torso', category: 'Torso Position', confidence: 99.1 },
  { id: 24, name: 'Right Hip',        x: 175, y: 220, z: 0.0, group: 'torso', category: 'Torso Position', confidence: 99.1 },
];

export const POSE_CONNECTIONS = [
  // Head
  [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [3, 7], [6, 8], [9, 10],
  // Shoulders & Clavicle
  [11, 29], [29, 12], [11, 12],
  // Torso
  [11, 23], [12, 24], [23, 24],
  // Arms (Shoulder -> Arm -> Forearm -> Wrist)
  [11, 13], [13, 30], [30, 15],
  [12, 14], [14, 31], [31, 16],
  // Hands & Palm
  [15, 32], [32, 17], [32, 19], [32, 21],
  [16, 33], [33, 18], [33, 20], [33, 22],
];

export const GROUP_COLORS = {
  // Tracked landmarks exact groups
  'Finger Joints':      '#f59e0b',
  'Palm Position':      '#ec4899',
  'Wrist Position':     '#a855f7',
  'Arm Position':       '#3b82f6',
  'Shoulder Position':  '#10b981',

  // Raw component mappings
  wrist:    '#a855f7',
  palm:     '#ec4899',
  thumb:    '#f59e0b',
  index:    '#3b82f6',
  middle:   '#10b981',
  ring:     '#ec4899',
  pinky:    '#06b6d4',
  finger:   '#f59e0b',
  arm:      '#3b82f6',
  shoulder: '#10b981',
  head:     '#c084fc',
  torso:    '#38bdf8',
  leg:      '#fbbf24',
};

export const TRACKING_STATS_SUMMARY = {
  avgConfidence: 98.4,
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
