import React from "react";
import { BATTLE_STATUS } from "../../Arena/constants/models";

/**
 * StartBattleButton - CTA button to initiate a battle.
 * Shows loading state during battle.
 * @param {function} onClick
 * @param {string} status - BATTLE_STATUS
 * @param {boolean} disabled
 */
export default function StartBattleButton({ onClick, status, disabled }) {
  const isBattling = status === BATTLE_STATUS.LOADING;

  return (
    <button
      id="start-battle-btn"
      onClick={onClick}
      disabled={disabled || isBattling}
      className={[
        "w-full py-5 rounded-md font-black text-sm font-mono uppercase tracking-wider flex items-center justify-center",
        "transition-all duration-300 ease-[cubic-bezier(0.15,1.15,0.6,1.0)]",
        "relative overflow-hidden group",
        disabled || isBattling
          ? "opacity-50 cursor-not-allowed bg-[#23233b] text-[#474659]"
          : "bg-gradient-to-r from-[#cf96ff] to-[#ff6b98] text-black cursor-pointer",
        !disabled && !isBattling
          ? "shadow-[0_0_15px_rgba(207,150,255,0.4)] hover:shadow-[0_0_30px_rgba(207,150,255,0.65)] hover:scale-[1.02] active:scale-[0.98]"
          : "",
      ].join(" ")}>
      {/* Shimmer effect */}
      {!disabled && !isBattling && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {isBattling ? (
          <>
            <svg
              className="animate-spin w-4 h-4 text-[#cf96ff]"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-[#cf96ff]">Battling...</span>
          </>
        ) : (
          "⚔️ Start Battle"
        )}
      </span>
    </button>
  );
}
