import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { DashboardHeader, StatCard, ChartCard, ActivityCard, RecentTable } from '../components/dashboard/DashboardComponents';
import { adminData } from '../data/dashboardData';

export default function AdminDashboard() {
  const [userName, setUserName] = useState('Admin');
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    } else {
      const storedName = localStorage.getItem('mira_user_name');
      if (storedName) setUserName(storedName);
    }
  }, [user]);

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
    { label: 'System Administrator', className: 'text-amber-400 bg-amber-500/10 border border-amber-500/30' }
  ];

  return (
    <DashboardLayout>
      <DashboardHeader 
        title={`Platform Overview, ${userName} ⚙️`}
        subtitle="Manage users, monitor system health, and review platform analytics."
        badges={headerBadges}
        rightElement={
          <div className="flex gap-3">
            <button className="btn-secondary text-sm px-4 py-2">
              System Logs
            </button>
            <button className="btn-primary text-sm px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              Export Data
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {adminData.stats.map((stat, i) => (
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
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: health.value.includes('%') ? health.value : '100%', 
                        background: `rgb(${health.color.join(',')})` 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-xl p-4 flex flex-col items-center text-center gap-2 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
              <span className="text-xs font-medium text-white/80">Server Config</span>
            </div>
            <div className="glass rounded-xl p-4 flex flex-col items-center text-center gap-2 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span className="text-xs font-medium text-white/80">Security Settings</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
