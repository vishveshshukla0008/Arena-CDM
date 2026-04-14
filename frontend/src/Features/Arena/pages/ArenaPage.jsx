import React, { useState } from "react";
import ArenaHeader from "../components/ArenaHeader";
import BattleGrid from "../components/BattleGrid";
import Sidebar from "../../Sidebar/Sidebar";
import { useBattle } from "../hooks/useBattle";
import WelcomeSection from "../components/WelcomeSection";
import { BATTLE_STATUS } from "../constants/models";


export default function ArenaPage() {
  const battle = useBattle();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0c0c1d] font-mono flex-col lg:flex-row lg:h-screen lg:overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        prompt={battle.prompt}
        setPrompt={battle.setPrompt}
        status={battle.status}
        stats={battle.stats}
        onStartBattle={battle.startBattle}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Menu Button - Floating */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-linear-to-br from-[#cf96ff] to-[#ff6b98] flex items-center justify-center shadow-[0_0_20px_rgba(207,150,255,0.4)] text-white hover:scale-110 active:scale-95 transition-all">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 relative">
        {/* Nebula background glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[400px] bg-[#9D00FF]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[400px] h-[300px] bg-[#00e3fd]/4 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <ArenaHeader />

          {battle.error && (
            <div className="mb-6 p-4 rounded-xl bg-[#ff6e84]/10 border border-[#ff6e84]/30 text-[#ffb2b9] text-sm text-center font-['Manrope']">
              {battle.error}
            </div>
          )}

          {battle.status === BATTLE_STATUS.IDLE && !battle.prompt ? (
            <WelcomeSection />
          ) : (
            <BattleGrid
              status={battle.status}
              solution1={battle.solution1}
              solution2={battle.solution2}
              judge={battle.judge}
              winnerKey={battle.winnerKey}
              onNewBattle={battle.resetBattle}
            />
          )}
        </div>
      </main>
    </div>
  );
}
