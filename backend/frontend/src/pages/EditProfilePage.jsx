import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthInput } from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';


/* ══════════════════════════════════════════════════════════════════
   REUSABLE CARD & SECTION HEADER
   (Mirrors ProfilePage — keeps the same glass-strong design token)
══════════════════════════════════════════════════════════════════ */
function ProfileCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`glass-strong rounded-3xl border border-white/10 ${className}`}
      style={{
        boxShadow: '0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-0.5 mb-6">
      <h2 className="text-lg font-space font-bold text-white">{title}</h2>
      {subtitle && <p className="text-xs text-white/40">{subtitle}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TEXTAREA INPUT  (matches AuthInput styling)
══════════════════════════════════════════════════════════════════ */
function AuthTextarea({ id, label, placeholder, value, onChange, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full py-3.5 px-4 rounded-xl text-sm text-white outline-none resize-none transition-all duration-200"
        style={{
          background: focused ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.04)',
          border: focused ? '1px solid rgba(139,92,246,0.55)' : '1px solid rgba(255,255,255,0.08)',
          boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none',
        }}
      />
      <style>{`#${id}::placeholder { color: rgba(255,255,255,0.22); }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CHECKBOX TOGGLE   (Accessibility Preferences)
══════════════════════════════════════════════════════════════════ */
function ToggleSwitch({ id, label, description, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex items-center justify-between gap-4 cursor-pointer group">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-white group-hover:text-white/90 transition-colors">{label}</span>
        {description && <span className="text-xs text-white/40">{description}</span>}
      </div>
      <div className="relative flex-shrink-0">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
        <div
          className="w-11 h-6 rounded-full transition-all duration-300"
          style={{ background: checked ? 'linear-gradient(135deg,#7c3aed,#3b82f6)' : 'rgba(255,255,255,0.1)', boxShadow: checked ? '0 0 12px rgba(139,92,246,0.5)' : 'none' }}
        >
          <div
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
            style={{ left: checked ? '23px' : '4px' }}
          />
        </div>
      </div>
    </label>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SELECT DROPDOWN
══════════════════════════════════════════════════════════════════ */
function AuthSelect({ id, label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full py-3.5 px-4 pr-10 rounded-xl text-sm text-white outline-none appearance-none transition-all duration-200"
          style={{
            background: focused ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.04)',
            border: focused ? '1px solid rgba(139,92,246,0.55)' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: focused ? '0 0 0 3px rgba(139,92,246,0.12)' : 'none',
          }}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} style={{ background: '#0b0717', color: 'white' }}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Caret icon */}
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SELECT OPTIONS DATA
══════════════════════════════════════════════════════════════════ */
const COUNTRIES = [
  { value: 'India',          label: '🇮🇳  India' },
  { value: 'United States',  label: '🇺🇸  United States' },
  { value: 'United Kingdom', label: '🇬🇧  United Kingdom' },
  { value: 'Canada',         label: '🇨🇦  Canada' },
  { value: 'Australia',      label: '🇦🇺  Australia' },
  { value: 'Germany',        label: '🇩🇪  Germany' },
  { value: 'France',         label: '🇫🇷  France' },
  { value: 'Japan',          label: '🇯🇵  Japan' },
  { value: 'Brazil',         label: '🇧🇷  Brazil' },
  { value: 'Other',          label: '🌍  Other' },
];

const LANGUAGES = [
  { value: 'English (ASL)',  label: 'English — ASL (American Sign Language)' },
  { value: 'English (BSL)',  label: 'English — BSL (British Sign Language)' },
  { value: 'Hindi (ISL)',    label: 'Hindi — ISL (Indian Sign Language)' },
  { value: 'French (LSF)',   label: 'French — LSF (Langue des signes française)' },
  { value: 'German (DGS)',   label: 'German — DGS (Deutsche Gebärdensprache)' },
  { value: 'Japanese (JSL)', label: 'Japanese — JSL (日本手話)' },
];

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function EditProfilePage() {
  const navigate      = useNavigate();
  const fileRef       = useRef(null);
  const { user, updateProfile } = useAuth();

  /* Form state — pre-filled from user or localStorage */
  const [avatarSrc, setAvatarSrc]     = useState(null);
  const [name,      setName]          = useState(user?.name || localStorage.getItem('mira_user_name') || 'Alex Morgan');
  const [email,     setEmail]         = useState(user?.email || 'alex.morgan@email.com');
  const [phone,     setPhone]         = useState(user?.phone || '+91 98765 43210');
  const [country,   setCountry]       = useState(user?.country || 'India');
  const [language,  setLanguage]      = useState(user?.language || 'English (ASL)');
  const [goals,     setGoals]         = useState(user?.goals || 'Master conversational ASL for daily use and pass Level 3 certification by September.');


  /* Accessibility Preferences */
  const [a11y, setA11y] = useState({
    highContrast:      false,
    largerText:        false,
    reducedMotion:     false,
    captionsEnabled:   true,
    hapticFeedback:    false,
    colorBlindMode:    false,
  });
  const toggleA11y = key => setA11y(prev => ({ ...prev, [key]: !prev[key] }));

  /* UI state */
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [errors,  setErrors]  = useState({});

  /* Avatar upload */
  const handleAvatarChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  /* Validation */
  const validate = () => {
    const errs = {};
    if (!name.trim())  errs.name  = 'Full name is required.';
    if (!email.trim()) errs.email = 'Email address is required.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Enter a valid email address.';
    return errs;
  };

  /* Save handler */
  const handleSave = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSaving(true);
    setTimeout(() => {
      updateProfile({
        name: name.trim(),
        email,
        phone,
        country,
        language,
        goals,
      });
      setSaving(false);
      setSaved(true);
      setTimeout(() => navigate('/profile'), 2000);
    }, 1400);
  };


  /* Framer helpers */
  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 20 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div className="relative min-h-screen bg-[#050505] text-white pt-20 pb-16 px-4">

      {/* ── Ambient glows ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse,rgba(139,92,246,0.65) 0%,transparent 70%)', filter: 'blur(90px)' }} />
        <div className="absolute bottom-20 right-1/4 w-[420px] h-[420px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse,rgba(59,130,246,0.65) 0%,transparent 70%)', filter: 'blur(90px)' }} />
      </div>

      {/* ── Success Toast ─────────────────────────────────────────── */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-24 right-6 z-50 flex items-center gap-3 glass-strong px-5 py-3.5 rounded-2xl border border-green-500/30 shadow-2xl"
            style={{ boxShadow: '0 12px 40px rgba(34,197,94,0.2)' }}
          >
            <div className="w-7 h-7 rounded-xl bg-green-500/20 border border-green-500/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Profile Updated</span>
              <span className="text-xs text-white/50">Redirecting to your profile…</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* ── Page Header ───────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Back button */}
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-space font-bold text-white">Edit Profile</h1>
              <p className="text-xs text-white/40">Update your personal information and preferences</p>
            </div>
          </div>

          {/* Step badge */}
          <div
            className="hidden sm:flex items-center gap-2 glass rounded-full px-4 py-1.5"
            style={{ border: '1px solid rgba(139,92,246,0.25)' }}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-semibold text-white/60 tracking-wider">Learner Profile</span>
          </div>
        </motion.div>

        <form onSubmit={handleSave} noValidate className="flex flex-col gap-6">

          {/* ── AVATAR CARD ───────────────────────────────────────── */}
          <motion.div {...fadeUp(0.06)}>
            <ProfileCard className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">

                {/* Avatar preview */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center font-bold text-4xl text-white cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      background: avatarSrc ? 'transparent' : 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                      boxShadow: '0 0 32px rgba(139,92,246,0.45)',
                    }}
                    onClick={() => fileRef.current?.click()}
                  >
                    {avatarSrc
                      ? <img src={avatarSrc} alt="Profile Preview" className="w-full h-full object-cover" />
                      : (name.trim().charAt(0) || 'A')
                    }
                  </div>
                  {/* Camera bubble */}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#3b82f6)', boxShadow: '0 4px 14px rgba(124,58,237,0.55)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>

                {/* Instructions */}
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <h3 className="font-space font-semibold text-white">Profile Photo</h3>
                  <p className="text-xs text-white/45 leading-relaxed max-w-xs">
                    Click the avatar or camera button to upload a new photo.<br />
                    Supported formats: JPG, PNG, WEBP — Max 5 MB.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="btn-secondary text-xs self-center sm:self-start mt-1"
                    style={{ padding: '8px 18px' }}
                  >
                    Choose Photo
                  </button>
                </div>
              </div>
            </ProfileCard>
          </motion.div>

          {/* ── PERSONAL INFORMATION ──────────────────────────────── */}
          <motion.div {...fadeUp(0.1)}>
            <ProfileCard className="p-6">
              <SectionHeader title="Personal Information" subtitle="Basic account details" />
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <AuthInput
                    id="edit-name"
                    label="Full Name"
                    placeholder="Your full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-xs text-rose-400 mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <AuthInput
                    id="edit-email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>}
                </div>
                <AuthInput
                  id="edit-phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  autoComplete="tel"
                />
                <AuthSelect
                  id="edit-country"
                  label="Country / Region"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  options={COUNTRIES}
                />
              </div>
            </ProfileCard>
          </motion.div>

          {/* ── LEARNING PREFERENCES ──────────────────────────────── */}
          <motion.div {...fadeUp(0.14)}>
            <ProfileCard className="p-6">
              <SectionHeader title="Learning Preferences" subtitle="Language and goal configuration" />
              <div className="flex flex-col gap-5">
                <AuthSelect
                  id="edit-language"
                  label="Preferred Sign Language"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  options={LANGUAGES}
                />
                <AuthTextarea
                  id="edit-goals"
                  label="Learning Goals"
                  placeholder="Describe your sign language learning goals…"
                  value={goals}
                  onChange={e => setGoals(e.target.value)}
                  rows={4}
                />
              </div>
            </ProfileCard>
          </motion.div>

          {/* ── ACCESSIBILITY PREFERENCES ─────────────────────────── */}
          <motion.div {...fadeUp(0.18)}>
            <ProfileCard className="p-6">
              <SectionHeader title="Accessibility Preferences" subtitle="Customize your learning experience" />
              <div className="flex flex-col gap-5 divide-y divide-white/5">
                {[
                  { key: 'highContrast',    label: 'High Contrast Mode',      desc: 'Increase color contrast for better visibility' },
                  { key: 'largerText',      label: 'Larger Text',             desc: 'Increase font sizes across the platform' },
                  { key: 'reducedMotion',   label: 'Reduce Motion',           desc: 'Minimize animations and transitions' },
                  { key: 'captionsEnabled', label: 'Gesture Captions',        desc: 'Show text captions during sign practice sessions' },
                  { key: 'hapticFeedback',  label: 'Haptic Feedback',         desc: 'Enable vibration feedback on supported devices' },
                  { key: 'colorBlindMode',  label: 'Color-Blind Mode',        desc: 'Adapt UI colors for color vision deficiencies' },
                ].map((item, i) => (
                  <div key={item.key} className={i > 0 ? 'pt-4' : ''}>
                    <ToggleSwitch
                      id={`a11y-${item.key}`}
                      label={item.label}
                      description={item.desc}
                      checked={a11y[item.key]}
                      onChange={() => toggleA11y(item.key)}
                    />
                  </div>
                ))}
              </div>
            </ProfileCard>
          </motion.div>

          {/* ── ACTION BUTTONS ────────────────────────────────────── */}
          <motion.div {...fadeUp(0.22)}>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-end">
              {/* Cancel */}
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                style={{ padding: '14px 32px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>

              {/* Save Changes */}
              <button
                type="submit"
                disabled={saving}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 relative overflow-hidden"
                style={{ padding: '14px 36px', opacity: saving ? 0.8 : 1, boxShadow: '0 10px 32px rgba(124,58,237,0.4)' }}
              >
                {saving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>

        </form>
      </div>
    </div>
  );
}
