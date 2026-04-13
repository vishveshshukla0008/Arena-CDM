export const SUGGESTED_PROMPTS = [
  "Write a poem about the digital age",
  "Write a function for factorial in JavaScript",
  "Explain quantum entanglement simply",
  "Debug: fix a Python loop bug",
  "Write a haiku about AI",
  "Implement binary search in Python",
];

export const BATTLE_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  COMPLETE: "complete",
  ERROR: "error",
};

/** Model metadata — these are the backend models, not user-selectable */
export const MODELS = {
  solution_1: { label: "Cohere Command-A", icon: "🔵", color: "#3b82f6" },
  solution_2: { label: "Mistral Medium", icon: "🟣", color: "#a855f7" },
  judge: { label: "Gemini Flash", icon: "💎", color: "#06b6d4" },
};
