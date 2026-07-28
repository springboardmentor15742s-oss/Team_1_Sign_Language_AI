import { motion } from 'framer-motion';

export default function AssessmentHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="glass rounded-3xl p-8 text-center border border-white/10 flex flex-col items-center justify-center min-h-[200px]">
        <svg className="w-12 h-12 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-white/50">No assessment history found.</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-space font-bold text-white">Assessment History</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
              <th className="py-3 px-4 font-semibold">Assessment</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Duration</th>
              <th className="py-3 px-4 font-semibold">Score</th>
              <th className="py-3 px-4 font-semibold">Result</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, i) => (
              <motion.tr 
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-semibold text-white/90">{record.assessmentName}</span>
                </td>
                <td className="py-4 px-4 text-sm text-white/60">{record.date}</td>
                <td className="py-4 px-4 text-sm text-white/60">{record.duration}</td>
                <td className="py-4 px-4 font-bold text-white/90">{record.score}%</td>
                <td className="py-4 px-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    record.result === 'Pass' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {record.result}
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
