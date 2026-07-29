import { motion } from 'framer-motion';
import { REPORT_CATEGORIES } from '../../data/reportData';

export default function ReportFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Report category filter">
      {REPORT_CATEGORIES.map(cat => {
        const isActive = active === cat.id;
        return (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            role="tab"
            aria-selected={isActive}
            id={`filter-${cat.id}`}
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-purple-600/30 border border-purple-500/50 text-white shadow-lg shadow-purple-900/20'
                : 'bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] hover:border-white/10'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
            </svg>
            {cat.label}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-purple-500/30 text-purple-300' : 'bg-white/10 text-white/40'
              }`}
            >
              {cat.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
