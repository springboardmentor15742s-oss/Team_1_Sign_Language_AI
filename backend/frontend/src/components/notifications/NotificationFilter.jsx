import { NOTIFICATION_CATEGORIES } from '../../data/notificationData';

export default function NotificationFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {NOTIFICATION_CATEGORIES.map(cat => {
        const isActive = activeFilter === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onFilterChange(cat.id)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all
              ${isActive
                ? 'text-white bg-purple-600/40 border-purple-500/60 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                : 'text-white/50 bg-white/[0.03] border-white/10 hover:text-white/80 hover:bg-white/[0.06]'
              }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
            </svg>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
