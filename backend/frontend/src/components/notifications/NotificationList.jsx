import NotificationCard from './NotificationCard';

const GROUP_LABELS = {
  today: 'Today',
  yesterday: 'Yesterday',
  earlier: 'Earlier',
};

export default function NotificationList({ notifications, onMarkRead, onDelete }) {
  const groups = ['today', 'yesterday', 'earlier'];

  return (
    <div className="flex flex-col gap-6">
      {groups.map(group => {
        const items = notifications.filter(n => n.group === group);
        if (!items.length) return null;

        return (
          <div key={group}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{GROUP_LABELS[group]}</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] text-white/30">{items.length} notification{items.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((n, i) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  index={i}
                  onMarkRead={onMarkRead}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-white/40 font-medium">No notifications</p>
          <p className="text-white/25 text-sm mt-1">You&apos;re all caught up!</p>
        </div>
      )}
    </div>
  );
}
