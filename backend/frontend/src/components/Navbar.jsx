import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.jpeg';


const navItems = ['Features', 'Courses', 'Gesture', 'Tracking', 'Assessment', 'Feedback', 'About', 'Accessibility'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, role, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
    >
      <nav
        className={`w-full max-w-6xl transition-all duration-500 ${
          scrolled
            ? 'glass-strong rounded-2xl px-6 py-3 shadow-2xl'
            : 'bg-transparent px-6 py-3'
        }`}
        style={scrolled ? {
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        } : {}}
      >
        <div className="flex items-center justify-between">
          {/* Logo — click goes home */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate('/')}
          >
            <div
              className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                boxShadow: '0 0 20px rgba(139,92,246,0.6)',
              }}
            >
              <img
                src={logoImg}
                alt="Sign Language AI Logo"
                className="w-full h-full object-cover rounded-xl"
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: 'linear-gradient(135deg, white 0%, transparent 100%)' }}
              />
            </div>
            <span className="text-white font-space font-bold text-xl tracking-wide">Sign Language AI</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item === 'Courses' ? (
                <Link
                  key={item}
                  to="/courses"
                  className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5 cursor-pointer"
                  style={{ fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  {item}
                </Link>
              ) : item === 'Gesture' ? (
                <Link
                  key={item}
                  to="/gesture-recognition"
                  className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5 cursor-pointer"
                  style={{ fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  Gesture AI
                </Link>
              ) : item === 'Tracking' ? (
                <Link
                  key={item}
                  to="/tracking/hand"
                  className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5 cursor-pointer"
                  style={{ fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  Tracking Engine
                </Link>
              ) : item === 'Assessment' ? (
                <Link
                  key={item}
                  to="/assessment"
                  className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5 cursor-pointer"
                  style={{ fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  Assessment
                </Link>
              ) : item === 'Feedback' ? (
                <Link
                  key={item}
                  to="/feedback"
                  className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5 cursor-pointer"
                  style={{ fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  AI Feedback
                </Link>
              ) : (
                <motion.a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5 cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  style={{ fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  {item}
                </motion.a>
              )
            ))}
          </div>

          {/* CTA Buttons — show user avatar when authenticated */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-200 hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white overflow-hidden flex-shrink-0"
                    style={{ background: user.avatar ? 'transparent' : 'linear-gradient(135deg,#7c3aed,#3b82f6)', boxShadow: '0 0 12px rgba(139,92,246,0.5)' }}
                  >
                    {user.avatar
                      ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                      : (user.name?.charAt(0) || 'A')
                    }
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold text-white leading-none">{user.name?.split(' ')[0] || 'User'}</span>
                    <span className="text-[10px] text-purple-400 leading-none mt-0.5">{role || 'Learner'}</span>
                  </div>
                  <svg className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-2xl overflow-hidden z-50"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}
                    >
                      <Link to="/profile" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        My Profile
                      </Link>
                      <Link to="/dashboard" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Dashboard
                      </Link>
                      <div className="border-t border-white/10 mx-3" />
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    className="px-5 py-2 text-sm text-white/70 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5"
                    style={{ fontWeight: 500 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    className="btn-primary text-sm relative z-10"
                    style={{ padding: '10px 22px' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10">Get Started</span>
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 flex flex-col gap-1 border-t border-white/10 mt-3">
                {navItems.map((item) => (
                  item === 'Courses' ? (
                    <Link
                      key={item}
                      to="/courses"
                      className="px-4 py-3 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ) : (
                    <a
                      key={item}
                      href={`/#${item.toLowerCase()}`}
                      className="px-4 py-3 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </a>
                  )
                ))}
                <div className="flex gap-3 pt-3 mt-1 border-t border-white/10">
                  <Link to="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-2.5 text-sm text-white/70 border border-white/10 rounded-lg hover:bg-white/5 transition-all">
                      Login
                    </button>
                  </Link>
                  <Link to="/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                    <button className="w-full py-2.5 text-sm btn-primary">Get Started</button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
