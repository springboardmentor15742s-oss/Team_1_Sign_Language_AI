import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth, KNOWN_ACCOUNTS } from '../context/AuthContext';

/* ─── Role Configuration Data ────────────────────────────────────── */

const roles = [
  {
    id: 'learner',
    title: 'Learner',
    description: 'Learn sign language through AI-powered lessons, assessments, and personalized learning.',
    route: '/dashboard',
    badge: 'Popular',
    accentColor: [168, 85, 247], // Violet
    glowGradient: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(59,130,246,0.4))',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14v6.5" />
      </svg>
    ),
  },
  {
    id: 'instructor',
    title: 'Instructor',
    description: 'Create learning content, monitor learners, review assessments, and track attendance.',
    route: '/instructor-dashboard',
    badge: 'Educator',
    accentColor: [59, 130, 246], // Blue
    glowGradient: 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(56,189,248,0.4))',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'trainer',
    title: 'Accessibility Trainer',
    description: 'Provide accessibility guidance, monitor learner performance & attendance, and coordinate instructor sessions.',
    route: '/trainer-dashboard',
    badge: 'Specialist',
    accentColor: [236, 72, 153], // Pink
    glowGradient: 'linear-gradient(135deg, rgba(236,72,153,0.4), rgba(168,85,247,0.4))',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage users, platform analytics, learner & instructor attendance, and overall system settings.',
    route: '/admin-dashboard',
    badge: 'Management',
    accentColor: [16, 185, 129], // Emerald
    glowGradient: 'linear-gradient(135deg, rgba(16,185,129,0.4), rgba(59,130,246,0.4))',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

