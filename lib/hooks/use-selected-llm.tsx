"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LLMSelection } from "@/lib/types";

const LOCAL_STORAGE_KEY = "selected-llm";

interface LLMSelectionContext {
  selectedLLM: LLMSelection;
  setSelectedLLM: (llm: LLMSelection) => void;
}

const LLMSelectionContext = createContext<LLMSelectionContext | undefined>(
  undefined,
);

export function useSelectedLLM() {
  const context = useContext(LLMSelectionContext);
  if (!context) {
    throw new Error(
      "useSelectedLLM must be used within a LLMSelectionProvider",
    );
  }
  return context;
}

interface LLMSelectionProviderProps {
  children: React.ReactNode;
}

export function LLMSelectionProvider({ children }: LLMSelectionProviderProps) {
  const [selectedLLM, setSelectedLLM] = useState<LLMSelection>(() => {
    if (typeof window !== "undefined") {
      const savedLLM = localStorage.getItem(
        LOCAL_STORAGE_KEY,
      ) as LLMSelection | null;
      return savedLLM || "claude-3.5-sonnet"; // Default to claude-3.5-sonnet if no selection is saved
    }
    return "claude-3.5-sonnet";
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedLLM);
  }, [selectedLLM]);

  const contextValue: LLMSelectionContext = {
    selectedLLM,
    setSelectedLLM,
  };

  return (
    <LLMSelectionContext.Provider value={contextValue}>
      {children}
    </LLMSelectionContext.Provider>
  );
}
