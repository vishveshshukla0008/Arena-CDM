import React from "react";
import { SUGGESTED_PROMPTS } from "../../Arena/constants/models";

/**
 * SuggestionChips - Clickable prompt suggestion chips.
 * @param {function} onSelect - Called with the selected prompt string
 * @param {string} activePrompt - Currently active prompt (for highlight)
 */
export default function SuggestionChips({ onSelect, activePrompt }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#757388] text-xs uppercase tracking-widest font-['Space_Grotesk']">
        Quick Prompts
      </label>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((prompt) => {
          const isActive = activePrompt === prompt;
          return (
            <button
              key={prompt}
              id={`chip-${prompt.slice(0, 15).replace(/\s/g, "-").toLowerCase()}`}
              onClick={() => onSelect(prompt)}
              className={[
                "px-3 py-1.5 rounded-full text-xs font-['Manrope'] transition-all duration-200",
                "hover:scale-105 active:scale-95 cursor-pointer",
                isActive
                  ? "bg-[#a533ff] text-black font-bold shadow-[0_0_10px_rgba(165,51,255,0.4)]"
                  : "bg-[#1d1d33] text-[#aba9bf] border border-[#474659]/30 hover:border-[#cf96ff]/40 hover:text-[#cf96ff]",
              ].join(" ")}
            >
              {prompt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
