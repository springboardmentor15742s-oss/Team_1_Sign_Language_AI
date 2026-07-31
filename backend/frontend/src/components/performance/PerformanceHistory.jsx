import { motion } from 'framer-motion';

export default function PerformanceHistory({ history }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-space font-bold text-white">Performance History</h3>
          <p className="text-sm text-white/50 mt-1">Past assessments and practice scores</p>
        </div>
        <button className="text-sm text-white/60 hover:text-white transition-colors">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
              <th className="pb-3 font-semibold px-4">Date</th>
              <th className="pb-3 font-semibold px-4">Assessment</th>
              <th className="pb-3 font-semibold px-4">Score</th>
              <th className="pb-3 font-semibold px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, i) => (
              <motion.tr 
                key={record.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors group"
              >
                <td className="py-4 px-4 text-sm text-white/70 whitespace-nowrap">{record.date}</td>
                <td className="py-4 px-4 text-sm font-medium text-white/90 group-hover:text-white transition-colors">{record.assessment}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-space font-bold text-white">{record.score}%</span>
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${record.score}%` }} />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-md uppercase tracking-widest ${
                    record.status.includes('Honors') 
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
