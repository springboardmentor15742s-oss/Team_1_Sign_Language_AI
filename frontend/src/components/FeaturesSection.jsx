import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    gradient: 'from-violet-600 to-purple-500',
    glow: 'rgba(139, 92, 246, 0.4)',
    badge: 'Core AI',
    title: 'AI Gesture Recognition',
    description:
      'Our proprietary computer vision model tracks 21 hand landmarks in real-time with sub-20ms latency, achieving 98.4% gesture recognition accuracy across 200+ signs.',
    metrics: [
      { label: 'Accuracy', value: '98.4%' },
      { label: 'Latency', value: '<20ms' },
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-blue-600 to-cyan-500',
    glow: 'rgba(59, 130, 246, 0.4)',
    badge: 'Real-Time',
    title: 'Real-Time Feedback',
    description:
      'Instant corrective feedback on hand shape, orientation, and movement. Visual overlays highlight exactly where to adjust, accelerating your learning curve dramatically.',
    metrics: [
      { label: 'Response', value: 'Instant' },
      { label: 'Precision', value: '±2mm' },
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: 'from-pink-600 to-rose-500',
    glow: 'rgba(236, 72, 153, 0.4)',
    badge: 'Adaptive AI',
    title: 'Personalized Learning',
    description:
      "Sign Language AI's adaptive algorithm builds a unique learning profile for you — adjusting difficulty, pacing, and content based on your strengths and areas for improvement.",
    metrics: [
      { label: 'Faster Progress', value: '3× Faster' },
      { label: 'Retention', value: '91%' },
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.3)',
    badge: 'Analytics',
    title: 'Progress Tracking',
    description:
      'Comprehensive dashboards show your learning journey with streak tracking, mastery levels per sign, weekly goals, and AI-generated study recommendations.',
    metrics: [
      { label: 'Metrics', value: '40+ Stats' },
      { label: 'Updates', value: 'Real-time' },
    ],
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative gradient-border p-6 flex flex-col gap-5 overflow-hidden cursor-default"
      style={{
        background: 'rgba(10, 8, 20, 0.7)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease, transform 0.3s ease',
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 60px ${feature.glow}, 0 0 0 1px rgba(255,255,255,0.12)`,
      }}
    >
      {/* Hover glow bg */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{ background: `radial-gradient(ellipse at 30% 30%, ${feature.glow} 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div className="relative flex items-start justify-between">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white`}
          style={{ boxShadow: `0 8px 24px ${feature.glow}` }}
        >
          {feature.icon}
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase"
          style={{
            background: `${feature.glow.replace('0.4', '0.15')}`,
            border: `1px solid ${feature.glow.replace('0.4', '0.3')}`,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          {feature.badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 relative">
        <h3 className="text-xl font-space font-semibold text-white leading-tight">{feature.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
      </div>

      {/* Metrics */}
      <div className="flex gap-4 mt-auto pt-4 border-t border-white/[0.06]">
        {feature.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-0.5">
            <span className={`text-base font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text`}
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              {m.value}
            </span>
            <span className="text-xs text-white/35 font-medium">{m.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section id="features" className="relative py-28 px-4">
      {/* Section glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2"
            style={{ border: '1px solid rgba(139,92,246,0.25)' }}
          >
            <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">Platform Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white leading-tight">
            Built for the Future of
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 60%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Accessible Communication
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Sign Language AI combines cutting-edge AI with thoughtful design to create the most effective
            sign language learning experience ever built.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-14"
        >
          <motion.button
            className="btn-primary text-sm"
            style={{ padding: '14px 36px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore All Features →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
