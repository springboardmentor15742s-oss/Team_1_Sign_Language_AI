import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout, { AuthInput } from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';



/* ══════════════════════════════════════════════════════════════════
   MINI CANVAS — Left-side hand illustration for Register
══════════════════════════════════════════════════════════════════ */
function RegisterIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    canvas.width = 420;
    canvas.height = 480;

    // ASL "Open Hand / Welcome" sign landmark positions
    const lm = [
      { x: 0.50, y: 0.88 }, // wrist
      { x: 0.32, y: 0.74 }, { x: 0.22, y: 0.62 }, { x: 0.16, y: 0.50 }, { x: 0.12, y: 0.38 }, // thumb wide
      { x: 0.38, y: 0.60 }, { x: 0.32, y: 0.40 }, { x: 0.29, y: 0.24 }, { x: 0.26, y: 0.10 }, // index up-spread
      { x: 0.50, y: 0.58 }, { x: 0.50, y: 0.38 }, { x: 0.50, y: 0.22 }, { x: 0.50, y: 0.08 }, // middle high
      { x: 0.62, y: 0.60 }, { x: 0.65, y: 0.40 }, { x: 0.67, y: 0.25 }, { x: 0.70, y: 0.12 }, // ring up-spread
      { x: 0.74, y: 0.64 }, { x: 0.80, y: 0.48 }, { x: 0.84, y: 0.34 }, { x: 0.87, y: 0.20 }, // pinky wide
    ];
    const conns = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [0,9],[9,10],[10,11],[11,12],
      [0,13],[13,14],[14,15],[15,16],
      [0,17],[17,18],[18,19],[19,20],
      [5,9],[9,13],[13,17],
    ];

    const pos = (p, wx, wy) => ({ x: p.x * canvas.width + wx, y: p.y * canvas.height + wy });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      const wx = Math.sin(t * 0.018) * 6;
      const wy = Math.cos(t * 0.014) * 8;
      const pulse = 0.8 + 0.2 * Math.sin(t * 0.035);

      const bg = ctx.createRadialGradient(canvas.width/2, canvas.height*0.5, 0, canvas.width/2, canvas.height*0.5, 220);
      bg.addColorStop(0, 'rgba(139,92,246,0.08)');
      bg.addColorStop(0.6, 'rgba(59,130,246,0.03)');
      bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width/2, cy = canvas.height*0.52;
      [140, 190, 240].forEach((r, i) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r*0.32, -0.2, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(139,92,246,${0.05 + i*0.02})`;
        ctx.lineWidth = 1; ctx.stroke();
      });

      [[190, 0.016, [139,92,246], 4], [240, -0.012, [59,130,246], 3], [140, 0.024, [236,72,153], 3]].forEach(([r, sp, col, sz]) => {
        const a = t * sp;
        const ox = cx + Math.cos(a) * r;
        const oy = cy + Math.sin(a) * r * 0.32 - 12;
        const dg = ctx.createRadialGradient(ox, oy, 0, ox, oy, sz + 5);
        dg.addColorStop(0, `rgba(${col},1)`); dg.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(ox, oy, sz + 5, 0, Math.PI * 2);
        ctx.fillStyle = dg; ctx.fill();
        ctx.beginPath(); ctx.arc(ox, oy, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},1)`;
        ctx.shadowBlur = 16; ctx.shadowColor = `rgba(${col},1)`;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      const prog = ((t * 0.5) % 100) / 100;
      const sy = canvas.height * 0.12 + canvas.height * 0.74 * prog;
      const sg = ctx.createLinearGradient(0, sy - 4, 0, sy + 4);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, `rgba(139,92,246,${0.28 * (1 - Math.abs(prog - 0.5) * 2)})`);
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.fillRect(canvas.width * 0.10, sy - 4, canvas.width * 0.80, 8);

      conns.forEach(([a, b]) => {
        const pa = pos(lm[a], wx, wy), pb = pos(lm[b], wx, wy);
        const g = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        g.addColorStop(0, `rgba(139,92,246,${0.9 * pulse})`);
        g.addColorStop(0.5, `rgba(59,130,246,${pulse})`);
        g.addColorStop(1, `rgba(236,72,153,${0.85 * pulse})`);
        ctx.beginPath(); ctx.strokeStyle = g; ctx.lineWidth = 2.5;
        ctx.lineCap = 'round'; ctx.shadowBlur = 16; ctx.shadowColor = 'rgba(139,92,246,0.9)';
        ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); ctx.shadowBlur = 0;
      });

      lm.forEach((p, i) => {
        const { x, y } = pos(p, wx, wy);
        const isTip = [4, 8, 12, 16, 20].includes(i);
        const r = i === 0 ? 8 : isTip ? 5.5 : 4;
        ctx.beginPath(); ctx.arc(x, y, r + 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${0.06 * pulse})`; ctx.fill();
        const ng = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
        ng.addColorStop(0, `rgba(230,230,255,${pulse})`);
        ng.addColorStop(0.4, `rgba(139,92,246,${0.95 * pulse})`);
        ng.addColorStop(1, `rgba(59,130,246,${0.8 * pulse})`);
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = ng;
        ctx.shadowBlur = 22; ctx.shadowColor = isTip ? 'rgba(236,72,153,1)' : 'rgba(139,92,246,1)';
        ctx.fill(); ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.8 * pulse})`; ctx.fill();
      });

      const chips = [
        { lx: 28,                   ly: 70,                   label: '50k+ Users',  val: 'Active',     col: [139,92,246] },
        { lx: canvas.width - 118,   ly: 105,                  label: 'AI Powered',  val: '99.2% Acc.',  col: [59,130,246] },
        { lx: 28,                   ly: canvas.height - 100,  label: 'Free Trial',  val: '14 Days',    col: [34,197,94]  },
        { lx: canvas.width - 118,   ly: canvas.height - 88,   label: 'Languages',   val: 'ASL + ISL',  col: [236,72,153] },
      ];
      chips.forEach((c, i) => {
        const fy = c.ly + Math.sin(t * 0.022 + i * 1.4) * 7;
        const [r, g, b] = c.col;
        ctx.fillStyle = 'rgba(10,8,22,0.85)';
        ctx.beginPath(); ctx.roundRect(c.lx, fy, 95, 42, 10); ctx.fill();
        ctx.strokeStyle = `rgba(${r},${g},${b},0.28)`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(c.lx, fy, 95, 42, 10); ctx.stroke();
        ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
        ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(c.label, c.lx + 10, fy + 15);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.font = 'bold 13px Inter,sans-serif';
        ctx.fillText(c.val, c.lx + 10, fy + 32);
      });

      const m = 22, s = 16;
      [[m,m,1,1],[canvas.width-m,m,-1,1],[m,canvas.height-m,1,-1],[canvas.width-m,canvas.height-m,-1,-1]].forEach(([bx,by,xd,yd]) => {
        ctx.strokeStyle = 'rgba(139,92,246,0.4)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(bx, by + yd * s); ctx.lineTo(bx, by); ctx.lineTo(bx + xd * s, by); ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.3))' }}
    >
      <div
        className="glass-strong rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.07)' }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   OAUTH BUTTON
