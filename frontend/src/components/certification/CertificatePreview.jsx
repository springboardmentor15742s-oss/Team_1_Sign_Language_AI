import { motion } from 'framer-motion';

export default function CertificatePreview({ certificate }) {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#0A0A0A] border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.2)] flex flex-col items-center justify-center p-8 md:p-14 text-center select-none"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%), linear-gradient(to bottom right, rgba(255,255,255,0.03) 0%, transparent 100%)'
      }}
    >
      {/* Decorative Borders */}
      <div className="absolute inset-4 border border-white/10 rounded-lg pointer-events-none" />
      <div className="absolute inset-5 border border-purple-500/25 rounded-md pointer-events-none" />
      <div className="absolute inset-6 border border-white/5 rounded-sm pointer-events-none" />
      
      {/* Corner Ornaments */}
      <div className="absolute top-7 left-7 w-12 h-12 border-t-2 border-l-2 border-purple-400/60" />
      <div className="absolute top-7 right-7 w-12 h-12 border-t-2 border-r-2 border-purple-400/60" />
      <div className="absolute bottom-7 left-7 w-12 h-12 border-b-2 border-l-2 border-purple-400/60" />
      <div className="absolute bottom-7 right-7 w-12 h-12 border-b-2 border-r-2 border-purple-400/60" />

      {/* --- Neat Watermark Layer --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        {/* Large Diagonal Watermark Text */}
        <div className="absolute transform -rotate-[28deg] text-white/[0.04] text-5xl md:text-7xl font-extrabold uppercase tracking-[0.25em] whitespace-nowrap italic">
          SIGN LANGUAGE AI • VERIFIED
        </div>
        {/* Subtle Watermark Seal Outline */}
        <div className="w-96 h-96 rounded-full border border-purple-500/[0.07] flex items-center justify-center">
          <div className="w-80 h-80 rounded-full border border-purple-400/[0.05] flex items-center justify-center">
            <svg className="w-40 h-40 text-purple-400/[0.04]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full py-2">
        {/* Logo / Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 border border-purple-400/30">
             <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
             </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-space font-bold text-white tracking-widest uppercase italic">
            Sign Language AI Academy
          </h1>
          <p className="text-purple-400 font-semibold tracking-widest uppercase text-xs md:text-sm italic">
            Certificate of Achievement
          </p>
        </div>

        {/* Certificate Body with Italic Typography */}
        <div className="my-auto py-2">
          <p className="text-white/70 mb-2 text-sm md:text-base italic font-serif tracking-wide">
            This is proudly certified and awarded to
          </p>
          <h2
            className="text-3xl md:text-5xl font-serif font-bold italic tracking-wide text-white mb-3"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e9d5ff 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {certificate.learnerName}
          </h2>
          <p className="text-white/70 mb-2 text-xs md:text-sm italic font-serif max-w-xl mx-auto leading-relaxed">
            for successfully demonstrating practical fluency, gesture accuracy, and assessment excellence in
          </p>
          <h3 className="text-xl md:text-2xl font-serif font-bold italic text-purple-200 mb-2">
            {certificate.courseName} <span className="text-purple-400 font-normal">({certificate.level} Tier)</span>
          </h3>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs italic">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            Verified Mastery Score: <span className="font-bold text-white not-italic">{certificate.score || 95}%</span>
          </div>
        </div>

        {/* Footer Details with Italic Styling */}
        <div className="flex justify-between w-full max-w-2xl items-end px-4 pt-2">
          {/* Issue Date */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-28 h-px bg-white/20" />
            <span className="text-[10px] text-white/50 uppercase tracking-wider italic">Date Issued</span>
            <span className="text-xs text-white/90 font-medium italic">{certificate.issueDate}</span>
          </div>

          {/* Verification Badge & QR */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-16 h-16 bg-white p-1 rounded-md shadow-md shadow-purple-500/10">
               <img
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${certificate.verificationId}&bgcolor=ffffff`}
                 alt="Verification QR"
                 className="w-full h-full object-cover rounded-sm mix-blend-multiply"
               />
            </div>
            <span className="text-[9px] text-purple-300/60 font-mono tracking-wider italic">
              ID: {certificate.verificationId}
            </span>
          </div>

          {/* Authorized Signature */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-28 h-px bg-white/20" />
            <span className="text-[10px] text-white/50 uppercase tracking-wider italic">Authorized Signature</span>
            <span className="text-sm font-serif italic text-purple-200 tracking-wider">
              Mira Director
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
