import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  totalResults
}) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-3">
      {/* Main Search Input */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search sign language courses, alphabets, phrases..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl glass-strong border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
        />

        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Difficulty Filter Dropdown */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full pl-9 pr-8 py-3 rounded-2xl glass-strong border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-purple-500/60 transition-all duration-300 appearance-none bg-no-repeat cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem'
            }}
          >
            <option value="All" className="bg-[#0f0b1e] text-white">All Levels</option>
            <option value="Beginner" className="bg-[#0f0b1e] text-white">Beginner</option>
            <option value="Intermediate" className="bg-[#0f0b1e] text-white">Intermediate</option>
            <option value="Advanced" className="bg-[#0f0b1e] text-white">Advanced</option>
          </select>
        </div>

        {/* Results Counter Badge */}
        {totalResults !== undefined && (
          <div className="hidden sm:flex items-center justify-center px-4 py-3 rounded-2xl glass border border-white/10 text-xs font-medium text-white/60 whitespace-nowrap">
            <span className="font-bold text-purple-300 mr-1">{totalResults}</span> Courses
          </div>
        )}
      </div>
    </div>
  );
}
