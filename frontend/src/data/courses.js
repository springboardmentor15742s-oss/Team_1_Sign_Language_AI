// src/data/courses.js
// Infosys Springboard Sign Language AI Sign Language Learning & Assessment Platform

export const COURSE_CATEGORIES = [
  "All Categories",
  "Beginner Sign Language",
  "Intermediate Sign Language",
  "Advanced Sign Language",
  "Everyday Communication",
  "Educational Vocabulary",
  "Professional Communication"
];

export const MOCK_COURSES = [
  {
    id: "asl-fundamentals-101",
    title: "Foundations of American Sign Language (ASL)",
    description: "Master the fundamental alphabets, fingerspelling techniques, basic numbers, and introductory conversational greetings in ASL with AI gesture feedback.",
    longDescription: "This comprehensive course is designed for absolute beginners entering the world of Sign Language. You will build a solid foundation in American Sign Language (ASL) mechanics, non-manual markers (facial expressions), space orientation, and core daily vocabulary. Through step-by-step video demonstrations and interactive practice modules, you will achieve confidence in basic sign communication.",
    category: "Beginner Sign Language",
    difficulty: "Beginner",
    duration: "4 Weeks · 8.5 Hours",
    estimatedHours: 8.5,
    progress: 75,
    rating: 4.9,
    totalStudents: 3420,
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isRecommended: true,
    isRecentlyViewed: true,
    instructor: {
      name: "Dr. Elena Rostova",
      title: "Senior ASL Specialist & Deaf Culture Educator",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      bio: "Dr. Rostova has taught sign language for over 14 years and leads accessible curriculum design for global springboard programs.",
      rating: 4.95,
      coursesCount: 6
    },
    skillsCovered: [
      "ASL Alphabet (A-Z)",
      "Numbers 1-100",
      "Fingerspelling Speed & Flow",
      "Basic Greetings & Introductions",
      "Non-Manual Expressions"
    ],
    prerequisites: [
      "No prior sign language knowledge required",
      "Webcam for interactive AI gesture assessment"
    ],
    learningObjectives: [
      "Recognize and produce all 26 ASL alphabet handshapes accurately",
      "Execute numbers 1 to 100 with clear spatial orientation",
      "Engage in 2-minute introductory dialogues with fluent deaf signers",
      "Understand fundamental facial cues and grammatical syntax in ASL"
    ],
    modules: [
      {
        id: "mod-101-1",
        title: "Module 1: The ASL Manual Alphabet & Numbers",
        duration: "2.5 Hours",
        lessons: [
          {
            id: "les-101-1",
            title: "ASL Alphabet A through M",
            duration: "15 mins",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder embedded video fallback
            videoPoster: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
            notes: "Keep your dominant hand positioned comfortably in front of your shoulder. Focus on clean knuckle bends for letters 'E' and 'M'. Maintain static hand positioning without excessive wrist shaking.",
            resources: [
              { name: "ASL_Alphabet_CheatSheet_A-M.pdf", type: "PDF Document", size: "1.8 MB", url: "#" },
              { name: "Handshape_Reference_Guide.png", type: "Image Asset", size: "840 KB", url: "#" }
            ],
            practicePrompt: "Show handshapes A, B, C, D, and E clearly to the AI camera."
          },
          {
            id: "les-101-2",
            title: "ASL Alphabet N through Z",
            duration: "20 mins",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
            notes: "Pay special attention to the dynamic movement in 'Z' (drawing in the air) and 'J' (curving the pinky). Ensure clear visibility under good lighting.",
            resources: [
              { name: "ASL_Alphabet_CheatSheet_N-Z.pdf", type: "PDF Document", size: "2.1 MB", url: "#" }
            ],
            practicePrompt: "Fingerspell your full name using the camera practice tool."
          },
          {
            id: "les-101-3",
            title: "Fingerspelling Rhythm & Clarity",
            duration: "25 mins",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
            notes: "Clarity is more important than speed. Avoid bouncing your hand between letters. Smooth transitions build natural sign fluency.",
            resources: [
              { name: "Fingerspelling_Drills.pdf", type: "PDF Document", size: "1.2 MB", url: "#" }
            ],
            practicePrompt: "Fingerspell 10 common words detected by the Sign Language AI vision engine."
          }
        ]
      },
      {
        id: "mod-101-2",
        title: "Module 2: Essential Greetings & Courtesy Signs",
        duration: "3.0 Hours",
        lessons: [
          {
            id: "les-101-4",
            title: "Greetings, Hello & Welcome",
            duration: "18 mins",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
            notes: "'Hello' starts near the forehead with an open palm moving outward gently. Combine with a warm, welcoming facial expression.",
            resources: [
              { name: "Greetings_Vocabulary_Cards.pdf", type: "Flashcards", size: "3.4 MB", url: "#" }
            ],
            practicePrompt: "Perform 'Hello', 'Good Morning', and 'Nice to Meet You' gestures."
          },
          {
            id: "les-101-5",
            title: "Please, Thank You, and You're Welcome",
            duration: "22 mins",
            completed: false,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
            notes: "'Thank You' moves from fingertips touching chin outward toward the receiver. Ensure your chin gesture is smooth.",
            resources: [
              { name: "Courtesy_Signs_Guide.pdf", type: "PDF Document", size: "1.5 MB", url: "#" }
            ],
            practicePrompt: "Practice sign pair: 'Thank You' + 'You're Welcome'."
          },
          {
            id: "les-101-6",
            title: "Asking 'How Are You?' and Expressing Feelings",
            duration: "30 mins",
            completed: false,
            locked: true,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
            notes: "Questions in ASL require raised eyebrows (for WH-questions vs Y/N questions). Practice facial movements simultaneously.",
            resources: [
              { name: "Emotion_Signs_Worksheet.pdf", type: "PDF Document", size: "2.8 MB", url: "#" }
            ],
            practicePrompt: "Sign three emotional states: Happy, Excited, Fine."
          }
        ]
      }
    ]
  },
  {
    id: "everyday-comm-201",
    title: "Everyday Signs for Daily Conversations",
    description: "Expand your expressive ability with practical vocabulary for home, family, food, weather, time, and daily routines.",
    longDescription: "Transition from basic letters to complete conversational sentences. This course focuses on practical, everyday communication contexts including talking about family members, ordering food, describing weather conditions, discussing daily schedules, and navigating community spaces.",
    category: "Everyday Communication",
    difficulty: "Intermediate",
    duration: "5 Weeks · 10.0 Hours",
    estimatedHours: 10.0,
    progress: 40,
    rating: 4.8,
    totalStudents: 2180,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isRecommended: true,
    isRecentlyViewed: false,
    instructor: {
      name: "Marcus Vance",
      title: "Deaf Community Advocate & Interpreter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Marcus has trained over 5,000 students in real-world sign fluency and inclusive communication.",
      rating: 4.88,
      coursesCount: 4
    },
    skillsCovered: [
      "Family & Relationship Vocabulary",
      "Food, Drinks & Meal Ordering",
      "Time, Days & Calendar Signs",
      "Weather & Seasons",
      "Spatial Reference & Classifiers"
    ],
    prerequisites: [
      "Basic ASL Alphabet knowledge",
      "Completion of ASL Fundamentals or equivalent"
    ],
    learningObjectives: [
      "Formulate short conversational sentences in ASL structure (Time-Topic-Comment)",
      "Sign family structures, relatives, and relationships with proper gender orientation",
      "Express preferences, likes/dislikes, and needs effectively"
    ],
    modules: [
      {
        id: "mod-201-1",
        title: "Module 1: Family & People Signs",
        duration: "3.5 Hours",
        lessons: [
          {
            id: "les-201-1",
            title: "Family Members (Mother, Father, Siblings)",
            duration: "20 mins",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
            notes: "Male signs are positioned near the forehead; female signs are positioned near the chin. Keep gender locations consistent.",
            resources: [
              { name: "Family_Trees_Signs.pdf", type: "PDF Document", size: "2.4 MB", url: "#" }
            ],
            practicePrompt: "Sign Mother, Father, Brother, Sister, and Friend."
          },
          {
            id: "les-201-2",
            title: "Describing People & Qualities",
            duration: "25 mins",
            completed: false,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
            notes: "Adjectives usually follow nouns in ASL sentence structure. Practice 'Person + Tall + Friendly'.",
            resources: [
              { name: "Descriptive_Adjectives.pdf", type: "PDF Document", size: "1.9 MB", url: "#" }
            ],
            practicePrompt: "Describe a friend using 3 sign adjectives."
          }
        ]
      }
    ]
  },
  {
    id: "professional-sign-301",
    title: "Professional & Workplace Sign Communication",
    description: "Master specialized sign vocabulary for corporate settings, meetings, interviews, tech terms, and inclusive workplace interactions.",
    longDescription: "Tailored for professionals, software engineers, managers, and HR representatives. Learn essential corporate terminology, IT & tech concepts, meeting facilitation gestures, and respectful workplace accommodations in Sign Language.",
    category: "Professional Communication",
    difficulty: "Advanced",
    duration: "6 Weeks · 12.0 Hours",
    estimatedHours: 12.0,
    progress: 15,
    rating: 4.95,
    totalStudents: 1890,
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isRecommended: true,
    isRecentlyViewed: true,
    instructor: {
      name: "Sophia Chen",
      title: "Corporate Diversity & Accessibility Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      bio: "Sophia specializes in tech industry accessibility standards and enterprise sign language integration.",
      rating: 4.97,
      coursesCount: 5
    },
    skillsCovered: [
      "Tech & Software Vocabulary",
      "Meeting & Presentation Gestures",
      "HR, Hiring & Interviewing Signs",
      "Workplace Accommodations",
      "Formal Professional Etiquette"
    ],
    prerequisites: [
      "Intermediate Sign Language Proficiency",
      "Understanding of basic grammar structure"
    ],
    learningObjectives: [
      "Conduct professional introductions and team check-ins in ASL",
      "Sign core IT/Engineering terms (Code, Database, Sprint, Review, Bug)",
      "Facilitate inclusive hybrid meetings with deaf colleagues"
    ],
    modules: [
      {
        id: "mod-301-1",
        title: "Module 1: Tech & Business Terms",
        duration: "4.0 Hours",
        lessons: [
          {
            id: "les-301-1",
            title: "Software Engineering & Computer Signs",
            duration: "30 mins",
            completed: true,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
            notes: "Computer is signed with a 'C' handshape moving along the forearm. Technology uses the middle finger tapping the side of the non-dominant palm.",
            resources: [
              { name: "Tech_Glossary_Signs.pdf", type: "PDF Document", size: "3.1 MB", url: "#" }
            ],
            practicePrompt: "Sign 'Computer', 'Software', 'Data', and 'Internet'."
          },
          {
            id: "les-301-2",
            title: "Agile Standups & Sprint Planning Signs",
            duration: "25 mins",
            completed: false,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
            notes: "'Goal', 'Deadline', 'Task', and 'Finished' signs are key for daily standup updates.",
            resources: [
              { name: "Agile_Sign_Reference.pdf", type: "PDF Document", size: "2.0 MB", url: "#" }
            ],
            practicePrompt: "Give a 30-second standup update using learned signs."
          }
        ]
      }
    ]
  },
  {
    id: "edu-vocab-401",
    title: "Educational Vocabulary & Academic Signs",
    description: "Designed for teachers, students, and academic professionals to communicate effectively in classroom and learning environments.",
    longDescription: "Empower classrooms with inclusive communication. Learn educational terms, subject names (Math, Science, History, Art), classroom instructions, exam terminology, and student support gestures.",
    category: "Educational Vocabulary",
    difficulty: "Intermediate",
    duration: "4 Weeks · 7.0 Hours",
    estimatedHours: 7.0,
    progress: 0,
    rating: 4.75,
    totalStudents: 1450,
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isRecommended: true,
    isRecentlyViewed: false,
    instructor: {
      name: "Dr. David Sterling",
      title: "Professor of Inclusive Education",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      bio: "Dr. Sterling advocates for bilingual deaf education in primary and secondary school systems.",
      rating: 4.82,
      coursesCount: 3
    },
    skillsCovered: [
      "Academic Subject Signs",
      "Classroom Instructions & Directives",
      "Assessment & Grading Vocabulary",
      "Library & Research Terminology"
    ],
    prerequisites: ["Beginner Sign Language Foundations"],
    learningObjectives: [
      "Sign instructions such as 'Open Book', 'Write', 'Listen', 'Ask Question'",
      "Communicate academic subjects and learning milestones clearly"
    ],
    modules: [
      {
        id: "mod-401-1",
        title: "Module 1: Classroom Fundamentals",
        duration: "2.5 Hours",
        lessons: [
          {
            id: "les-401-1",
            title: "School Subjects & Major Courses",
            duration: "20 mins",
            completed: false,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
            notes: "Math signs utilize double-tap motions with 'M' handshapes. Science uses rotating 'S' handshapes.",
            resources: [
              { name: "Academic_Subjects_List.pdf", type: "PDF Document", size: "1.4 MB", url: "#" }
            ],
            practicePrompt: "Sign Math, Science, English, and History."
          }
        ]
      }
    ]
  },
  {
    id: "advanced-asl-501",
    title: "Advanced ASL Syntax, Classifiers & Storytelling",
    description: "Delve into complex visual spatial grammar, dynamic classifiers, facial registers, and expressive storytelling techniques.",
    longDescription: "For advanced learners striving for native-like expressive fluency. Master semantic classifiers (CL:1, CL:3, CL:V, CL:C), spatial mapping, role shifting, idiom translation, and artistic sign poetry.",
    category: "Advanced Sign Language",
    difficulty: "Advanced",
    duration: "8 Weeks · 16.0 Hours",
    estimatedHours: 16.0,
    progress: 0,
    rating: 4.98,
    totalStudents: 920,
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isRecommended: false,
    isRecentlyViewed: false,
    instructor: {
      name: "Dr. Elena Rostova",
      title: "Senior ASL Specialist & Deaf Culture Educator",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      bio: "Dr. Rostova has taught sign language for over 14 years and leads accessible curriculum design.",
      rating: 4.95,
      coursesCount: 6
    },
    skillsCovered: [
      "Classifiers (CL:1, CL:3, CL:4, CL:V, CL:C)",
      "Role-Shifting & Perspective Taking",
      "Spatial Mapping & Conceptual Accuracy",
      "ASL Storytelling & De’VIA Art"
    ],
    prerequisites: ["Intermediate ASL Proficiency"],
    learningObjectives: [
      "Utilize classifiers to paint detailed visual scenes of motion and object characteristics",
      "Demonstrate seamless role shifts during narrative dialogues"
    ],
    modules: [
      {
        id: "mod-501-1",
        title: "Module 1: Mastering Spatial Classifiers",
        duration: "4.0 Hours",
        lessons: [
          {
            id: "les-501-1",
            title: "Introduction to Vehicle & Person Classifiers",
            duration: "35 mins",
            completed: false,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
            notes: "Classifiers replace nouns to depict movement, location, size, and shape in 3D space.",
            resources: [
              { name: "Classifier_Handshapes.pdf", type: "PDF Document", size: "4.2 MB", url: "#" }
            ],
            practicePrompt: "Demonstrate a car driving up a steep hill using CL:3."
          }
        ]
      }
    ]
  },
  {
    id: "intermediate-asl-202",
    title: "Intermediate Conversational Fluency",
    description: "Bridge the gap between beginner signs and fluid conversation with complex sentence structures and natural pacing.",
    longDescription: "Develop rapid comprehension and expressive agility. Focus on question structures, directional verbs, time-sequencing signs, and conversational idioms.",
    category: "Intermediate Sign Language",
    difficulty: "Intermediate",
    duration: "5 Weeks · 9.5 Hours",
    estimatedHours: 9.5,
    progress: 10,
    rating: 4.86,
    totalStudents: 1640,
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isRecommended: true,
    isRecentlyViewed: false,
    instructor: {
      name: "Marcus Vance",
      title: "Deaf Community Advocate & Interpreter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      bio: "Marcus has trained over 5,000 students in real-world sign fluency.",
      rating: 4.88,
      coursesCount: 4
    },
    skillsCovered: [
      "Directional Verbs (Give-to, Help-you)",
      "Time Markers & Sequencing",
      "Opinion & Debate Gestures",
      "Expressive Speed Improvement"
    ],
    prerequisites: ["Beginner Sign Language Foundations"],
    learningObjectives: [
      "Express complex thoughts and personal experiences in correct ASL word order",
      "Understand rapid fingerspelling in context"
    ],
    modules: [
      {
        id: "mod-202-1",
        title: "Module 1: Directional Verbs & Flow",
        duration: "3.0 Hours",
        lessons: [
          {
            id: "les-202-1",
            title: "Inflecting Verbs for Directionality",
            duration: "25 mins",
            completed: false,
            locked: false,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            videoPoster: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
            notes: "Directional verbs incorporate subject and object into a single continuous sign movement.",
            resources: [
              { name: "Directional_Verbs_Chart.pdf", type: "PDF Document", size: "2.2 MB", url: "#" }
            ],
            practicePrompt: "Sign 'I help you' vs 'You help me' vs 'They help us'."
          }
        ]
      }
    ]
  }
];

/* Helper queries */
export function getCourses() {
  return MOCK_COURSES;
}

export function getCourseById(id) {
  return MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];
}

export function getLessonById(lessonId) {
  for (const course of MOCK_COURSES) {
    for (const mod of course.modules) {
      const found = mod.lessons.find(l => l.id === lessonId);
      if (found) {
        return {
          lesson: found,
          module: mod,
          course: course
        };
      }
    }
  }
  // Fallback to first lesson
  const firstCourse = MOCK_COURSES[0];
  const firstModule = firstCourse.modules[0];
  const firstLesson = firstModule.lessons[0];
  return {
    lesson: firstLesson,
    module: firstModule,
    course: firstCourse
  };
}

export function getContinueLearningCourses() {
  return MOCK_COURSES.filter(c => c.progress > 0 && c.progress < 100);
}

export function getRecommendedCourses() {
  return MOCK_COURSES.filter(c => c.isRecommended);
}

export function getPopularCourses() {
  return MOCK_COURSES.filter(c => c.isPopular);
}

export function getRecentlyViewedCourses() {
  return MOCK_COURSES.filter(c => c.isRecentlyViewed);
}
