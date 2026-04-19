import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F05A28] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0E] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#F05A28] text-[#0C0C0E] shadow-[0_14px_34px_rgba(240,90,40,0.24)] hover:bg-[#ff6d40]",
        secondary:
          "border border-[#F05A28]/40 bg-[#F05A28]/6 text-[#F05A28] hover:bg-[#F05A28]/10",
        ghost: "bg-transparent text-[#F05A28] hover:bg-[#F05A28]/8 hover:text-[#ff6d40]",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href?: string;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}

export { buttonVariants };
