import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout, { AuthInput } from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';

/* ══════════════════════════════════════════════════════════════════
   MINI CANVAS — Left-side decorative hand illustration
   Same visual language as HeroSection's HandVisual, slightly smaller
══════════════════════════════════════════════════════════════════ */



function LoginIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    canvas.width = 420;
    canvas.height = 480;

    // ILY hand sign landmark positions
    const lm = [
      { x: 0.50, y: 0.88 }, // wrist
      { x: 0.34, y: 0.76 }, { x: 0.26, y: 0.65 }, { x: 0.21, y: 0.54 }, { x: 0.17, y: 0.43 }, // thumb
      { x: 0.36, y: 0.62 }, { x: 0.30, y: 0.42 }, { x: 0.28, y: 0.26 }, { x: 0.27, y: 0.12 }, // index
      { x: 0.49, y: 0.60 }, { x: 0.49, y: 0.49 }, { x: 0.49, y: 0.43 }, { x: 0.49, y: 0.39 }, // mid (curled)
      { x: 0.61, y: 0.61 }, { x: 0.63, y: 0.50 }, { x: 0.63, y: 0.44 }, { x: 0.63, y: 0.40 }, // ring (curled)
      { x: 0.73, y: 0.65 }, { x: 0.77, y: 0.47 }, { x: 0.78, y: 0.33 }, { x: 0.79, y: 0.21 }, // pinky
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

      const wx = Math.sin(t * 0.02) * 5;
      const wy = Math.cos(t * 0.016) * 7;
      const pulse = 0.75 + 0.25 * Math.sin(t * 0.04);

      // Central glow
      const bg = ctx.createRadialGradient(canvas.width/2, canvas.height*0.5, 0, canvas.width/2, canvas.height*0.5, 210);
      bg.addColorStop(0, 'rgba(139,92,246,0.07)');
      bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orbit rings
      const cx = canvas.width/2, cy = canvas.height*0.52;
      [130, 185, 232].forEach((r, i) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r*0.3, -0.25, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(139,92,246,${0.05 + i*0.015})`;
        ctx.lineWidth = 1; ctx.stroke();
      });
      // Orbiting dots
      [[185, 0.022, [236,72,153], 4], [232, -0.016, [59,130,246], 3], [130, 0.031, [168,85,247], 3]].forEach(([r,sp,col,sz]) => {
        const a = t*sp; const ox = cx+Math.cos(a)*r; const oy = cy+Math.sin(a)*r*0.3-15;
        const dg = ctx.createRadialGradient(ox,oy,0,ox,oy,sz+5);
        dg.addColorStop(0,`rgba(${col},1)`); dg.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(ox,oy,sz+5,0,Math.PI*2); ctx.fillStyle=dg; ctx.fill();
        ctx.beginPath(); ctx.arc(ox,oy,sz,0,Math.PI*2);
        ctx.fillStyle=`rgba(${col},1)`; ctx.shadowBlur=18; ctx.shadowColor=`rgba(${col},1)`;
        ctx.fill(); ctx.shadowBlur=0;
      });

      // Scan line
      const prog = ((t*0.55)%100)/100;
      const sy = canvas.height*0.16 + canvas.height*0.70*prog;
      const sg = ctx.createLinearGradient(0,sy-4,0,sy+4);
      sg.addColorStop(0,'transparent'); sg.addColorStop(0.5,`rgba(99,102,241,${0.28*(1-Math.abs(prog-0.5)*2)})`); sg.addColorStop(1,'transparent');
      ctx.fillStyle=sg; ctx.fillRect(canvas.width*0.12, sy-4, canvas.width*0.76, 8);

      // Connections
      conns.forEach(([a,b]) => {
        const pa = pos(lm[a],wx,wy), pb = pos(lm[b],wx,wy);
        const g = ctx.createLinearGradient(pa.x,pa.y,pb.x,pb.y);
        g.addColorStop(0,`rgba(168,85,247,${0.9*pulse})`);
        g.addColorStop(0.5,`rgba(99,102,241,${pulse})`);
        g.addColorStop(1,`rgba(236,72,153,${0.85*pulse})`);
        ctx.beginPath(); ctx.strokeStyle=g; ctx.lineWidth=2.5;
        ctx.lineCap='round'; ctx.shadowBlur=16; ctx.shadowColor='rgba(139,92,246,0.9)';
        ctx.moveTo(pa.x,pa.y); ctx.lineTo(pb.x,pb.y); ctx.stroke(); ctx.shadowBlur=0;
      });

      // Nodes
      lm.forEach((p, i) => {
        const {x,y} = pos(p,wx,wy);
        const isTip=[4,8,12,16,20].includes(i);
        const r = i===0 ? 8 : isTip ? 5.5 : 4;
        ctx.beginPath(); ctx.arc(x,y,r+5,0,Math.PI*2);
        ctx.fillStyle=`rgba(139,92,246,${0.06*pulse})`; ctx.fill();
        const ng = ctx.createRadialGradient(x-r*0.3,y-r*0.3,0,x,y,r);
        ng.addColorStop(0,`rgba(240,220,255,${pulse})`);
        ng.addColorStop(0.4,`rgba(168,85,247,${0.95*pulse})`);
        ng.addColorStop(1,`rgba(59,130,246,${0.8*pulse})`);
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=ng;
        ctx.shadowBlur=22; ctx.shadowColor=isTip?'rgba(236,72,153,1)':'rgba(139,92,246,1)';
        ctx.fill(); ctx.shadowBlur=0;
        ctx.beginPath(); ctx.arc(x-r*0.3,y-r*0.3,r*0.32,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${0.8*pulse})`; ctx.fill();
      });

      // Floating stat chips
      const chips = [
        { lx:30, ly:70, label:'AI Score', val:'94%', col:[168,85,247] },
        { lx:canvas.width-115, ly:105, label:'Signs Learned', val:'142', col:[59,130,246] },
        { lx:28, ly:canvas.height-100, label:'Streak', val:'21d 🔥', col:[236,72,153] },
        { lx:canvas.width-118, ly:canvas.height-88, label:'Accuracy', val:'97.8%', col:[34,197,94] },
      ];
      chips.forEach((c,i) => {
        const fy = c.ly + Math.sin(t*0.024+i*1.3)*7;
        const [r,g,b] = c.col;
        ctx.fillStyle=`rgba(10,8,22,0.85)`; ctx.beginPath(); ctx.roundRect(c.lx,fy,95,42,10); ctx.fill();
        ctx.strokeStyle=`rgba(${r},${g},${b},0.28)`; ctx.lineWidth=1; ctx.beginPath(); ctx.roundRect(c.lx,fy,95,42,10); ctx.stroke();
        ctx.fillStyle=`rgba(${r},${g},${b},0.8)`; ctx.font='9px Inter,sans-serif'; ctx.textAlign='left';
        ctx.fillText(c.label, c.lx+10, fy+15);
        ctx.fillStyle='rgba(255,255,255,0.95)'; ctx.font='bold 14px Inter,sans-serif';
        ctx.fillText(c.val, c.lx+10, fy+32);
      });

      // Corner brackets
      const m=22,s=16;
      [[m,m,1,1],[canvas.width-m,m,-1,1],[m,canvas.height-m,1,-1],[canvas.width-m,canvas.height-m,-1,-1]].forEach(([bx,by,xd,yd])=>{
        ctx.strokeStyle='rgba(139,92,246,0.4)'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(bx,by+yd*s); ctx.lineTo(bx,by); ctx.lineTo(bx+xd*s,by); ctx.stroke();
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
   OAUTH BUTTON — same glass style as btn-secondary
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
  <svg className="w-4.5 h-4.5 flex-shrink-0" style={{width:'18px',height:'18px'}} viewBox="0 0 24 24">
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
   LOGIN PAGE — content only (App.jsx provides Navbar + Footer)
══════════════════════════════════════════════════════════════════ */
export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const navigate                = useNavigate();
  const { login }               = useAuth();

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      // Navigate to Role Selection
      navigate('/select-role');
    }, 1500);

    return () => clearTimeout(timer);
  }, [success, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      // Call AuthContext login()
      login({ email, name: email.split('@')[0] });
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };



  return (
    <AuthLayout
      illustration={<LoginIllustration />}
      leftTitle="Every Gesture Opens"
      leftTitleGradient="a New World."
      leftDescription="Continue your personalized sign language learning journey with AI-powered guidance and real-time feedback."
      quoteText="Communication begins with understanding."
      quoteAuthor="— Sign Language AI Learning Platform"
      title="Welcome Back"
      subtitle="Sign in to continue learning."
      badges={[
        { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Secure Login', color: [34, 197, 94] },
        { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Accessibility Supported', color: [59, 130, 246] },
      ]}
    >
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <AuthInput
              id="email" label="Email Address" type="email"
              placeholder="you@example.com" value={email}
              onChange={e => setEmail(e.target.value)}
            />

            {/* Password */}
            <AuthInput
              id="password" label="Password"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••••••" value={password}
              onChange={e => setPassword(e.target.value)}
              right={
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {showPw ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  )}
                </button>
              }
            />

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer" onClick={() => setRemember(v => !v)}>
                <div
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: '18px', height: '18px', borderRadius: '5px', flexShrink: 0,
                    background: remember ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.05)',
                    border: remember ? '1px solid rgba(139,92,246,0.6)' : '1px solid rgba(255,255,255,0.14)',
                    boxShadow: remember ? '0 0 14px rgba(139,92,246,0.45)' : 'none',
                  }}
                >
                  {remember && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm select-none" style={{ color: 'rgba(255,255,255,0.48)' }}>
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'rgba(168,85,247,0.8)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(168,85,247,1)'}
                onMouseLeave={e => e.target.style.color = 'rgba(168,85,247,0.8)'}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In */}
            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
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
                    Signing In…
                  </>
                ) : (
                  <>Sign In →</>
                )}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
              <span className="text-xs whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.28)' }}>
                OR Continue with
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* OAuth */}
            <div className="flex flex-col gap-2.5">
              <OAuthBtn id="google-btn" icon={<GoogleIcon />} label="Continue with Google" />
              <div className="grid grid-cols-2 gap-2.5">
                <OAuthBtn id="ms-btn" icon={<MsIcon />} label="Microsoft" />
                <OAuthBtn id="apple-btn" icon={<AppleIcon />} label="Apple" />
              </div>
            </div>

            {/* Register link */}
            <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-semibold transition-colors duration-200"
                style={{ color: 'rgba(168,85,247,0.85)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(168,85,247,1)'}
                onMouseLeave={e => e.target.style.color = 'rgba(168,85,247,0.85)'}
              >
                Create Account
              </Link>
            </p>
          </motion.form>
        ) : (
          /* Success state */
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
              <h3 className="text-xl font-space font-bold text-white">Welcome back!</h3>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Redirecting to your dashboard…
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

