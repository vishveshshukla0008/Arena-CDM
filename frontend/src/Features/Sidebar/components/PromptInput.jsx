import React from "react";

/**
 * PromptInput - Glassmorphism textarea for battle prompt input.
 */
export default function PromptInput({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#757388] text-xs uppercase tracking-widest font-['Space_Grotesk']">
        Battle Prompt
      </label>
      <div className="relative">
        <textarea
          id="battle-prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your battle prompt..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl text-sm text-[#e6e3fb] font-['Manrope'] leading-relaxed resize-none
            bg-[#23233b]/40 backdrop-blur-sm border border-[#474659]/20 placeholder-[#474659]
            focus:outline-none focus:border-b-2 focus:border-b-[#00e3fd] focus:border-x-0 focus:border-t-0
            focus:bg-[#23233b]/60
            transition-all duration-200"
        />
        <span className="absolute bottom-3 right-3 text-[#474659] text-xs font-['Manrope']">
          {value.length}
        </span>
      </div>
    </div>
  );
}
