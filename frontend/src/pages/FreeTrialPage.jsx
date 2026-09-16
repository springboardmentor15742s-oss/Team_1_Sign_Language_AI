import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function FreeTrialPage() {
  const { isAuthenticated, trialCompleted, completeFreeTrial, resetFreeTrial } = useAuth();
  const [step, setStep] = useState(1); // 1: instructions, 2: practicing, 3: completed
  const [accuracy, setAccuracy] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedSign, setDetectedSign] = useState(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Hand Landmark Animation for Free Trial AI Detection
  useEffect(() => {
    if (step !== 2) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    canvas.width = 460;
    canvas.height = 360;

    const lm = [
      { x: 0.50, y: 0.88 },
      { x: 0.35, y: 0.74 }, { x: 0.28, y: 0.62 }, { x: 0.23, y: 0.49 }, { x: 0.18, y: 0.38 },
      { x: 0.38, y: 0.58 }, { x: 0.33, y: 0.39 }, { x: 0.30, y: 0.24 }, { x: 0.28, y: 0.10 },
      { x: 0.50, y: 0.56 }, { x: 0.50, y: 0.42 }, { x: 0.50, y: 0.30 }, { x: 0.50, y: 0.18 },
      { x: 0.62, y: 0.58 }, { x: 0.65, y: 0.44 }, { x: 0.66, y: 0.33 }, { x: 0.67, y: 0.22 },
      { x: 0.73, y: 0.66 }, { x: 0.77, y: 0.52 }, { x: 0.79, y: 0.40 }, { x: 0.81, y: 0.28 },
    ];

    const conns = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [0,9],[9,10],[10,11],[11,12],
      [0,13],[13,14],[14,15],[15,16],
      [0,17],[17,18],[18,19],[19,20],
      [5,9],[9,13],[13,17],
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      const wx = Math.sin(t * 0.03) * 6;
      const wy = Math.cos(t * 0.02) * 5;
      const pulse = 0.8 + 0.2 * Math.sin(t * 0.05);

      // Gradient background
      const bg = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, 200);
      bg.addColorStop(0, 'rgba(124, 58, 237, 0.12)');
      bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Connect landmarks
      conns.forEach(([a, b]) => {
        const pa = { x: lm[a].x * canvas.width + wx, y: lm[a].y * canvas.height + wy };
        const pb = { x: lm[b].x * canvas.width + wx, y: lm[b].y * canvas.height + wy };
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.85 * pulse})`;
        ctx.lineWidth = 2.5;
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      });

      // Draw landmark points
      lm.forEach((p, idx) => {
        const x = p.x * canvas.width + wx;
        const y = p.y * canvas.height + wy;
        const isTip = [4, 8, 12, 16, 20].includes(idx);
        ctx.beginPath();
        ctx.arc(x, y, isTip ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isTip ? '#ec4899' : '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#a855f7';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [step]);

  const handleStartTrialSession = () => {
    setStep(2);
    setIsDetecting(true);
    // Simulate gradual AI confidence detection
    let currentAcc = 40;
    const interval = setInterval(() => {
      currentAcc += Math.floor(Math.random() * 8) + 4;
      if (currentAcc >= 96) {
        currentAcc = 96;
        setAccuracy(96);
        setDetectedSign('"HELLO / GREETING"');
        clearInterval(interval);
      } else {
        setAccuracy(currentAcc);
      }
    }, 400);
  };

  const handleFinishTrial = () => {
    completeFreeTrial();
    setStep(3);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-4">
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* If user is already logged in */}
        {isAuthenticated ? (
          <div className="glass-strong rounded-3xl p-8 md:p-12 text-center max-w-xl w-full flex flex-col items-center gap-5 border border-purple-500/30">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-space font-bold text-white">Full Access Active</h2>
            <p className="text-sm text-white/60">
              You are already registered and logged in with your account. You have full access to all courses, assessments, and dashboards!
            </p>
            <div className="flex gap-3 mt-2">
              <Link to="/select-role" className="btn-primary text-sm px-6 py-2.5">
                Go to Role Dashboard
              </Link>
              <Link to="/courses" className="btn-secondary text-sm px-6 py-2.5">
                Explore Courses
              </Link>
            </div>
          </div>
        ) : trialCompleted && step !== 3 ? (
          /* Single Free Trial Completed Gate */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center max-w-xl w-full flex flex-col items-center gap-6 border border-amber-500/30 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 self-center">
                Single Free Trial Expired
              </span>
              <h2 className="text-3xl font-space font-bold text-white">
                Register or Log In to Continue
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                You have used your <strong>1 Single Free Trial</strong> session. To unlock all 200+ sign lessons, full gesture recognition, personalized assessments, and role-based learning, please create your account or sign in.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
              <Link to="/register" className="btn-primary text-sm px-6 py-3 text-center">
                Register Free Account
              </Link>
              <Link to="/login" className="btn-secondary text-sm px-6 py-3 text-center">
                Log In to Existing Account
              </Link>
            </div>

            <button
              onClick={resetFreeTrial}
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors mt-2"
            >
              (Dev Reset Free Trial)
            </button>
          </motion.div>
        ) : step === 1 ? (
          /* Step 1: Start Free Trial intro */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center max-w-2xl w-full flex flex-col items-center gap-6 border border-purple-500/30"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                Single Free Trial (1 Session Remaining)
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-space font-bold text-white leading-tight">
              Experience Sign AI{' '}
              <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Gesture Trial
              </span>
            </h1>

            <p className="text-base text-white/60 leading-relaxed max-w-lg">
              Test real-time AI hand landmark detection, motion tracking, and instant accuracy scoring with your free trial challenge.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 w-full text-left my-2">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1.5">
                <span className="text-xs text-purple-400 font-bold">1. Position</span>
                <span className="text-xs text-white/60">Position your hand in front of your camera or screen.</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1.5">
                <span className="text-xs text-blue-400 font-bold">2. Perform</span>
                <span className="text-xs text-white/60">Form the ASL &quot;HELLO&quot; open palm wave sign.</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-1.5">
                <span className="text-xs text-emerald-400 font-bold">3. Feedback</span>
                <span className="text-xs text-white/60">Receive instant AI landmark accuracy feedback.</span>
              </div>
            </div>

            <button
              onClick={handleStartTrialSession}
              className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <span>Begin Single Free Trial</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </motion.div>
        ) : step === 2 ? (
          /* Step 2: Interactive Trial Practice Session */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-3xl p-6 md:p-8 w-full flex flex-col items-center gap-6 border border-purple-500/30 max-w-3xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <h3 className="text-lg font-space font-bold text-white">Live AI Sign Detection Trial</h3>
                  <p className="text-xs text-white/50">Target Gesture: ASL &quot;HELLO&quot; (Open Palm Salute Wave)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full text-purple-300 bg-purple-500/20 border border-purple-500/30">
                  Accuracy: {accuracy}%
                </span>
              </div>
            </div>

            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-emerald-400 flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                21 LANDMARKS TRACKED
              </div>
              {detectedSign && (
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-purple-900/80 backdrop-blur-md border border-purple-400/30 text-center">
                  <span className="text-xs text-purple-200 font-semibold">Sign Recognized: {detectedSign}</span>
                </div>
              )}
            </div>

            {/* Accuracy progress bar */}
            <div className="w-full max-w-[460px] flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/60">Match Confidence</span>
                <span className="text-emerald-400 font-bold">{accuracy}%</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleFinishTrial}
                className="btn-primary text-sm px-6 py-3 font-semibold flex items-center gap-2"
              >
                <span>Complete Trial &amp; View Result</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Step 3: Trial Completed Congratulations & Prompt to Register/Login */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center max-w-xl w-full flex flex-col items-center gap-6 border border-emerald-500/40 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 self-center">
                Single Free Trial Completed!
              </span>
              <h2 className="text-3xl font-space font-bold text-white">
                Great Job! 96% Score
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                You have completed your <strong>single free trial session</strong>. To save your progress, unlock all 200+ sign language courses, and access personalized feedback, please <strong>Register</strong> or <strong>Log In</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
              <Link to="/register" className="btn-primary text-sm px-6 py-3 text-center">
                Register Free Account
              </Link>
              <Link to="/login" className="btn-secondary text-sm px-6 py-3 text-center">
                Log In to Account
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
