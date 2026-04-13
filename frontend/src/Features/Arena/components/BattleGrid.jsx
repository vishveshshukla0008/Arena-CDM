import React from "react";
import BattleCard from "./BattleCard";
import VsBadge from "./VsBadge";
import WinnerBanner from "./WinnerBanner";

/**
 * BattleGrid - Main battle area showing two model cards side-by-side with VS badge.
 */
export default function BattleGrid({
  status,
  solution1,
  solution2,
  judge,
  winnerKey,
  onNewBattle,
}) {
  return (
    <div>
      <div className="flex items-stretch gap-2 md:gap-4 flex-col md:flex-row">
        <BattleCard
          solutionKey="solution_1"
          content={solution1}
          isWinner={winnerKey === "solution_1"}
          status={status}
          judge={judge}
        />
        <div className="py-4 md:py-0 self-center">
          <VsBadge status={status} />
        </div>
        <BattleCard
          solutionKey="solution_2"
          content={solution2}
          isWinner={winnerKey === "solution_2"}
          status={status}
          judge={judge}
        />
      </div>

      <WinnerBanner
        winnerKey={winnerKey}
        judge={judge}
        onNewBattle={onNewBattle}
      />
    </div>
  );
}
