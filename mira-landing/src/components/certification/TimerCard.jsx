import { useEffect, useState } from 'react';

export default function TimerCard({ durationStr, onTimeUp }) {
  // Parse '15 mins' to seconds
  const initialSeconds = parseInt(durationStr) * 60 || 900;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft < 60; // less than 1 minute

  return (
    <div className={`glass rounded-2xl px-4 py-2 flex items-center gap-2 border ${isWarning ? 'border-red-500/50 bg-red-500/10' : 'border-white/10'}`}>
      <svg className={`w-5 h-5 ${isWarning ? 'text-red-400' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className={`font-space font-bold text-lg tracking-wider ${isWarning ? 'text-red-400' : 'text-white'}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
