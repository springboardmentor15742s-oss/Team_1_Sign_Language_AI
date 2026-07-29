import { motion } from 'framer-motion';
import { PRIORITY_CONFIG, CATEGORY_CONFIG } from '../../data/notificationData';

export default function NotificationCard({ notification, onMarkRead, onDelete, index = 0 }) {
  const priority = PRIORITY_CONFIG[notification.priority] || PRIORITY_CONFIG.low;
  const catCfg = CATEGORY_CONFIG[notification.category] || CATEGORY_CONFIG.announcements;
  const [r, g, b] = catCfg.color;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={`relative group flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer
        ${notification.isRead
          ? 'bg-white/[0.015] border-white/[0.05] hover:bg-white/[0.03]'
          : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.06]'
        }`}
    >
      {/* Unread dot */}
      {!notification.isRead && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
      )}

      {/* Category Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={catCfg.icon} />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${priority.bg} ${priority.color} ${priority.border}`}>
            {priority.label}
          </span>
          <span className="text-[10px] text-white/40 capitalize">{notification.category}</span>
          <span className="text-[10px] text-white/30 ml-auto">{notification.time}</span>
        </div>

        <h4 className={`text-sm font-semibold leading-snug mb-1 ${notification.isRead ? 'text-white/70' : 'text-white'}`}>
          {notification.title}
        </h4>
        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
          {notification.message}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3">
          {notification.action && (
            <a
              href={notification.action.href}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
            >
              {notification.action.label} →
            </a>
          )}
          {!notification.isRead && (
            <button
              onClick={() => onMarkRead && onMarkRead(notification.id)}
              className="text-xs text-white/40 hover:text-white/80 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              Mark read
            </button>
          )}
          <button
            onClick={() => onDelete && onDelete(notification.id)}
            className="ml-auto text-xs text-white/20 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-500/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
