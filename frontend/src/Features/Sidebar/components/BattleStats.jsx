import React from "react";
import { MODELS } from "../../Arena/constants/models";

/**
 * BattleStats - Shows win counters
 * @param {object} stats - { solution_1: number, solution_2: number, total: number }
 */
export default function BattleStats({ stats }) {
  const modelA = MODELS.solution_1;
  const modelB = MODELS.solution_2;
  const total = stats.total || 0;

  return (
    <div className="rounded-xl bg-[#111124] border border-[#474659]/20 p-4 flex flex-col gap-3">
      <p className="text-[#757388] text-xs uppercase tracking-widest font-['Space_Grotesk']">
        Battle Stats
      </p>

      {/* Win bars */}
      <StatRow model={modelA} wins={stats.solution_1 || 0} total={total} side="A" color={modelA.color} />
      <StatRow model={modelB} wins={stats.solution_2 || 0} total={total} side="B" color={modelB.color} />

      {total > 0 && (
        <p className="text-center text-[#474659] text-[10px] uppercase tracking-wider font-['Manrope'] mt-1">
          {total} battle{total !== 1 ? "s" : ""} completed
        </p>
      )}
    </div>
  );
}

function StatRow({ model, wins, total, side, color }) {
  const pct = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-[#aba9bf] font-['Manrope']">
          <span>{model?.icon}</span>
          <span className="truncate max-w-[100px]">{model?.label}</span>
          <span className="text-[#474659] text-[10px]">(Model {side})</span>
        </span>
        <span className="text-xs font-bold font-['Space_Grotesk']" style={{ color }}>
          {wins}W
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#23233b] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 6px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}
