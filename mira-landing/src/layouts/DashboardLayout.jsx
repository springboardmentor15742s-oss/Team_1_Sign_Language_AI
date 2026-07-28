import { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex overflow-hidden pt-20">
      {/* ─── Ambient Glow Blobs ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.6) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      {/* ─── Sidebar Navigation ────────────────────────────────────── */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* ─── Main Content Area ─────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 max-w-7xl mx-auto w-full">
        {/* Mobile Toggle Bar */}
        <div className="lg:hidden flex items-center justify-between mb-6 glass p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-space font-bold text-white text-base">Dashboard</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-white/70 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* ─── Render Page Content ──────────────────────────────────── */}
        {children}
      </main>
    </div>
  );
}
