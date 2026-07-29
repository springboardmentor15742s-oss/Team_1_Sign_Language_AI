import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      {/* Header skeleton */}
      <div className="h-36 rounded-3xl bg-white/5 border border-white/10 w-full" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-white/5 border border-white/10 w-full" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-72 rounded-3xl bg-white/5 border border-white/10" />
        <div className="h-72 rounded-3xl bg-white/5 border border-white/10" />
      </div>
    </div>
  );
}
