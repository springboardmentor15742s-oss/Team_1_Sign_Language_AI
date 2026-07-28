import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, activeCategory, onSelectCategory, counts = {} }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-1">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = counts[category];

          return (
            <motion.button
              key={category}
              onClick={() => onSelectCategory(category)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-900/30 border border-purple-400/40'
                  : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{category}</span>

              {count !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
