export const assessmentLevels = [
  { id: 'beginner', title: 'Beginner', description: 'Basic alphabet and common words.' },
  { id: 'intermediate', title: 'Intermediate', description: 'Phrases and conversational signs.' },
  { id: 'advanced', title: 'Advanced', description: 'Complex grammar and fast-paced signing.' },
  { id: 'professional', title: 'Professional', description: 'Specialized vocabulary (medical, legal, etc.).' },
];

export const assessmentsList = [
  {
    id: 'A001',
    title: 'ASL Alphabet Mastery',
    category: 'Fundamentals',
    level: 'Beginner',
    difficulty: 'Easy',
    duration: '15 mins',
    questionsCount: 10,
    passingScore: 80,
    skillsCovered: ['A-Z Alphabet', 'Finger spelling', 'Basic Numbers'],
    instructions: 'Identify the ASL letter or number shown in the image or perform the gesture requested. You need at least 80% to pass.',
    status: 'Available',
    color: [34, 197, 94]
  },
  {
    id: 'A002',
    title: 'Common Greetings & Phrases',
    category: 'Conversational',
    level: 'Intermediate',
    difficulty: 'Medium',
    duration: '20 mins',
    questionsCount: 15,
    passingScore: 85,
    skillsCovered: ['Greetings', 'Polite phrases', 'Introductions'],
    instructions: 'Translate the given phrases into ASL or identify the meaning of the signed phrases. Accuracy and speed will be measured.',
    status: 'Recommended',
    color: [59, 130, 246]
  },
  {
    id: 'A003',
    title: 'Advanced Grammar & Syntax',
    category: 'Grammar',
    level: 'Advanced',
    difficulty: 'Hard',
    duration: '30 mins',
    questionsCount: 20,
    passingScore: 90,
    skillsCovered: ['Facial Expressions', 'Spatial Referencing', 'Tense'],
    instructions: 'Advanced assessment focusing on non-manual signals and complex sentence structures.',
    status: 'Upcoming',
    color: [236, 72, 153]
  },
  {
    id: 'A004',
    title: 'Medical & Emergency Signs',
    category: 'Specialized',
    level: 'Professional',
    difficulty: 'Expert',
    duration: '40 mins',
    questionsCount: 25,
    passingScore: 95,
    skillsCovered: ['Health', 'Emergency Situations', 'Anatomy'],
    instructions: 'Professional level test for medical interpreters. High accuracy required.',
    status: 'Available',
    color: [168, 85, 247]
  }
];

