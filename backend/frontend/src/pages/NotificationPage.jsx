import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';

import {
  notifications as initialNotifications,
  notificationStats,
  announcements,
} from '../data/notificationData';

import NotificationStats from '../components/notifications/NotificationStats';
import NotificationFilter from '../components/notifications/NotificationFilter';
import NotificationList from '../components/notifications/NotificationList';
import QuickActions from '../components/notifications/QuickActions';
import AnnouncementCard from '../components/notifications/AnnouncementCard';

export default function NotificationPage() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  // Computed stats from live state
  const liveStats = {
    total: items.length,
    unread: items.filter(n => !n.isRead).length,
    todayCount: items.filter(n => n.group === 'today').length,
    critical: items.filter(n => n.priority === 'critical').length,
  };

  // Filter logic
  const filtered = items.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return n.category === filter;
  });

  const handleMarkRead = (id) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setItems([]);
  };

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
            style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, transparent 70%)', filter: 'blur(50px)' }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
                <span>/</span>
                <span className="text-pink-400">Notifications</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight flex items-center gap-3">
                Notification Center
                {liveStats.unread > 0 && (
                  <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {liveStats.unread} unread
                  </span>
                )}
              </h1>
              <p className="text-white/50 text-sm">Stay informed about your learning journey, assessments, and achievements.</p>
            </div>
            <QuickActions onMarkAllRead={handleMarkAllRead} onClearAll={handleClearAll} />
          </div>
        </motion.div>

        {/* Stats */}
        <NotificationStats stats={liveStats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Notification Feed */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Filter Bar */}
            <div className="glass rounded-2xl p-4 border border-white/[0.06]">
              <NotificationFilter activeFilter={filter} onFilterChange={setFilter} />
            </div>

            {/* Notification List */}
            <div className="glass rounded-3xl p-6 flex flex-col gap-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-space font-bold text-white">Notifications</h3>
                <span className="text-xs text-white/40">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              </div>
              <NotificationList
                notifications={filtered}
                onMarkRead={handleMarkRead}
                onDelete={handleDelete}
              />
            </div>
          </div>

          {/* Right: Announcements */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <h3 className="text-lg font-space font-bold text-white">Platform Announcements</h3>
                <p className="text-xs text-white/50 mt-1">Updates and system notices</p>
              </div>
              <div className="flex flex-col gap-3">
                {announcements.map((a, i) => (
                  <AnnouncementCard key={a.id} announcement={a} index={i} />
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass rounded-3xl p-6 flex flex-col gap-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-lg font-space font-bold text-white">Quick Links</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'View Reminders', href: '/reminders', color: [139, 92, 246] },
                  { label: 'View Assessments', href: '/assessments', color: [59, 130, 246] },
                  { label: 'View Certificates', href: '/certificates', color: [16, 185, 129] },
                  { label: 'Performance Report', href: '/performance', color: [245, 158, 11] },
                ].map(link => {
                  const [r, g, b] = link.color;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between px-4 py-3 rounded-xl transition-colors hover:bg-white/[0.04] border border-white/5 group"
                    >
                      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{link.label}</span>
                      <svg className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
