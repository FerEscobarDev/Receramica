"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-terracotta text-cream",
    "hover:bg-terracotta-dark",
    "focus-visible:ring-terracotta/50"
  ),
  outline: cn(
    "bg-transparent text-terracotta border-2 border-terracotta",
    "hover:bg-terracotta/10",
    "focus-visible:ring-terracotta/50"
  ),
  ghost: cn(
    "bg-transparent text-text-secondary",
    "hover:bg-bg-warm hover:text-cream",
    "focus-visible:ring-text-muted/50"
  ),
  link: cn(
    "bg-transparent text-terracotta underline-offset-4",
    "hover:underline",
    "focus-visible:ring-terracotta/50",
    "p-0 h-auto"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-10 py-4 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center",
          "font-body font-medium tracking-wide",
          "rounded transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-earth",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Variant and size
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
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
            <span className="ml-2">Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
