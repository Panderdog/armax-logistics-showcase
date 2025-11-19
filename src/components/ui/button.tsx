import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-wide ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--button))] text-[hsl(var(--button-foreground))] shadow-medium hover:shadow-large hover:shadow-glow hover:bg-[hsl(var(--button))]/90 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground shadow-medium hover:shadow-large hover:bg-destructive/85 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0",
        outline: "border-2 border-border bg-background hover:bg-secondary hover:border-foreground/30 hover:scale-[1.02] hover:shadow-soft active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70 hover:scale-[1.02] hover:shadow-soft active:scale-[0.98]",
        ghost: "hover:bg-secondary/80 hover:text-foreground transition-colors duration-200",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
