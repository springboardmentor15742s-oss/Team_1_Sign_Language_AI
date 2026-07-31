import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

/* ══════════════════════════════════════════════════════════════════
   HOLOGRAPHIC VERIFICATION CANVAS
   Futuristic circular rings + central glowing shield + particles
══════════════════════════════════════════════════════════════════ */
function VerifyIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId, t = 0;

    canvas.width  = 420;
    canvas.height = 480;
    const W = canvas.width, H = canvas.height;
    const CX = W / 2, CY = H * 0.46;

    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => resetParticle({}));

    function resetParticle(p) {
      const angle  = Math.random() * Math.PI * 2;
      const radius = 160 + Math.random() * 80;
      p.x     = CX + Math.cos(angle) * radius;
      p.y     = CY + Math.sin(angle) * radius * 0.55;
      p.tx    = CX + (Math.random() - 0.5) * 30;
      p.ty    = CY + (Math.random() - 0.5) * 30;
      p.life  = 0;
      p.maxLife = 80 + Math.random() * 60;
      p.size  = 1 + Math.random() * 2;
      const cols = [[139,92,246],[99,102,241],[59,130,246],[16,185,129]];
      p.col   = cols[Math.floor(Math.random() * cols.length)];
      return p;
    }

    let checkProgress = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;
      checkProgress = Math.min(1, checkProgress + 0.008);

      const pulse  = 0.72 + 0.28 * Math.sin(t * 0.042);
      const pulse2 = 0.65 + 0.35 * Math.sin(t * 0.028 + 1.2);

      const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, 220);
      bg.addColorStop(0,   'rgba(16,185,129,0.07)');
      bg.addColorStop(0.4, 'rgba(99,102,241,0.05)');
      bg.addColorStop(1,   'transparent');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const ringDefs = [
        { rx: 170, ry: 52,  rotSpeed:  0.010, col: [139,92,246],  lw: 1.2, alpha: 0.22, dash: [6,4] },
        { rx: 140, ry: 44,  rotSpeed: -0.015, col: [99,102,241],  lw: 1.0, alpha: 0.18, dash: [4,6] },
        { rx: 108, ry: 36,  rotSpeed:  0.022, col: [59,130,246],  lw: 1.2, alpha: 0.20, dash: [8,3] },
        { rx:  76, ry: 26,  rotSpeed: -0.032, col: [16,185,129],  lw: 1.5, alpha: 0.28, dash: []    },
        { rx: 210, ry: 65,  rotSpeed:  0.006, col: [236,72,153],  lw: 0.8, alpha: 0.10, dash: [3,8] },
      ];
      ringDefs.forEach(rd => {
        ctx.save();
        ctx.translate(CX, CY);
        ctx.rotate(rd.rotSpeed * t);
        ctx.beginPath();
        ctx.ellipse(0, 0, rd.rx, rd.ry, 0, 0, Math.PI * 2);
        ctx.setLineDash(rd.dash);
        ctx.strokeStyle = `rgba(${rd.col},${rd.alpha * pulse})`;
        ctx.lineWidth   = rd.lw;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        const a  = rd.rotSpeed * t * 3;
        const ox = CX + Math.cos(a) * rd.rx;
        const oy = CY + Math.sin(a) * rd.ry;
        const dg = ctx.createRadialGradient(ox, oy, 0, ox, oy, 5);
        dg.addColorStop(0, `rgba(${rd.col},${pulse})`);
        dg.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(ox, oy, 6, 0, Math.PI * 2);
        ctx.fillStyle = dg; ctx.fill();
        ctx.beginPath(); ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${rd.col},1)`;
        ctx.shadowBlur  = 14; ctx.shadowColor = `rgba(${rd.col},1)`;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      particles.forEach(p => {
        p.life++;
        if (p.life >= p.maxLife) resetParticle(p);
        const progress = p.life / p.maxLife;
        const px = p.x + (p.tx - p.x) * progress;
        const py = p.y + (p.ty - p.y) * progress;
        const alpha = Math.sin(progress * Math.PI) * 0.75;
        ctx.beginPath(); ctx.arc(px, py, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${alpha})`;
        ctx.shadowBlur = 6; ctx.shadowColor = `rgba(${p.col},0.8)`;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      const prog = ((t * 0.48) % 100) / 100;
      const sy   = (CY - 70) + 140 * prog;
      const sg   = ctx.createLinearGradient(0, sy - 4, 0, sy + 4);
      const sa   = 0.3 * (1 - Math.abs(prog - 0.5) * 2);
      sg.addColorStop(0,   'transparent');
      sg.addColorStop(0.5, `rgba(16,185,129,${sa})`);
      sg.addColorStop(1,   'transparent');
      ctx.fillStyle = sg;
      ctx.fillRect(CX - 80, sy - 4, 160, 8);

      const shieldR = 55;
      const shieldGlow = ctx.createRadialGradient(CX, CY, 0, CX, CY, shieldR + 28);
      shieldGlow.addColorStop(0,   `rgba(16,185,129,${0.18 * pulse})`);
      shieldGlow.addColorStop(0.5, `rgba(99,102,241,${0.10 * pulse})`);
      shieldGlow.addColorStop(1,   'transparent');
      ctx.fillStyle = shieldGlow;
      ctx.fillRect(CX - shieldR - 30, CY - shieldR - 30, (shieldR + 30) * 2, (shieldR + 30) * 2);

      const drawShield = (fill) => {
        const s = shieldR;
        ctx.beginPath();
        ctx.moveTo(CX,         CY - s);
        ctx.lineTo(CX + s*0.72, CY - s*0.38);
        ctx.lineTo(CX + s*0.72, CY + s*0.20);
        ctx.bezierCurveTo(CX + s*0.72, CY + s*0.68, CX, CY + s*1.0, CX, CY + s*1.0);
        ctx.bezierCurveTo(CX, CY + s*1.0, CX - s*0.72, CY + s*0.68, CX - s*0.72, CY + s*0.20);
        ctx.lineTo(CX - s*0.72, CY - s*0.38);
        ctx.closePath();
        if (fill) {
          const shFill = ctx.createLinearGradient(CX - s, CY - s, CX + s, CY + s);
          shFill.addColorStop(0, `rgba(16,185,129,${0.14 * pulse2})`);
          shFill.addColorStop(1, `rgba(99,102,241,${0.10 * pulse2})`);
          ctx.fillStyle = shFill; ctx.fill();
        } else {
          const shStr = ctx.createLinearGradient(CX - s, CY - s, CX + s, CY + s);
          shStr.addColorStop(0,   `rgba(16,185,129,${0.85 * pulse})`);
          shStr.addColorStop(0.5, `rgba(99,102,241,${0.9  * pulse})`);
          shStr.addColorStop(1,   `rgba(139,92,246,${0.80 * pulse})`);
          ctx.strokeStyle = shStr;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 20; ctx.shadowColor = 'rgba(16,185,129,0.9)';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      };
      drawShield(true);
      drawShield(false);

      if (checkProgress > 0) {
        const ckPoints = [
          { x: CX - shieldR*0.30, y: CY + shieldR*0.12 },
          { x: CX - shieldR*0.02, y: CY + shieldR*0.42 },
          { x: CX + shieldR*0.40, y: CY - shieldR*0.26 },
        ];
        const seg1End = 0.45;
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.lineWidth = 3.5;
        ctx.shadowBlur = 18; ctx.shadowColor = 'rgba(255,255,255,0.9)';
        ctx.strokeStyle = `rgba(255,255,255,${0.92 * pulse})`;

        if (checkProgress <= seg1End) {
          const p = checkProgress / seg1End;
          ctx.beginPath();
          ctx.moveTo(ckPoints[0].x, ckPoints[0].y);
          ctx.lineTo(
            ckPoints[0].x + (ckPoints[1].x - ckPoints[0].x) * p,
            ckPoints[0].y + (ckPoints[1].y - ckPoints[0].y) * p,
          );
          ctx.stroke();
        } else {
          const p = (checkProgress - seg1End) / (1.0 - seg1End);
          ctx.beginPath();
          ctx.moveTo(ckPoints[0].x, ckPoints[0].y);
          ctx.lineTo(ckPoints[1].x, ckPoints[1].y);
          ctx.lineTo(
            ckPoints[1].x + (ckPoints[2].x - ckPoints[1].x) * p,
            ckPoints[1].y + (ckPoints[2].y - ckPoints[1].y) * p,
          );
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      const chips = [
        { lx: 26,      ly: 68,      label: '2FA Active', val: 'ON',        col: [16,185,129] },
        { lx: W - 118, ly: 104,     label: 'AES-256',    val: 'Encrypted', col: [99,102,241] },
        { lx: 26,      ly: H - 104, label: 'OTP Valid',  val: '10 min',    col: [139,92,246] },
        { lx: W - 118, ly: H - 90,  label: 'Verified',   val: '✓ Secure',  col: [34,197,94]  },
      ];
      chips.forEach((c, i) => {
        const fy = c.ly + Math.sin(t * 0.020 + i * 1.5) * 6;
        const [r, g, b] = c.col;
        ctx.fillStyle = 'rgba(8,6,18,0.88)';
        ctx.beginPath(); ctx.roundRect(c.lx, fy, 95, 42, 10); ctx.fill();
        ctx.strokeStyle = `rgba(${r},${g},${b},0.30)`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(c.lx, fy, 95, 42, 10); ctx.stroke();
        ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
        ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(c.label, c.lx + 10, fy + 15);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.font = 'bold 13px Inter,sans-serif';
        ctx.fillText(c.val, c.lx + 10, fy + 31);
      });

      const m = 22, sv = 16;
      [[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([bx,by,xd,yd]) => {
        ctx.strokeStyle = 'rgba(16,185,129,0.38)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx, by + yd*sv); ctx.lineTo(bx, by); ctx.lineTo(bx + xd*sv, by);
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
      style={{ filter: 'drop-shadow(0 0 40px rgba(16,185,129,0.25))' }}
    >
      <div
        className="glass-strong rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.07)' }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SINGLE OTP INPUT BOX
══════════════════════════════════════════════════════════════════ */
function OTPBox({ inputRef, value, onChange, onKeyDown, onPaste, index, error }) {
  const [focused, setFocused] = useState(false);
  const borderColor = error
    ? 'rgba(239,68,68,0.65)'
    : focused
    ? 'rgba(139,92,246,0.65)'
    : value
    ? 'rgba(139,92,246,0.35)'
    : 'rgba(255,255,255,0.08)';
  const bg = error
    ? 'rgba(239,68,68,0.05)'
    : focused
    ? 'rgba(139,92,246,0.08)'
    : 'rgba(255,255,255,0.04)';
  const glow = error
    ? '0 0 0 3px rgba(239,68,68,0.14)'
    : focused
    ? '0 0 0 3px rgba(139,92,246,0.14)'
    : 'none';

  return (
    <motion.input
      ref={inputRef}
      id={`otp-${index}`}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      animate={value ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.18 }}
      className="w-full aspect-square text-center text-xl font-bold text-white outline-none rounded-xl transition-all duration-200 select-none"
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        boxShadow: glow,
        fontFamily: "'Space Grotesk', sans-serif",
        caretColor: 'transparent',
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════
   COUNTDOWN TIMER HOOK
══════════════════════════════════════════════════════════════════ */
function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [active, setActive]   = useState(true);

  useEffect(() => {
    if (!active || seconds <= 0) { setActive(false); return; }
    const id = setInterval(() => setSeconds(s => {
      if (s <= 1) { clearInterval(id); setActive(false); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(id);
  }, [active, seconds]);

  const reset = useCallback(() => { setSeconds(initialSeconds); setActive(true); }, [initialSeconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return { display: `${mm}:${ss}`, expired: seconds === 0, reset };
}

/* ══════════════════════════════════════════════════════════════════
   VERIFY OTP PAGE — Uses AuthLayout
══════════════════════════════════════════════════════════════════ */
const OTP_LEN  = 6;
const MOCK_OTP = '123456';
const OTP_SECS = 599;

export default function VerifyOTPPage() {
  const [otp,     setOtp]     = useState(Array(OTP_LEN).fill(''));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState(null);
  const inputRefs             = useRef(Array(OTP_LEN).fill(null).map(() => ({ current: null })));
  const navigate              = useNavigate();
  const { display, expired, reset } = useCountdown(OTP_SECS);

  useEffect(() => {
    setTimeout(() => inputRefs.current[0]?.current?.focus(), 450);
  }, []);

  const otpStr = otp.join('');
  useEffect(() => {
    if (otpStr.length === OTP_LEN && !loading && !success) submitOtp(otpStr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpStr]);

  const submitOtp = (code) => {
    if (expired) { setError('expired'); return; }
    setLoading(true); setError(null);
    setTimeout(() => {
      setLoading(false);
      if (code === MOCK_OTP) {
        setSuccess(true);
        setTimeout(() => navigate('/reset-password'), 1600);
      } else {
        setError('wrong');
        setOtp(Array(OTP_LEN).fill(''));
        setTimeout(() => inputRefs.current[0]?.current?.focus(), 80);
      }
    }, 1800);
  };

  const handleChange = (i, e) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...otp]; next[i] = val; setOtp(next); setError(null);
    if (val && i < OTP_LEN - 1) inputRefs.current[i + 1]?.current?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (otp[i]) { const next = [...otp]; next[i] = ''; setOtp(next); }
      else if (i > 0) {
        const next = [...otp]; next[i - 1] = ''; setOtp(next);
        inputRefs.current[i - 1]?.current?.focus();
      }
      setError(null);
    } else if (e.key === 'ArrowLeft'  && i > 0)          inputRefs.current[i - 1]?.current?.focus();
    else if   (e.key === 'ArrowRight' && i < OTP_LEN - 1) inputRefs.current[i + 1]?.current?.focus();
    else if   (e.key === 'Enter' && otpStr.length === OTP_LEN) submitOtp(otpStr);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LEN);
    if (!pasted) return;
    const next = Array(OTP_LEN).fill('');
    pasted.split('').forEach((ch, idx) => { next[idx] = ch; });
    setOtp(next); setError(null);
    setTimeout(() => inputRefs.current[Math.min(pasted.length, OTP_LEN - 1)]?.current?.focus(), 20);
  };

  const handleResend = () => {
    reset(); setOtp(Array(OTP_LEN).fill('')); setError(null);
    setTimeout(() => inputRefs.current[0]?.current?.focus(), 80);
  };

  const errorMsg = error === 'wrong'
    ? 'Incorrect code. Please try again.'
    : error === 'expired'
    ? 'This OTP has expired. Please request a new one.'
    : null;

  const shieldIcon = (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
    >
      <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="rgba(52,211,153,1)" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  );

  return (
    <AuthLayout
      illustration={<VerifyIllustration />}
      leftTitle="Verify Your"
      leftTitleGradient="Identity."
      leftGradientStyle={{
        background: 'linear-gradient(135deg, #10b981 0%, #6366f1 55%, #a855f7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      leftDescription="Enter the 6-digit verification code sent to your registered email address to confirm your identity."
      quoteText="Security builds trust."
      quoteAuthor="— Sign Language AI Learning Platform"
      leftAccentColor="rgba(16,185,129,0.18)"
      cardIcon={shieldIcon}
      title="Verify OTP"
      subtitle="Enter the secure code we sent to your email."
      conicGlowGradient="conic-gradient(from 0deg, transparent, rgba(139,92,246,0.7) 60deg, rgba(59,130,246,0.8) 120deg, rgba(16,185,129,0.65) 200deg, rgba(236,72,153,0.5) 270deg, transparent 330deg)"
      badges={[
        { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Secure Verification', color: [34,197,94] },
        { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Accessibility Supported', color: [59,130,246] },
      ]}
    >
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            className="flex flex-col gap-5"
          >
            {/* OTP Boxes */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Verification Code
              </label>
              <div className="grid grid-cols-6 gap-2.5">
                {otp.map((val, i) => (
                  <OTPBox
                    key={i}
                    index={i}
                    value={val}
                    error={!!error}
                    inputRef={el => { inputRefs.current[i] = { current: el }; }}
                    onChange={e => handleChange(i, e)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>

              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-1.5 mt-0.5"
                  >
                    <svg style={{ width: '13px', height: '13px', color: 'rgba(239,68,68,0.9)', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs" style={{ color: 'rgba(239,68,68,0.9)' }}>{errorMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Countdown + Resend */}
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                style={{
                  background: expired ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.07)',
                  border: `1px solid ${expired ? 'rgba(239,68,68,0.22)' : 'rgba(16,185,129,0.2)'}`,
                }}
              >
                <svg style={{ width: '12px', height: '12px', color: expired ? 'rgba(239,68,68,0.8)' : 'rgba(52,211,153,0.8)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-bold font-space tabular-nums" style={{ color: expired ? 'rgba(239,68,68,0.9)' : 'rgba(52,211,153,0.9)' }}>
                  {expired ? 'Expired' : display}
                </span>
              </div>
              <motion.button
                type="button"
                onClick={handleResend}
                disabled={!expired}
                whileHover={expired ? { scale: 1.04 } : {}}
                whileTap={expired ? { scale: 0.97 } : {}}
                className="text-sm font-semibold transition-all duration-200"
                style={{ color: expired ? 'rgba(139,92,246,0.9)' : 'rgba(255,255,255,0.22)', cursor: expired ? 'pointer' : 'not-allowed' }}
              >
                Resend OTP
              </motion.button>
            </div>

            {/* Hint */}
            <div
              className="flex items-start gap-2.5 rounded-xl p-3"
              style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.13)' }}
            >
              <svg style={{ width: '14px', height: '14px', flexShrink: 0, marginTop: '1px', color: 'rgba(167,139,250,0.8)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.36)' }}>
                Check your inbox for a 6-digit code. You can also paste it directly.{' '}
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>(Demo: use{' '}
                  <strong style={{ color: 'rgba(167,139,250,0.7)' }}>123456</strong>)
                </span>
              </p>
            </div>

            {/* Verify button */}
            <motion.button
              type="button"
              disabled={loading || otpStr.length < OTP_LEN}
              onClick={() => submitOtp(otpStr)}
              className="btn-primary w-full flex items-center justify-center gap-2"
              style={{ padding: '14px 24px', fontSize: '0.95rem', opacity: otpStr.length < OTP_LEN ? 0.55 : 1 }}
              whileHover={(!loading && otpStr.length === OTP_LEN) ? { scale: 1.02 } : {}}
              whileTap={(!loading && otpStr.length === OTP_LEN) ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying&hellip;
                  </>
                ) : (
                  <>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Verify OTP
                  </>
                )}
              </span>
            </motion.button>

            {/* Bottom links */}
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link
                to="/forgot-password"
                className="font-medium transition-colors duration-200"
                style={{ color: 'rgba(167,139,250,0.75)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(167,139,250,1)'}
                onMouseLeave={e => e.target.style.color = 'rgba(167,139,250,0.75)'}
              >
                Change Email
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
              <Link
                to="/login"
                className="font-medium transition-colors duration-200"
                style={{ color: 'rgba(167,139,250,0.75)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(167,139,250,1)'}
                onMouseLeave={e => e.target.style.color = 'rgba(167,139,250,0.75)'}
              >
                Back to Login
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #059669, #7c3aed)', boxShadow: '0 0 40px rgba(16,185,129,0.55)' }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl font-space font-bold text-white">Identity Verified!</h3>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>Redirecting to reset password&hellip;</p>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: '3px', background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #059669, #7c3aed)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
