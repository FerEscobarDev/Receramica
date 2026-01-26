"use client";

import { useState, useEffect, useCallback } from "react";
import type { PieceSummary, Piece } from "@/types";

interface UsePiecesReturn {
  pieces: PieceSummary[];
  featuredPieces: PieceSummary[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UsePieceDetailReturn {
  piece: Piece | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook para obtener todas las piezas
 */
export function usePieces(): UsePiecesReturn {
  const [pieces, setPieces] = useState<PieceSummary[]>([]);
  const [featuredPieces, setFeaturedPieces] = useState<PieceSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPieces = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pieces");
      if (!response.ok) throw new Error("Failed to fetch pieces");

      const data = await response.json();
      setPieces(data.pieces || []);
      setFeaturedPieces(data.featured || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPieces();
  }, [fetchPieces]);

  return {
    pieces,
    featuredPieces,
    isLoading,
    error,
    refetch: fetchPieces,
  };
}

/**
 * Hook para obtener el detalle de una pieza
 */
export function usePieceDetail(pieceId: number | null): UsePieceDetailReturn {
  const [piece, setPiece] = useState<Piece | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pieceId) {
      setPiece(null);
      return;
    }

    const fetchPiece = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/pieces/${pieceId}`);
        if (!response.ok) throw new Error("Failed to fetch piece");

        const data = await response.json();
        setPiece(data.piece || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPiece();
  }, [pieceId]);

  return { piece, isLoading, error };
}
