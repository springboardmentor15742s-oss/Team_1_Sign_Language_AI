import React from 'react';

export default function LoadingSkeleton({ count = 6, type = 'card' }) {
  if (type === 'details') {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 animate-pulse">
        {/* Banner Skeleton */}
        <div className="h-80 w-full rounded-3xl glass-strong border border-white/10" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 rounded-3xl glass-strong border border-white/10" />
          <div className="h-96 rounded-3xl glass-strong border border-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="glass-strong rounded-3xl border border-white/10 h-[420px] flex flex-col overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-white/5 w-full" />
          <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-white/10 rounded-full w-3/4" />
              <div className="h-3 bg-white/5 rounded-full w-full" />
              <div className="h-3 bg-white/5 rounded-full w-2/3" />
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="h-3 bg-white/10 rounded-full w-1/4" />
              <div className="h-3 bg-white/10 rounded-full w-1/4" />
              <div className="h-3 bg-white/10 rounded-full w-1/4" />
            </div>
            <div className="h-10 bg-white/10 rounded-2xl w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
