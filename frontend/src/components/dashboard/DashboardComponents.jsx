import { motion } from 'framer-motion';

export function DashboardHeader({ title, subtitle, badges = [], rightElement }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-3xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          {badges.length > 0 && (
            <div className="flex items-center gap-2">
              {badges.map((badge, i) => (
                <span key={i} className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${badge.className}`}>
                  {badge.icon && <span className="mr-1.5">{badge.icon}</span>}
                  {badge.label}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs md:text-sm text-white/50">
              {subtitle}
            </p>
          )}
        </div>
        {rightElement && (
          <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full lg:w-auto">
            {rightElement}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function StatCard({ stat, index }) {
  const [r, g, b] = stat.color;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden group"
      style={{ border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150"
        style={{ background: `radial-gradient(circle, rgb(${r},${g},${b}) 0%, transparent 70%)`, filter: 'blur(15px)' }}
      />
      <div className="flex items-start justify-between relative z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
          </svg>
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-space font-bold text-white">{stat.value}</h3>
        <p className="text-xs text-white/40 mt-1 font-medium">{stat.label}</p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `rgba(${r},${g},${b},0.15)`, color: `rgb(${r},${g},${b})` }}
          >
            {stat.change}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ActivityCard({ items, title = "Recent Activity" }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 className="text-xl font-space font-bold text-white">{title}</h3>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `rgb(${item.color.join(',')})`, boxShadow: `0 0 10px rgb(${item.color.join(',')})` }} />
            <div className="flex-1 flex flex-col">
              <span className="text-sm font-medium text-white/90">{item.text}</span>
              <span className="text-[10px] text-white/40 mt-0.5">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartCard({ data, title = "Weekly Activity", dataKey = "value" }) {
  const maxVal = Math.max(...data.map(d => d[dataKey]), 1);
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-space font-bold text-white">{title}</h3>
      </div>
      <div className="flex-1 min-h-[200px] flex items-end justify-between gap-2 mt-4 relative">
        {/* Simple grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
        </div>
        
        {data.map((d, i) => {
          const heightPct = (d[dataKey] / maxVal) * 100;
          return (
            <div key={i} className="flex flex-col items-center gap-2 group w-full relative z-10">
              <div className="w-full max-w-[40px] bg-purple-500/20 rounded-t-lg relative flex items-end justify-center group-hover:bg-purple-500/40 transition-all" style={{ height: '160px' }}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-blue-400"
                />
              </div>
              <span className="text-[10px] font-medium text-white/40 group-hover:text-white/80">{d.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RecentTable({ columns, data, title = "Recent Users" }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 className="text-xl font-space font-bold text-white">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="py-3 px-4 text-xs font-semibold text-white/40 uppercase tracking-widest border-b border-white/10">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                {columns.map((col, j) => (
                  <td key={j} className="py-4 px-4 text-sm font-medium text-white/80">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
