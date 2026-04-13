import React from "react";
import ArenaHeader from "../components/ArenaHeader";
import BattleGrid from "../components/BattleGrid";
import Sidebar from "../../Sidebar/Sidebar";
import { useBattle } from "../hooks/useBattle";
import { BATTLE_STATUS } from "../constants/models";

/**
 * ArenaPage - Main page composing sidebar + battle grid.
 * Uses useBattle hook for all state management.
 */
export default function ArenaPage() {
  const battle = useBattle();

  return (
    <div className="flex h-[100dvh] bg-[#0c0c1d] overflow-hidden font-mono flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        prompt={battle.prompt}
        setPrompt={battle.setPrompt}
        status={battle.status}
        stats={battle.stats}
        onStartBattle={battle.startBattle}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
        {/* Nebula background glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#9D00FF]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-[#00e3fd]/4 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <ArenaHeader />

          {battle.error && (
            <div className="mb-6 p-4 rounded-xl bg-[#ff6e84]/10 border border-[#ff6e84]/30 text-[#ffb2b9] text-sm text-center font-['Manrope']">
              {battle.error}
            </div>
          )}

          {battle.status === BATTLE_STATUS.IDLE && !battle.prompt ? (
            <div className="flex items-center justify-center h-64 border border-[#474659]/20 rounded-2xl bg-[#111124]/40 mt-8">
              <p className="text-[#aba9bf] text-sm uppercase tracking-widest font-['Space_Grotesk'] text-center">
                Enter a prompt and <br/>
                <span className="text-[#cf96ff] font-bold mt-2 inline-block">Start the Battle</span>
              </p>
            </div>
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
