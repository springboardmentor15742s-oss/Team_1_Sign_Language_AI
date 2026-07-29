import { motion } from 'framer-motion';
import HandVisual from './HandVisual';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 px-4 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.5), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 self-start"
            >
              <div className="flex items-center gap-2 glass rounded-full px-4 py-2"
                style={{ border: '1px solid rgba(139,92,246,0.3)' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-white/70 tracking-widest uppercase">AI-Powered Platform</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="flex flex-col gap-2"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-space font-bold leading-[1.08] tracking-tight text-white">
                Every Gesture
                <br />
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>Tells a Story.</span>
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold leading-[1.1] tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Learn Sign Language
                <br />
                with AI.
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-white/55 leading-relaxed max-w-lg"
              style={{ fontWeight: 400 }}
            >
              Master sign language through AI-powered gesture recognition, real-time feedback,
              personalized learning, and interactive assessments — all in one premium platform.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-4 items-center"
            >
              <motion.button
                className="btn-primary text-base flex items-center gap-2"
                style={{ padding: '14px 32px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Get Started</span>
                <svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>

              <motion.button
                className="btn-secondary text-base flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.3)' }}
                >
                  <svg className="w-3.5 h-3.5 text-purple-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex gap-8 pt-4"
            >
              {[
                { value: '50K+', label: 'Active Learners' },
                { value: '98%', label: 'Accuracy Rate' },
                { value: '200+', label: 'Sign Gestures' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-space font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/40 font-medium tracking-wide uppercase">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column – Hand Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <HandVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #050505)' }}
      />
    </section>
  );
}
