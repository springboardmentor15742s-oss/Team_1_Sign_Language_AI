import React from 'react';
import { motion } from 'framer-motion';
import { SearchX, RefreshCw } from 'lucide-react';

export default function EmptyState({ title = "No courses found", message = "Try adjusting your search terms or filters to find what you're looking for.", onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-strong rounded-3xl p-10 md:p-14 border border-white/10 text-center flex flex-col items-center justify-center gap-5 my-8 max-w-xl mx-auto"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
    >
      <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
        <SearchX className="w-8 h-8" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-space font-bold text-xl text-white">{title}</h3>
        <p className="text-sm text-white/50 leading-relaxed max-w-md">{message}</p>
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="btn-primary text-xs flex items-center gap-2 mt-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </motion.div>
  );
}
