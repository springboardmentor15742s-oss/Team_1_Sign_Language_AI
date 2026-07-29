import { motion } from 'framer-motion';

export default function ReminderCalendar({ weeklyCalendar }) {
  return (
    <div className="glass rounded-3xl p-6 flex flex-col gap-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div>
        <h3 className="text-lg font-space font-bold text-white">Weekly Schedule</h3>
        <p className="text-xs text-white/50 mt-1">July 2026</p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weeklyCalendar.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">{day.day}</span>
            <div
              className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center relative cursor-pointer transition-all
                ${day.isToday
                  ? 'bg-purple-600/60 shadow-[0_0_16px_rgba(139,92,246,0.5)] ring-2 ring-purple-400/60'
                  : day.hasReminder
                    ? 'bg-white/10 hover:bg-white/15'
                    : 'bg-white/[0.03] hover:bg-white/[0.06]'
                }`}
            >
              <span className={`text-sm font-bold ${day.isToday ? 'text-white' : 'text-white/60'}`}>{day.date}</span>
              {day.hasReminder && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${day.isToday ? 'bg-white' : 'bg-purple-400'}`} />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-2 border-t border-white/5 text-[10px] text-white/40">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-500" />Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/30" />Has Reminder
        </span>
      </div>
    </div>
  );
}
