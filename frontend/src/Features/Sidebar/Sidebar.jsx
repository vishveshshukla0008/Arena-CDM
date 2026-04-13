import React, { useContext } from "react";
import PromptInput from "./components/PromptInput";
import SuggestionChips from "./components/SuggestionChips";
import BattleStats from "./components/BattleStats";
import StartBattleButton from "./components/StartBattleButton";
import { AuthContext } from "../Authentication/AuthContext";
import useAuth from "../Authentication/hooks/useAuth";

/**
 * Sidebar - Left panel for battle configuration.
 * Model selection is removed as models are fixed (Cohere vs Mistral).
 */
export default function Sidebar({
  prompt,
  setPrompt,
  status,
  stats,
  onStartBattle,
}) {
  return (
    <aside className="w-72 lg:w-80 shrink-0 bg-[#111124] border-r border-[#474659]/20 flex flex-col h-screen overflow-y-auto">
      {/* Logo */}
      <SidebarLogo />

      {/* Scrollable content */}
      <div className="flex-1 flex flex-col gap-5 px-4 py-4 overflow-y-auto">
        {/* Prompt */}
        <SectionBlock title="Your Prompt">
          <PromptInput value={prompt} onChange={setPrompt} />
          <SuggestionChips onSelect={setPrompt} activePrompt={prompt} />
        </SectionBlock>

        {/* CTA */}
        <StartBattleButton
          onClick={onStartBattle}
          status={status}
          disabled={!prompt.trim()}
        />

        {/* Stats */}
        <BattleStats stats={stats} />
      </div>
    </aside>
  );
}

/** Reusable section wrapper with a label */
function SectionBlock({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#cf96ff] to-[#ff6b98]" />
        <span className="text-[#e6e3fb] text-xs font-bold uppercase tracking-widest font-['Space_Grotesk']">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

/** Logo / branding at the top of sidebar */
function SidebarLogo() {
  const { user } = useContext(AuthContext);
  const { handleLogout } = useAuth();
  return (
    <div className="px-5 py-5 border-b border-[#474659]/20 shrink-0 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#cf96ff] to-[#ff6b98] flex items-center justify-center text-base shadow-[0_0_15px_rgba(207,150,255,0.4)]">
          <img className="rounded-md" src={user?.profilePicture} alt="" />
        </div>
        <div>
          <p
            className="font-black text-base font-['Space_Grotesk'] tracking-wide"
            style={{
              background: "linear-gradient(135deg, #cf96ff, #ff6b98)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            {user && user.fullname}
          </p>
          <p className="text-[#474659] text-[10px] font-['Manrope'] tracking-widest uppercase">
            Battle Interface
          </p>
        </div>
      </div>
      {user && (
        <button
          onClick={() => {
            handleLogout();
          }}
          className="bg-[#ff6b98] cursor-pointer p-1 px-2 rounded-xl text-xs font-bold h-fit">
          Logout
        </button>
      )}
    </div>
  );
}
