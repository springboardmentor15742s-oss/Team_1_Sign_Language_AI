export default function ReportSearch({ value, onChange }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        id="report-search"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search reports by title or type…"
        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all focus:ring-1 focus:ring-purple-500/50"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-3 flex items-center text-white/30 hover:text-white/70 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
