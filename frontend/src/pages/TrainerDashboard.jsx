import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { DashboardHeader, StatCard, ChartCard, ActivityCard, RecentTable } from '../components/dashboard/DashboardComponents';
import { trainerData } from '../data/dashboardData';
import { getTrainerDashboard } from '../api/api';
import { learnerAttendanceList, getInstructorAttendance } from '../data/attendanceData';
import { exportToCSV, exportToExcel, printOrDownloadPDF } from '../utils/exportUtils';

export default function TrainerDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userName, setUserName] = useState('Marcus Vance');
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'overview'); // 'overview' | 'learnerAttendance' | 'instructorAttendance'
  const instructorAttendance = getInstructorAttendance();
  const { user } = useAuth();
  const [stats, setStats] = useState(trainerData.stats);
  const [backendSynced, setBackendSynced] = useState(false);

  // Modals & Interactivity
  const [toast, setToast] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [approvalsModalOpen, setApprovalsModalOpen] = useState(false);
  const [activitiesList, setActivitiesList] = useState(trainerData.activities);
  
  const [scheduleForm, setScheduleForm] = useState({
    learner: 'Alice Walker',
    sessionType: '1-on-1 Accessibility Coaching',
    date: '2026-09-15',
    time: '10:00 AM',
    notes: 'Focus on sign posture and finger orientation.'
  });

  const [pendingCerts, setPendingCerts] = useState([
    { id: 'P01', name: 'Maria Santos', course: 'Level 2 Intermediate ASL', accuracy: '95.2%', date: '2026-09-10' },
    { id: 'P02', name: 'Alex Chen', course: 'Foundations of ASL Alphabet', accuracy: '91.8%', date: '2026-09-11' },
    { id: 'P03', name: 'Liam Davis', course: 'Conversational Signs & Greetings', accuracy: '94.0%', date: '2026-09-11' },
    { id: 'P04', name: 'Sophia Taylor', course: 'Numbers & Spatial Referencing', accuracy: '89.5%', date: '2026-09-12' },
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'learnerAttendance', 'instructorAttendance'].includes(tabParam)) {
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

    getTrainerDashboard()
      .then(data => {
        if (data && typeof data.learner_engagement === 'number') {
          setStats(prev => prev.map(s => {
            if (s.label.toLowerCase().includes('engagement') || s.label.toLowerCase().includes('active')) {
              return { ...s, value: `${data.learner_engagement}` };
            }
            return s;
          }));
          setBackendSynced(true);
        }
      })
      .catch(err => {
        console.warn('[TrainerDashboard] fetch error:', err);
      });
  }, [user]);

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const newAct = {
      id: Date.now(),
      text: `Session scheduled with ${scheduleForm.learner} (${scheduleForm.sessionType})`,
      time: 'Just now',
      color: [168, 85, 247]
    };
    setActivitiesList(prev => [newAct, ...prev]);
    setScheduleModalOpen(false);
    showToast(`Session successfully scheduled with ${scheduleForm.learner} for ${scheduleForm.date} at ${scheduleForm.time}!`);
  };

  const handleApproveCert = (cert) => {
    setPendingCerts(prev => prev.filter(c => c.id !== cert.id));
    const newAct = {
      id: Date.now(),
      text: `Approved Certificate for ${cert.name} (${cert.course})`,
      time: 'Just now',
      color: [34, 197, 94]
    };
    setActivitiesList(prev => [newAct, ...prev]);
    showToast(`Certificate officially approved for ${cert.name}!`);
  };

  const handleGenerateSkillReport = () => {
    const reportData = learnerAttendanceList.map(l => ({
      Learner: l.name,
      Email: l.email,
      Course: l.course,
      GestureAccuracy: l.gestureAccuracy,
      AttendanceRate: `${l.attendanceRate}%`,
      OverallScore: `${l.overallScore}/100`,
      Status: l.status
    }));

    printOrDownloadPDF({
      title: 'Accessibility Skill Development Report',
      subtitle: 'Official Certified Learner Articulation & Competency Audit',
      metadata: {
        'Monitored Learners': learnerAttendanceList.length,
        'Avg Accuracy': '90.5%',
        'Supervising Trainer': userName,
        'Date': new Date().toLocaleDateString()
      },
      sections: [
        {
          title: 'Learner Skill Metrics & Gesture Accuracy',
          type: 'table',
          data: reportData
        },
        {
          title: 'Trainer Action Items',
          type: 'list',
          items: [
            'All monitored learners are maintaining >85% attendance compliance.',
            'Recommended 1-on-1 focus on fingerspelling transitions for learners below 90% accuracy.',
            'Certification approvals are proceeding on schedule.'
          ]
        }
      ],
      action: 'download'
    });
    showToast('Skill Development Report generated & downloaded successfully!');
  };

  const learnerColumns = [
    { header: 'Learner Name', accessor: 'name' },
    { header: 'Focus Area', accessor: 'focus' },
    { 
      header: 'Progress', 
      accessor: 'progress',
      render: (row) => (
        <div className="w-full sm:w-24 flex items-center gap-2">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${row.progress}%`, background: `rgb(${row.color.join(',')})` }} />
          </div>
          <span className="text-[10px] font-bold" style={{ color: `rgb(${row.color.join(',')})` }}>{row.progress}%</span>
        </div>
      )
    },
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
    { label: 'Accessibility Trainer Portal', className: 'text-pink-300 bg-pink-500/10 border border-pink-500/30' },
    { label: 'Learner & Instructor Attendance Tracking', className: 'text-blue-300 bg-blue-500/10 border border-blue-500/30' }
  ];

  return (
    <DashboardLayout>
      <DashboardHeader 
        title={`Welcome, ${userName} 👋`}
        subtitle="Monitor accessibility skill development, track learner performance & attendance, and review instructor sessions."
        badges={headerBadges}
        rightElement={
          <button 
            onClick={() => setScheduleModalOpen(true)}
            className="btn-secondary text-sm px-4 py-2 hover:border-pink-500/50 transition-all cursor-pointer"
          >
            🗓 Schedule Session
          </button>
        }
      />

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-pink-500/20 text-pink-200 border border-pink-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          📈 Trainer Overview
        </button>
        <button
          onClick={() => setActiveTab('learnerAttendance')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'learnerAttendance'
              ? 'bg-pink-500/20 text-pink-200 border border-pink-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          🎓 Learner Performance &amp; Attendance
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-pink-500/30 text-pink-300 font-bold">5 Monitored</span>
        </button>
        <button
          onClick={() => setActiveTab('instructorAttendance')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'instructorAttendance'
              ? 'bg-pink-500/20 text-pink-200 border border-pink-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          ⏱ Instructor Attendance Log
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/30 text-blue-300 font-bold">Coordination</span>
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
                title="Weekly Engagement & Accessibility Progress" 
                data={trainerData.weeklyProgress} 
              />
              <RecentTable 
                title="Learners Requiring Attention" 
                columns={learnerColumns} 
                data={trainerData.learners} 
              />
            </div>
            <div className="flex flex-col gap-8">
              <ActivityCard 
                title="Recent Activities" 
                items={activitiesList} 
              />
              
              <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-lg font-space font-bold text-white">Certification Monitoring</h3>
                <p className="text-sm text-white/50 mb-2">Manage and review learner certifications</p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setApprovalsModalOpen(true)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5 flex items-center justify-between cursor-pointer group"
                  >
                    <span>Pending Approvals</span>
                    <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full text-xs font-bold">
                      {pendingCerts.length}
                    </span>
                  </button>
                  <button 
                    onClick={handleGenerateSkillReport}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5 flex items-center justify-between cursor-pointer group"
                  >
                    <span>Generate Skill Development Report</span>
                    <span className="text-xs text-pink-400 group-hover:translate-x-1 transition-transform">↓ Export PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'learnerAttendance' && (
        <div className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-space font-bold text-white">Learner Performance &amp; Attendance Tracking</h3>
                <p className="text-sm text-white/50">Accessibility trainer overview of student accuracy, session attendance, and completion status.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Learner</th>
                    <th className="py-3 px-4">Focus Course</th>
                    <th className="py-3 px-4">Attendance Rate</th>
                    <th className="py-3 px-4">Sessions</th>
                    <th className="py-3 px-4">Sign Accuracy</th>
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
                          <span className="text-xs text-white/40">{st.studentId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white/70">{st.course}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-white/10 h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500" 
                              style={{ width: `${st.attendanceRate}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-white">{st.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white/70">{st.sessionsAttended} / {st.totalSessions}</td>
                      <td className="py-4 px-4 font-semibold text-emerald-400">{st.gestureAccuracy}</td>
                      <td className="py-4 px-4 font-bold text-pink-300">{st.overallScore}/100</td>
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
                <h3 className="text-xl font-space font-bold text-white">Instructor Session Attendance Roster</h3>
                <p className="text-sm text-white/50">
                  Track instructor teaching sessions to coordinate accessibility training curricula. Visible strictly to Instructor, Accessibility Trainer, and Administrator.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Instructor Name</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Check-In</th>
                    <th className="py-3 px-4">Check-Out</th>
                    <th className="py-3 px-4">Sessions Taught</th>
                    <th className="py-3 px-4">Hours</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {instructorAttendance.map((rec) => (
                    <tr key={rec.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-medium text-white">
                        <div className="flex flex-col">
                          <span>{rec.name}</span>
                          <span className="text-xs text-white/40">{rec.instructorId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white/70">{rec.date}</td>
                      <td className="py-4 px-4 text-emerald-400 font-mono text-xs">{rec.checkInTime}</td>
                      <td className="py-4 px-4 text-white/60 font-mono text-xs">{rec.checkOutTime}</td>
                      <td className="py-4 px-4 text-white/80">{rec.classesConducted} classes</td>
                      <td className="py-4 px-4 text-pink-300 font-semibold">{rec.hoursTaught}</td>
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

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 px-5 py-3 rounded-2xl glass-strong border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center gap-3 shadow-2xl animate-fade-in"
          style={{ background: 'rgba(5, 40, 20, 0.9)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{toast}</span>
        </div>
      )}

      {/* Schedule Session Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-3xl p-6 md:p-8 max-w-lg w-full border border-pink-500/30 shadow-2xl relative"
            style={{ background: 'rgba(15, 10, 25, 0.95)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center font-bold text-lg">
                  🗓
                </div>
                <div>
                  <h3 className="text-lg font-space font-bold text-white">Schedule Trainer Session</h3>
                  <p className="text-xs text-white/50">Book 1-on-1 accessibility sign coaching</p>
                </div>
              </div>
              <button 
                onClick={() => setScheduleModalOpen(false)}
                className="text-white/40 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-4 mt-5">
              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Select Learner</label>
                <select 
                  value={scheduleForm.learner}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, learner: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-pink-500 outline-none"
                >
                  {learnerAttendanceList.map(l => (
                    <option key={l.id} value={l.name} className="bg-neutral-900 text-white">
                      {l.name} ({l.course})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Session Type</label>
                <select 
                  value={scheduleForm.sessionType}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, sessionType: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-pink-500 outline-none"
                >
                  <option value="1-on-1 Accessibility Coaching" className="bg-neutral-900 text-white">1-on-1 Accessibility Coaching</option>
                  <option value="Gesture Alignment & Accuracy Review" className="bg-neutral-900 text-white">Gesture Alignment & Accuracy Review</option>
                  <option value="Tactile & Motor Articulation Practice" className="bg-neutral-900 text-white">Tactile & Motor Articulation Practice</option>
                  <option value="Pre-Certification Skills Assessment" className="bg-neutral-900 text-white">Pre-Certification Skills Assessment</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">Date</label>
                  <input 
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">Time Slot</label>
                  <input 
                    type="text"
                    value={scheduleForm.time}
                    placeholder="e.g. 10:00 AM"
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-pink-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Focus Notes</label>
                <textarea 
                  rows={2}
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-pink-500 outline-none"
                  placeholder="Notes on fingerspelling, wrist mobility, speed..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-sm px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pending Approvals Review Modal */}
      {approvalsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-3xl p-6 md:p-8 max-w-2xl w-full border border-amber-500/30 shadow-2xl relative"
            style={{ background: 'rgba(18, 12, 5, 0.96)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                  🎖️
                </div>
                <div>
                  <h3 className="text-lg font-space font-bold text-white">Pending Certification Approvals</h3>
                  <p className="text-xs text-white/50">{pendingCerts.length} certificates awaiting trainer verification</p>
                </div>
              </div>
              <button 
                onClick={() => setApprovalsModalOpen(false)}
                className="text-white/40 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 mt-5 max-h-96 overflow-y-auto pr-1">
              {pendingCerts.length === 0 ? (
                <div className="py-10 text-center text-white/40 text-sm">
                  🎉 All pending certificates have been reviewed and approved!
                </div>
              ) : (
                pendingCerts.map(cert => (
                  <div key={cert.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{cert.name}</span>
                      <span className="text-xs text-white/50">{cert.course}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
                          Accuracy: {cert.accuracy}
                        </span>
                        <span className="text-[10px] text-white/40">Tested: {cert.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApproveCert(cert)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer whitespace-nowrap"
                    >
                      ✓ Approve Certificate
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/10">
              <span className="text-xs text-white/40">Verified by Accessibility Trainer Portal</span>
              <button
                onClick={() => setApprovalsModalOpen(false)}
                className="btn-secondary text-xs px-4 py-2"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
