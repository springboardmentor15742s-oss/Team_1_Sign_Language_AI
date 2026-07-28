export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-6 w-full">
      <div className="h-10 bg-white/5 rounded-xl w-1/3 border border-white/10" />
      <div className="h-6 bg-white/5 rounded-lg w-1/4 border border-white/10 mb-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass rounded-3xl p-6 flex flex-col gap-4 border border-white/10 h-64">
            <div className="flex justify-between">
              <div className="h-6 w-20 bg-white/5 rounded-full" />
              <div className="h-10 w-10 bg-white/5 rounded-xl" />
            </div>
            <div className="h-8 w-3/4 bg-white/5 rounded-lg mt-2" />
            <div className="h-4 w-1/2 bg-white/5 rounded-lg" />
            <div className="mt-auto h-10 w-full bg-white/5 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
