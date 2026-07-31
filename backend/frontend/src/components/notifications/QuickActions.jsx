export default function QuickActions({ onMarkAllRead, onClearAll }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onMarkAllRead}
        className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-purple-500/30 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Mark All Read
      </button>

      <button
        onClick={onClearAll}
        className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-rose-500/20 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Clear All
      </button>
    </div>
  );
}
