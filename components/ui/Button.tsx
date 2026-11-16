import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      href,
      external = false,
      icon,
      showIcon = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    const baseStyles =
      "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none motion-reduce:transition-none";

    const variantStyles = {
      primary:
        "bg-[#12A9EC] text-white hover:bg-[#0fa0e0] shadow-[0_2px_12px_rgba(18,169,236,0.3)] hover:shadow-[0_4px_24px_rgba(18,169,236,0.45)] active:scale-[0.98] motion-reduce:active:scale-100",
      secondary:
        "bg-white text-[#0B1B2B] hover:bg-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-white/20 active:scale-[0.98] motion-reduce:active:scale-100",
    };

    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

    const defaultIcon = (
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
        aria-hidden="true"
      />
    );

    const renderedIcon = icon !== undefined ? icon : showIcon ? defaultIcon : null;

    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group ${combinedClassName}`}
          >
            <span>{children}</span>
            {renderedIcon}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={`group ${combinedClassName}`}
        >
          <span>{children}</span>
          {renderedIcon}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`group ${combinedClassName}`}
        {...props}
      >
        <span>{children}</span>
        {renderedIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
