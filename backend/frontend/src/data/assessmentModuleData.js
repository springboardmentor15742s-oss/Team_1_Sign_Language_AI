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
      prompt: 'Which ASL letter is this?',
      image: 'placeholder',
      options: ['A', 'S', 'T', 'E'],
      correctAnswer: 'A'
    },
    {
      id: 'q2',
      type: 'performance',
      prompt: 'Sign the letter "B"',
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
      prompt: 'Sign the number "3"',
      options: [],
      correctAnswer: '3_gesture_match'
    }
  ]
};

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

export const certificatesList = [
  {
    id: 'C001',
    courseName: 'ASL Alphabet Mastery',
    learnerName: 'Alex Morgan',
    issueDate: '2026-06-15',
    status: 'Unlocked',
    level: 'Beginner',
    verificationId: 'CERT-8472-9102'
  },
  {
    id: 'C002',
    courseName: 'Conversational ASL I',
    learnerName: 'Alex Morgan',
    issueDate: 'N/A',
    status: 'Locked',
    level: 'Intermediate',
    progress: 80
  },
  {
    id: 'C003',
    courseName: 'Professional Interpreter (Medical)',
    learnerName: 'Alex Morgan',
    issueDate: 'N/A',
    status: 'Locked',
    level: 'Professional',
    progress: 15
  }
];
