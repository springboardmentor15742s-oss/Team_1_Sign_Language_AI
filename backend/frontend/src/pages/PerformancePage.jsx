import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';

// Mock Data
import {
  overallScore,
  performanceGrade,
  previousWeekComparison,
  performanceScoreWeights,
  componentScores,
  performanceInsights,
  skillBreakdown,
  weeklyPerformanceData,
  recommendations,
  achievements,
  performanceHistory,
  leaderboardStats
} from '../data/performanceData';

// Components
import PerformanceHeader from '../components/performance/PerformanceHeader';
import WeightedScoreCard from '../components/performance/WeightedScoreCard';
import PerformanceInsights from '../components/performance/PerformanceInsights';
import SkillBreakdownCard from '../components/performance/SkillBreakdownCard';
import PerformanceChart from '../components/performance/PerformanceChart';
import RecommendationPanel from '../components/performance/RecommendationPanel';
import AchievementSummary from '../components/performance/AchievementSummary';
import PerformanceHistory from '../components/performance/PerformanceHistory';
import LeaderboardCard from '../components/performance/LeaderboardCard';

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">
        
        {/* Page Title & Breadcrumbs */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
            <span>/</span>
            <span className="text-purple-400">Performance</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">
            Performance Engine
          </h1>
          <p className="text-white/50 max-w-2xl">
            Detailed analytics on your sign language learning journey based on the official weighted scoring model.
          </p>
        </div>

        {/* Top Header Section */}
        <PerformanceHeader 
          overallScore={overallScore}
          performanceGrade={performanceGrade}
          skillLevel="Level 2 · Intermediate"
          rank={leaderboardStats.rank}
          consistencyScore={componentScores.practiceConsistency}
          improvementRate={componentScores.skillImprovementRate}
          previousWeekComparison={previousWeekComparison}
        />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 spans) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <WeightedScoreCard 
              weights={performanceScoreWeights}
              scores={componentScores}
              overallScore={overallScore}
            />
            <PerformanceInsights insights={performanceInsights} />
            <SkillBreakdownCard skills={skillBreakdown} />
            <PerformanceHistory history={performanceHistory} />
          </div>

          {/* Right Column (1 span) */}
          <div className="flex flex-col gap-8">
            <LeaderboardCard stats={leaderboardStats} />
            <div className="h-[400px]">
              <PerformanceChart data={weeklyPerformanceData} />
            </div>
            <div className="flex-1 min-h-[300px]">
              <RecommendationPanel recommendations={recommendations} />
            </div>
            <AchievementSummary achievements={achievements} />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
