import { motion } from 'framer-motion';

export default function CertificatePreview({ certificate }) {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#0A0A0A] border border-white/20 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] flex flex-col items-center justify-center p-8 md:p-16 text-center"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 60%), linear-gradient(to bottom right, rgba(255,255,255,0.02) 0%, transparent 100%)'
      }}
    >
      {/* Decorative Borders */}
      <div className="absolute inset-4 border border-white/10 rounded-md pointer-events-none" />
      <div className="absolute inset-5 border border-purple-500/20 rounded-md pointer-events-none" />
      
      {/* Corner Ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-purple-500/50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-purple-500/50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-purple-500/50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-purple-500/50" />

      {/* Logo / Header */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
           </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-space font-bold text-white tracking-widest uppercase">
          Sign Language AI
        </h1>
        <p className="text-purple-400 font-semibold tracking-widest uppercase text-sm">Certificate of Achievement</p>
      </div>

      {/* Body */}
      <p className="text-white/60 mb-4 text-sm md:text-base">This is to certify that</p>
      <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6" style={{ background: 'linear-gradient(135deg, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {certificate.learnerName}
      </h2>
      <p className="text-white/60 mb-4 text-sm md:text-base">has successfully completed the assessment for</p>
      <h3 className="text-2xl md:text-3xl font-space font-bold text-purple-300 mb-12">
        {certificate.courseName} ({certificate.level})
      </h3>

      {/* Footer Details */}
      <div className="flex justify-between w-full max-w-2xl items-end mt-auto px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-px bg-white/20" />
          <span className="text-xs text-white/50 uppercase tracking-wider">Date Issued</span>
          <span className="text-sm text-white font-semibold">{certificate.issueDate}</span>
        </div>

        {/* Mock QR */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 bg-white p-1 rounded">
             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${certificate.verificationId}&bgcolor=ffffff`} alt="QR Code" className="w-full h-full object-cover rounded-sm mix-blend-multiply" />
          </div>
          <span className="text-[10px] text-white/30 tracking-widest">{certificate.verificationId}</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-32 h-px bg-white/20" />
          <span className="text-xs text-white/50 uppercase tracking-wider">Authorized Signature</span>
          <span className="text-sm font-signature text-white opacity-80" style={{ fontFamily: 'cursive' }}>Mira Director</span>
        </div>
      </div>
    </motion.div>
  );
}
