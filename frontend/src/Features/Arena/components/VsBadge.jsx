import React from "react";
import { BATTLE_STATUS } from "../constants/models";

/**
 * VsBadge - Glowing VS badge between two battle cards.
 */
export default function VsBadge({ status }) {
  const isBattling = status === BATTLE_STATUS.BATTLING;

  return (
    <div className="flex items-center justify-center px-2 shrink-0">
      <div
        className={[
          "relative flex items-center justify-center w-16 h-16 rounded-full",
          "font-black text-sm font-sans  select-none transition-all duration-500",
          isBattling
            ? "bg-gradient-to-br from-[#cf96ff] to-[#ff6b98] text-black shadow-[0_0_20px_rgba(207,150,255,0.6),0_0_40px_rgba(255,107,152,0.3)] scale-110"
            : "bg-[#23233b] text-[#cf96ff] border border-[#cf96ff]/30 shadow-[0_0_12px_rgba(207,150,255,0.2)]",
        ].join(" ")}>
        VS
        {isBattling && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#cf96ff]/30" />
        )}
      </div>
    </div>
  );
}
