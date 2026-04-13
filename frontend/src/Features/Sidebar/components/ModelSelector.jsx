import React from "react";
import { AI_MODELS } from "../../Arena/constants/models";

/**
 * ModelSelector - Dropdown to pick an AI model with icon and label.
 * @param {string} label - e.g. "Model A"
 * @param {string} value - selected model id
 * @param {function} onChange
 * @param {string} accentColor - CSS color for accent
 */
export default function ModelSelector({ label, value, onChange, accentColor = "#cf96ff" }) {
  const selectedModel = AI_MODELS.find((m) => m.id === value);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#757388] text-xs uppercase tracking-widest font-['Space_Grotesk']">
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 text-base pointer-events-none"
        >
          {selectedModel?.icon}
        </div>
        <select
          id={`model-selector-${label.toLowerCase().replace(/\s/g, "-")}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm text-[#e6e3fb] font-['Manrope']
            bg-[#111124] border border-[#474659]/30 appearance-none cursor-pointer
            focus:outline-none focus:border-[#cf96ff]/60 focus:shadow-[0_0_0_2px_rgba(207,150,255,0.15)]
            transition-all duration-200 hover:border-[#474659]/60"
          style={{ colorScheme: "dark" }}
        >
          {AI_MODELS.map((model) => (
            <option key={model.id} value={model.id} className="bg-[#18182b]">
              {model.icon} {model.label}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#474659] pointer-events-none text-xs">
          ▾
        </span>
      </div>
    </div>
  );
}
