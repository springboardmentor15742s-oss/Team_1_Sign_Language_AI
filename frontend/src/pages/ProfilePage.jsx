import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


/* ══════════════════════════════════════════════════════════════════
   SHARED SIDEBAR DATA  (mirrors LearnerDashboard)
══════════════════════════════════════════════════════════════════ */
const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', route: '/dashboard',    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'courses',   label: 'Courses',   route: '/courses',      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'practice',  label: 'Practice',  route: '/practice',     icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'assessment',label: 'Assessment',route: '/assessment',    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { id: 'progress',  label: 'Progress',  route: '/progress',     icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'profile',   label: 'Profile',   route: '/profile',      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'settings',  label: 'Settings',  route: '/settings',     icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

/* ══════════════════════════════════════════════════════════════════
   MOCK PROFILE DATA
══════════════════════════════════════════════════════════════════ */
const INIT_PROFILE = {
  name:              'Alex Morgan',
  email:             'alex.morgan@email.com',
  phone:             '+91 98765 43210',
  country:           'India',
  language:          'English (ASL)',
  level:             'Intermediate (Level 2)',
  goals:             'Master conversational ASL for daily use and pass Level 3 certification by September.',
  avatarColor:       'linear-gradient(135deg, #7c3aed, #3b82f6)',
};

const practiceStats = [
  { label: 'Lessons Completed', value: '48 / 72', pct: 67,  color: [168, 85,  247], icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { label: 'Practice Hours',    value: '24.5 hrs',change: '+3.2 hrs', pct: 82,  color: [59,  130, 246], icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Overall Accuracy',  value: '96.8%',  change: '+1.4%', pct: 97,  color: [34,  197, 94],  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Current Streak',    value: '14 Days', change: '🔥 Personal Best', pct: 56, color: [245, 158, 11],  icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
];

const weeklyData = [
  { day: 'Mon', hrs: 1.8, accuracy: 94 },
  { day: 'Tue', hrs: 2.2, accuracy: 96 },
  { day: 'Wed', hrs: 1.5, accuracy: 95 },
  { day: 'Thu', hrs: 2.8, accuracy: 98 },
  { day: 'Fri', hrs: 2.0, accuracy: 97 },
  { day: 'Sat', hrs: 3.2, accuracy: 99 },
  { day: 'Sun', hrs: 1.0, accuracy: 96 },
];

const assessmentHistory = [
  { id: 1, title: 'ASL Alphabet Certification',          date: 'July 10, 2026',  score: 98, grade: 'A+',  status: 'Passed',  color: [34,  197, 94]  },
  { id: 2, title: 'Emergency Signs Assessment',           date: 'June 28, 2026',  score: 91, grade: 'A',   status: 'Passed',  color: [59,  130, 246] },
  { id: 3, title: 'Conversational Signs – Level 1',       date: 'June 12, 2026',  score: 87, grade: 'B+',  status: 'Passed',  color: [168, 85,  247] },
  { id: 4, title: 'Real-Time Gesture Recognition',        date: 'May 30, 2026',   score: 76, grade: 'C+',  status: 'Retake',  color: [245, 158, 11]  },
];

const certificates = [
  { id: 1, title: 'ASL Beginner Certified',           date: 'June 2026',  icon: '🏅', color: [245, 158, 11] },
  { id: 2, title: 'Emergency Signs Specialist',        date: 'July 2026',  icon: '🎖️', color: [59,  130, 246] },
  { id: 3, title: 'Sign Language AI Learner – Level 1',         date: 'July 2026',  icon: '🏆', color: [168, 85,  247] },
];

const achievements = [
  { id: 1,  label: 'Fast Fingers',      desc: '50 gestures in 1 min',     icon: '⚡', earned: true,  color: [245, 158, 11] },
  { id: 2,  label: '7-Day Streak',      desc: 'Practice 7 days straight',  icon: '🔥', earned: true,  color: [236, 72,  153] },
  { id: 3,  label: 'Accuracy Master',   desc: '95%+ AI recognition',       icon: '🎯', earned: true,  color: [34,  197, 94]  },
  { id: 4,  label: 'Night Owl',         desc: 'Practiced after midnight',   icon: '🦉', earned: true,  color: [139, 92,  246] },
  { id: 5,  label: 'First Certificate', desc: 'Earned your first cert',     icon: '📜', earned: true,  color: [59,  130, 246] },
  { id: 6,  label: 'Social Signer',     desc: 'Complete group sessions',    icon: '🤝', earned: false, color: [156, 163, 175] },
  { id: 7,  label: 'Perfectionist',     desc: '100% on any assessment',     icon: '💎', earned: false, color: [156, 163, 175] },
  { id: 8,  label: 'Level 3 Graduate',  desc: 'Complete Level 3 course',    icon: '🎓', earned: false, color: [156, 163, 175] },
];

/* ══════════════════════════════════════════════════════════════════
   REUSABLE SUB-COMPONENTS
══════════════════════════════════════════════════════════════════ */

/** Generic glassmorphism card wrapper */
function ProfileCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`glass-strong rounded-3xl border border-white/10 ${className}`}
      style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)', ...style }}
    >
      {children}
    </div>
  );
}

