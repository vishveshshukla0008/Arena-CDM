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
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 lg:w-80 bg-[#111124] border-r border-[#474659]/20 flex flex-col h-screen transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}>
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between pr-4 gap-2">
          <SidebarLogo isOpen={isOpen} />
          {isOpen && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-[#757388] hover:text-white transition-colors shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 flex flex-col gap-5 px-4 py-4 overflow-y-auto custom-scrollbar">
          {/* Prompt */}
          <SectionBlock title="Your Prompt">
            <PromptInput value={prompt} onChange={setPrompt} />
            <SuggestionChips onSelect={setPrompt} activePrompt={prompt} />
          </SectionBlock>

          {/* Stats */}
          <BattleStats stats={stats} />
        </div>

        {/* CTA Footer - Fixed at bottom of sidebar */}
        <div className="px-4 py-4 border-t border-[#474659]/20 bg-[#111124]/80 backdrop-blur-md">
          <StartBattleButton
            onClick={onStartBattle}
            status={status}
            disabled={!prompt.trim()}
          />
        </div>
      </aside>
    </>
  );
}

/** Reusable section wrapper with a label */
function SectionBlock({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-linear-to-b from-[#cf96ff] to-[#ff6b98]" />
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
    <div className="px-5 py-5 border-b border-[#474659]/20 shrink-0 flex items-center gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#cf96ff] to-[#ff6b98] flex items-center justify-center text-base shadow-[0_0_15px_rgba(207,150,255,0.4)]">
          <img className="rounded-md" src={user?.profilePicture} alt="" />
        </div>
        <div>
          <p className=" text-white text-base font-normal tracking-wide">
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
          className="bg-[#ff6b98] cursor-pointer p-1 px-2 rounded-xl text-xs font-bold h-fit ml-auto">
          Logout
        </button>
      )}
    </div>
  );
}
