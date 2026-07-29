// src/data/dashboardData.js

export const instructorData = {
  stats: [
    { label: 'Total Students', value: '1,248', change: '+12% this month', color: [168, 85, 247], icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Active Courses', value: '12', change: '+2 new', color: [59, 130, 246], icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { label: 'Pending Assessments', value: '34', change: '-5 from yesterday', color: [245, 158, 11], icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { label: 'Avg Student Accuracy', value: '92.4%', change: '+1.2% AI score', color: [34, 197, 94], icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ],
  students: [
    { id: 1, name: 'Sarah Connor', course: 'ASL Beginner', accuracy: '95%', status: 'Excellent', color: [34, 197, 94] },
    { id: 2, name: 'John Smith', course: 'Intermediate Signs', accuracy: '82%', status: 'Needs Practice', color: [245, 158, 11] },
    { id: 3, name: 'Emily Davis', course: 'ASL Beginner', accuracy: '89%', status: 'Good', color: [59, 130, 246] },
    { id: 4, name: 'Michael Brown', course: 'Advanced Grammar', accuracy: '98%', status: 'Mastered', color: [168, 85, 247] },
  ],
  notifications: [
    { id: 1, text: 'Sarah Connor submitted an assessment.', time: '10 mins ago', color: [59, 130, 246] },
    { id: 2, text: 'Your "ASL Beginner" course reached 500 students.', time: '1 hour ago', color: [168, 85, 247] },
    { id: 3, text: 'System maintenance scheduled for tonight.', time: '5 hours ago', color: [245, 158, 11] },
  ],
  weeklyActivity: [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 52 },
    { day: 'Wed', value: 38 },
    { day: 'Thu', value: 65 },
    { day: 'Fri', value: 48 },
    { day: 'Sat', value: 80 },
    { day: 'Sun', value: 20 },
  ]
};

export const trainerData = {
  stats: [
    { label: 'Active Learners', value: '86', change: '+5 this week', color: [168, 85, 247], icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Skill Improvement', value: '28%', change: 'Avg per month', color: [34, 197, 94], icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Completed Sessions', value: '142', change: '+12 from last week', color: [59, 130, 246], icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { label: 'Certifications Issued', value: '56', change: '+3 new', color: [245, 158, 11], icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  ],
  learners: [
    { id: 1, name: 'Alice Walker', focus: 'Facial Expressions', progress: 75, status: 'On Track', color: [34, 197, 94] },
    { id: 2, name: 'Tom Hardy', focus: 'Hand Shape Clarity', progress: 45, status: 'Needs Attention', color: [239, 68, 68] },
    { id: 3, name: 'Jessica Lee', focus: 'Fluidity & Speed', progress: 92, status: 'Ready for Cert', color: [59, 130, 246] },
  ],
  activities: [
    { id: 1, text: 'Alice Walker completed Session 4.', time: '20 mins ago', color: [34, 197, 94] },
    { id: 2, text: 'Tom Hardy missed 3 practice days.', time: '2 hours ago', color: [239, 68, 68] },
    { id: 3, text: 'Issued Level 1 Certificate to Jessica Lee.', time: '1 day ago', color: [245, 158, 11] },
  ],
  weeklyProgress: [
    { day: 'Mon', value: 20 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 70 },
    { day: 'Fri', value: 50 },
    { day: 'Sat', value: 90 },
    { day: 'Sun', value: 25 },
  ]
};

export const adminData = {
  stats: [
    { label: 'Total Users', value: '54,231', change: '+2.4k this month', color: [59, 130, 246], icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Active Learners', value: '48,102', change: '+1.8k this month', color: [168, 85, 247], icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Total Courses', value: '284', change: '+14 new', color: [245, 158, 11], icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { label: 'Daily Active Users', value: '14,592', change: '+5% this week', color: [34, 197, 94], icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  ],
  users: [
    { id: 1, name: 'David Lee', email: 'david@example.com', role: 'Instructor', status: 'Active', color: [59, 130, 246] },
    { id: 2, name: 'Maria Garcia', email: 'maria@example.com', role: 'Learner', status: 'Active', color: [168, 85, 247] },
    { id: 3, name: 'James Wilson', email: 'james@example.com', role: 'Trainer', status: 'Offline', color: [156, 163, 175] },
    { id: 4, name: 'Linda Martinez', email: 'linda@example.com', role: 'Admin', status: 'Active', color: [245, 158, 11] },
  ],
  activities: [
    { id: 1, text: 'New instructor account approved (David Lee).', time: '30 mins ago', color: [59, 130, 246] },
    { id: 2, text: 'System backup completed successfully.', time: '4 hours ago', color: [34, 197, 94] },
    { id: 3, text: 'High CPU usage detected on Node 3.', time: '1 day ago', color: [239, 68, 68] },
  ],
  systemHealth: [
    { metric: 'CPU Usage', value: '42%', status: 'Normal', color: [34, 197, 94] },
    { metric: 'Memory Usage', value: '78%', status: 'Warning', color: [245, 158, 11] },
    { metric: 'Network Latency', value: '12ms', status: 'Normal', color: [34, 197, 94] },
    { metric: 'Active Sessions', value: '2,401', status: 'Normal', color: [59, 130, 246] },
  ],
  analyticsChart: [
    { day: 'Mon', value: 12000 },
    { day: 'Tue', value: 13500 },
    { day: 'Wed', value: 14200 },
    { day: 'Thu', value: 13800 },
    { day: 'Fri', value: 15100 },
    { day: 'Sat', value: 18400 },
    { day: 'Sun', value: 16000 },
  ]
};
