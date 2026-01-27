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

// Generate varied heights for masonry effect (5-column pattern)
function getHeightPattern(index: number): TileHeight {
  const patterns: TileHeight[] = [
    "large", "medium", "small", "medium", "large",
    "medium", "small", "large", "small", "medium",
    "small", "large", "medium", "large", "small",
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

  // Split into 5 columns for masonry layout
  const columns = useMemo(() => {
    const cols: typeof tilesWithHeight[] = [[], [], [], [], []];
    tilesWithHeight.forEach((tile, index) => {
      cols[index % 5].push(tile);
    });
    return cols;
  }, [tilesWithHeight]);

  return (
    <div
      className={cn(
        "w-full h-full overflow-y-auto",
        "p-3",
        "scrollbar-thin scrollbar-track-bg-earth scrollbar-thumb-text-muted"
      )}
    >
      {/* Masonry Grid Container - 5 columns */}
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {columns[0].map((tile, index) => (
              <ExpositionTile
                key={tile.id}
                id={tile.id}
                name={tile.name}
                image={tile.mainImage}
                height={tile.height}
                onClick={() => onPieceClick(tile)}
                index={index * 5}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3 lg:mt-8">
            {columns[1].map((tile, index) => (
              <ExpositionTile
                key={tile.id}
                id={tile.id}
                name={tile.name}
                image={tile.mainImage}
                height={tile.height}
                onClick={() => onPieceClick(tile)}
                index={index * 5 + 1}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3 hidden sm:flex">
            {columns[2].map((tile, index) => (
              <ExpositionTile
                key={tile.id}
                id={tile.id}
                name={tile.name}
                image={tile.mainImage}
                height={tile.height}
                onClick={() => onPieceClick(tile)}
                index={index * 5 + 2}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-3 hidden lg:flex lg:mt-4">
            {columns[3].map((tile, index) => (
              <ExpositionTile
                key={tile.id}
                id={tile.id}
                name={tile.name}
                image={tile.mainImage}
                height={tile.height}
                onClick={() => onPieceClick(tile)}
                index={index * 5 + 3}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-3 hidden lg:flex lg:mt-10">
            {columns[4].map((tile, index) => (
              <ExpositionTile
                key={tile.id}
                id={tile.id}
                name={tile.name}
                image={tile.mainImage}
                height={tile.height}
                onClick={() => onPieceClick(tile)}
                index={index * 5 + 4}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
