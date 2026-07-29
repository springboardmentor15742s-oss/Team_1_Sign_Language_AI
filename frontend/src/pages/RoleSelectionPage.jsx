import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    description: 'Create learning content, monitor learners, and review assessment results.',
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
    description: 'Provide accessibility-focused guidance and monitor learner progress.',
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
    description: 'Manage users, analytics, platform settings, and overall system administration.',
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
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const navigate = useNavigate();
  const { selectRole } = useAuth();

  const selectedRole = roles.find(r => r.id === selectedRoleId);

  const handleContinue = () => {
    if (!selectedRole) return;
    // Save selected role via AuthContext
    selectRole(selectedRole.title);
    // Navigate to Dashboard
    navigate(selectedRole.route);
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

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center gap-12">
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
              Onboarding Step 1 of 2
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
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {roles.map((role) => {
            const isSelected = selectedRoleId === role.id;
            const [r, g, b] = role.accentColor;

            return (
              <motion.div
                key={role.id}
                variants={cardVariants}
                onClick={() => setSelectedRoleId(role.id)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelectedRoleId(role.id)}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`Select role: ${role.title}`}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-3xl p-6 flex flex-col justify-between cursor-pointer select-none transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                style={{
                  background: isSelected
                    ? `rgba(${r}, ${g}, ${b}, 0.12)`
                    : 'rgba(10, 8, 22, 0.75)',
                  backdropFilter: 'blur(32px)',
                  WebkitBackdropFilter: 'blur(32px)',
                  border: isSelected
                    ? `1.5px solid rgba(${r}, ${g}, ${b}, 0.85)`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected
                    ? `0 20px 50px rgba(${r}, ${g}, ${b}, 0.25), 0 0 0 1px rgba(${r}, ${g}, ${b}, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)`
                    : '0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Background radial highlight for selected state */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-3xl"
                  style={{
                    opacity: isSelected ? 1 : 0,
                    background: `radial-gradient(circle at 50% 0%, rgba(${r}, ${g}, ${b}, 0.22) 0%, transparent 70%)`,
                  }}
                />

                {/* Top Bar: Icon + Checkmark / Badge */}
                <div className="relative z-10 flex items-start justify-between mb-6">
                  {/* Modern Icon Container */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.8), rgba(${r}, ${g}, ${b}, 0.4))`,
                      border: `1px solid rgba(${r}, ${g}, ${b}, 0.6)`,
                      boxShadow: `0 8px 24px rgba(${r}, ${g}, ${b}, 0.4)`,
                    }}
                  >
                    {role.icon}
                  </div>

                  {/* Selection Checkmark Badge */}
                  {isSelected ? (
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
                  <h3 className="text-xl font-space font-bold text-white group-hover:text-white transition-colors duration-200">
                    {role.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/55 font-normal">
                    {role.description}
                  </p>
                </div>

                {/* Active bottom accent indicator line */}
                {isSelected && (
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
            disabled={!selectedRoleId}
            className={`text-base flex items-center justify-center gap-3 transition-all duration-300 ${
              selectedRoleId
                ? 'btn-primary cursor-pointer'
                : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed rounded-full'
            }`}
            style={{
              padding: '14px 44px',
              minWidth: '220px',
              opacity: selectedRoleId ? 1 : 0.5,
              boxShadow: selectedRoleId ? '0 10px 32px rgba(124, 58, 237, 0.4)' : 'none',
            }}
            whileHover={selectedRoleId ? { scale: 1.04 } : {}}
            whileTap={selectedRoleId ? { scale: 0.97 } : {}}
          >
            <span className="font-semibold tracking-wide">Continue</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                selectedRoleId ? 'translate-x-0 group-hover:translate-x-1' : ''
              }`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>

          {/* Helper hint */}
          <p className="text-xs text-white/35 font-medium">
            {selectedRoleId
              ? `Proceed as ${selectedRole?.title}`
              : 'Please select a role to continue'}
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #050505)' }}
      />
    </motion.section>
  );
}
