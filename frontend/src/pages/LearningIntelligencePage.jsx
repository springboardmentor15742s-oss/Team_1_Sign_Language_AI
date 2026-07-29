import DashboardLayout from '../layouts/DashboardLayout';

import LearningOverview from '../components/intelligence/LearningOverview';
import WeakAreaCard from '../components/intelligence/WeakAreaCard';
import SkillCard from '../components/intelligence/SkillCard';
import RecommendationCard from '../components/intelligence/RecommendationCard';
import ForecastCard from '../components/intelligence/ForecastCard';
import AchievementCard from '../components/intelligence/AchievementCard';
import AnalyticsChart from '../components/intelligence/AnalyticsChart';
import ActivityTimeline from '../components/intelligence/ActivityTimeline';

import {
  LEARNING_OVERVIEW,
  WEAK_AREAS,
  SKILL_CATEGORIES,
  AI_RECOMMENDATIONS,
  ANALYTICS_DATA,
  FORECAST_DATA,
  ACHIEVEMENTS,
  ACTIVITY_TIMELINE,
} from '../data/intelligenceData';

export default function LearningIntelligencePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* 1. Learning Overview */}
        <LearningOverview overview={LEARNING_OVERVIEW} />

        {/* 2. Weak Areas Analysis */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-space font-bold text-white">Weak Areas & Form Corrections</h2>
            <span className="text-xs text-white/40">{WEAK_AREAS.length} Categories Monitored</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WEAK_AREAS.map((area, i) => (
              <WeakAreaCard key={area.id} area={area} index={i} />
            ))}
          </div>
        </div>

        {/* 3. Skill Progress */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-space font-bold text-white">Skill Category Progress</h2>
            <span className="text-xs text-white/40">{SKILL_CATEGORIES.length} Skill Domains</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_CATEGORIES.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        </div>

        {/* 4. AI Recommendations */}
        <RecommendationCard recommendation={AI_RECOMMENDATIONS} />

        {/* 5. Learning Analytics Charts */}
        <AnalyticsChart
          weeklyData={ANALYTICS_DATA.weeklyProgress}
          monthlyData={ANALYTICS_DATA.monthlyAccuracy}
        />

        {/* 6. Performance Forecast */}
        <ForecastCard forecast={FORECAST_DATA} />

        {/* 7. Achievements & 8. Activity Timeline Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <AchievementCard achievements={ACHIEVEMENTS} />
          </div>
          <div className="lg:col-span-2">
            <ActivityTimeline timeline={ACTIVITY_TIMELINE} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
