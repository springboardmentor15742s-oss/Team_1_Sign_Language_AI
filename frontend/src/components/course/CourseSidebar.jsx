import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Lock, Play, Layers, Award, Clock, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CourseSidebar({ course, activeLessonId, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!course) return null;

  const totalLessons = course.totalLessons || course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedCount = course.completedLessonsCount || 0;
  const isCompleted = course.progress === 100;

  return (
    <aside
      className={`glass-strong border-r border-white/10 flex flex-col justify-between transition-all duration-300 ${
        isOpen ? 'block' : 'hidden lg:flex'
      }`}
      style={{
        background: 'rgba(7, 5, 16, 0.95)',
        backdropFilter: 'blur(40px)',
        width: '320px',
        minWidth: '320px'
      }}
    >
      <div className="p-5 flex flex-col gap-6 overflow-y-auto h-full">
        {/* Course Header Brief */}
        <div className="glass rounded-2xl p-4 flex flex-col gap-3 border border-purple-500/30">
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest px-2 py-0.5 rounded-full bg-purple-500/20 w-fit">
            {course.category}
          </span>
          <h3 className="font-space font-bold text-sm text-white line-clamp-2">
            {course.title}
          </h3>

          {/* Real-time Progress Bar & Intimation */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60 text-[11px]">Completion Progress</span>
              <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-purple-300'}`}>
                {course.progress || 0}%
              </span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}
                style={{ width: `${course.progress || 0}%` }}
              />
            </div>
            <span className="text-[10px] text-white/40">
              {completedCount} of {totalLessons} Videos Finished {isCompleted && '✓'}
            </span>
          </div>
        </div>

        {/* Modules & Lessons Navigation Tree */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Course Syllabus
            </span>
            <span className="text-xs text-white/40">{course.modules?.length || 0} Modules</span>
          </div>

          <div className="flex flex-col gap-4">
            {course.modules?.map((mod, modIdx) => (
              <div key={mod.id || modIdx} className="flex flex-col gap-2">
                {/* Module title header */}
                <div className="text-xs font-semibold text-white/80 px-2 py-1 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="line-clamp-1">M{modIdx + 1}: {mod.title}</span>
                  <span className="text-[10px] text-white/40 flex-shrink-0 ml-2">{mod.lessons?.length} lessons</span>
                </div>

                {/* Lessons */}
                <div className="flex flex-col gap-1 pl-2">
                  {mod.lessons?.map((les, lesIdx) => {
                    const isActive = activeLessonId === les.id;
                    const isLessonDone = Boolean(les.completed);
                    const isLocked = Boolean(les.locked);

                    return (
                      <button
                        key={les.id}
                        disabled={isLocked}
                        onClick={() => {
                          navigate(`/learn/${les.id}`);
                          if (onClose) onClose();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'text-white bg-purple-600/30 border border-purple-500/50 shadow-md shadow-purple-900/40'
                            : isLessonDone
                            ? 'text-emerald-300 hover:bg-emerald-500/10 border border-transparent'
                            : isLocked
                            ? 'text-white/30 cursor-not-allowed border border-transparent'
                            : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          {isLessonDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : isLocked ? (
                            <Lock className="w-4 h-4 text-white/20 flex-shrink-0" />
                          ) : (
                            <Play className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-purple-300 fill-purple-300' : 'text-blue-400'}`} />
                          )}
                          <span className="truncate">{modIdx + 1}.{lesIdx + 1} {les.title}</span>
                        </div>
                        <span className="text-[10px] text-white/40 ml-1 flex-shrink-0">
                          {isLessonDone ? '✓ Done' : les.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
