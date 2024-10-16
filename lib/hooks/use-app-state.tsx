"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Chat } from "@/lib/types";
import { renameChat } from "@/lib/actions/chat";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "app-state";

interface AppState {
  chat: Chat | null;
  isGenerating: boolean;
  setChat: (chat: Chat) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setSharePath: (isChatPublic: boolean) => void;
  setChatName: (chatName: string) => void;
}

interface AppStateContext {
  chat: Chat | null;
  isGenerating: boolean;
  setChat: (chat: Chat) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setSharePath: (sharePath: string | undefined) => void;
  setChatName: (chatName: string) => void;
}

const AppStateContext = createContext<AppStateContext | undefined>(undefined);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}

interface AppStateProviderProps {
  children: React.ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedState
        ? JSON.parse(savedState)
        : { chat: null, isGenerating: false };
    }
    return { chat: null, isGenerating: false };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setChat = (chat: Chat) => {
    setState({ ...state, chat });
  };

  const setIsGenerating = (isGenerating: boolean) => {
    setState({ ...state, isGenerating });
  };

  const setSharePath = (sharePath: string | undefined) => {
    setState({
      ...state,
      chat: { ...state.chat, sharePath } as Chat,
    });
  };

  const setChatName = async (chatName: string) => {
    if (!state.chat) {
      return toast.error("No chat found to rename");
    }

    const updatedChat = await renameChat(state.chat.id, chatName);

    if ("error" in updatedChat) {
      toast.error(updatedChat.error || "Failed to rename chat");
      return;
    }

    setState({
      ...state,
      chat: {
        ...state.chat,
        title: chatName,
      },
    });
  };

  const contextValue: AppStateContext = {
    chat: state.chat,
    isGenerating: state.isGenerating,
    setChat,
    setIsGenerating,
    setSharePath,
    setChatName,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
}
