import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';

/* ─── Mock Data ─────────────────────────────────────────────────── */
const quickStats = [
  { label: 'Lessons Completed', value: '48 / 72', change: '+6 this week', color: [168, 85, 247], icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { label: 'Practice Hours', value: '24.5 hrs', change: '+3.2 hrs', color: [59, 130, 246], icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Overall Accuracy', value: '96.8%', change: '+1.4% AI score', color: [34, 197, 94], icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Weekly Progress', value: '12.5 hrs', change: 'Goal: 15 hrs', color: [236, 72, 153], icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'Achievements', value: '14 Badges', change: 'Latest: Fast Finger', color: [245, 158, 11], icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
];

const weeklyData = [
  { day: 'Mon', hrs: 1.8, accuracy: 94 },
  { day: 'Tue', hrs: 2.2, accuracy: 96 },
  { day: 'Wed', hrs: 1.5, accuracy: 95 },
  { day: 'Thu', hrs: 2.8, accuracy: 98 },
  { day: 'Fri', hrs: 2.0, accuracy: 97 },
  { day: 'Sat', hrs: 3.2, accuracy: 99 },
  { day: 'Sun', hrs: 1.0, accuracy: 96 },
];

const recommendedLessons = [
  { id: 1, title: 'ASL Alphabet & Numbers', level: 'Beginner', duration: '15 mins', signs: '26 Gestures', progress: 85, color: [168, 85, 247] },
  { id: 2, title: 'Emergency & Health Signs', level: 'Intermediate', duration: '20 mins', signs: '18 Gestures', progress: 40, color: [59, 130, 246] },
  { id: 3, title: 'Facial Expressions & Grammar', level: 'Advanced', duration: '25 mins', signs: '14 Gestures', progress: 10, color: [236, 72, 153] },
];

const upcomingAssessments = [
  { id: 1, title: 'Level 2 ASL Certification Exam', date: 'Tomorrow, 10:00 AM', duration: '30 mins', scoreToPass: '90% Accuracy' },
  { id: 2, title: 'Real-Time Conversational Drill', date: 'Friday, 2:30 PM', duration: '15 mins', scoreToPass: '85% Accuracy' },
];

const recentActivity = [
  { id: 1, gesture: 'Sign: "Thank You"', accuracy: '98.4%', time: '12 mins ago', status: 'Mastered', color: [34, 197, 94] },
  { id: 2, gesture: 'Sign: "Help Needed"', accuracy: '95.1%', time: '1 hr ago', status: 'Good', color: [59, 130, 246] },
  { id: 3, gesture: 'Sign: "Nice to Meet You"', accuracy: '97.0%', time: '3 hrs ago', status: 'Mastered', color: [168, 85, 247] },
  { id: 4, gesture: 'Sign: "Emergency"', accuracy: '91.8%', time: 'Yesterday', status: 'Practice Needed', color: [245, 158, 11] },
];

const calendarDays = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  active: [1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28].includes(i + 1),
  today: i + 1 === 28,
}));

