import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PlayCircle, Lock, BookOpen, Sparkles, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LearningPath({ course, activeLessonId }) {
  const navigate = useNavigate();

  if (!course || !course.modules) return null;

  // Calculate totals
  let totalLessons = 0;
  let completedCount = 0;
  let lockedCount = 0;

  course.modules.forEach(mod => {
    mod.lessons.forEach(l => {
      totalLessons++;
      if (l.completed) completedCount++;
      if (l.locked) lockedCount++;
    });
  });

  const overallCompletionPercentage = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;

  return (
    <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col gap-6"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}
    >
      {/* Header & Overall Completion */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
              Interactive Roadmap
            </span>
          </div>
          <h2 className="text-2xl font-space font-bold text-white">Course Learning Path</h2>
        </div>

        {/* Overview Stats Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="glass px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase">Overall Completion</span>
              <span className="text-xs font-bold text-white">{overallCompletionPercentage}% Complete</span>
            </div>
          </div>

          <div className="glass px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase">Lessons</span>
              <span className="text-xs font-bold text-white">{completedCount} / {totalLessons} Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-white/60 font-medium">
          <span>Progress Tracking</span>
          <span className="text-purple-300 font-bold">{completedCount} of {totalLessons} Lessons Mastered</span>
        </div>
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transition-all duration-700"
            style={{ width: `${overallCompletionPercentage}%` }}
          />
        </div>
      </div>

      {/* Modules Roadmap Timeline */}
      <div className="flex flex-col gap-8 pt-4">
        {course.modules.map((mod, modIdx) => {
          const modCompletedLessons = mod.lessons.filter(l => l.completed).length;
          const modTotal = mod.lessons.length;
          const modProgress = Math.round((modCompletedLessons / modTotal) * 100);

          return (
            <motion.div
              key={mod.id || modIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: modIdx * 0.1 }}
              className="flex flex-col gap-4 relative"
            >
              {/* Module Banner */}
              <div className="glass rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-sm">
                    M{modIdx + 1}
                  </div>
                  <div>
                    <h3 className="font-space font-semibold text-sm text-white">{mod.title}</h3>
                    <span className="text-[11px] text-white/45">{mod.duration} · {modCompletedLessons}/{modTotal} completed</span>
                  </div>
                </div>

                <div className="w-24 hidden sm:block">
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: `${modProgress}%` }} />
                  </div>
                </div>
              </div>

              {/* Lessons Timeline List */}
              <div className="ml-4 pl-6 border-l-2 border-white/10 flex flex-col gap-3 relative">
                {mod.lessons.map((lesson, lesIdx) => {
                  const isActive = activeLessonId === lesson.id;
                  const isCompleted = lesson.completed;
                  const isLocked = lesson.locked;

                  return (
                    <motion.div
                      key={lesson.id}
                      whileHover={!isLocked ? { x: 4 } : {}}
                      onClick={() => {
                        if (!isLocked) {
                          navigate(`/learn/${lesson.id}`);
                        }
                      }}
                      className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                        isActive
                          ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-900/30 text-white'
                          : isCompleted
                          ? 'glass border-green-500/30 text-white/90 hover:border-green-500/50'
                          : isLocked
                          ? 'glass border-white/5 opacity-50 cursor-not-allowed'
                          : 'glass border-white/10 text-white/70 hover:border-purple-500/30 hover:text-white'
                      }`}
                    >
                      {/* Timeline Node Dot */}
                      <div className={`absolute -left-[31px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                        isCompleted
                          ? 'bg-green-500 border-green-300'
                          : isActive
                          ? 'bg-purple-500 border-white animate-pulse'
                          : 'bg-[#050505] border-white/30'
                      }`} />

                      {/* Lesson Details */}
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-white/30 flex-shrink-0" />
                        ) : (
                          <PlayCircle className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-300' : 'text-blue-400'}`} />
                        )}

                        <div className="flex flex-col">
                          <span className="text-xs font-semibold leading-tight">{lesson.title}</span>
                          <span className="text-[10px] text-white/45 mt-0.5">{lesson.duration}</span>
                        </div>
                      </div>

                      {/* Status Action Label */}
                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <span className="text-[10px] font-semibold text-green-400 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                            Completed
                          </span>
                        )}
                        {isActive && (
                          <span className="text-[10px] font-semibold text-purple-300 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 animate-pulse">
                            Playing Now
                          </span>
                        )}
                        {isLocked && (
                          <span className="text-[10px] text-white/30 px-2 py-0.5 rounded-full bg-white/5">
                            Locked
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