══════════════════════════════════════════════════════════════════ */
function OAuthBtn({ id, icon, label }) {
  return (
    <motion.button
      id={id}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.72)' }}
    >
      {icon}<span>{label}</span>
    </motion.button>
  );
}

const GoogleIcon = () => (
  <svg style={{width:'18px',height:'18px'}} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const MsIcon = () => (
  <svg style={{width:'18px',height:'18px'}} viewBox="0 0 24 24">
    <path d="M11.4 24H0V12.6h11.4V24z" fill="#F25022"/><path d="M24 24H12.6V12.6H24V24z" fill="#00A4EF"/>
    <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#7FBA00"/><path d="M24 11.4H12.6V0H24v11.4z" fill="#FFB900"/>
  </svg>
);
const AppleIcon = () => (
  <svg style={{width:'18px',height:'18px'}} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/* ══════════════════════════════════════════════════════════════════
   PASSWORD STRENGTH CALC
══════════════════════════════════════════════════════════════════ */
function getPasswordStrength(pass) {
  if (!pass) return { score: 0, label: '', color: '' };
  let s = 0;
  if (pass.length >= 8) s += 1;
  if (/[A-Z]/.test(pass)) s += 1;
  if (/[0-9]/.test(pass)) s += 1;
  if (/[^A-Za-z0-9]/.test(pass)) s += 1;
  if (s === 1) return { score: 1, label: 'Weak',         color: '#ef4444' };
  if (s === 2) return { score: 2, label: 'Medium',       color: '#f59e0b' };
  if (s === 3) return { score: 3, label: 'Strong',       color: '#3b82f6' };
  return       { score: 4, label: 'AI Secured ✦', color: '#a855f7' };
}

/* ══════════════════════════════════════════════════════════════════
   REGISTER PAGE — Uses AuthLayout
══════════════════════════════════════════════════════════════════ */
export default function RegisterPage() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [terms, setTerms]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const navigate                = useNavigate();
  const { register }            = useAuth();

  const strength = getPasswordStrength(password);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password || !name) return;
    setLoading(true);
    setTimeout(() => {
      register({ name, email });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    }, 2000);
  };



  const eyeOpen = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>
  );
  const eyeOff = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
    </svg>
  );

  return (
    <AuthLayout
      illustration={<RegisterIllustration />}
      leftTitle="Begin Your Sign Language"
      leftTitleGradient="Mastery Journey."
      leftDescription="Join over 50,000+ learners mastering sign language through AI gesture recognition, real-time feedback, and interactive assessments."
      quoteText="Empowering inclusive communication worldwide with AI."
      quoteAuthor="— Sign Language AI Research Team"
      quoteIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>
      }
      title="Create Account"
      subtitle="Get started with free AI-powered sign language learning."
      badges={[
        { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: '256-bit Encrypted', color: [34, 197, 94] },
        { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', label: '14-Day Free Pro Trial', color: [168, 85, 247] },
      ]}
    >
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <AuthInput
              id="reg-name" label="Full Name" type="text"
              placeholder="Alex Morgan" value={name}
              onChange={e => setName(e.target.value)}
            />

            {/* Email */}
            <AuthInput
              id="reg-email" label="Email Address" type="email"
              placeholder="you@example.com" value={email}
              onChange={e => setEmail(e.target.value)}
            />

            {/* Password */}
            <div>
              <AuthInput
                id="reg-password" label="Password"
                type={showPw ? 'text' : 'password'}
                placeholder="Create strong password" value={password}
                onChange={e => setPassword(e.target.value)}
                right={
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {showPw ? eyeOpen : eyeOff}
                  </button>
                }
              />
              {password && (
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map(idx => (
                      <div
                        key={idx}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: idx <= strength.score ? strength.color : 'rgba(255,255,255,0.08)',
                          boxShadow: idx <= strength.score ? `0 0 8px ${strength.color}` : 'none',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-medium self-end" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer mt-1" onClick={() => setTerms(v => !v)}>
              <div
                className="flex items-center justify-center transition-all duration-200 mt-0.5"
                style={{
                  width: '18px', height: '18px', borderRadius: '5px', flexShrink: 0,
                  background: terms ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.05)',
                  border: terms ? '1px solid rgba(139,92,246,0.6)' : '1px solid rgba(255,255,255,0.14)',
                  boxShadow: terms ? '0 0 14px rgba(139,92,246,0.45)' : 'none',
                }}
              >
                {terms && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </div>
              <span className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.48)' }}>
                I agree to the{' '}
                <a href="#" className="underline hover:text-white" onClick={e => e.stopPropagation()}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="underline hover:text-white" onClick={e => e.stopPropagation()}>Privacy Policy</a>.
              </span>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
              style={{ padding: '14px 24px', fontSize: '0.95rem' }}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Creating Account…
                  </>
                ) : (
                  <>Create Account →</>
                )}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <span className="text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.28)' }}>OR Sign up with</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* OAuth */}
            <div className="flex flex-col gap-2.5">
              <OAuthBtn id="reg-google-btn" icon={<GoogleIcon />} label="Continue with Google" />
              <div className="grid grid-cols-2 gap-2.5">
                <OAuthBtn id="reg-ms-btn" icon={<MsIcon />} label="Microsoft" />
                <OAuthBtn id="reg-apple-btn" icon={<AppleIcon />} label="Apple" />
              </div>
            </div>

            {/* Login link */}
            <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold transition-colors duration-200"
                style={{ color: 'rgba(168,85,247,0.85)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(168,85,247,1)'}
                onMouseLeave={e => e.target.style.color = 'rgba(168,85,247,0.85)'}
              >
                Log In
              </Link>
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 40px rgba(139,92,246,0.55)' }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
              </svg>
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl font-space font-bold text-white">Account Created!</h3>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Welcome to Sign Language AI. Launching your personalized onboarding…
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
