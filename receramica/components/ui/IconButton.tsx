"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type IconButtonVariant = "default" | "outline" | "ghost";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon: React.ReactNode;
  label: string;
  isLoading?: boolean;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default: cn(
    "bg-overlay-medium text-cream",
    "border border-terracotta",
    "hover:bg-terracotta/20",
    "focus-visible:ring-terracotta/50"
  ),
  outline: cn(
    "bg-transparent text-cream",
    "border-2 border-terracotta",
    "hover:bg-terracotta/10",
    "focus-visible:ring-terracotta/50"
  ),
  ghost: cn(
    "bg-transparent text-text-secondary",
    "hover:bg-bg-warm hover:text-cream",
    "focus-visible:ring-text-muted/50"
  ),
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "w-9 h-9",
  md: "w-12 h-12",
  lg: "w-14 h-14",
};

const iconSizeStyles: Record<IconButtonSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      icon,
      label,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-label={label}
        title={label}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center",
          "rounded-full transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-earth",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Variant and size
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className={cn("animate-spin", iconSizeStyles[size])}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <span className={iconSizeStyles[size]}>{icon}</span>
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

// Iconos comunes para el carrusel y navegación
export const ChevronLeftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const MaximizeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

export const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full"
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);
