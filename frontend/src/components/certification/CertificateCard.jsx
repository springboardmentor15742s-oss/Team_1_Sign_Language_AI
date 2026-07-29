import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CertificateCard({ certificate, index }) {
  const navigate = useNavigate();
  const isUnlocked = certificate.status === 'Unlocked';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`glass rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden transition-all ${
        isUnlocked ? 'cursor-pointer hover:border-purple-500/50' : 'opacity-80 grayscale-[30%]'
      }`}
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      onClick={() => isUnlocked && navigate(`/certificates/${certificate.id}`)}
    >
      <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 bg-purple-500 blur-2xl pointer-events-none" />

      <div className="flex justify-between items-start z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isUnlocked ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white/10 text-white/40 border border-white/10'
        }`}>
          {isUnlocked ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
          isUnlocked ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-white/5 text-white/40 border border-white/10'
        }`}>
          {certificate.status}
        </span>
      </div>

      <div className="z-10 mt-2">
        <h3 className="text-lg font-space font-bold text-white leading-tight mb-1">{certificate.courseName}</h3>
        <p className="text-sm text-white/50">{certificate.level} Level</p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 z-10 flex flex-col gap-2">
        {isUnlocked ? (
          <>
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/40">Issued</span>
              <span className="font-semibold text-white/80">{certificate.issueDate}</span>
            </div>
            <button className="w-full mt-2 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-semibold hover:bg-purple-500/30 transition-colors border border-purple-500/30">
              View Certificate
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-white/40">Progress</span>
              <span className="font-semibold text-white/80">{certificate.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/30 rounded-full" 
                style={{ width: `${certificate.progress}%` }} 
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
