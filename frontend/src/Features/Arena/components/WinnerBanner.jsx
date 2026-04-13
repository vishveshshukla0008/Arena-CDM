import React from "react";
import { MODELS } from "../constants/models";

/**
 * WinnerBanner - Animated winner announcement shown after a battle.
 * @param {string|null} winnerKey - "solution_1" or "solution_2" or null
 * @param {object|null} judge - The judge response object
 * @param {function} onNewBattle
 */
export default function WinnerBanner({ winnerKey, judge, onNewBattle }) {
  if (!winnerKey || !judge) return null;

  const winningModel = MODELS[winnerKey];

  return (
    <div className="mt-6 animate-[fadeSlideUp_0.5s_cubic-bezier(0.15,1.15,0.6,1.0)_both] ">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0c0c1d] via-[#1d1d33] to-[#0c0c1d] border border-[#00ff88]/30 shadow-[0_0_40px_rgba(0,255,136,0.15)] flex flex-col md:flex-row pb-4 md:pb-0">
        {/* Confetti dots decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full "
              style={{
                background: ["#cf96ff", "#00e3fd", "#ff6b98", "#00ff88"][i % 4],
                left: `${8 + i * 8}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `confettiFall ${0.8 + (i % 4) * 0.3}s ease-out ${i * 0.08}s both`,
              }}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 relative z-10 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div>
              <p className="text-[#757388] text-xs uppercase tracking-widest font-sans">
                Battle Result
              </p>
              <p className="text-[#e6e3fb] font-bold text-lg font-sans">
                <span
                  className="text-[#00ff88]"
                  style={{ textShadow: "0 0 10px rgba(0,255,136,0.5)" }}>
                  {winningModel?.label}
                </span>{" "}
                wins!
              </p>
            </div>
          </div>

          <div className="flex-1 px-4 border-l border-[#474659]/30 h-full flex flex-col justify-center">
            <p className="text-xs text-[#cf96ff] uppercase tracking-widest font-sans">
              Judge's Verdict:
            </p>
            <p className="text-xs text-[#aba9bf] font-['Manrope']">
              {judge.winner}
            </p>
          </div>

          <button
            id="new-battle-btn"
            onClick={onNewBattle}
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold font-sans uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95
              bg-gradient-to-r from-[#cf96ff] to-[#ff6b98] text-black shadow-[0_0_15px_rgba(207,150,255,0.4)]
              hover:shadow-[0_0_25px_rgba(207,150,255,0.6)] ml-6 md:ml-0 self-start md:self-auto">
            ⚔️ New Battle
          </button>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-md text-[#cf96ff] uppercase tracking-widest font-sans">
          This Judgement is done by GEMINI-FLASH-LATEST (JUDGE)
        </p>
      </div>
    </div>
  );
}
