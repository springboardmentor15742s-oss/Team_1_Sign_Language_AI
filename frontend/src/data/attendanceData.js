// src/data/attendanceData.js

export const learnerAttendanceList = [
  {
    id: 1,
    studentId: 'LRN-1001',
    name: 'Sarah Connor',
    email: 'sarah.c@example.com',
    course: 'ASL Beginner Fundamentals',
    attendanceRate: 96,
    sessionsAttended: 24,
    totalSessions: 25,
    lastCheckIn: 'Today, 09:15 AM',
    gestureAccuracy: '95.4%',
    overallScore: 92,
    status: 'Present',
    statusColor: [34, 197, 94],
  },
  {
    id: 2,
    studentId: 'LRN-1002',
    name: 'John Smith',
    email: 'john.s@example.com',
    course: 'Intermediate Conversational Signs',
    attendanceRate: 84,
    sessionsAttended: 21,
    totalSessions: 25,
    lastCheckIn: 'Yesterday, 02:30 PM',
    gestureAccuracy: '82.1%',
    overallScore: 79,
    status: 'Late',
    statusColor: [245, 158, 11],
  },
  {
    id: 3,
    studentId: 'LRN-1003',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    course: 'ASL Alphabet & Emergency Signs',
    attendanceRate: 92,
    sessionsAttended: 23,
    totalSessions: 25,
    lastCheckIn: 'Today, 10:00 AM',
    gestureAccuracy: '89.6%',
    overallScore: 88,
    status: 'Present',
    statusColor: [34, 197, 94],
  },
  {
    id: 4,
    studentId: 'LRN-1004',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    course: 'Advanced Facial & Body Grammar',
    attendanceRate: 100,
    sessionsAttended: 25,
    totalSessions: 25,
    lastCheckIn: 'Today, 08:45 AM',
    gestureAccuracy: '98.2%',
    overallScore: 97,
    status: 'Present',
    statusColor: [34, 197, 94],
  },
  {
    id: 5,
    studentId: 'LRN-1005',
    name: 'Alice Walker',
    email: 'alice.w@example.com',
    course: 'Accessibility & Tactile Signing',
    attendanceRate: 88,
    sessionsAttended: 22,
    totalSessions: 25,
    lastCheckIn: '2 days ago',
    gestureAccuracy: '87.5%',
    overallScore: 85,
    status: 'Absent',
    statusColor: [239, 68, 68],
  },
];

export const initialInstructorAttendance = [
  {
    id: 1,
    instructorId: 'INS-201',
    name: 'Prof. Sarah Jenkins',
    email: 'instructor@signai.com',
    date: 'March 05, 2026',
    checkInTime: '08:30 AM',
    checkOutTime: '04:30 PM',
    classesConducted: 4,
    hoursTaught: '7.5 hrs',
    status: 'Present',
    statusColor: [34, 197, 94],
  },
  {
    id: 2,
    instructorId: 'INS-202',
    name: 'David Lee',
    email: 'david@signai.com',
    date: 'March 05, 2026',
    checkInTime: '09:00 AM',
    checkOutTime: '05:00 PM',
    classesConducted: 3,
    hoursTaught: '6.0 hrs',
    status: 'Present',
    statusColor: [34, 197, 94],
  },
  {
    id: 3,
    instructorId: 'INS-203',
    name: 'Maria Garcia',
    email: 'maria.g@signai.com',
    date: 'March 04, 2026',
    checkInTime: '08:45 AM',
    checkOutTime: '04:15 PM',
    classesConducted: 4,
    hoursTaught: '7.0 hrs',
    status: 'Present',
    statusColor: [34, 197, 94],
  },
  {
    id: 4,
    instructorId: 'INS-204',
    name: 'Robert Thorne',
    email: 'robert.t@signai.com',
    date: 'March 04, 2026',
    checkInTime: '10:15 AM',
    checkOutTime: '03:30 PM',
    classesConducted: 2,
    hoursTaught: '4.5 hrs',
    status: 'Partial Day',
    statusColor: [245, 158, 11],
  },
];

export function getInstructorAttendance() {
  const saved = localStorage.getItem('mira_instructor_attendance');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialInstructorAttendance;
    }
  }
  return initialInstructorAttendance;
}

export function saveInstructorCheckIn(instructorName = 'Prof. Sarah Jenkins') {
  const current = getInstructorAttendance();
  const todayStr = 'March 05, 2026';
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newRecord = {
    id: Date.now(),
    instructorId: 'INS-201',
    name: instructorName,
    email: 'instructor@signai.com',
    date: todayStr,
    checkInTime: timeStr,
    checkOutTime: 'In Session',
    classesConducted: 1,
    hoursTaught: '1.5 hrs',
    status: 'Checked In',
    statusColor: [34, 197, 94],
  };

  const updated = [newRecord, ...current];
  localStorage.setItem('mira_instructor_attendance', JSON.stringify(updated));
  return updated;
}
