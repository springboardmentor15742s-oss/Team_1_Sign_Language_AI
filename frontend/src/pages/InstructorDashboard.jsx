import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { DashboardHeader, StatCard, ChartCard, ActivityCard, RecentTable } from '../components/dashboard/DashboardComponents';
import { instructorData } from '../data/dashboardData';
import { getInstructorDashboard } from '../api/api';

export default function InstructorDashboard() {
  const [userName, setUserName] = useState('Instructor');
  const [stats, setStats] = useState(instructorData.stats);
  const [backendSynced, setBackendSynced] = useState(false);
  const { user } = useAuth();

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
    { label: 'Instructor Portal', className: 'text-purple-300 bg-purple-500/10 border border-purple-500/30' },
    backendSynced ? { label: '● PostgreSQL Synced', className: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' } : null
  ].filter(Boolean);

  return (
    <DashboardLayout>
      <DashboardHeader 
        title={`Welcome back, ${userName} 👋`}
        subtitle="Manage your courses, track student performance, and review assessments."
        badges={headerBadges}
        rightElement={
          <button className="btn-primary text-sm px-4 py-2">
            + Create New Course
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <ChartCard 
            title="Student Engagement" 
            data={instructorData.weeklyActivity} 
          />
          <RecentTable 
            title="Recent Student Performance" 
            columns={studentColumns} 
            data={instructorData.students} 
          />
        </div>
        <div className="flex flex-col gap-8">
          <ActivityCard 
            title="Recent Notifications" 
            items={instructorData.notifications} 
          />
          
          <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="text-lg font-space font-bold text-white">Course Management</h3>
            <p className="text-sm text-white/50 mb-2">Quick links to manage your content</p>
            <div className="flex flex-col gap-3">
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5">
                Review Pending Assessments (34)
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5">
                Edit Syllabus & Curriculum
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5">
                View Class Roster
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