/** Section header inside a card */
function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-space font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-white/40">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/** Editable text field row */
function FieldRow({ label, value, editing, onChange, multiline = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-widest uppercase text-white/35">{label}</label>
      {editing ? (
        multiline ? (
          <textarea
            rows={3}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:border-purple-500/60 transition-colors"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors"
          />
        )
      ) : (
        <span className="text-sm text-white/80 leading-relaxed">{value || '—'}</span>
      )}
    </div>
  );
}

/** Circular radial progress ring */
function RadialRing({ pct, size = 80, stroke = 6, color }) {
  const r   = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={`rgb(${color.join(',')})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </svg>
  );
}

/** Achievement badge tile */
function AchievementBadge({ badge }) {
  const [r, g, b] = badge.color;
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.04 }}
      className={`glass rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-default transition-all duration-200 ${
        badge.earned ? 'border border-white/10' : 'border border-white/5 opacity-40 grayscale'
      }`}
    >
      <span className="text-2xl">{badge.icon}</span>
      <span className="text-xs font-semibold text-white leading-tight">{badge.label}</span>
      <span className="text-[10px] text-white/40 leading-tight">{badge.desc}</span>
      {badge.earned && (
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mt-0.5"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
        >
          Earned
        </span>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function ProfilePage() {
  const navigate            = useNavigate();
  const fileInputRef        = useRef(null);
  const { logout, user, role, updateProfile } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing,     setEditing]     = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [avatarSrc,   setAvatarSrc]   = useState(user?.avatar || null);

  const currentRole = role || user?.role || 'Learner';
  const joinDate = user?.joinDate || 'January 2026';

  const [profile, setProfile] = useState(() => ({
    ...INIT_PROFILE,
    ...(user || {}),
    role: currentRole,
    joinDate,
  }));
  const [draft, setDraft] = useState(() => ({
    ...INIT_PROFILE,
    ...(user || {}),
    role: currentRole,
    joinDate,
  }));

  useEffect(() => {
    if (user) {
      const activeRole = role || user.role || 'Learner';
      const userJoinDate = user.joinDate || 'January 2026';
      setProfile(prev => ({ ...prev, ...user, role: activeRole, joinDate: userJoinDate }));
      setDraft(prev => ({ ...prev, ...user, role: activeRole, joinDate: userJoinDate }));
      if (user.avatar) setAvatarSrc(user.avatar);
    }
  }, [user, role]);

  const patchDraft = (key, val) => setDraft(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    setProfile(draft);
    updateProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const handleAvatarChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setAvatarSrc(ev.target.result);
      updateProfile({ avatar: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  /* motion helpers */
  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex overflow-hidden pt-20">

      {/* ── Ambient glows ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.65) 0%, transparent 70%)', filter: 'blur(90px)' }}
        />
        <div className="absolute bottom-20 right-1/4 w-[420px] h-[420px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.65) 0%, transparent 70%)', filter: 'blur(90px)' }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════════════════════════ */}
      <aside
        className={`fixed lg:static top-20 bottom-0 left-0 z-40 w-64 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ background: 'rgba(7,5,16,0.96)', backdropFilter: 'blur(40px)', borderRight: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="p-5 flex flex-col gap-6 overflow-y-auto">
          {/* User badge */}
          <div className="glass rounded-2xl p-4 flex items-center gap-3" style={{ border: '1px solid rgba(139,92,246,0.2)' }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg text-white overflow-hidden flex-shrink-0"
              style={{ background: profile.avatarColor || 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 16px rgba(139,92,246,0.5)' }}
            >
              {(avatarSrc || profile.avatar)
                ? <img src={avatarSrc || profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                : (profile.name?.charAt(0) || 'A')
              }
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-space font-semibold text-sm text-white truncate">{profile.name}</span>
              <span className="text-[11px] text-purple-400 font-medium tracking-wide">{profile.role || currentRole}</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest text-white/30 uppercase px-3 mb-1">Menu</span>
            {sidebarItems.map(item => {
              const isActive = item.id === 'profile';
              return (
                <button
                  key={item.id}
                  onClick={() => { navigate(item.route); setSidebarOpen(false); }}
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

        {/* Logout */}
        <div className="p-5 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════════ */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6 glass p-3 rounded-xl border border-white/10">
          <span className="font-space font-bold text-white">My Profile</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-white/70 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Save toast */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-50 flex items-center gap-2 glass-strong text-green-400 text-sm font-semibold px-4 py-3 rounded-2xl border border-green-500/30 shadow-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Profile saved successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto flex flex-col gap-8">

          {/* ── PROFILE HERO CARD ─────────────────────────────── */}
          <motion.div {...fadeUp(0)}>
            <ProfileCard className="p-6 md:p-8 relative overflow-hidden">
              {/* Hero bg glow */}
              <div className="absolute top-0 right-0 w-96 h-72 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(60px)' }}
              />

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center font-bold text-4xl text-white overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ background: profile.avatarColor || 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}
                    onClick={() => fileInputRef.current?.click()}
                    title="Click to change photo"
                  >
                    {(avatarSrc || profile.avatar)
                      ? <img src={avatarSrc || profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                      : (profile.name?.charAt(0) || 'A')
                    }
                  </div>
                  {/* Camera overlay button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center text-white border border-white/20 hover:scale-105 transition-transform"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', boxShadow: '0 4px 12px rgba(124,58,237,0.5)' }}
                    title="Upload photo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>

                {/* Name / meta */}
                <div className="flex flex-col gap-2 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center">
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase"
                      style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.35)', color: 'rgba(168,85,247,0.9)' }}>
                      Level 2 · Intermediate
                    </span>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase"
                      style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: 'rgba(59,130,246,0.9)' }}>
                      Role: {profile.role || currentRole}
                    </span>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase flex items-center gap-1.5"
                      style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: 'rgba(34,197,94,0.9)' }}>
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      14-Day Streak 🔥
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-space font-bold text-white tracking-tight">
                    {profile.name}
                  </h1>
                  <p className="text-sm text-white/50">
                    {profile.email} · {profile.country} · <span className="text-white/40">Joined {profile.joinDate}</span>
                  </p>
                  <p className="text-xs text-white/35 max-w-md">{profile.goals}</p>
                </div>

                {/* Edit / Save buttons */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {editing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="btn-primary text-sm flex items-center gap-2"
                        style={{ padding: '10px 22px' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-secondary text-sm"
                        style={{ padding: '10px 22px' }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate('/profile/edit')}
                      className="btn-secondary text-sm flex items-center gap-2"
                      style={{ padding: '10px 22px' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  )}
                </div>

              </div>
            </ProfileCard>
          </motion.div>

          {/* ── TWO-COLUMN GRID ───────────────────────────────── */}
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Left col (personal info) */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* Personal Information */}
              <motion.div {...fadeUp(0.1)}>
                <ProfileCard className="p-6">
                  <SectionHeader
                    title="Personal Information"
                    subtitle="Basic account details"
                  />
                  <div className="flex flex-col gap-5">
                    <FieldRow label="Full Name"         value={draft.name}     editing={editing} onChange={v => patchDraft('name', v)} />
                    <FieldRow label="Email Address"     value={draft.email}    editing={editing} onChange={v => patchDraft('email', v)} />
                    <FieldRow label="Platform Role"     value={draft.role || currentRole} editing={false} onChange={() => {}} />
                    <FieldRow label="Member Since"      value={draft.joinDate || 'January 2026'} editing={false} onChange={() => {}} />
                    <FieldRow label="Phone Number"      value={draft.phone}    editing={editing} onChange={v => patchDraft('phone', v)} />
                    <FieldRow label="Country / Region"  value={draft.country}  editing={editing} onChange={v => patchDraft('country', v)} />
                  </div>
                </ProfileCard>
              </motion.div>

              {/* Learning Preferences */}
              <motion.div {...fadeUp(0.15)}>
                <ProfileCard className="p-6">
                  <SectionHeader title="Learning Preferences" subtitle="Language & level settings" />
                  <div className="flex flex-col gap-5">
                    <FieldRow label="Preferred Language" value={draft.language} editing={editing} onChange={v => patchDraft('language', v)} />
                    <FieldRow label="Current Level"      value={draft.level}    editing={editing} onChange={v => patchDraft('level', v)} />
                    <FieldRow label="Learning Goals"     value={draft.goals}    editing={editing} onChange={v => patchDraft('goals', v)} multiline />
                  </div>
                </ProfileCard>
              </motion.div>

              {/* Certificates */}
              <motion.div {...fadeUp(0.2)}>
                <ProfileCard className="p-6">
                  <SectionHeader title="Certificates" subtitle={`${certificates.length} Earned`} />
                  <div className="flex flex-col gap-3">
                    {certificates.map(cert => {
                      const [r, g, b] = cert.color;
                      return (
                        <div
                          key={cert.id}
                          className="glass rounded-2xl p-4 flex items-center gap-4 border border-white/8 hover:border-purple-500/30 transition-all duration-200"
                        >
                          <span className="text-2xl">{cert.icon}</span>
                          <div className="flex flex-col flex-1">
                            <span className="text-sm font-semibold text-white">{cert.title}</span>
                            <span className="text-xs text-white/40">{cert.date}</span>
                          </div>
                          <span
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                            style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
                          >
                            Verified
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </ProfileCard>
              </motion.div>

            </div>

            {/* Right col (stats, charts, history) */}
            <div className="lg:col-span-3 flex flex-col gap-8">

              {/* Practice Statistics with radial rings */}
              <motion.div {...fadeUp(0.12)}>
                <ProfileCard className="p-6">
                  <SectionHeader title="Practice Statistics" subtitle="AI-tracked learning metrics" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {practiceStats.map(stat => {
                      const [r, g, b] = stat.color;
                      return (
                        <div key={stat.label} className="glass rounded-2xl p-4 flex flex-col items-center gap-3 border border-white/8">
                          <div className="relative">
                            <RadialRing pct={stat.pct} size={72} stroke={5} color={stat.color} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold font-space" style={{ color: `rgb(${r},${g},${b})` }}>
                                {stat.pct}%
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-0.5 text-center">
                            <span className="text-sm font-space font-bold text-white">{stat.value}</span>
                            <span className="text-[10px] text-white/45 leading-tight">{stat.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ProfileCard>
              </motion.div>

              {/* Weekly Progress Chart */}
              <motion.div {...fadeUp(0.18)}>
                <ProfileCard className="p-6">
                  <SectionHeader
                    title="Weekly Progress Chart"
                    subtitle="Practice hours & AI accuracy"
                    action={
                      <div className="flex items-center gap-3 text-[11px] font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                          <span className="text-white/50">Hrs</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                          <span className="text-white/50">Accuracy</span>
                        </div>
                      </div>
                    }
                  />
                  {/* Bar Chart */}
                  <div className="flex items-end justify-between gap-3 h-40 pb-2 border-b border-white/8 px-2 relative">
                    <div className="absolute inset-x-0 top-0 border-b border-white/5 pointer-events-none" />
                    <div className="absolute inset-x-0 top-1/2 border-b border-white/5 pointer-events-none" />
                    {weeklyData.map(d => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-10 glass rounded-lg px-2 py-1 text-[10px] font-semibold text-white whitespace-nowrap pointer-events-none">
                          {d.hrs}h · {d.accuracy}%
                        </div>
                        <div className="w-full flex items-end justify-center gap-1 h-32">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(d.hrs / 3.5) * 100}%` }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                            className="w-1/2 rounded-t-lg bg-gradient-to-t from-purple-700 to-purple-400 group-hover:brightness-125 transition-all"
                          />
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${((d.accuracy - 80) / 20) * 100}%` }}
                            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
                            className="w-1/2 rounded-t-lg bg-gradient-to-t from-green-600 to-green-400 opacity-85 group-hover:brightness-125 transition-all"
                          />
                        </div>
                        <span className="text-[11px] text-white/45">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </ProfileCard>
              </motion.div>

              {/* Assessment History */}
              <motion.div {...fadeUp(0.22)}>
                <ProfileCard className="p-6">
                  <SectionHeader
                    title="Assessment History"
                    subtitle="All completed evaluations"
                    action={<span className="text-xs text-purple-400 font-semibold cursor-pointer hover:text-purple-300 transition-colors">View All →</span>}
                  />
                  <div className="flex flex-col gap-3">
                    {assessmentHistory.map(item => {
                      const [r, g, b] = item.color;
                      return (
                        <div
                          key={item.id}
                          className="glass rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/8 hover:border-white/15 transition-all duration-200"
                        >
                          <div className="flex flex-col gap-1 flex-1">
                            <span className="text-sm font-semibold text-white">{item.title}</span>
                            <span className="text-xs text-white/40">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-4 flex-shrink-0">
                            {/* Score bar */}
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-xs font-bold font-space text-white">{item.score}%</span>
                              <div className="w-20 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.score}%` }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                  className="h-full rounded-full"
                                  style={{ background: `rgb(${r},${g},${b})` }}
                                />
                              </div>
                            </div>
                            {/* Grade badge */}
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className="text-base font-space font-bold"
                                style={{ color: `rgb(${r},${g},${b})` }}
                              >
                                {item.grade}
                              </span>
                              <span
                                className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                                style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ProfileCard>
              </motion.div>

            </div>
          </div>

          {/* ── ACHIEVEMENTS GRID (Full width) ────────────────── */}
          <motion.div {...fadeUp(0.28)}>
            <ProfileCard className="p-6">
              <SectionHeader
                title="Achievements & Badges"
                subtitle={`${achievements.filter(a => a.earned).length} earned · ${achievements.filter(a => !a.earned).length} locked`}
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {achievements.map(badge => (
                  <AchievementBadge key={badge.id} badge={badge} />
                ))}
              </div>
            </ProfileCard>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
