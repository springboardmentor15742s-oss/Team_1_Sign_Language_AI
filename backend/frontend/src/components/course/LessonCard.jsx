import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle, Lock, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonCard({ lesson, index, isActive = false }) {
  const navigate = useNavigate();

  const isCompleted = lesson.completed;
  const isLocked = lesson.locked;

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      onClick={() => {
        if (!isLocked) {
          navigate(`/learn/${lesson.id}`);
        }
      }}
      className={`glass rounded-2xl p-4 border transition-all duration-200 flex items-center justify-between gap-4 ${
        isActive
          ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-900/30'
          : isCompleted
          ? 'border-green-500/30 hover:border-green-500/50'
          : isLocked
          ? 'border-white/5 opacity-50 cursor-not-allowed'
          : 'border-white/10 hover:border-purple-500/40 cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-3.5">
        {/* Index Badge */}
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
            isCompleted
              ? 'bg-green-500/20 text-green-400 border border-green-500/40'
              : isActive
              ? 'bg-purple-500 text-white shadow-md shadow-purple-900/50'
              : 'bg-white/5 text-white/50 border border-white/10'
          }`}
        >
          {index + 1}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h4 className="font-space font-semibold text-sm text-white line-clamp-1">
              {lesson.title}
            </h4>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-white/45 mt-0.5">
            <span>{lesson.duration}</span>
            {lesson.resources && (
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3 text-purple-400" />
                {lesson.resources.length} resource{lesson.resources.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action State Indicator */}
      <div className="flex items-center gap-2">
        {isCompleted ? (
          <div className="flex items-center gap-1 text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Completed</span>
          </div>
        ) : isLocked ? (
          <div className="flex items-center gap-1 text-xs font-medium text-white/30 bg-white/5 px-3 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>Locked</span>
          </div>
        ) : (
          <button className="flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30 transition-colors">
            <PlayCircle className="w-3.5 h-3.5" />
            <span>{isActive ? 'Resume' : 'Start'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
