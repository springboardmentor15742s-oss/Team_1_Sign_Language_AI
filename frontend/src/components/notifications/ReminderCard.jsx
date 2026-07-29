import { motion } from 'framer-motion';

const TYPE_ICONS = {
  practice:    'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
  assessments: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
};

export default function ReminderCard({ reminder, index = 0 }) {
  const [r, g, b] = reminder.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all
        ${reminder.done
          ? 'opacity-50 bg-white/[0.01] border-white/5'
          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
        }`}
    >
      {/* Done Checkbox */}
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors
          ${reminder.done ? 'border-transparent' : ''}`}
        style={{
          borderColor: reminder.done ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},0.4)`,
          background: reminder.done ? `rgb(${r},${g},${b})` : 'transparent',
        }}
      >
        {reminder.done && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `rgba(${r},${g},${b},0.12)`, color: `rgb(${r},${g},${b})` }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={TYPE_ICONS[reminder.type] || TYPE_ICONS.practice} />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${reminder.done ? 'line-through text-white/40' : 'text-white/90'}`}>
          {reminder.title}
        </p>
        <p className="text-xs text-white/40 mt-0.5">{reminder.duration}</p>
      </div>

      {/* Time Badge */}
      <span
        className="text-xs font-semibold px-2 py-1 rounded-lg flex-shrink-0"
        style={{ background: `rgba(${r},${g},${b},0.12)`, color: `rgb(${r},${g},${b})` }}
      >
        {reminder.time}
      </span>
    </motion.div>
  );
}
