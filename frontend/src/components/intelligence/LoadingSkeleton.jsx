export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-40 rounded-3xl bg-white/5 w-full" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-white/5 w-full" />
        ))}
      </div>
      <div className="h-64 rounded-3xl bg-white/5 w-full" />
    </div>
  );
}
