import React from "react";
import { MODELS, BATTLE_STATUS } from "../constants/models";
import MarkdownRenderer from "./MarkdownRenderer";

/**
 * BattleCard - Displays a model's solution with skeleton loading and winner green border.
 * @param {"solution_1"|"solution_2"} solutionKey
 * @param {string} content - The solution text
 * @param {boolean} isWinner
 * @param {string} status - BATTLE_STATUS
 * @param {object|null} judge - judgeResponse object
 */
export default function BattleCard({
  solutionKey,
  content,
  isWinner,
  status,
  judge,
}) {
  const model = MODELS[solutionKey];
  const isLoading = status === BATTLE_STATUS.LOADING;
  const isComplete = status === BATTLE_STATUS.COMPLETE;
  const score = judge?.[`${solutionKey}_score`];
  const reasoning = judge?.[`${solutionKey}_reasoning`];

  return (
    <div
      className={[
        "flex flex-col flex-1 rounded-2xl transition-all duration-700 overflow-hidden min-w-0",
        "bg-[#1d1d33]/60 backdrop-blur-xl",
        isWinner
          ? "ring-3 ring-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.35),0_0_60px_rgba(0,255,136,0.15)]"
          : isComplete
            ? "ring-1 ring-[#474659]/40"
            : "ring-1 ring-[#474659]/20",
      ].join(" ")}
      style={{ minHeight: window.innerWidth < 768 ? 280 : 360 }}>
      {/* Card Header */}
      <div className="flex items-center justify-center gap-2 md:gap-3 px-3 md:px-5 py-3 md:py-4 bg-[#18182b]/80 border-b border-[#474659]/20">
        <span
          className="text-xl md:text-2xl w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl shrink-0"
          style={{
            background: `${model.color}22`,
            border: `1px solid ${model.color}44`,
          }}>
          {model.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[#e6e3fb] font-semibold text-xs md:text-sm truncate">
            {model.label}
          </p>
          <p className="text-[#757388] text-[9px] md:text-[11px] font-['Manrope']">
            {solutionKey === "solution_1" ? "Challenger A" : "Challenger B"}
          </p>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
          <StatusBadge status={status} isWinner={isWinner} />

          {/* Score badge */}
          {isComplete && score != null && (
            <div
              className="flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold font-['Space_Grotesk']"
              style={{
                background: isWinner
                  ? "rgba(0,255,136,0.15)"
                  : "rgba(71,70,89,0.3)",
                color: isWinner ? "#00ff88" : "#aba9bf",
                border: `1px solid ${isWinner ? "rgba(0,255,136,0.3)" : "rgba(71,70,89,0.3)"}`,
              }}>
              {score}/10
            </div>
          )}
        </div>
      </div>

      {/* Response Area */}
      <div className="flex-1 p-3 md:p-5 overflow-auto custom-scrollbar">
        {isLoading ? (
          <SkeletonContent />
        ) : content ? (
          <MarkdownRenderer content={content} />
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Judge reasoning footer */}
      {isComplete && reasoning && (
        <div className="px-4 py-2 md:px-5 md:py-3 bg-[#111124]/60 border-t border-[#474659]/20">
          <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#757388] font-['Space_Grotesk'] mb-0.5 md:mb-1">
            💎 Judge's Reasoning
          </p>
          <p className="text-[11px] md:text-xs text-[#aba9bf] font-['Manrope'] leading-relaxed">
            {reasoning}
          </p>
        </div>
      )}

      {/* Winner badge overlay */}
      {isWinner && (
        <div className="flex items-center justify-center gap-2 py-2 md:py-3 bg-[#00ff88]/10 border-t border-[#00ff88]/30">
          <span
            className="text-[#00ff88] text-xs md:text-sm font-bold font-['Space_Grotesk'] tracking-wider uppercase"
            style={{ textShadow: "0 0 10px rgba(0,255,136,0.5)" }}>
            🏆 Winner
          </span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, isWinner }) {
  if (isWinner) {
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-['Space_Grotesk'] uppercase tracking-wider">
        Winner
      </span>
    );
  }
  if (status === BATTLE_STATUS.LOADING) {
    return (
      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#cf96ff]/15 text-[#cf96ff] border border-[#cf96ff]/30 font-['Space_Grotesk'] uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#cf96ff] animate-ping" />
        Thinking
      </span>
    );
  }
  if (status === BATTLE_STATUS.COMPLETE) {
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#474659]/30 text-yellow-300 border border-yellow-300 font-['Space_Grotesk'] uppercase tracking-wider">
        Done
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#23233b] text-[#00e3fd] border border-[#00e3fd]/20 font-['Space_Grotesk'] uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd]" />
      Ready
    </span>
  );
}

function SkeletonContent() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="h-3 bg-[#23233b] rounded-full w-full" />
      <div className="h-3 bg-[#23233b] rounded-full w-11/12" />
      <div className="h-3 bg-[#23233b] rounded-full w-9/12" />
      <div className="h-20 bg-[#23233b] rounded-xl w-full mt-2" />
      <div className="h-3 bg-[#23233b] rounded-full w-10/12" />
      <div className="h-3 bg-[#23233b] rounded-full w-7/12" />
      <div className="h-16 bg-[#23233b] rounded-xl w-full mt-2" />
      <div className="h-3 bg-[#23233b] rounded-full w-8/12" />
      <div className="h-3 bg-[#23233b] rounded-full w-full" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-40 gap-3 opacity-40">
      <div className="w-14 h-14 rounded-xl border-2 border-dashed border-[#474659] flex items-center justify-center text-2xl">
        ⚔️
      </div>
      <p className="text-[#757388] text-xs font-['Manrope'] text-center">
        Awaiting battle...
      </p>
    </div>
  );
}
