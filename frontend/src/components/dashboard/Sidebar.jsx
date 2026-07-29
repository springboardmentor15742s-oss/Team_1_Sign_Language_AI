import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Icons
const icons = {
  dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  courses: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  profile: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  progress: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  assessments: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  students: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  reports: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  certifications: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  analytics: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  notifications: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  accuracy: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
};

const navConfig = {
  'Learner': [
    { id: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: icons.dashboard },
    { id: 'courses', label: 'Courses', route: '/courses', icon: icons.courses },
    { id: 'profile', label: 'Profile', route: '/profile', icon: icons.profile },
    { id: 'progress', label: 'Intelligence', route: '/learning-intelligence', icon: icons.analytics },
    { id: 'performance', label: 'Performance', route: '/performance', icon: icons.reports },
    { id: 'accuracy', label: 'Sign Accuracy', route: '/accuracy', icon: icons.accuracy },
    { id: 'assessments', label: 'Assessments', route: '/assessments', icon: icons.assessments },
    { id: 'certifications', label: 'Certifications', route: '/certificates', icon: icons.certifications },
    { id: 'reports', label: 'Reports', route: '/reports', icon: icons.reports },
    { id: 'notifications', label: 'Notifications', route: '/notifications', icon: icons.notifications },
  ],
  'Instructor': [
    { id: 'dashboard', label: 'Dashboard', route: '/instructor-dashboard', icon: icons.dashboard },
    { id: 'students', label: 'Students', route: '#', icon: icons.students },
    { id: 'courses', label: 'Courses', route: '#', icon: icons.courses },
    { id: 'assessments', label: 'Assessments', route: '/assessments', icon: icons.assessments },
    { id: 'reports', label: 'Reports', route: '/reports', icon: icons.reports },
  ],
  'Accessibility Trainer': [
    { id: 'dashboard', label: 'Dashboard', route: '/trainer-dashboard', icon: icons.dashboard },
    { id: 'learners', label: 'Learners', route: '#', icon: icons.students },
    { id: 'skill-reports', label: 'Skill Reports', route: '/reports', icon: icons.reports },
    { id: 'certifications', label: 'Certifications', route: '/certificates', icon: icons.certifications },
  ],
  'Administrator': [
    { id: 'dashboard', label: 'Dashboard', route: '/admin-dashboard', icon: icons.dashboard },
    { id: 'users', label: 'Users', route: '#', icon: icons.users },
    { id: 'analytics', label: 'Analytics', route: '#', icon: icons.analytics },
    { id: 'courses', label: 'Courses', route: '#', icon: icons.courses },
    { id: 'settings', label: 'Settings', route: '#', icon: icons.settings },
  ]
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const role = user?.role || localStorage.getItem('mira_user_role') || 'Learner';
  const sidebarItems = navConfig[role] || navConfig['Learner'];

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    } else {
      const storedName = localStorage.getItem('mira_user_name');
      if (storedName) setUserName(storedName);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside
      className={`fixed lg:static top-20 bottom-0 left-0 z-40 w-64 glass-strong border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
      style={{ background: 'rgba(7, 5, 16, 0.95)', backdropFilter: 'blur(40px)' }}
    >
      <div className="p-5 flex flex-col gap-6 overflow-y-auto">
        {/* User Brief Badge */}
        <div className="glass rounded-2xl p-4 flex items-center gap-3" style={{ border: '1px solid rgba(139,92,246,0.2)' }}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 16px rgba(139,92,246,0.5)' }}
          >
            {userName.charAt(0)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-space font-semibold text-sm text-white truncate">{userName}</span>
            <span className="text-[11px] text-purple-400 font-medium tracking-wide">{role}</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold tracking-widest text-white/30 uppercase px-3 mb-1">Menu</span>
          {sidebarItems.map(item => {
            // Very simple active check
            const isActive = location.pathname === item.route || (item.route === '#' && location.pathname.includes(item.id));
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.route && item.route !== '#') {
                    navigate(item.route);
                  }
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                  isActive
                    ? 'text-white bg-purple-600/20 border border-purple-500/40 shadow-lg shadow-purple-900/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-5 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
