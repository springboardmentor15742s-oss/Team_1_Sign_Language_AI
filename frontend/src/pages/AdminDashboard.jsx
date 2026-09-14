import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { DashboardHeader, StatCard, ChartCard, ActivityCard, RecentTable } from '../components/dashboard/DashboardComponents';
import { adminData } from '../data/dashboardData';
import { getAdminDashboard } from '../api/api';
import { learnerAttendanceList, getInstructorAttendance } from '../data/attendanceData';
import { exportToCSV, exportToExcel, printOrDownloadPDF } from '../utils/exportUtils';

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userName, setUserName] = useState('Elena Rostova');
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'overview'); // 'overview' | 'users' | 'learners' | 'instructors'
  const instructorAttendance = getInstructorAttendance();
  const { user } = useAuth();
  const [stats, setStats] = useState(adminData.stats);
  const [backendSynced, setBackendSynced] = useState(false);

  // Modals & User Management State
  const [toast, setToast] = useState(null);
  const [logsModalOpen, setLogsModalOpen] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'David Lee', email: 'david@example.com', role: 'Instructor', status: 'Active', color: [59, 130, 246] },
    { id: 2, name: 'Maria Garcia', email: 'maria@example.com', role: 'Learner', status: 'Active', color: [168, 85, 247] },
    { id: 3, name: 'James Wilson', email: 'james@example.com', role: 'Accessibility Trainer', status: 'Active', color: [236, 72, 153] },
    { id: 4, name: 'Linda Martinez', email: 'linda@example.com', role: 'Administrator', status: 'Active', color: [245, 158, 11] },
    { id: 5, name: 'Alex Morgan', email: 'learner@signai.com', role: 'Learner', status: 'Active', color: [34, 197, 94] },
    { id: 6, name: 'Prof. Sarah Jenkins', email: 'instructor@signai.com', role: 'Instructor', status: 'Active', color: [59, 130, 246] },
    { id: 7, name: 'Marcus Vance', email: 'trainer@signai.com', role: 'Accessibility Trainer', status: 'Active', color: [236, 72, 153] },
  ]);

  const [systemLogs, setSystemLogs] = useState([
    { id: 1, level: 'INFO', event: 'JWT Auth token refreshed for user alex@signai.com', timestamp: '23:04:12', source: 'Auth Service' },
    { id: 2, level: 'INFO', event: 'MediaPipe Hands landmark inference latency 16ms (Optimal)', timestamp: '23:03:55', source: 'ML Engine' },
    { id: 3, level: 'SUCCESS', event: 'Certificate C001 generated & cryptographic hash verified', timestamp: '23:01:20', source: 'Certification' },
    { id: 4, level: 'WARN', event: 'API rate limiter threshold reached: 45 req/min on /api/gesture', timestamp: '22:58:10', source: 'Gateway' },
    { id: 5, level: 'INFO', event: 'Instructor check-in punch recorded for Prof. Sarah Jenkins', timestamp: '22:45:00', source: 'Attendance' },
    { id: 6, level: 'INFO', event: 'Database automated backup snapshot created successfully', timestamp: '22:30:00', source: 'Database' },
    { id: 7, level: 'INFO', event: 'New learner enrolled in Everyday ASL Signs Course', timestamp: '22:15:30', source: 'Course Engine' }
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'users', 'learners', 'instructors'].includes(tabParam)) {
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

    getAdminDashboard()
      .then(data => {
        if (data && typeof data.platform_users === 'number') {
          setStats(prev => prev.map(s => {
            if (s.label.toLowerCase().includes('user') || s.label.toLowerCase().includes('total')) {
              return { ...s, value: `${data.platform_users}` };
            }
            return s;
          }));
          setBackendSynced(true);
        }
      })
      .catch(err => {
        console.warn('[AdminDashboard] fetch error:', err);
      });
  }, [user]);

  const handleExportAuditData = () => {
    const auditData = [
      ...usersList.map(u => ({
        Type: 'User Record',
        Identifier: u.email,
        Detail: `${u.name} (${u.role})`,
        Status: u.status,
        Timestamp: new Date().toISOString()
      })),
      ...adminData.systemHealth.map(h => ({
        Type: 'System Metric',
        Identifier: h.metric,
        Detail: `Value: ${h.value}`,
        Status: h.status,
        Timestamp: new Date().toISOString()
      })),
      ...learnerAttendanceList.map(l => ({
        Type: 'Learner Audit',
        Identifier: l.email,
        Detail: `Course: ${l.course} | Accuracy: ${l.gestureAccuracy} | Attendance: ${l.attendanceRate}%`,
        Status: l.status,
        Timestamp: new Date().toISOString()
      }))
    ];

    exportToCSV(auditData, 'Platform_Audit_Log.csv');
    showToast('Platform Audit Data (.csv) exported & downloaded successfully!');
  };

  const handleToggleUserStatus = (id) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`User ${u.name} status changed to ${nextStatus}`);
        return {
          ...u,
          status: nextStatus,
          color: nextStatus === 'Active' ? [34, 197, 94] : [239, 68, 68]
        };
      }
      return u;
    }));
  };

  const filteredUsers = usersList.filter(u => {
    const matchRole = userRoleFilter === 'All' || u.role.toLowerCase().includes(userRoleFilter.toLowerCase());
    const q = userSearch.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  const userColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Role', 
      accessor: 'role',
      render: (row) => (
        <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-white/80">
          {row.role}
        </span>
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
    { label: 'System Administrator', className: 'text-amber-400 bg-amber-500/10 border border-amber-500/30' },
    { label: 'Full Institutional Access', className: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' }
  ];

  return (
    <DashboardLayout>
      <DashboardHeader 
        title={`Platform Overview, ${userName} ⚙️`}
        subtitle="Manage platform users, inspect institutional learner attendance & performance, and monitor instructor sessions."
        badges={headerBadges}
        rightElement={
          <div className="flex gap-3">
            <button 
              onClick={() => setLogsModalOpen(true)}
              className="btn-secondary text-sm px-4 py-2 hover:border-amber-500/50 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>📋 System Logs</span>
            </button>
            <button 
              onClick={handleExportAuditData}
              className="btn-primary text-sm px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>📥 Export Audit Data</span>
            </button>
          </div>
        }
      />

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          ⚙️ Platform Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          👥 User Management
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-bold">{usersList.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('learners')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'learners'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          🎓 Learner Performance &amp; Attendance
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-bold">5 Monitored</span>
        </button>
        <button
          onClick={() => setActiveTab('instructors')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'instructors'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          ⏱ Instructor Attendance Roster
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/30 text-blue-300 font-bold">Audited</span>
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
                title="Platform Analytics (Daily Active Users)" 
                data={adminData.analyticsChart} 
              />
              <RecentTable 
                title="User Management (Recent Registrations)" 
                columns={userColumns} 
                data={adminData.users} 
              />
            </div>
            <div className="flex flex-col gap-8">
              <ActivityCard 
                title="Recent System Activities" 
                items={adminData.activities} 
              />
              
              <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-lg font-space font-bold text-white">System Health</h3>
                <div className="flex flex-col gap-4">
                  {adminData.systemHealth.map((health, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/70 font-medium">{health.metric}</span>
                        <span className="font-bold text-white">{health.value}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span style={{ color: `rgb(${health.color.join(',')})` }} className="font-semibold uppercase tracking-wider">{health.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-space font-bold text-white">Platform User Management</h3>
                <p className="text-sm text-white/50">Manage registered institutional accounts, change roles, and oversee system permissions.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl font-medium">
                  Total Accounts: {usersList.length}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-medium">
                  Active: {usersList.filter(u => u.status === 'Active').length}
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
              <div className="w-full sm:w-80 relative">
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by name, email, role..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-500 outline-none pl-10"
                />
                <svg className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['All', 'Learner', 'Instructor', 'Accessibility Trainer', 'Administrator'].map(roleOption => (
                  <button
                    key={roleOption}
                    onClick={() => setUserRoleFilter(roleOption)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      userRoleFilter === roleOption
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {roleOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Account Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-white/40">
                        No users found matching "{userSearch}".
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 font-medium text-white">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                              style={{ background: `linear-gradient(135deg, rgb(${u.color.join(',')}), #111)` }}
                            >
                              {u.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span>{u.name}</span>
                              <span className="text-xs text-white/40">{u.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/80">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: u.status === 'Active' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              color: u.status === 'Active' ? '#4ade80' : '#f87171',
                              border: `1px solid ${u.status === 'Active' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                            }}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleToggleUserStatus(u.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer"
                          >
                            {u.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'learners' && (
        <div className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-space font-bold text-white">Institutional Learner Performance &amp; Attendance</h3>
                <p className="text-sm text-white/50">Comprehensive tracking of student learning progress, gesture accuracy, and attendance statistics.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Learner Name</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Attendance Rate</th>
                    <th className="py-3 px-4">Sessions</th>
                    <th className="py-3 px-4">Last Check-In</th>
                    <th className="py-3 px-4">AI Accuracy</th>
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
                              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" 
                              style={{ width: `${st.attendanceRate}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-white">{st.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-white/70">{st.sessionsAttended} / {st.totalSessions}</td>
                      <td className="py-4 px-4 text-xs text-white/60">{st.lastCheckIn}</td>
                      <td className="py-4 px-4 font-semibold text-emerald-400">{st.gestureAccuracy}</td>
                      <td className="py-4 px-4 font-bold text-amber-300">{st.overallScore}/100</td>
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

      {activeTab === 'instructors' && (
        <div className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-space font-bold text-white">Institutional Instructor Attendance Roster</h3>
                <p className="text-sm text-white/50">
                  Audit and track instructor teaching attendance, daily check-ins, and session hours. Visible strictly to Instructor, Accessibility Trainer, and Administrator.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Instructor</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Check-In Time</th>
                    <th className="py-3 px-4">Check-Out Time</th>
                    <th className="py-3 px-4">Sessions Conducted</th>
                    <th className="py-3 px-4">Teaching Hours</th>
                    <th className="py-3 px-4">Attendance Status</th>
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
                      <td className="py-4 px-4 text-amber-300 font-semibold">{rec.hoursTaught}</td>
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

      {/* System Logs Modal */}
      {logsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="glass-strong rounded-3xl p-6 md:p-8 max-w-3xl w-full border border-amber-500/30 shadow-2xl relative"
            style={{ background: 'rgba(12, 9, 4, 0.97)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg font-mono">
                  &gt;_
                </div>
                <div>
                  <h3 className="text-lg font-space font-bold text-white">Institutional System &amp; Audit Logs</h3>
                  <p className="text-xs text-white/50">Real-time authentication, ML pipeline, and security event stream</p>
                </div>
              </div>
              <button 
                onClick={() => setLogsModalOpen(false)}
                className="text-white/40 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Logs Window */}
            <div className="mt-5 rounded-2xl bg-black/80 border border-white/10 p-4 font-mono text-xs max-h-96 overflow-y-auto flex flex-col gap-2.5">
              {systemLogs.map(log => (
                <div key={log.id} className="flex items-start gap-3 py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-white/30 text-[11px] whitespace-nowrap">{log.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    log.level === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    log.level === 'WARN' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-purple-300/70 text-[11px] font-semibold">[{log.source}]</span>
                  <span className="text-white/80 flex-1">{log.event}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/10">
              <span className="text-xs text-white/40">Status: All services operational (99.98% uptime)</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    exportToCSV(systemLogs, 'System_Audit_Logs.csv');
                    showToast('System Logs downloaded as .csv');
                  }}
                  className="btn-primary text-xs px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500"
                >
                  Download Logs (.csv)
                </button>
                <button
                  onClick={() => setLogsModalOpen(false)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