export const assessmentQuestions = {
  'A001': [
    {
      id: 'q1',
      type: 'multiple-choice',
      prompt: 'Which ASL letter is represented by a closed fist with the thumb resting along the side of the index finger?',
      image: 'placeholder',
      options: ['A', 'S', 'T', 'E'],
      correctAnswer: 'A'
    },
    {
      id: 'q2',
      type: 'performance',
      prompt: 'Sign the letter "B" with your dominant hand facing forward',
      options: [],
      correctAnswer: 'B_gesture_match'
    },
    {
      id: 'q3',
      type: 'multiple-choice',
      prompt: 'Which ASL letter is formed with the thumb tucked under the index finger?',
      options: ['M', 'N', 'T', 'S'],
      correctAnswer: 'T'
    },
    {
      id: 'q4',
      type: 'performance',
      prompt: 'Sign the number "3" (Thumb, index, and middle finger extended)',
      options: [],
      correctAnswer: '3_gesture_match'
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      prompt: 'What is the correct palm orientation when signing the letter "C"?',
      options: ['Facing inward toward chest', 'Facing outward/sideways', 'Facing directly downward', 'Facing backwards'],
      correctAnswer: 'Facing outward/sideways'
    }
  ],
  'A002': [
    {
      id: 'q201',
      type: 'multiple-choice',
      prompt: 'What is the correct starting movement when signing "Hello" in ASL?',
      options: ['A salute motion starting from the temple', 'A wave from the hip', 'Touching chin with both index fingers', 'Tapping the collarbone'],
      correctAnswer: 'A salute motion starting from the temple'
    },
    {
      id: 'q202',
      type: 'performance',
      prompt: 'Perform the sign for "Thank You" (Flat hand touching chin and moving outward toward the viewer)',
      options: [],
      correctAnswer: 'thank_you_gesture_match'
    },
    {
      id: 'q203',
      type: 'multiple-choice',
      prompt: 'How do you sign "Please" in ASL?',
      options: ['Flat hand rubbing circular motion on the chest', 'Fist knocking against open palm', 'Index finger touching nose then ear', 'Two fingers crossed at chest height'],
      correctAnswer: 'Flat hand rubbing circular motion on the chest'
    },
    {
      id: 'q204',
      type: 'performance',
      prompt: 'Sign "Nice to meet you" or the greeting gesture',
      options: [],
      correctAnswer: 'greeting_gesture_match'
    },
    {
      id: 'q205',
      type: 'multiple-choice',
      prompt: 'Which non-manual signal is critical when asking a "Wh-" question (Who, What, Where)?',
      options: ['Eyebrows furrowed/lowered slightly', 'Eyebrows raised high', 'Eyes closed', 'Head tilted backwards'],
      correctAnswer: 'Eyebrows furrowed/lowered slightly'
    }
  ],
  'A003': [
    {
      id: 'q301',
      type: 'multiple-choice',
      prompt: 'In ASL grammar, what is the most common default sentence structure for declarative statements?',
      options: ['Topic - Comment (Time-Topic-Comment)', 'Subject - Verb - Object only', 'Object - Verb - Subject', 'Verb - Adverb - Noun'],
      correctAnswer: 'Topic - Comment (Time-Topic-Comment)'
    },
    {
      id: 'q302',
      type: 'performance',
      prompt: 'Demonstrate spatial referencing: establish a referent index point on your left side',
      options: [],
      correctAnswer: 'spatial_ref_gesture_match'
    },
    {
      id: 'q303',
      type: 'multiple-choice',
      prompt: 'How is past tense typically indicated in an ASL sentence?',
      options: ['By establishing a time indicator (e.g., YESTERDAY / PAST) moving toward the shoulder at the beginning', 'By adding an "-ed" finger spelling suffix', 'By blinking twice rapidly', 'By repeating the verb 3 times'],
      correctAnswer: 'By establishing a time indicator (e.g., YESTERDAY / PAST) moving toward the shoulder at the beginning'
    },
    {
      id: 'q304',
      type: 'performance',
      prompt: 'Sign a conditional clause with raised eyebrows and slight head tilt',
      options: [],
      correctAnswer: 'conditional_clause_gesture_match'
    }
  ],
  'A004': [
    {
      id: 'q401',
      type: 'multiple-choice',
      prompt: 'How is the sign for "Doctor" typically executed in American Sign Language?',
      options: ['Tapping the inner wrist (pulse area) with the dominant "M" or curved handshape', 'Touching forehead with thumb', 'Making a stethoscope circular motion', 'Crossing arms across chest'],
      correctAnswer: 'Tapping the inner wrist (pulse area) with the dominant "M" or curved handshape'
    },
    {
      id: 'q402',
      type: 'performance',
      prompt: 'Sign the emergency alert gesture for "Hurt / Pain" by twisting both index fingers toward each other',
      options: [],
      correctAnswer: 'pain_gesture_match'
    },
    {
      id: 'q403',
      type: 'multiple-choice',
      prompt: 'What is the standard ASL sign for "Hospital"?',
      options: ['Drawing an "H" cross shape on the upper arm with the index and middle fingers', 'Tapping the chest twice', 'Spelling H-O-S-P', 'Pointing to an imaginary ambulance siren'],
      correctAnswer: 'Drawing an "H" cross shape on the upper arm with the index and middle fingers'
    },
    {
      id: 'q404',
      type: 'performance',
      prompt: 'Perform the sign for "Emergency" (Shaking an "E" handshape back and forth with urgency)',
      options: [],
      correctAnswer: 'emergency_gesture_match'
    }
  ]
};

/**
 * Safely retrieves questions for any assessment, with guaranteed fallback questions
 */
