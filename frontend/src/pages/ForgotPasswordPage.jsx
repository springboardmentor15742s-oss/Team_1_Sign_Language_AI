import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout, { AuthInput } from '../layouts/AuthLayout';

/* ══════════════════════════════════════════════════════════════════
   MINI CANVAS — Left-side decorative hand illustration
   ASL "B" / flat open palm — represents a "new page / fresh start"
══════════════════════════════════════════════════════════════════ */
function ForgotIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    canvas.width = 420;
    canvas.height = 480;

    // ASL "B" — flat open hand, thumb tucked, fingers together & tall
    const lm = [
      { x: 0.50, y: 0.88 }, // wrist
      { x: 0.33, y: 0.74 }, { x: 0.26, y: 0.65 }, { x: 0.24, y: 0.58 }, { x: 0.30, y: 0.62 }, // thumb (tucked in)
      { x: 0.36, y: 0.60 }, { x: 0.34, y: 0.38 }, { x: 0.33, y: 0.22 }, { x: 0.32, y: 0.09 }, // index up
      { x: 0.48, y: 0.58 }, { x: 0.47, y: 0.36 }, { x: 0.47, y: 0.20 }, { x: 0.47, y: 0.07 }, // middle up
      { x: 0.60, y: 0.59 }, { x: 0.60, y: 0.38 }, { x: 0.61, y: 0.22 }, { x: 0.62, y: 0.09 }, // ring up
      { x: 0.71, y: 0.63 }, { x: 0.73, y: 0.44 }, { x: 0.74, y: 0.29 }, { x: 0.75, y: 0.17 }, // pinky up
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

      const wx = Math.sin(t * 0.019) * 5;
      const wy = Math.cos(t * 0.015) * 7;
      const pulse = 0.75 + 0.25 * Math.sin(t * 0.038);

      // Central glow
      const bg = ctx.createRadialGradient(canvas.width / 2, canvas.height * 0.5, 0, canvas.width / 2, canvas.height * 0.5, 215);
      bg.addColorStop(0, 'rgba(99,102,241,0.08)');
      bg.addColorStop(0.6, 'rgba(139,92,246,0.04)');
      bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orbit rings
      const cx = canvas.width / 2, cy = canvas.height * 0.52;
      [125, 180, 228].forEach((r, i) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.28, -0.22, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,102,241,${0.05 + i * 0.018})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Orbiting dots
      [
        [180,  0.020, [99, 102, 241], 4],
        [228, -0.014, [139, 92, 246], 3],
        [125,  0.028, [56, 189, 248], 3],
      ].forEach(([r, sp, col, sz]) => {
        const a = t * sp;
        const ox = cx + Math.cos(a) * r;
        const oy = cy + Math.sin(a) * r * 0.28 - 12;
        const dg = ctx.createRadialGradient(ox, oy, 0, ox, oy, sz + 5);
        dg.addColorStop(0, `rgba(${col},1)`);
        dg.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(ox, oy, sz + 5, 0, Math.PI * 2);
        ctx.fillStyle = dg; ctx.fill();
        ctx.beginPath(); ctx.arc(ox, oy, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},1)`;
        ctx.shadowBlur = 18; ctx.shadowColor = `rgba(${col},1)`;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      // Scan line
      const prog = ((t * 0.52) % 100) / 100;
      const sy = canvas.height * 0.14 + canvas.height * 0.72 * prog;
      const sg = ctx.createLinearGradient(0, sy - 4, 0, sy + 4);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, `rgba(56,189,248,${0.26 * (1 - Math.abs(prog - 0.5) * 2)})`);
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.fillRect(canvas.width * 0.10, sy - 4, canvas.width * 0.80, 8);

      // Connections
      conns.forEach(([a, b]) => {
        const pa = pos(lm[a], wx, wy), pb = pos(lm[b], wx, wy);
        const g = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        g.addColorStop(0, `rgba(99,102,241,${0.9 * pulse})`);
        g.addColorStop(0.5, `rgba(139,92,246,${pulse})`);
        g.addColorStop(1, `rgba(56,189,248,${0.85 * pulse})`);
        ctx.beginPath();
        ctx.strokeStyle = g;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 16;
        ctx.shadowColor = 'rgba(99,102,241,0.9)';
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Nodes
      lm.forEach((p, i) => {
        const { x, y } = pos(p, wx, wy);
        const isTip = [4, 8, 12, 16, 20].includes(i);
        const r = i === 0 ? 8 : isTip ? 5.5 : 4;
        ctx.beginPath(); ctx.arc(x, y, r + 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${0.06 * pulse})`; ctx.fill();
        const ng = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
        ng.addColorStop(0, `rgba(230,230,255,${pulse})`);
        ng.addColorStop(0.4, `rgba(99,102,241,${0.95 * pulse})`);
        ng.addColorStop(1, `rgba(56,189,248,${0.8 * pulse})`);
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.shadowBlur = 22;
        ctx.shadowColor = isTip ? 'rgba(56,189,248,1)' : 'rgba(99,102,241,1)';
        ctx.fill(); ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.8 * pulse})`; ctx.fill();
      });

      // Floating stat chips
      const chips = [
        { lx: 28,                   ly: 72,                    label: 'Secure OTP',  val: '6-Digit', col: [99,102,241] },
        { lx: canvas.width - 118,   ly: 108,                   label: 'Expires In',  val: '10 min',  col: [56,189,248] },
        { lx: 28,                   ly: canvas.height - 102,   label: 'Encryption',  val: 'AES-256', col: [139,92,246] },
        { lx: canvas.width - 118,   ly: canvas.height - 90,    label: 'Protected',   val: '100% \u2713', col: [34,197,94]  },
      ];
      chips.forEach((c, i) => {
        const fy = c.ly + Math.sin(t * 0.022 + i * 1.4) * 7;
        const [r, g, b] = c.col;
        ctx.fillStyle = 'rgba(10,8,22,0.85)';
        ctx.beginPath(); ctx.roundRect(c.lx, fy, 95, 42, 10); ctx.fill();
        ctx.strokeStyle = `rgba(${r},${g},${b},0.28)`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(c.lx, fy, 95, 42, 10); ctx.stroke();
        ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
        ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(c.label, c.lx + 10, fy + 15);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.font = 'bold 14px Inter,sans-serif';
        ctx.fillText(c.val, c.lx + 10, fy + 32);
      });

      // Corner brackets
      const m = 22, s = 16;
      [[m,m,1,1],[canvas.width-m,m,-1,1],[m,canvas.height-m,1,-1],[canvas.width-m,canvas.height-m,-1,-1]].forEach(([bx,by,xd,yd]) => {
        ctx.strokeStyle = 'rgba(99,102,241,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx, by + yd * s); ctx.lineTo(bx, by); ctx.lineTo(bx + xd * s, by);
        ctx.stroke();
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
      style={{ filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.3))' }}
    >
      <div
        className="glass-strong rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.07)' }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FORGOT PASSWORD PAGE — Refactored with AuthLayout
══════════════════════════════════════════════════════════════════ */
export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const navigate              = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => navigate('/verify-otp'), 1400);
    }, 2000);
  };

  const lockIcon = (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
    >
      <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="rgba(129,140,248,1)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    </div>
  );

  return (
    <AuthLayout
      illustration={<ForgotIllustration />}
      leftTitle="Recover Your"
      leftTitleGradient="Learning Journey."
      leftGradientStyle={{
        background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 45%, #38bdf8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      leftDescription="Enter your registered email address. We'll send you a secure OTP to reset your password and get back on track."
      quoteText="Every new beginning starts with one step."
      quoteAuthor="— Sign Language AI Learning Platform"
      leftAccentColor="rgba(99,102,241,0.18)"
      cardIcon={lockIcon}
      title="Forgot Password"
      subtitle="Enter your email to receive a One-Time Password."
      conicGlowGradient="conic-gradient(from 0deg, transparent, rgba(99,102,241,0.7) 60deg, rgba(139,92,246,0.8) 120deg, rgba(56,189,248,0.6) 180deg, transparent 260deg)"
      badges={[
        { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Secure Recovery', color: [34, 197, 94] },
        { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Accessibility Supported', color: [59, 130, 246] },
      ]}
    >
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <AuthInput
              id="forgot-email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              focusColor="rgba(99,102,241,0.55)"
              onChange={e => setEmail(e.target.value)}
              right={
                <svg
                  style={{ width: '16px', height: '16px', color: 'rgba(129,140,248,0.55)' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            {/* Info hint pill */}
            <div
              className="flex items-start gap-2.5 rounded-xl p-3"
              style={{
                background: 'rgba(99,102,241,0.06)',
                border: '1px solid rgba(99,102,241,0.15)',
              }}
            >
              <svg
                style={{ width: '15px', height: '15px', flexShrink: 0, marginTop: '1px', color: 'rgba(129,140,248,0.8)' }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                A 6-digit OTP will be sent to your registered email. It expires in&nbsp;10&nbsp;minutes.
              </p>
            </div>

            {/* Send OTP */}
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
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending OTP&hellip;
                  </>
                ) : (
                  <>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send OTP
                  </>
                )}
              </span>
            </motion.button>

            {/* Back to Login */}
            <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-semibold transition-colors duration-200"
                style={{ color: 'rgba(129,140,248,0.85)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(129,140,248,1)'}
                onMouseLeave={e => e.target.style.color = 'rgba(129,140,248,0.85)'}
              >
                Back to Login
              </Link>
            </p>
          </motion.form>
        ) : (
          /* OTP Sent state */
          <motion.div
            key="sent"
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
              style={{
                background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
                boxShadow: '0 0 40px rgba(99,102,241,0.55)',
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl font-space font-bold text-white">OTP Sent!</h3>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Redirecting to verification&hellip;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

