import React from "react";

export default function WelcomeSection() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 mt-8 border border-[#474659]/20 rounded-3xl bg-[#111124]/40 relative overflow-hidden backdrop-blur-sm">
      {/* Decorative background effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#cf96ff]/30 to-transparent" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff6b98]/10 rounded-full blur-[60px]" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00e3fd]/10 rounded-full blur-[60px]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4">
        {/* Icon/Badge */}
        <div className="mb-6 w-16 h-16 rounded-2xl bg-linear-to-br from-[#cf96ff] to-[#ff6b98] p-[1px] flex items-center justify-center animate-pulse">
            <div className="w-full h-full rounded-[15px] bg-[#111124] flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-black font-['Space_Grotesk'] tracking-tight text-white mb-4">
            THE ARENA IS <span className="text-[#cf96ff]">WAITING</span>
        </h2>
        
        <p className="text-[#aba9bf] text-sm md:text-lg font-['Manrope'] leading-relaxed mb-8">
            Experience the ultimate showdown. Submit a coding prompt and witness two elite AI models battle to generate the most efficient, elegant, and powerful solution.
        </p>

        {/* Instructions focused on Sidebar */}
        <div className="flex flex-col md:flex-row items-center gap-4 py-4 px-6 rounded-2xl bg-[#0c0c1d]/60 border border-[#474659]/30 border-dashed">
            <div className="hidden lg:flex items-center gap-3">
                <svg className="w-5 h-5 text-[#cf96ff] animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-[#e6e3fb] text-sm font-bold uppercase tracking-widest">
                    Start in Sidebar
                </span>
            </div>
            
            <div className="lg:hidden flex items-center gap-3">
                <span className="text-[#e6e3fb] text-sm font-bold uppercase tracking-widest">
                   Open Menu Below
                </span>
                <svg className="w-5 h-5 text-[#ff6b98] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            <div className="h-4 w-1 bg-[#474659]/40 hidden md:block" />

            <p className="text-[#757388] text-xs  text-center">
                Enter your test case, select models, and hit <span className="text-white">Start Battle</span>.
            </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-10px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s infinite;
        }
      `}} />
    </div>
  );
}
