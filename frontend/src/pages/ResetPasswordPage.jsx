import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout, { AuthInput } from '../layouts/AuthLayout';

/* ══════════════════════════════════════════════════════════════════
   RESET PASSWORD CANVAS ILLUSTRATION
   Keyhole / Lock transforming into a glowing unlocked node matrix
══════════════════════════════════════════════════════════════════ */
function ResetIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    canvas.width = 420;
    canvas.height = 480;
    const W = canvas.width, H = canvas.height;
    const CX = W / 2, CY = H * 0.48;

    const lm = [
      { x: 0.50, y: 0.28 },
      { x: 0.38, y: 0.35 }, { x: 0.62, y: 0.35 },
      { x: 0.38, y: 0.50 }, { x: 0.62, y: 0.50 },
      { x: 0.50, y: 0.55 },
      { x: 0.50, y: 0.68 },
      { x: 0.42, y: 0.76 }, { x: 0.58, y: 0.76 },
      { x: 0.44, y: 0.84 }, { x: 0.56, y: 0.84 },
    ];
    const conns = [
      [0,1],[0,2],[1,3],[2,4],[3,4],
      [3,5],[4,5],[5,6],
      [6,7],[6,8],[7,9],[8,10]
    ];

    const pos = (p, wx, wy) => ({ x: p.x * W + wx, y: p.y * H + wy });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;

      const wx = Math.sin(t * 0.018) * 5;
      const wy = Math.cos(t * 0.014) * 6;
      const pulse = 0.78 + 0.22 * Math.sin(t * 0.04);

      const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 210);
      bg.addColorStop(0, 'rgba(168,85,247,0.09)');
      bg.addColorStop(0.5, 'rgba(59,130,246,0.04)');
      bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      [130, 185, 235].forEach((r, i) => {
        ctx.beginPath();
        ctx.ellipse(CX, CY, r, r * 0.3, -0.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168,85,247,${0.06 + i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      [[185, 0.018, [168,85,247], 4], [235, -0.014, [59,130,246], 3], [130, 0.026, [236,72,153], 3]].forEach(([r, sp, col, sz]) => {
        const a = t * sp;
        const ox = CX + Math.cos(a) * r;
        const oy = CY + Math.sin(a) * r * 0.3 - 10;
        const dg = ctx.createRadialGradient(ox, oy, 0, ox, oy, sz + 5);
        dg.addColorStop(0, `rgba(${col},1)`);
        dg.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(ox, oy, sz + 5, 0, Math.PI * 2);
        ctx.fillStyle = dg; ctx.fill();
        ctx.beginPath(); ctx.arc(ox, oy, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},1)`;
        ctx.shadowBlur = 16; ctx.shadowColor = `rgba(${col},1)`;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      const prog = ((t * 0.5) % 100) / 100;
      const sy = H * 0.15 + H * 0.7 * prog;
      const sg = ctx.createLinearGradient(0, sy - 4, 0, sy + 4);
      sg.addColorStop(0, 'transparent');
      sg.addColorStop(0.5, `rgba(168,85,247,${0.28 * (1 - Math.abs(prog - 0.5) * 2)})`);
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.fillRect(W * 0.12, sy - 4, W * 0.76, 8);

      conns.forEach(([a, b]) => {
        const pa = pos(lm[a], wx, wy), pb = pos(lm[b], wx, wy);
        const g = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        g.addColorStop(0, `rgba(168,85,247,${0.9 * pulse})`);
        g.addColorStop(0.5, `rgba(59,130,246,${pulse})`);
        g.addColorStop(1, `rgba(236,72,153,${0.85 * pulse})`);
        ctx.beginPath(); ctx.strokeStyle = g; ctx.lineWidth = 2.5;
        ctx.lineCap = 'round'; ctx.shadowBlur = 16; ctx.shadowColor = 'rgba(168,85,247,0.9)';
        ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); ctx.shadowBlur = 0;
      });

      lm.forEach((p, i) => {
        const { x, y } = pos(p, wx, wy);
        const isCore = i === 5 || i === 0;
        const r = isCore ? 6.5 : 4;
        ctx.beginPath(); ctx.arc(x, y, r + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${0.06 * pulse})`; ctx.fill();
        const ng = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
        ng.addColorStop(0, `rgba(255,255,255,${pulse})`);
        ng.addColorStop(0.4, `rgba(168,85,247,${0.95 * pulse})`);
        ng.addColorStop(1, `rgba(59,130,246,${0.8 * pulse})`);
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = ng;
        ctx.shadowBlur = 20; ctx.shadowColor = isCore ? 'rgba(236,72,153,1)' : 'rgba(168,85,247,1)';
        ctx.fill(); ctx.shadowBlur = 0;
      });

      const chips = [
        { lx: 28,      ly: 70,      label: 'Pw Health',  val: 'Strong 🔒', col: [168,85,247]  },
        { lx: W - 118, ly: 105,     label: 'Encryption', val: 'Argon2id',  col: [59,130,246]  },
        { lx: 28,      ly: H - 100, label: 'Auth Status', val: 'Verified', col: [34,197,94]   },
        { lx: W - 118, ly: H - 88,  label: 'Protection', val: 'Active ✓',  col: [236,72,153]  },
      ];
      chips.forEach((c, i) => {
        const fy = c.ly + Math.sin(t * 0.024 + i * 1.3) * 6;
        const [r, g, b] = c.col;
        ctx.fillStyle = 'rgba(10,8,22,0.85)'; ctx.beginPath(); ctx.roundRect(c.lx, fy, 95, 42, 10); ctx.fill();
        ctx.strokeStyle = `rgba(${r},${g},${b},0.28)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(c.lx, fy, 95, 42, 10); ctx.stroke();
        ctx.fillStyle = `rgba(${r},${g},${b},0.8)`; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(c.label, c.lx + 10, fy + 15);
        ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.font = 'bold 13px Inter,sans-serif';
        ctx.fillText(c.val, c.lx + 10, fy + 32);
      });

      const m = 22, s = 16;
      [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([bx,by,xd,yd]) => {
        ctx.strokeStyle = 'rgba(168,85,247,0.4)'; ctx.lineWidth = 1.5;
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
      style={{ filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.3))' }}
    >
      <div
        className="glass-strong rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.07)' }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   RESET PASSWORD PAGE — Uses AuthLayout
══════════════════════════════════════════════════════════════════ */
export default function ResetPasswordPage() {
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw]                 = useState(false);
  const [showConfirmPw, setShowConfirmPw]   = useState(false);
  const [loading, setLoading]               = useState(false);
  const [success, setSuccess]               = useState(false);
  const navigate = useNavigate();

  const hasMinLength    = password.length >= 8;
  const hasSpecialOrNum = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMatching      = password.length > 0 && password === confirmPassword;
  const strengthScore   = (hasMinLength ? 1 : 0) + (hasSpecialOrNum ? 1 : 0) + (password.length >= 12 ? 1 : 0);

  const strength = password.length === 0
    ? { label: '', color: 'transparent' }
    : strengthScore === 1
    ? { label: 'Weak',     color: '#ef4444' }
    : strengthScore === 2
    ? { label: 'Moderate', color: '#f59e0b' }
    : { label: 'Strong',   color: '#10b981' };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasMinLength || !hasSpecialOrNum || !isMatching) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setSuccess(true);
      setTimeout(() => navigate('/login'), 1800);
    }, 2000);
  };

  const eyeOpen = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
  const eyeOff = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  const lockIcon = (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)' }}
    >
      <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="rgba(168,85,247,1)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
  );

  return (
    <AuthLayout
      illustration={<ResetIllustration />}
      leftTitle="Create New"
      leftTitleGradient="Password."
      leftDescription="Your identity has been verified. Enter your new password below to secure your account."
      quoteText="Security is a process, not a product."
      quoteAuthor="— Sign Language AI Learning Platform"
      cardIcon={lockIcon}
      title="Reset Password"
      subtitle="Choose a strong password to protect your account."
      badges={[
        { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Encrypted Reset', color: [34, 197, 94] },
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
            {/* New Password */}
            <div>
              <AuthInput
                id="new-password"
                label="New Password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                right={
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {showPw ? eyeOpen : eyeOff}
                  </button>
                }
              />

              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Strength:</span>
                    <span className="font-semibold" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 h-1">
                    {[1, 2, 3].map(step => (
                      <div
                        key={step}
                        className="h-full rounded-full transition-all duration-300"
                        style={{ background: strengthScore >= step ? strength.color : 'rgba(255,255,255,0.08)' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <AuthInput
              id="confirm-password"
              label="Confirm New Password"
              type={showConfirmPw ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              right={
                <button type="button" onClick={() => setShowConfirmPw(v => !v)}
                  className="transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {showConfirmPw ? eyeOpen : eyeOff}
                </button>
              }
            />

            {/* Requirements checklist */}
            <div className="flex flex-col gap-1.5 pt-1">
              {[
                { valid: hasMinLength,    text: 'At least 8 characters' },
                { valid: hasSpecialOrNum, text: 'At least one number or symbol' },
                { valid: isMatching,      text: 'Passwords match' },
              ].map((req, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      background: req.valid ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                      border:     req.valid ? '1px solid rgba(34,197,94,0.5)' : '1px solid rgba(255,255,255,0.12)',
                      color:      req.valid ? '#22c55e' : 'transparent',
                    }}
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span style={{ color: req.valid ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)' }}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading || !hasMinLength || !hasSpecialOrNum || !isMatching}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
              style={{
                padding: '14px 24px', fontSize: '0.95rem',
                opacity: (!hasMinLength || !hasSpecialOrNum || !isMatching) ? 0.55 : 1,
              }}
              whileHover={(!loading && hasMinLength && hasSpecialOrNum && isMatching) ? { scale: 1.02 } : {}}
              whileTap={(!loading && hasMinLength && hasSpecialOrNum && isMatching) ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Updating Password&hellip;
                  </>
                ) : (
                  <>Reset Password &rarr;</>
                )}
              </span>
            </motion.button>

            <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Remembered your password?{' '}
              <Link
                to="/login"
                className="font-semibold transition-colors duration-200"
                style={{ color: 'rgba(168,85,247,0.85)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(168,85,247,1)'}
                onMouseLeave={e => e.target.style.color = 'rgba(168,85,247,0.85)'}
              >
                Back to Login
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl font-space font-bold text-white">Password Reset Complete!</h3>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Redirecting to sign in&hellip;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
