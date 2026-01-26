"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Piece } from "@/types";
import { STORAGE_KEYS } from "@/lib/constants";

interface UIContextType {
  // Exposición Fullscreen
  isExpositionOpen: boolean;
  openExposition: () => void;
  closeExposition: () => void;
  hasSeenExposition: boolean;
  markExpositionAsSeen: () => void;

  // Modal de pieza
  isModalOpen: boolean;
  selectedPiece: Piece | null;
  openPieceModal: (piece: Piece) => void;
  closePieceModal: () => void;

  // Navegación
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  // Estado de la exposición
  const [isExpositionOpen, setIsExpositionOpen] = useState(false);
  const [hasSeenExposition, setHasSeenExposition] = useState(true);

  // Estado del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  // Navegación
  const [activeSection, setActiveSection] = useState("");

  // Verificar si ya vio la exposición al montar
  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEYS.expositionSeen);
    if (!seen) {
      setHasSeenExposition(false);
      setIsExpositionOpen(true);
    }
  }, []);

  // Manejar body scroll cuando modal está abierto
  useEffect(() => {
    if (isModalOpen || isExpositionOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen, isExpositionOpen]);

  // Handlers de exposición
  const openExposition = useCallback(() => {
    setIsExpositionOpen(true);
  }, []);

  const closeExposition = useCallback(() => {
    setIsExpositionOpen(false);
  }, []);

  const markExpositionAsSeen = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.expositionSeen, "true");
    setHasSeenExposition(true);
  }, []);

  // Handlers del modal
  const openPieceModal = useCallback((piece: Piece) => {
    setSelectedPiece(piece);
    setIsModalOpen(true);
  }, []);

  const closePieceModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay para limpiar la pieza después de la animación
    setTimeout(() => setSelectedPiece(null), 300);
  }, []);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) {
          closePieceModal();
        } else if (isExpositionOpen) {
          closeExposition();
          markExpositionAsSeen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isExpositionOpen, closePieceModal, closeExposition, markExpositionAsSeen]);

  const value: UIContextType = {
    isExpositionOpen,
    openExposition,
    closeExposition,
    hasSeenExposition,
    markExpositionAsSeen,
    isModalOpen,
    selectedPiece,
    openPieceModal,
    closePieceModal,
    activeSection,
    setActiveSection,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
