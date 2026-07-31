import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import logoImg from '../assets/logo.jpeg';

const socialLinks = [
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const footerLinks = {
  Product: ['Features', 'Courses', 'Assessment', 'Progress Tracking', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Resources: ['Documentation', 'Help Center', 'Community', 'Sign Language Guide', 'Research'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility Statement'],
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer className="relative pt-20 pb-10 px-4 overflow-hidden" id="accessibility">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(59,130,246,0.5), rgba(236,72,153,0.4), transparent)' }}
      />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* CTA Banner */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden mb-20 p-10 md:p-14 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.12) 50%, rgba(236,72,153,0.1) 100%)',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
          />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-space font-bold text-white">
              Start Your Journey Today.
            </h2>
            <p className="text-white/50 text-lg max-w-xl">
              Join 50,000+ learners mastering sign language with AI-powered guidance. Free to start, no credit card required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                className="btn-primary text-sm"
                style={{ padding: '14px 36px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started Free →
              </motion.button>
              <motion.button
                className="btn-secondary text-sm"
                whileHover={{ scale: 1.05 }}
              >
                View Pricing
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 16px rgba(139,92,246,0.5)' }}
              >
                <img
                  src={logoImg}
                  alt="Sign Language AI Logo"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <span className="text-white font-space font-bold text-xl">Sign Language AI</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              The world's most advanced AI-powered sign language learning and assessment platform.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(139,92,246,0.2)', borderColor: 'rgba(139,92,246,0.4)' }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-white/30 tracking-widest uppercase">{category}</span>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <a key={link} href="#"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 w-fit"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © 2026 Sign Language AI Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-white/50">WCAG 2.1 AA Compliant</span>
            </div>
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs text-white/50">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
