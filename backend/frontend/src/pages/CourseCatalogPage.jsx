import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Flame, Award, ArrowRight, Layers } from 'lucide-react';

import {
  MOCK_COURSES,
  COURSE_CATEGORIES,
  getContinueLearningCourses,
  getRecommendedCourses,
  getPopularCourses,
  getRecentlyViewedCourses
} from '../data/courses';

import CourseCard from '../components/course/CourseCard';
import CategoryFilter from '../components/course/CategoryFilter';
import SearchBar from '../components/course/SearchBar';
import EmptyState from '../components/course/EmptyState';

export default function CourseCatalogPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Filter logic
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter((course) => {
      // Category Filter
      const matchesCategory =
        activeCategory === 'All Categories' || course.category === activeCategory;

      // Difficulty Filter
      const matchesDifficulty =
        selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

      // Search Query Filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        (course.skillsCovered && course.skillsCovered.some(s => s.toLowerCase().includes(query)));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [searchQuery, activeCategory, selectedDifficulty]);

  // Category counts map
  const categoryCounts = useMemo(() => {
    const counts = { 'All Categories': MOCK_COURSES.length };
    COURSE_CATEGORIES.forEach((cat) => {
      if (cat !== 'All Categories') {
        counts[cat] = MOCK_COURSES.filter((c) => c.category === cat).length;
      }
    });
    return counts;
  }, []);

  const continueCourses = useMemo(() => getContinueLearningCourses(), []);
  const recommendedCourses = useMemo(() => getRecommendedCourses(), []);
  const popularCourses = useMemo(() => getPopularCourses(), []);
  const recentlyViewed = useMemo(() => getRecentlyViewedCourses(), []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All Categories');
    setSelectedDifficulty('All');
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full text-white">

      {/* ─── LARGE HERO SECTION ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-8 md:p-12 mb-12 border border-white/10 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)' }}
      >
        {/* Background glow effects */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />

        <div className="relative z-10 max-w-2xl flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/15 border border-purple-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Infosys Springboard Module 3
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-blue-300 bg-blue-500/15 border border-blue-500/30">
              Interactive Sign Catalog
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-space font-extrabold tracking-tight text-white leading-tight">
            Master Sign Language with <span className="gradient-text">Sign Language AI</span>
          </h1>

          <p className="text-sm md:text-base text-white/60 leading-relaxed">
            Explore production-ready courses from beginner alphabets to workplace professional communication. Practice gestures with real-time AI recognition.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-xs">
                6+
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Curated Tracks</span>
                <span className="text-[10px] text-white/40">From Beginner to Advanced</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 font-bold text-xs">
                100%
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">AI Vision Assisted</span>
                <span className="text-[10px] text-white/40">Instant gesture feedback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="relative z-10 glass rounded-2xl p-6 border border-white/10 flex flex-col gap-3 min-w-[260px] text-left">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Platform Overview</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-space font-bold text-white">12,400+</div>
          <div className="text-xs text-white/60">Active Sign Learners Worldwide</div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full w-4/5" />
          </div>
        </div>
      </motion.div>

      {/* ─── CONTINUE LEARNING SECTION ───────────────────────────── */}
      {continueCourses.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
              <h2 className="text-xl md:text-2xl font-space font-bold text-white">Continue Learning</h2>
            </div>
            <span className="text-xs text-purple-300 font-medium">{continueCourses.length} In Progress</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {continueCourses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="glass-strong rounded-3xl p-5 border border-purple-500/30 flex flex-col sm:flex-row items-center gap-5 cursor-pointer group"
                style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full sm:w-36 h-28 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col gap-2 w-full flex-1">
                  <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 w-fit">
                    {course.category}
                  </span>
                  <h3 className="font-space font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{course.duration}</span>
                    <span className="font-bold text-purple-300">{course.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ─── SEARCH & FILTER CONTROL BAR ─────────────────────────── */}
      <section className="mb-8 flex flex-col gap-6">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          totalResults={filteredCourses.length}
        />

        <CategoryFilter
          categories={COURSE_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          counts={categoryCounts}
        />
      </section>

      {/* ─── MAIN COURSE CATALOG GRID ────────────────────────────── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-space font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>Course Catalog</span>
          </h2>
          <span className="text-xs text-white/45">
            Showing {filteredCourses.length} of {MOCK_COURSES.length} Courses
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching courses found"
            message={`We couldn't find any courses under "${activeCategory}" matching "${searchQuery}". Try broadening your search criteria.`}
            onReset={handleResetFilters}
          />
        )}
      </section>

      {/* ─── RECOMMENDED COURSES SECTION ─────────────────────────── */}
      {recommendedCourses.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-space font-bold text-white">Recommended For You</h2>
              <p className="text-xs text-white/45">Based on popular Springboard learning pathways</p>
            </div>
            <button
              onClick={() => setActiveCategory('All Categories')}
              className="text-xs text-purple-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.slice(0, 3).map((course) => (
              <CourseCard key={`rec-${course.id}`} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* ─── POPULAR COURSES & RECENTLY VIEWED ROW ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Courses */}
        <section className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-space font-bold text-lg text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-purple-400" />
              <span>Popular Courses</span>
            </h3>
            <span className="text-xs text-white/40">Highest Enrollment</span>
          </div>

          <div className="flex flex-col gap-3">
            {popularCourses.map((course) => (
              <div
                key={`pop-${course.id}`}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="glass p-3.5 rounded-2xl border border-white/10 hover:border-purple-500/40 flex items-center justify-between gap-4 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex flex-col">
                    <h4 className="font-space font-semibold text-xs text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                      {course.title}
                    </h4>
                    <span className="text-[10px] text-white/40">{course.category} · ★ {course.rating}</span>
                  </div>
                </div>

                <button className="text-xs font-semibold text-purple-300 group-hover:translate-x-1 transition-transform">
                  View →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Viewed Courses */}
        <section className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-space font-bold text-lg text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>Recently Viewed</span>
            </h3>
            <span className="text-xs text-white/40">Recent Activity</span>
          </div>

          <div className="flex flex-col gap-3">
            {recentlyViewed.map((course) => (
              <div
                key={`recent-${course.id}`}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="glass p-3.5 rounded-2xl border border-white/10 hover:border-blue-500/40 flex items-center justify-between gap-4 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex flex-col">
                    <h4 className="font-space font-semibold text-xs text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                      {course.title}
                    </h4>
                    <span className="text-[10px] text-white/40">{course.duration} · {course.difficulty}</span>
                  </div>
                </div>

                <button className="text-xs font-semibold text-blue-300 group-hover:translate-x-1 transition-transform">
                  Resume →
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
