import { motion } from 'framer-motion';

/**
 * SVG/div-based chart for report analytics.
 * Types: 'bar' | 'line' | 'area' | 'horizontal-bar'
 */
export default function ReportChart({ data = [], color = [139, 92, 246], type = 'bar', height = 120, label = '' }) {
  const [r, g, b] = color;
  const values = data.map(d => (typeof d === 'object' ? d.value : d));
  const labels = data.map(d => (typeof d === 'object' ? d.label : ''));
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  if (type === 'horizontal-bar') {
    return (
      <div className="flex flex-col gap-3 w-full" style={{ minHeight: height }}>
        {label && <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{label}</span>}
        {data.map((item, i) => {
          const pct = ((item.curr ?? item.value) / max) * 100;
          const prevPct = item.prev ? (item.prev / max) * 100 : 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col gap-1"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60 font-medium">{item.skill || item.label}</span>
                <span className="text-xs font-bold" style={{ color: `rgb(${r},${g},${b})` }}>
                  {item.curr ?? item.value}%
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 relative overflow-hidden">
                {item.prev && (
                  <div
                    className="absolute top-0 left-0 h-full rounded-full opacity-30"
                    style={{ width: `${prevPct}%`, background: `rgb(${r},${g},${b})` }}
                  />
                )}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, rgba(${r},${g},${b},0.7), rgb(${r},${g},${b}))` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // SVG-based bar/line/area chart
  const svgWidth = 400;
  const svgHeight = height;
  const padX = 8;
  const padY = 8;
  const innerW = svgWidth - padX * 2;
  const innerH = svgHeight - padY * 2;

  const getX = i => padX + (i / (values.length - 1 || 1)) * innerW;
  const getY = v => padY + ((max - v) / range) * innerH;

  const pathD = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(v)}`)
    .join(' ');

  const areaD =
    `M ${getX(0)} ${svgHeight} ` +
    values.map((v, i) => `L ${getX(i)} ${getY(v)}`).join(' ') +
    ` L ${getX(values.length - 1)} ${svgHeight} Z`;

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{label}</span>}
      <div className="relative w-full" style={{ height }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map(p => (
            <line
              key={p}
              x1={0} y1={padY + (1 - p) * innerH}
              x2={svgWidth} y2={padY + (1 - p) * innerH}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {type === 'bar' &&
            values.map((v, i) => {
              const barW = Math.max((innerW / values.length) * 0.6, 2);
              const x = getX(i) - barW / 2;
              const yTop = getY(v);
              const barH = svgHeight - yTop - padY;
              return (
                <motion.rect
                  key={i}
                  x={x} y={yTop} width={barW} height={barH}
                  rx={2}
                  fill={`url(#grad-${r}-${g}-${b})`}
                  opacity={0.85}
                  initial={{ height: 0, y: svgHeight - padY }}
                  animate={{ height: barH, y: yTop }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                />
              );
            })}

          {(type === 'area' || type === 'line') && (
            <>
              <defs>
                <linearGradient id={`grad-${r}-${g}-${b}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`rgb(${r},${g},${b})`} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={`rgb(${r},${g},${b})`} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {type === 'area' && (
                <motion.path
                  d={areaD}
                  fill={`url(#grad-${r}-${g}-${b})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
              )}
              <motion.path
                d={pathD}
                fill="none"
                stroke={`rgb(${r},${g},${b})`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              {values.map((v, i) => (
                <circle
                  key={i}
                  cx={getX(i)} cy={getY(v)} r={3}
                  fill={`rgb(${r},${g},${b})`}
                  opacity={0.9}
                />
              ))}
            </>
          )}

          {type === 'bar' && (
            <defs>
              <linearGradient id={`grad-${r}-${g}-${b}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`rgb(${r},${g},${b})`} stopOpacity="0.9" />
                <stop offset="100%" stopColor={`rgb(${r},${g},${b})`} stopOpacity="0.4" />
              </linearGradient>
            </defs>
          )}
        </svg>

        {/* X-axis labels */}
        {labels.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1" style={{ transform: 'translateY(100%)' }}>
            {labels.map((l, i) => (
              <span key={i} className="text-[9px] text-white/30 text-center" style={{ width: `${100 / labels.length}%` }}>
                {l}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
