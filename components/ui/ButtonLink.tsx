import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const buttonStyles: Record<Variant, string> = {
  primary: `${base} bg-accent text-accent-foreground hover:bg-accent-hover`,
  secondary: `${base} border border-border text-foreground hover:border-accent hover:text-accent`,
};

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${buttonStyles[variant]} ${className}`} {...props} />;
}
