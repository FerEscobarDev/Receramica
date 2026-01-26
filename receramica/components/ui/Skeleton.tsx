import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "shimmer" | "none";
}

export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const variantStyles = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "",
    rounded: "rounded-lg",
  };

  const animationStyles = {
    pulse: "animate-pulse",
    shimmer: "animate-shimmer bg-gradient-to-r from-bg-warm via-bg-clay to-bg-warm bg-[length:200%_100%]",
    none: "",
  };

  return (
    <div
      className={cn(
        "bg-bg-warm",
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}

// Skeleton para cards de piezas
export function PieceCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="rounded" className="aspect-[3/4] w-full" />
      <div className="space-y-2 px-2">
        <Skeleton variant="text" className="w-3/4 h-6" />
        <Skeleton variant="text" className="w-1/2 h-4" />
      </div>
    </div>
  );
}

// Skeleton para el carrusel
export function CarouselSkeleton() {
  return (
    <div className="relative h-[450px] flex items-center justify-center gap-4">
      <Skeleton variant="rounded" className="w-40 h-56 opacity-40" />
      <Skeleton variant="rounded" className="w-56 h-72 opacity-70" />
      <Skeleton variant="rounded" className="w-80 h-96" />
      <Skeleton variant="rounded" className="w-56 h-72 opacity-70" />
      <Skeleton variant="rounded" className="w-40 h-56 opacity-40" />
    </div>
  );
}

// Skeleton para la galería de imágenes del modal
export function ImageGallerySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="rounded" className="aspect-[4/3] w-full" />
      <div className="flex gap-3 justify-center">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} variant="rounded" className="w-20 h-20" />
        ))}
      </div>
    </div>
  );
}

// Skeleton para la grid de exposición
export function ExpositionGridSkeleton() {
  const heights = ["h-48", "h-64", "h-80", "h-56", "h-72"];

  return (
    <div className="grid grid-cols-5 gap-3 p-3">
      {[...Array(5)].map((_, colIndex) => (
        <div key={colIndex} className="space-y-3">
          {[...Array(3)].map((_, rowIndex) => (
            <Skeleton
              key={rowIndex}
              variant="rounded"
              className={cn("w-full", heights[(colIndex + rowIndex) % 5])}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
