export default function LoadingSkeleton({ rows = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="glass rounded-2xl p-5 flex flex-col gap-4"
          style={{ border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-white/10" />
            <div className="w-20 h-5 rounded-full bg-white/10" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-3.5 rounded-full bg-white/10 w-full" />
            <div className="h-3.5 rounded-full bg-white/10 w-3/4" />
            <div className="h-5 rounded-full bg-white/[0.07] w-24 mt-1" />
          </div>
          <div className="flex items-end gap-1 h-8">
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className="flex-1 rounded-sm bg-white/10" style={{ height: `${20 + j * 5}%` }} />
            ))}
          </div>
          <div className="flex justify-between pt-1 border-t border-white/5">
            <div className="h-3 w-20 rounded-full bg-white/10" />
            <div className="h-3 w-12 rounded-full bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