export default function LearnerDashboard() {
  const [userName, setUserName] = useState('Alex Morgan');
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    } else {
      const storedName = localStorage.getItem('mira_user_name');
      if (storedName) setUserName(storedName);
    }
  }, [user]);

  return (
    <DashboardLayout>
      {/* ─── TOP BAR SECTION ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30">
                Level 2 · Intermediate
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                14 Day Streak 🔥
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">
              Welcome back, <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userName}</span> 👋
            </h1>
            <p className="text-xs md:text-sm text-white/50">
              Your AI gesture recognition performance is up by <strong className="text-green-400">+4.2%</strong> today. Keep it up!
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full lg:w-auto">
            <div className="glass rounded-2xl p-4 flex flex-col gap-1.5 flex-1 min-w-[150px]" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-xs text-white/40 font-medium">Today&apos;s Goal</span>
              <span className="text-xl font-space font-bold text-white">3 / 5 Lessons</span>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="glass rounded-2xl p-4 flex flex-col gap-1.5 flex-1 min-w-[150px]" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-xs text-white/40 font-medium">Overall Progress</span>
              <span className="text-xl font-space font-bold text-white">68% Complete</span>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── QUICK STATISTICS CARDS ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {quickStats.map((stat, i) => {
          const [r, g, b] = stat.color;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden group"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150"
                style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(15px)' }}
              />
              <div className="flex items-start justify-between relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-space font-bold text-white">{stat.value}</h3>
                <p className="text-xs text-white/40 mt-1 font-medium">{stat.label}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── MAIN GRID ──────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 spans) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Weekly Practice Chart */}
          <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-space font-bold text-white">Weekly Activity</h3>
                <p className="text-sm text-white/50">Practice hours vs AI accuracy</p>
              </div>
              <a href="/learning-intelligence" className="text-sm text-purple-400 hover:text-purple-300 font-semibold px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors">
                Intelligence Report →
              </a>
            </div>
            
            {/* Simple Bar Chart Mockup */}
            <div className="flex-1 min-h-[200px] flex items-end justify-between gap-2 mt-4 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
                <div className="w-full h-px bg-white" />
              </div>
              {weeklyData.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group w-full relative z-10">
                  <div className="absolute -top-8 bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.hrs}h · {d.accuracy}%
                  </div>
                  <div className="w-full max-w-[40px] bg-purple-500/20 rounded-t-lg relative flex items-end justify-center group-hover:bg-purple-500/40 transition-all" style={{ height: '160px' }}>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.hrs / 4) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-blue-400"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-white/40 group-hover:text-white/80">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Lessons */}
          <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-space font-bold text-white">Recommended For You</h3>
              <a href="/courses" className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All →</a>
            </div>
            <div className="flex flex-col gap-4">
              {recommendedLessons.map((lesson) => (
                <div key={lesson.id} className="group relative p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/10 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(${lesson.color.join(',')}, 0.15)`, color: `rgb(${lesson.color.join(',')})` }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">{lesson.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">{lesson.level}</span>
                        <span className="text-[10px] text-white/40">{lesson.duration} · {lesson.signs}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-32 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/50 font-medium">Progress</span>
                      <span className="text-xs font-bold" style={{ color: `rgb(${lesson.color.join(',')})` }}>{lesson.progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${lesson.progress}%`, background: `rgb(${lesson.color.join(',')})` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 span) */}
        <div className="flex flex-col gap-8">
          
          {/* Activity Calendar Heatmap */}
          <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="text-lg font-space font-bold text-white">February 2026</h3>
            <div className="grid grid-cols-7 gap-2">
              {['M','T','W','T','F','S','S'].map(d => (
                <div key={d} className="text-center text-[10px] font-semibold text-white/30">{d}</div>
              ))}
              {calendarDays.map((d, i) => (
                <div 
                  key={i} 
                  className={`w-full aspect-square rounded-md flex items-center justify-center text-xs font-medium cursor-pointer transition-all
                    ${d.today ? 'ring-2 ring-purple-500 text-white' : ''}
                    ${d.active 
                        ? 'bg-purple-500/80 hover:bg-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' 
                        : 'bg-white/5 hover:bg-white/10 text-white/20'
                    }
                  `}
                >
                  {d.day}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-sm bg-purple-500/80 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              <span className="text-xs text-white/50">Practice Day</span>
            </div>
          </div>

          {/* Upcoming Assessments */}
          <div className="glass rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-space font-bold text-white">Upcoming Tests</h3>
            <div className="flex flex-col gap-3">
              {upcomingAssessments.map(test => (
                <div key={test.id} className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">{test.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white/90">{test.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/40 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{test.duration}</span>
                    <span className="text-xs text-white/40 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{test.scoreToPass}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent AI Feedback */}
          <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="text-lg font-space font-bold text-white">Recent AI Feedback</h3>
            <div className="flex flex-col gap-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `rgb(${activity.color.join(',')})`, boxShadow: `0 0 8px rgb(${activity.color.join(',')})` }} />
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-white/80">{activity.gesture}</span>
                    <span className="text-[10px] text-white/40">{activity.status} · {activity.time}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: `rgb(${activity.color.join(',')})` }}>{activity.accuracy}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