/* ─── Page Component ─────────────────────────────────────────────── */
export default function RoleSelectionPage() {
  const { user, selectRole, canAccessRole, login } = useAuth();
  const navigate = useNavigate();

  // Pre-select the user's primary/default role if available
  const defaultSelectedId = roles.find(r => canAccessRole(r.title))?.id || 'learner';
  const [selectedRoleId, setSelectedRoleId] = useState(defaultSelectedId);
  const [deniedModalRole, setDeniedModalRole] = useState(null);

  const selectedRole = roles.find(r => r.id === selectedRoleId);

  const handleRoleCardClick = (role) => {
    const isAllowed = canAccessRole(role.title);
    if (!isAllowed) {
      setDeniedModalRole(role);
      return;
    }
    setSelectedRoleId(role.id);
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    if (!canAccessRole(selectedRole.title)) {
      setDeniedModalRole(selectedRole);
      return;
    }
    // Save selected role via AuthContext (also saves token and role to localStorage)
    selectRole(selectedRole.title);
    // Navigate immediately to the selected role's dashboard
    navigate(selectedRole.route, { replace: true });
  };

  const handleSwitchToKnownAccount = (roleId) => {
    const account = KNOWN_ACCOUNTS[roleId];
    if (account) {
      login(account);
      setSelectedRoleId(roleId);
      setDeniedModalRole(null);
      selectRole(account.role);
    }
  };

  /* Motion Variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="animate"
      exit="exit"
      className="relative min-h-screen flex items-center pt-28 pb-20 px-4 overflow-hidden"
    >
      {/* Top accent vertical line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.5), transparent)' }}
      />

      {/* Background ambient glow spots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center gap-8">
        {/* Header Section */}
        <motion.div
          variants={cardVariants}
          className="text-center flex flex-col items-center gap-3 max-w-2xl"
        >
          {/* Step Pill */}
          <div
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-1"
            style={{ border: '1px solid rgba(139,92,246,0.3)' }}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/70 tracking-widest uppercase">
              Authenticated Session · Choose Your Role
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-space font-bold text-white tracking-tight leading-tight">
            Choose Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 60%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Role
            </span>
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-white/55">
            Select how you will use the Sign Language AI Learning &amp; Assessment Platform.
          </p>

          {/* Current User Pill & Known Logins Switcher */}
          <div className="w-full mt-2 p-3 rounded-2xl glass border border-white/10 flex flex-wrap items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">
                  Logged in as: <span className="text-purple-400">{user?.name || 'User'}</span>
                </span>
                <span className="text-[11px] text-white/40">
                  {user?.email} · Account Role: <span className="text-white/80 font-medium">{user?.role || 'Learner'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-white/40 uppercase tracking-wider mr-1">Known Logins:</span>
              {Object.entries(KNOWN_ACCOUNTS).map(([key, acc]) => {
                const isActive = (user?.email || '').toLowerCase() === acc.email.toLowerCase();
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSwitchToKnownAccount(key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-purple-500/25 border border-purple-500/50 text-purple-200 shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {acc.role}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {roles.map((role) => {
            const isSelected = selectedRoleId === role.id;
            const isAllowed = canAccessRole(role.title);
            const [r, g, b] = role.accentColor;

            return (
              <motion.div
                key={role.id}
                variants={cardVariants}
                onClick={() => handleRoleCardClick(role)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleRoleCardClick(role)}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`Select role: ${role.title}`}
                whileHover={isAllowed ? { y: -8, scale: 1.02 } : { scale: 0.99 }}
                whileTap={isAllowed ? { scale: 0.98 } : {}}
                className={`group relative rounded-3xl p-6 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 ${
                  !isAllowed ? 'opacity-55 hover:opacity-75' : ''
                }`}
                style={{
                  background: isSelected && isAllowed
                    ? `rgba(${r}, ${g}, ${b}, 0.12)`
                    : 'rgba(10, 8, 22, 0.75)',
                  backdropFilter: 'blur(32px)',
                  WebkitBackdropFilter: 'blur(32px)',
                  border: isSelected && isAllowed
                    ? `1.5px solid rgba(${r}, ${g}, ${b}, 0.85)`
                    : !isAllowed
                    ? '1px dashed rgba(255, 255, 255, 0.15)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected && isAllowed
                    ? `0 20px 50px rgba(${r}, ${g}, ${b}, 0.25), 0 0 0 1px rgba(${r}, ${g}, ${b}, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)`
                    : '0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Background radial highlight for selected state */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-3xl"
                  style={{
                    opacity: isSelected && isAllowed ? 1 : 0,
                    background: `radial-gradient(circle at 50% 0%, rgba(${r}, ${g}, ${b}, 0.22) 0%, transparent 70%)`,
                  }}
                />

                {/* Top Bar: Icon + Checkmark / Badge */}
                <div className="relative z-10 flex items-start justify-between mb-6">
                  {/* Modern Icon Container */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 relative"
                    style={{
                      background: `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.8), rgba(${r}, ${g}, ${b}, 0.4))`,
                      border: `1px solid rgba(${r}, ${g}, ${b}, 0.6)`,
                      boxShadow: `0 8px 24px rgba(${r}, ${g}, ${b}, 0.4)`,
                    }}
                  >
                    {role.icon}
                    {!isAllowed && (
                      <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-600 border border-white/40 flex items-center justify-center shadow-lg">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-11a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Selection Checkmark Badge or Lock badge */}
                  {!isAllowed ? (
                    <span
                      className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full text-rose-300 flex items-center gap-1"
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                      }}
                    >
                      <svg className="w-3 h-3 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Locked
                    </span>
                  ) : isSelected ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg"
                      style={{
                        background: `rgb(${r}, ${g}, ${b})`,
                        boxShadow: `0 0 16px rgba(${r}, ${g}, ${b}, 0.8)`,
                      }}
                    >
                      <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  ) : (
                    <span
                      className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full text-white/40"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {role.badge}
                    </span>
                  )}
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex flex-col gap-2 mt-auto">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-space font-bold text-white group-hover:text-white transition-colors duration-200">
                      {role.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-white/55 font-normal">
                    {role.description}
                  </p>
                  {!isAllowed && (
                    <p className="text-[11px] text-rose-400/90 font-medium mt-1">
                      ⚠️ Requires {role.title} credentials
                    </p>
                  )}
                </div>

                {/* Active bottom accent indicator line */}
                {isSelected && isAllowed && (
                  <motion.div
                    layoutId="roleActiveBar"
                    className="absolute bottom-0 left-4 right-4 h-1 rounded-t-full"
                    style={{ background: `rgb(${r}, ${g}, ${b})`, boxShadow: `0 0 12px rgba(${r}, ${g}, ${b}, 0.9)` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Actions Section */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col items-center gap-4 mt-2"
        >
          {/* Continue Button */}
          <motion.button
            onClick={handleContinue}
            disabled={!selectedRoleId || !canAccessRole(selectedRole?.title)}
            className={`text-base flex items-center justify-center gap-3 transition-all duration-300 ${
              selectedRoleId && canAccessRole(selectedRole?.title)
                ? 'btn-primary cursor-pointer'
                : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed rounded-full'
            }`}
            style={{
              padding: '14px 44px',
              minWidth: '240px',
              opacity: selectedRoleId && canAccessRole(selectedRole?.title) ? 1 : 0.5,
              boxShadow: selectedRoleId && canAccessRole(selectedRole?.title) ? '0 10px 32px rgba(124, 58, 237, 0.4)' : 'none',
            }}
            whileHover={selectedRoleId && canAccessRole(selectedRole?.title) ? { scale: 1.04 } : {}}
            whileTap={selectedRoleId && canAccessRole(selectedRole?.title) ? { scale: 0.97 } : {}}
          >
            <span className="font-semibold tracking-wide">
              {selectedRole ? `Enter as ${selectedRole.title}` : 'Select a Role'}
            </span>
            <svg
              className="w-4 h-4"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>

          {/* Helper hint */}
          <p className="text-xs text-white/40 font-medium">
            Learner accounts can only open as Learner. Instructor, Trainer, and Admin roles require known logins.
          </p>
        </motion.div>
      </div>

      {/* Access Denied Modal for Learner clicking locked roles */}
      <AnimatePresence>
        {deniedModalRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-md w-full glass-strong rounded-3xl p-6 md:p-8 border border-rose-500/30 flex flex-col gap-5 shadow-2xl"
              style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(244,63,94,0.15)' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">Access Restricted</span>
                <h3 className="text-xl font-space font-bold text-white mt-1">
                  Cannot Access {deniedModalRole.title}
                </h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">
                  Your current login (<strong className="text-white">{user?.email}</strong>) is a <strong>Learner</strong> account. Learner logins can only open the Learner portal and cannot login to other roles.
                </p>
                <p className="text-xs text-white/40 mt-2">
                  To open this portal, you must sign in with known {deniedModalRole.title} credentials.
                </p>
              </div>

              {/* One-click known login switch option */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => handleSwitchToKnownAccount(deniedModalRole.id)}
                  className="btn-primary text-sm py-3 px-4 flex items-center justify-center gap-2"
                >
                  <span>Switch to {deniedModalRole.title} Known Login</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeniedModalRole(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-medium transition-all"
                >
                  Stay as Learner
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #050505)' }}
      />
    </motion.section>
  );
}