export function getAssessmentQuestions(assessmentId) {
  if (assessmentQuestions[assessmentId] && assessmentQuestions[assessmentId].length > 0) {
    return assessmentQuestions[assessmentId];
  }

  // Find assessment metadata to build contextual fallback questions
  const meta = assessmentsList.find(a => a.id === assessmentId);
  const title = meta ? meta.title : 'Sign Language Assessment';

  return [
    {
      id: `${assessmentId}_q1`,
      type: 'multiple-choice',
      prompt: `Identify the core sign technique required for ${title}:`,
      options: ['Dominant hand lead with steady baseline', 'Rapid alternating wrist motions', 'Signing strictly behind shoulder plane', 'Static fingers without orientation'],
      correctAnswer: 'Dominant hand lead with steady baseline'
    },
    {
      id: `${assessmentId}_q2`,
      type: 'performance',
      prompt: `Demonstrate the foundational gesture for ${title}`,
      options: [],
      correctAnswer: 'standard_gesture_match'
    },
    {
      id: `${assessmentId}_q3`,
      type: 'multiple-choice',
      prompt: 'What is the primary function of facial expressions (non-manual markers) in ASL?',
      options: ['Conveying grammatical nuances, question types, and emotional depth', 'Just decoration and acting', 'Keeping the signer awake', 'Replacing hand movements completely'],
      correctAnswer: 'Conveying grammatical nuances, question types, and emotional depth'
    }
  ];
}

export const assessmentHistory = [
  {
    id: 'H001',
    assessmentId: 'A001',
    assessmentName: 'ASL Alphabet Mastery',
    date: '2026-06-15',
    score: 95,
    duration: '12 mins',
    result: 'Pass',
    accuracy: '95%'
  },
  {
    id: 'H002',
    assessmentId: 'A002',
    assessmentName: 'Common Greetings & Phrases',
    date: '2026-07-01',
    score: 75,
    duration: '18 mins',
    result: 'Fail',
    accuracy: '75%'
  }
];

export const initialCertificatesList = [
  {
    id: 'C001',
    courseId: 'asl-fundamentals-101',
    courseName: 'Foundations of American Sign Language (ASL)',
    learnerName: 'Alex Morgan',
    issueDate: '2026-06-15',
    status: 'Unlocked',
    level: 'Beginner',
    score: 96,
    verificationId: 'CERT-SLAI-84729102'
  },
  {
    id: 'C002',
    courseId: 'everyday-comm-201',
    courseName: 'Everyday Signs for Daily Conversations',
    learnerName: 'Alex Morgan',
    issueDate: 'N/A',
    status: 'Locked',
    level: 'Intermediate',
    score: 88,
    progress: 80
  },
  {
    id: 'C003',
    courseId: 'professional-sign-301',
    courseName: 'Professional & Workplace Sign Communication',
    learnerName: 'Alex Morgan',
    issueDate: 'N/A',
    status: 'Locked',
    level: 'Professional',
    score: 92,
    progress: 15
  }
];

export const certificatesList = initialCertificatesList;

export function getUserCertificates(userEmail = 'default') {
  try {
    const key = `mira_user_certificates_${userEmail}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const customCerts = JSON.parse(stored);
      // Merge with initial, replacing matching IDs
      const merged = [...customCerts];
      initialCertificatesList.forEach(ic => {
        if (!merged.some(m => m.id === ic.id || m.courseId === ic.courseId)) {
          merged.push(ic);
        }
      });
      return merged;
    }
  } catch (e) {
    console.error('Error loading user certificates', e);
  }
  return initialCertificatesList;
}

export function saveUserCertificate(cert, userEmail = 'default') {
  try {
    const key = `mira_user_certificates_${userEmail}`;
    const current = getUserCertificates(userEmail);
    const existingIdx = current.findIndex(c => c.id === cert.id || (c.courseId && c.courseId === cert.courseId));
    let updated;
    if (existingIdx >= 0) {
      updated = [...current];
      updated[existingIdx] = { ...updated[existingIdx], ...cert, status: 'Unlocked' };
    } else {
      updated = [cert, ...current];
    }
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving user certificate', e);
    return [cert];
  }
}
