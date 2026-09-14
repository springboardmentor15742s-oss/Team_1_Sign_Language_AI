import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle2, Lock, FileText, ChevronRight, Video, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonCard({ lesson, index, isActive = false }) {
  const navigate = useNavigate();

  const isCompleted = Boolean(lesson.completed);
  const isLocked = Boolean(lesson.locked);

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      onClick={() => {
        if (!isLocked) {
          const targetUrl = lesson.courseId
            ? `/learn/${lesson.id}?courseId=${lesson.courseId}`
            : `/learn/${lesson.id}`;
          navigate(targetUrl, { state: { courseId: lesson.courseId, lessonId: lesson.id } });
        }
      }}
      className={`glass rounded-2xl p-4 border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        isActive
          ? 'bg-purple-600/25 border-purple-500/60 shadow-lg shadow-purple-900/30'
          : isCompleted
          ? 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50'
          : isLocked
          ? 'border-white/5 opacity-50 cursor-not-allowed'
          : 'border-white/10 hover:border-purple-500/40 cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        {/* Index Badge */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : isActive
              ? 'bg-purple-500 text-white shadow-md shadow-purple-900/50'
              : 'bg-white/5 text-white/50 border border-white/10'
          }`}
        >
          {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : index + 1}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h4 className="font-space font-semibold text-sm text-white line-clamp-1">
              {lesson.title}
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/45 mt-0.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-purple-400" />
              {lesson.duration}
            </span>
            <span className="flex items-center gap-1">
              <Video className="w-3 h-3 text-blue-400" />
              AI Sign Video
            </span>
            {lesson.resources && (
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3 text-purple-400" />
                {lesson.resources.length} resource{lesson.resources.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Video Completion Intimation Badge */}
      <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
        {isCompleted ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Video Completed ✓</span>
          </div>
        ) : isLocked ? (
          <div className="flex items-center gap-1 text-xs font-medium text-white/30 bg-white/5 px-3 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>Locked</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Incomplete ⏳
            </span>
            <button className="flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30 transition-colors cursor-pointer">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>{isActive ? 'Watching' : 'Watch Video'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
