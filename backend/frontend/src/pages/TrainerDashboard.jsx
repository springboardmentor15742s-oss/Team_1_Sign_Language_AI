import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { DashboardHeader, StatCard, ChartCard, ActivityCard, RecentTable } from '../components/dashboard/DashboardComponents';
import { trainerData } from '../data/dashboardData';

export default function TrainerDashboard() {
  const [userName, setUserName] = useState('Trainer');
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    } else {
      const storedName = localStorage.getItem('mira_user_name');
      if (storedName) setUserName(storedName);
    }
  }, [user]);

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
    { label: 'Accessibility Trainer Portal', className: 'text-blue-300 bg-blue-500/10 border border-blue-500/30' }
  ];

  return (
    <DashboardLayout>
      <DashboardHeader 
        title={`Welcome, ${userName} 👋`}
        subtitle="Monitor accessibility skill development, learner engagement, and certification progress."
        badges={headerBadges}
        rightElement={
          <button className="btn-secondary text-sm px-4 py-2">
            Schedule Session
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {trainerData.stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <ChartCard 
            title="Weekly Engagement Progress" 
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
            items={trainerData.activities} 
          />
          
          <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="text-lg font-space font-bold text-white">Certification Monitoring</h3>
            <p className="text-sm text-white/50 mb-2">Manage and review learner certifications</p>
            <div className="flex flex-col gap-3">
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5 flex items-center justify-between">
                <span>Pending Approvals</span>
                <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full text-xs">4</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5">
                Generate Skill Development Report
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5">
                View All Certifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
