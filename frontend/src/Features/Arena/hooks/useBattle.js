import { useState, useCallback } from "react";
import { BATTLE_STATUS } from "../constants/models";
import { api } from "../../../api/httpClient";

/**
 * useBattle - Manages battle state and API calls.
 * Sends prompt to POST /api/use-graph, receives { problem, solution_1, solution_2, judgeResponse }.
 */
export function useBattle() {
  const [status, setStatus] = useState(BATTLE_STATUS.IDLE);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null); // full API response
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ solution_1: 0, solution_2: 0, total: 0 });

  const startBattle = useCallback(async () => {
    if (!prompt.trim()) return;

    setStatus(BATTLE_STATUS.LOADING);
    setResult(null);
    setError(null);

    try {
      const data = await api.post("/battle", { prompt });

      setResult(data?.result);
      setStatus(BATTLE_STATUS.COMPLETE);

      // Update stats based on winner
      const judge = data.judgeResponse;
      if (judge) {
        const winnerKey =
          judge.solution_1_score > judge.solution_2_score
            ? "solution_1"
            : judge.solution_2_score > judge.solution_1_score
              ? "solution_2"
              : null; // tie

        if (winnerKey) {
          setStats((prev) => ({
            ...prev,
            [winnerKey]: prev[winnerKey] + 1,
            total: prev.total + 1,
          }));
        } else {
          setStats((prev) => ({ ...prev, total: prev.total + 1 }));
        }
      }
    } catch (err) {
      setError(err.message || "Battle failed. Check if the backend is running.");
      setStatus(BATTLE_STATUS.ERROR);
    }
  }, [prompt]);

  const resetBattle = useCallback(() => {
    setStatus(BATTLE_STATUS.IDLE);
    setResult(null);
    setError(null);
    setPrompt("");
  }, []);

  // Derived values from result
  const solution1 = result?.solution_1 || "";
  const solution2 = result?.solution_2 || "";
  const judge = result?.judgeResponse || null;
  const winnerKey =
    judge && judge.solution_1_score > judge.solution_2_score
      ? "solution_1"
      : judge && judge.solution_2_score > judge.solution_1_score
        ? "solution_2"
        : null;

  return {
    status,
    prompt, setPrompt,
    solution1,
    solution2,
    judge,
    winnerKey,
    error,
    stats,
    startBattle,
    resetBattle,
  };
}
