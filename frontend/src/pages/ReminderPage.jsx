import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { reminders, weeklyCalendar } from '../data/notificationData';
import ReminderCard from '../components/notifications/ReminderCard';
import ReminderCalendar from '../components/notifications/ReminderCalendar';

export default function ReminderPage() {
  const todayReminders   = reminders.filter(r => r.day === 'today');
  const tomorrowReminders = reminders.filter(r => r.day === 'tomorrow');
  const weekReminders    = reminders.filter(r => r.day === 'this-week');

  const completedToday = todayReminders.filter(r => r.done).length;
  const progressPct    = todayReminders.length ? Math.round((completedToday / todayReminders.length) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-[1600px] mx-auto pb-12">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
                <span>/</span>
                <span className="text-purple-400">Reminders</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">
                Reminder Center
              </h1>
              <p className="text-white/50 text-sm">Manage your practice schedule, assessments, and learning goals.</p>
            </div>

            {/* Today's Progress Ring */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
                  <motion.circle
                    cx="40" cy="40" r="32"
                    fill="none" stroke="#8b5cf6" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 32}
                    initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - progressPct / 100) }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.6))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-space font-bold text-white">{progressPct}%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white/90 font-semibold text-sm">Today&apos;s Progress</span>
                <span className="text-white/50 text-xs mt-1">{completedToday} of {todayReminders.length} done</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Today + Tomorrow + This Week */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Today's Reminders */}
            <div className="glass rounded-3xl p-6 flex flex-col gap-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-space font-bold text-white">Today&apos;s Practice</h3>
                  <p className="text-xs text-white/50 mt-0.5">Tuesday, July 29</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20">
                  {todayReminders.length} scheduled
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {todayReminders.map((r, i) => (
                  <ReminderCard key={r.id} reminder={r} index={i} />
                ))}
              </div>
            </div>

            {/* Tomorrow */}
            <div className="glass rounded-3xl p-6 flex flex-col gap-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-space font-bold text-white">Upcoming Practice</h3>
                  <p className="text-xs text-white/50 mt-0.5">Wednesday, July 30</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20">
                  {tomorrowReminders.length} scheduled
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {tomorrowReminders.map((r, i) => (
                  <ReminderCard key={r.id} reminder={r} index={i} />
                ))}
              </div>
            </div>

            {/* This Week */}
            <div className="glass rounded-3xl p-6 flex flex-col gap-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-space font-bold text-white">Learning Goals This Week</h3>
              </div>
              <div className="flex flex-col gap-2">
                {weekReminders.map((r, i) => (
                  <ReminderCard key={r.id} reminder={r} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Calendar + Quick Nav */}
          <div className="flex flex-col gap-8">
            <ReminderCalendar weeklyCalendar={weeklyCalendar} />

            {/* Learning Goal Stats */}
            <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-lg font-space font-bold text-white">Weekly Goal</h3>
              {[
                { label: 'Practice Sessions', current: 4, target: 5, color: [139, 92, 246] },
                { label: 'Assessment Hours', current: 1, target: 2, color: [59, 130, 246] },
                { label: 'Course Progress', current: 68, target: 100, color: [16, 185, 129], isPerc: true },
              ].map((goal, i) => (
                <div key={goal.label} className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70 font-medium">{goal.label}</span>
                    <span className="font-bold text-white">
                      {goal.isPerc ? `${goal.current}%` : `${goal.current} / ${goal.target}`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.isPerc ? goal.current : (goal.current / goal.target) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.15 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: `rgb(${goal.color.join(',')})`, boxShadow: `0 0 6px rgba(${goal.color.join(',')},0.5)` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Go to Notifications */}
            <a
              href="/notifications"
              className="glass rounded-2xl p-4 flex items-center justify-between border border-white/[0.06] hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-500/15 flex items-center justify-center text-pink-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">All Notifications</span>
              </div>
              <svg className="w-4 h-4 text-white/30 group-hover:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
