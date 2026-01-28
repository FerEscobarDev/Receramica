"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export type TileHeight = "small" | "medium" | "large";

export interface TilePosition {
  column: number;
  row: number;
}

export interface HoveredTileInfo {
  id: number;
  column: number;
  row: number;
}

interface ExpositionTileProps {
  id: number;
  name: string;
  image: string;
  height: TileHeight;
  onClick: () => void;
  index: number;
  isVisible: boolean;
  // New props for ripple effect
  position: TilePosition;
  hoveredTile: HoveredTileInfo | null;
  onTileHover: (info: HoveredTileInfo) => void;
  onTileHoverEnd: () => void;
}

const HEIGHT_CLASSES: Record<TileHeight, string> = {
  small: "h-[200px]",
  medium: "h-[260px]",
  large: "h-[340px]",
};

// Calculate the ripple effect based on distance from hovered tile
function useRippleEffect(
  tileId: number,
  position: TilePosition,
  hoveredTile: HoveredTileInfo | null
) {
  return useMemo(() => {
    if (!hoveredTile) {
      return {
        isAffected: false,
        elevation: 0,
        rotateX: 0,
        rotateY: 0,
        shadowIntensity: 0,
      };
    }

    const deltaColumn = position.column - hoveredTile.column;
    const deltaRow = position.row - hoveredTile.row;

    // Manhattan distance for grid-based adjacency
    const distance = Math.abs(deltaColumn) + Math.abs(deltaRow);

    // Center tile (the one being hovered)
    if (tileId === hoveredTile.id) {
      return {
        isAffected: true,
        elevation: -15, // Negative for upward movement
        rotateX: 0,
        rotateY: 0,
        shadowIntensity: 1,
      };
    }

    // Adjacent tiles (distance = 1)
    if (distance === 1) {
      // Calculate rotation to tilt toward the center
      // Rotation is based on direction from this tile to the hovered tile
      const rotateX = deltaRow * 3; // Tilt forward/backward
      const rotateY = -deltaColumn * 3; // Tilt left/right

      return {
        isAffected: true,
        elevation: -8,
        rotateX,
        rotateY,
        shadowIntensity: 0.6,
      };
    }

    // Diagonal adjacent tiles (distance = 2 but both deltas are 1)
    if (distance === 2 && Math.abs(deltaColumn) === 1 && Math.abs(deltaRow) === 1) {
      const rotateX = deltaRow * 2;
      const rotateY = -deltaColumn * 2;

      return {
        isAffected: true,
        elevation: -5,
        rotateX,
        rotateY,
        shadowIntensity: 0.3,
      };
    }

    return {
      isAffected: false,
      elevation: 0,
      rotateX: 0,
      rotateY: 0,
      shadowIntensity: 0,
    };
  }, [tileId, position.column, position.row, hoveredTile]);
}

export function ExpositionTile({
  id,
  name,
  image,
  height,
  onClick,
  index,
  isVisible,
  position,
  hoveredTile,
  onTileHover,
  onTileHoverEnd,
}: ExpositionTileProps) {
  const rippleEffect = useRippleEffect(id, position, hoveredTile);

  // Dynamic shadow based on elevation
  const dynamicShadow = rippleEffect.isAffected
    ? `0 ${4 + Math.abs(rippleEffect.elevation)}px ${16 + Math.abs(rippleEffect.elevation) * 2}px rgba(0,0,0,${0.25 + rippleEffect.shadowIntensity * 0.2})`
    : "0 4px 16px rgba(0,0,0,0.25)";

  // Calculate transition properties separately to avoid shorthand conflicts
  const isRippleActive = rippleEffect.isAffected || hoveredTile === null;
  const transitionDuration = isRippleActive ? "300ms" : "700ms";
  const transitionTiming = isRippleActive ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "ease-out";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onTileHover({ id, column: position.column, row: position.row })}
      onMouseLeave={onTileHoverEnd}
      className={cn(
        "relative w-full overflow-hidden rounded",
        "group cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
        HEIGHT_CLASSES[height],
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{
        transform: isVisible
          ? `translateY(${rippleEffect.elevation}px) rotateX(${rippleEffect.rotateX}deg) rotateY(${rippleEffect.rotateY}deg)`
          : "translateY(32px)",
        boxShadow: dynamicShadow,
        transitionProperty: "transform, box-shadow, opacity",
        transitionDuration: `${transitionDuration}, ${transitionDuration}, 700ms`,
        transitionTimingFunction: `${transitionTiming}, ease-out, ease-out`,
        transitionDelay: isVisible && !rippleEffect.isAffected ? `${index * 80}ms` : "0ms",
        transformStyle: "preserve-3d",
        willChange: hoveredTile ? "transform, box-shadow" : "auto",
      }}
      aria-label={`View ${name}`}
    >
      {/* Image */}
      <OptimizedImage
        src={image}
        alt={name}
        fill
        className={cn(
          "object-cover",
          "transition-transform duration-500 ease-out",
          "group-hover:scale-105"
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Hover Overlay */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-t from-black/60 via-transparent to-transparent",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-300"
      )}>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={cn(
            "text-cream font-display text-lg",
            "transform translate-y-4 group-hover:translate-y-0",
            "transition-transform duration-300"
          )}>
            {name}
          </h3>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className={cn(
        "absolute inset-0 rounded",
        "ring-2 ring-terracotta/0 group-hover:ring-terracotta/50",
        "transition-all duration-300"
      )} />
    </button>
  );
}
