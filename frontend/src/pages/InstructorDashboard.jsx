import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { DashboardHeader, StatCard, ChartCard, ActivityCard, RecentTable } from '../components/dashboard/DashboardComponents';
import { instructorData } from '../data/dashboardData';
import { getInstructorDashboard } from '../api/api';
import { learnerAttendanceList, getInstructorAttendance, saveInstructorCheckIn } from '../data/attendanceData';

export default function InstructorDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userName, setUserName] = useState('Prof. Sarah Jenkins');
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'overview'); // 'overview' | 'learners' | 'instructorAttendance'
  const [instructorAttendance, setInstructorAttendance] = useState(getInstructorAttendance());
  const [checkedInToday, setCheckedInToday] = useState(false);
  const { user } = useAuth();
  const [stats, setStats] = useState(instructorData.stats);
  const [backendSynced, setBackendSynced] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'learners', 'instructorAttendance'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    } else {
      const storedName = localStorage.getItem('mira_user_name');
      if (storedName) setUserName(storedName);
    }

    getInstructorDashboard()
      .then(data => {
        if (data && typeof data.total_students === 'number') {
          setStats(prev => prev.map(s => {
            if (s.label.toLowerCase().includes('student')) {
              return { ...s, value: `${data.total_students}` };
            }
            return s;
          }));
          setBackendSynced(true);
        }
      })
      .catch(err => {
        console.warn('[InstructorDashboard] fetch error, using local data:', err);
      });
  }, [user]);

  const handleMarkAttendance = () => {
    const updated = saveInstructorCheckIn(userName);
    setInstructorAttendance(updated);
    setCheckedInToday(true);
  };

  const studentColumns = [
    { header: 'Student Name', accessor: 'name' },
    { header: 'Course', accessor: 'course' },
    { header: 'Accuracy', accessor: 'accuracy' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className="px-2 py-1 rounded-full text-[10px] font-semibold" style={{ background: `rgba(${row.color.join(',')},0.15)`, color: `rgb(${row.color.join(',')})` }}>
          {row.status}
        </span>
      )
    },
  ];

  const headerBadges = [
    backendSynced ? { label: '● PostgreSQL Synced', className: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' } : null,
    { label: 'Instructor Portal', className: 'text-purple-300 bg-purple-500/10 border border-purple-500/30' },
    { label: 'Learner & Instructor Attendance Active', className: 'text-blue-300 bg-blue-500/10 border border-blue-500/30' }
  ].filter(Boolean);

  return (
    <DashboardLayout>
      <DashboardHeader 
        title={`Welcome back, ${userName} 👋`}
        subtitle="Monitor learner performance, track student attendance, and record your instructor sessions."
        badges={headerBadges}
        rightElement={
          <div className="flex items-center gap-3">
            <button 
              onClick={handleMarkAttendance}
              disabled={checkedInToday}
              className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${
                checkedInToday
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                  : 'btn-primary'
              }`}
            >
              {checkedInToday ? '✓ Checked In Today' : '⏱ Mark Instructor Attendance'}
            </button>
          </div>
        }
      />

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          📊 Portal Overview
        </button>
        <button
          onClick={() => setActiveTab('learners')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'learners'
              ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          👥 Learner Performance &amp; Attendance
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/30 text-purple-300 font-bold">5 Active</span>
        </button>
        <button
          onClick={() => setActiveTab('instructorAttendance')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'instructorAttendance'
              ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          ⏱ My Instructor Attendance Log
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/30 text-blue-300 font-bold">Recorded</span>
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <ChartCard 
                title="Student Engagement & Attendance Trends" 
                data={instructorData.weeklyActivity} 
              />
              <RecentTable 
                title="Recent Student Performance" 
                columns={studentColumns} 
                data={instructorData.students} 
              />
            </div>
            <div className="flex flex-col gap-8">
              {/* Instructor Today's Attendance Card */}
              <div className="glass rounded-3xl p-6 flex flex-col gap-4 border border-blue-500/20" style={{ background: 'rgba(59, 130, 246, 0.05)' }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-space font-bold text-white">Instructor Check-In</h3>
                  <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                    Today&apos;s Status
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/50">Current Log</span>
                    <span className="text-sm font-semibold text-white">{checkedInToday ? 'Checked In (Active)' : 'Not Checked In'}</span>
                  </div>
                  <button
                    onClick={handleMarkAttendance}
                    disabled={checkedInToday}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold btn-primary"
                  >
                    {checkedInToday ? '✓ Done' : 'Punch In'}
                  </button>
                </div>
                <p className="text-[11px] text-white/40">
                  Visible to Instructor, Accessibility Trainer, and Administrator only.
                </p>
              </div>

              <ActivityCard 
                title="Recent Notifications" 
                items={instructorData.notifications} 
              />
            </div>
          </div>
        </>
      )}

      {activeTab === 'learners' && (
        <div className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-space font-bold text-white">Learner Performance &amp; Attendance Roster</h3>
                <p className="text-sm text-white/50">Track student sign accuracy, assessment scores, and daily class attendance.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">
                  Average Attendance: 92%
                </span>
                <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full font-medium">
                  Average Accuracy: 90.5%
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Learner</th>
                    <th className="py-3 px-4">Enrolled Course</th>
                    <th className="py-3 px-4">Attendance Rate</th>
                    <th className="py-3 px-4">Sessions</th>
                    <th className="py-3 px-4">Gesture Accuracy</th>
                    <th className="py-3 px-4">Overall Score</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {learnerAttendanceList.map((st) => (
                    <tr key={st.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-medium text-white">
                        <div className="flex flex-col">
                          <span>{st.name}</span>
                          <span className="text-xs text-white/40">{st.studentId} · {st.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white/70">{st.course}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-white/10 h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500" 
                              style={{ width: `${st.attendanceRate}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-white">{st.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white/70">{st.sessionsAttended} / {st.totalSessions}</td>
                      <td className="py-4 px-4 font-semibold text-emerald-400">{st.gestureAccuracy}</td>
                      <td className="py-4 px-4 font-bold text-purple-300">{st.overallScore}/100</td>
                      <td className="py-4 px-4">
                        <span 
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: `rgba(${st.statusColor.join(',')}, 0.15)`,
                            color: `rgb(${st.statusColor.join(',')})`,
                            border: `1px solid rgba(${st.statusColor.join(',')}, 0.3)`
                          }}
                        >
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'instructorAttendance' && (
        <div className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-space font-bold text-white">Instructor Attendance Log</h3>
                <p className="text-sm text-white/50">
                  Recorded instructor check-in times, teaching hours, and session completion records. Visible strictly to Instructor, Accessibility Trainer, and Administrator.
                </p>
              </div>
              <button
                onClick={handleMarkAttendance}
                disabled={checkedInToday}
                className="btn-primary text-xs px-4 py-2"
              >
                {checkedInToday ? '✓ Checked In Today' : '+ Mark Check-In Now'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Instructor Name</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Check-In</th>
                    <th className="py-3 px-4">Check-Out</th>
                    <th className="py-3 px-4">Classes Conducted</th>
                    <th className="py-3 px-4">Hours Taught</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {instructorAttendance.map((rec) => (
                    <tr key={rec.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-medium text-white">
                        <div className="flex flex-col">
                          <span>{rec.name}</span>
                          <span className="text-xs text-white/40">{rec.instructorId} · {rec.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white/70">{rec.date}</td>
                      <td className="py-4 px-4 text-emerald-400 font-mono text-xs">{rec.checkInTime}</td>
                      <td className="py-4 px-4 text-white/60 font-mono text-xs">{rec.checkOutTime}</td>
                      <td className="py-4 px-4 text-white/80">{rec.classesConducted} sessions</td>
                      <td className="py-4 px-4 text-purple-300 font-semibold">{rec.hoursTaught}</td>
                      <td className="py-4 px-4">
                        <span 
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: `rgba(${rec.statusColor.join(',')}, 0.15)`,
                            color: `rgb(${rec.statusColor.join(',')})`,
                            border: `1px solid rgba(${rec.statusColor.join(',')}, 0.3)`
                          }}
                        >
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
