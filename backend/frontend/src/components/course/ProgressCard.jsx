import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressCard({ title, value, subtitle, icon: Icon, color = 'purple', progress }) {
  const getColorStyles = (c) => {
    switch (c) {
      case 'blue':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          bar: 'from-blue-600 to-indigo-500'
        };
      case 'green':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          bar: 'from-emerald-600 to-teal-500'
        };
      case 'amber':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          bar: 'from-amber-600 to-yellow-500'
        };
      default:
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          bar: 'from-purple-600 to-blue-500'
        };
    }
  };

  const styles = getColorStyles(color);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-strong rounded-3xl p-5 border border-white/10 flex flex-col justify-between gap-4"
      style={{ boxShadow: '0 16px 36px rgba(0,0,0,0.35)' }}
    >
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${styles.bg} ${styles.border} ${styles.text}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {subtitle && (
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${styles.bg} ${styles.border} ${styles.text}`}>
            {subtitle}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-white/50 font-medium">{title}</span>
        <span className="text-2xl font-space font-bold text-white tracking-tight">{value}</span>
      </div>

      {progress !== undefined && (
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${styles.bar} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}
