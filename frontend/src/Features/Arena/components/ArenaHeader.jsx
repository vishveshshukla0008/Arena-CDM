import React from "react";

/**
 * ArenaHeader - Top header for the main battle area with glowing title.
 */
export default function ArenaHeader() {
  return (
    <div className="text-center flex flex-col gap-2 md:gap-4 mb-6 md:mb-8">
      <h1
        className="text-2xl sm:text-3xl md:text-5xl font-black font-[sans-serif] uppercase tracking-widest mb-1 md:mb-2"
        style={{
          background: "linear-gradient(135deg, #cf96ff 0%, #ff6b98 50%, #00e3fd 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
          filter: "drop-shadow(0 0 15px rgba(207,150,255,0.3))",
        }}
      >
        AI CODE DEATH MATCH
      </h1>
      <p className="text-[#aba9bf] text-sm sm:text-base md:text-xl font-['Manrope'] tracking-wide px-4">
        Watch AI models compete in real-time · Choose your champions
      </p>
      <div className="flex items-center justify-center gap-1 md:gap-2 mt-2 md:mt-3">
        <span className="w-6 md:w-8 h-px bg-linear-to-r from-transparent to-[#cf96ff]/50" />
        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#cf96ff] shadow-[0_0_6px_rgba(207,150,255,0.8)]" />
        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#ff6b98] shadow-[0_0_6px_rgba(255,107,152,0.8)]" />
        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#00e3fd] shadow-[0_0_6px_rgba(0,227,253,0.8)]" />
        <span className="w-6 md:w-8 h-px bg-linear-to-l from-transparent to-[#00e3fd]/50" />
      </div>
    </div>
  );
}
