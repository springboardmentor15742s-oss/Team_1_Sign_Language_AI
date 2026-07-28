import { useState } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.jpeg';

/* ══════════════════════════════════════════════════════════════════
   ANIMATED GLOW BORDER
   Shared conic gradient rim used across all auth cards
══════════════════════════════════════════════════════════════════ */
export function GlowBorder({ conicGradient }) {
  const defaultGradient =
    'conic-gradient(from 0deg, transparent, rgba(139,92,246,0.7) 60deg, rgba(59,130,246,0.8) 120deg, rgba(236,72,153,0.6) 180deg, transparent 260deg)';

  return (
    <motion.div
      className="absolute inset-0 rounded-3xl pointer-events-none"
      style={{ padding: '1px', background: 'transparent' }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: conicGradient || defaultGradient,
          filter: 'blur(1px)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      {/* mask the interior so only a 1px rim shows */}
      <div
        className="absolute rounded-3xl"
        style={{ inset: '1px', background: 'rgba(7,5,16,0.96)' }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SHARED AUTH FORM INPUT
   Reusable input field with glass styling and focus animations
══════════════════════════════════════════════════════════════════ */
export function AuthInput({ id, label, type = 'text', placeholder, value, onChange, right, focusColor = 'rgba(139,92,246,0.55)', autoComplete }) {
  const isPurple = focusColor.includes('139') || focusColor.includes('168');
  const isIndigo = focusColor.includes('99') || focusColor.includes('98');

  const bgFocused = isIndigo ? 'rgba(99,102,241,0.06)' : 'rgba(139,92,246,0.06)';
  const shadowFocused = isIndigo ? '0 0 0 3px rgba(99,102,241,0.12)' : '0 0 0 3px rgba(139,92,246,0.12)';

  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={onChange} autoComplete={autoComplete || id}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full py-3.5 px-4 rounded-xl text-sm text-white outline-none transition-all duration-200"
          style={{
            background: focused ? bgFocused : 'rgba(255,255,255,0.04)',
            border: focused ? `1px solid ${focusColor}` : '1px solid rgba(255,255,255,0.08)',
            boxShadow: focused ? shadowFocused : 'none',
            color: 'white',
          }}
        />
        <style>{`#${id}::placeholder { color: rgba(255,255,255,0.22); }`}</style>
        {right && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{right}</div>}
      </div>
    </div>
  );
}



/* ══════════════════════════════════════════════════════════════════
   REUSABLE AUTH LAYOUT COMPONENT
   Standardized layout for Login, Register, Forgot, Verify, Reset pages
══════════════════════════════════════════════════════════════════ */
export default function AuthLayout({
  // Left side props
  illustration,
  leftTitle,
  leftTitleGradient,
  leftGradientStyle,
  leftDescription,
  quoteText,
  quoteAuthor = '— Sign Language AI Learning Platform',
  quoteIcon,
  leftAccentColor = 'rgba(139,92,246,0.18)',

  // Right card props
  cardIcon,
  title,
  subtitle,
  conicGlowGradient,
  badges = [
    { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Secure Login', color: [34, 197, 94] },
    { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Accessibility Supported', color: [59, 130, 246] },
  ],

  // Form body
  children,
}) {

  /* Page enter/exit transition matching all auth pages */
  const pageVariants = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
  };

  const defaultGradientStyle = {
    background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 55%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative min-h-screen flex items-center pt-28 pb-20 px-4 overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.5), transparent)' }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.4) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-center">

          {/* ── LEFT SIDE ──────────────────────────────────────── */}
          <div className="hidden lg:flex flex-col gap-8">
            {illustration}

            {/* Left text block */}
            <div className="flex flex-col gap-4 px-1">
              {leftTitle && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl font-space font-bold leading-tight text-white"
                >
                  {leftTitle}
                  {leftTitleGradient && (
                    <>
                      <br />
                      <span style={leftGradientStyle || defaultGradientStyle}>
                        {leftTitleGradient}
                      </span>
                    </>
                  )}
                </motion.h2>
              )}

              {leftDescription && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm leading-relaxed max-w-sm"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {leftDescription}
                </motion.p>
              )}

              {/* Quote card */}
              {quoteText && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-1 glass rounded-2xl p-4 flex items-start gap-3"
                  style={{ border: `1px solid ${leftAccentColor}` }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      background: 'rgba(139,92,246,0.12)',
                      border: '1px solid rgba(139,92,246,0.25)',
                      color: 'rgba(168,85,247,0.9)',
                    }}
                  >
                    {quoteIcon || (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      &quot;{quoteText}&quot;
                    </p>
                    <p className="text-xs mt-1.5 font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
                      {quoteAuthor}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* ── RIGHT SIDE — Auth Glass Card ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            <div
              className="relative rounded-3xl"
              style={{
                background: 'rgba(7, 5, 16, 0.92)',
                backdropFilter: 'blur(48px)',
                WebkitBackdropFilter: 'blur(48px)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Rotating glow rim */}
              <GlowBorder conicGradient={conicGlowGradient} />

              <div className="relative z-10 p-8 md:p-10 flex flex-col gap-6">

                {/* Logo Header */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center gap-2.5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 24px rgba(139,92,246,0.6)' }}
                  >
                    <img
                      src={logoImg}
                      alt="Sign Language AI Logo"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 opacity-25" style={{ background: 'linear-gradient(135deg, white 0%, transparent 100%)' }} />
                  </div>
                  <span className="font-space font-bold text-xl text-white tracking-wide">Sign Language AI</span>
                </motion.div>

                {/* Card Title & Subtitle Header */}
                {(title || subtitle) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.65 }}
                    className="flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      {cardIcon}
                      {title && (
                        <h1 className="text-3xl font-space font-bold text-white leading-tight">
                          {title}
                        </h1>
                      )}
                    </div>
                    {subtitle && (
                      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
                        {subtitle}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Form / Page children */}
                {children}

                {/* Security badges footer */}
                {badges && badges.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    {badges.map(b => (
                      <div
                        key={b.label}
                        className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                        style={{
                          background: `rgba(${b.color},0.08)`,
                          border: `1px solid rgba(${b.color},0.22)`,
                        }}
                      >
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: `rgb(${b.color})` }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} />
                        </svg>
                        <span className="text-[10px] font-semibold tracking-wide" style={{ color: `rgba(${b.color},0.8)` }}>
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #050505)' }}
      />
    </motion.section>
  );
}
