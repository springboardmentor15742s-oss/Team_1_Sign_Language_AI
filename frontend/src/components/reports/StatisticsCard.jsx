import React from 'react';
import { motion } from 'framer-motion';

export default function StatisticsCard({
  title,
  value,
  subtitle,
  change,
  color = [139, 92, 246],
  icon,
  index = 0,
}) {
  const [r, g, b] = color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 pointer-events-none group-hover:scale-150 transition-transform"
        style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(15px)' }}
      />

      <div className="flex items-start justify-between relative z-10 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
        >
          {icon ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
          ) : (
            <span className="font-bold text-sm">📊</span>
          )}
        </div>
        {change && (
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
          >
            {change}
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-2xl font-space font-bold text-white tracking-tight">{value}</h3>
        <p className="text-xs text-white/50 font-medium">{title}</p>
        {subtitle && <p className="text-[10px] text-white/30">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
