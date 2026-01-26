"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { ExpositionTile, TileHeight } from "./ExpositionTile";
import type { Piece } from "@/types";

interface ExpositionGridProps {
  pieces: Piece[];
  onPieceClick: (piece: Piece) => void;
  isVisible: boolean;
}

// Generate varied heights for masonry effect
function getHeightPattern(index: number): TileHeight {
  const patterns: TileHeight[] = [
    "large", "medium", "small",
    "medium", "large", "medium",
    "small", "medium", "large",
    "medium", "small", "large",
  ];
  return patterns[index % patterns.length];
}

export function ExpositionGrid({
  pieces,
  onPieceClick,
  isVisible,
}: ExpositionGridProps) {
  // Prepare tiles with heights
  const tilesWithHeight = useMemo(() => {
    return pieces.map((piece, index) => ({
      ...piece,
      height: getHeightPattern(index),
      mainImage: piece.images?.[0]?.url || "/Images/placeholder.jpg",
    }));
  }, [pieces]);

  // Split into columns for masonry layout
  const columns = useMemo(() => {
    const cols: typeof tilesWithHeight[] = [[], [], []];
    tilesWithHeight.forEach((tile, index) => {
      cols[index % 3].push(tile);
    });
    return cols;
  }, [tilesWithHeight]);

  return (
    <div
      className={cn(
        "w-full h-full overflow-y-auto",
        "px-4 md:px-8 lg:px-12 py-8",
        "scrollbar-thin scrollbar-track-bg-earth scrollbar-thumb-text-muted"
      )}
    >
      {/* Masonry Grid Container */}
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 md:gap-6">
            {columns[0].map((tile, index) => (
              <ExpositionTile
                key={tile.id}
                id={tile.id}
                name={tile.name}
                image={tile.mainImage}
                height={tile.height}
                onClick={() => onPieceClick(tile)}
                index={index * 3}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Column 2 - offset for visual interest */}
          <div className="flex flex-col gap-4 md:gap-6 lg:mt-12">
            {columns[1].map((tile, index) => (
              <ExpositionTile
                key={tile.id}
                id={tile.id}
                name={tile.name}
                image={tile.mainImage}
                height={tile.height}
                onClick={() => onPieceClick(tile)}
                index={index * 3 + 1}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 md:gap-6 sm:col-span-2 sm:grid sm:grid-cols-2 lg:col-span-1 lg:flex lg:flex-col lg:mt-6">
            {columns[2].map((tile, index) => (
              <ExpositionTile
                key={tile.id}
                id={tile.id}
                name={tile.name}
                image={tile.mainImage}
                height={tile.height}
                onClick={() => onPieceClick(tile)}
                index={index * 3 + 2}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
