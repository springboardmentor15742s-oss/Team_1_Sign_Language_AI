import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Star, Users, Award, ChevronRight, CheckCircle2, Video } from 'lucide-react';

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'intermediate':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'advanced':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    }
  };

  const isCompleted = course.progress === 100;
  const isStarted = course.progress > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.3 }}
      className="glass-strong rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group relative h-full"
      style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Thumbnail Banner */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />

          {/* Badges on Thumbnail */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-md bg-black/60 border border-white/15 text-white">
              {course.category}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>

          {/* Real-time Progress Overlay on Thumbnail */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between text-[11px] text-white/90 font-medium mb-1 drop-shadow">
              <span className="flex items-center gap-1">
                {isCompleted ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Completed
                  </span>
                ) : isStarted ? (
                  <span className="text-purple-300 font-bold">
                    In Progress ({course.completedLessonsCount || 0}/{course.totalLessons || 0} Videos)
                  </span>
                ) : (
                  <span className="text-white/60">Not Started (0%)</span>
                )}
              </span>
              <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-purple-300'}`}>
                {course.progress || 0}%
              </span>
            </div>
            <div className="w-full bg-black/60 backdrop-blur-md h-2 rounded-full overflow-hidden border border-white/10">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                    : 'bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-400'
                }`}
                style={{ width: `${course.progress || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 flex flex-col gap-3">
          {/* Title */}
          <h3 className="font-space font-bold text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Meta Info: Duration, Students, Rating */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>{course.duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-blue-400" />
              <span>{course.totalLessons || '6'} Lessons</span>
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Instructor Brief */}
          {course.instructor && (
            <div className="flex items-center gap-2.5 pt-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full object-cover border border-purple-500/40"
              />
              <span className="text-[11px] text-white/60 font-medium truncate">
                {course.instructor.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-5 md:p-6 pt-0">
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className={`w-full py-2.5 px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
            isCompleted
              ? 'bg-emerald-600/30 hover:bg-emerald-500/40 text-emerald-200 border border-emerald-500/50 shadow-md shadow-emerald-950/40'
              : isStarted
              ? 'btn-primary'
              : 'bg-white/10 hover:bg-purple-600/30 text-white border border-white/15 hover:border-purple-500/40'
          }`}
        >
          {isCompleted ? (
            <>
              <Award className="w-4 h-4 text-amber-300" />
              <span>Certificate Ready (100%)</span>
            </>
          ) : isStarted ? (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Continue Course ({course.progress}%)</span>
            </>
          ) : (
            <>
              <span>Start Course Free</span>
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
