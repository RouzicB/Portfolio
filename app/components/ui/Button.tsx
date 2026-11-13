import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { type DetroitIcon } from "../icons/DetroitIcons";

export const buttonVariants = {
  /** Bleu nuit à facettes, avec ombre portée (« LEARN MORE », « EXPLORE ») */
  primary: "btn-facets bg-navy text-white shadow-[0_14px_18px_-10px_rgba(44,58,107,0.6)] hover:brightness-110",
  /** Bleu vif à facettes (« BIOGRAPHY ») */
  blue: "btn-facets bg-cobalt text-white hover:brightness-110",
  /** Gris translucide avec petits traits latéraux (« KARA ») */
  ghost: "btn-ticks bg-line/70 text-fg backdrop-blur-sm hover:bg-line",
} as const;

export const buttonSizes = {
  sm: "h-8 min-w-[120px] pl-3 pr-4 text-[13px]",
  md: "h-9 min-w-[200px] pl-3 pr-5 text-[15px]",
  lg: "h-11 min-w-[230px] pl-4 pr-6 text-[15px]",
} as const;

export const buttonBase = "relative inline-flex items-center justify-start gap-2 uppercase tracking-[0.02em] transition";

/** Classes d'un bouton, réutilisables sur un <Link> ou un <a> */
export function buttonClasses(variant: keyof typeof buttonVariants = "primary", size: keyof typeof buttonSizes = "md") {
  return `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  icon?: DetroitIcon;
  iconRight?: DetroitIcon;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", icon: Icon, iconRight: IconRight, className = "", disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={`${buttonClasses(variant, size)} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`.trim()}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={1.5} accent="currentColor" />}
      {children}
      {IconRight && <IconRight size={16} strokeWidth={1.5} accent="currentColor" />}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
