import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-button-gradient text-white shadow hover:opacity-90",
        destructive: "bg-red-500 text-white shadow-sm hover:bg-red-500/90",
        outline:
          "border border-[rgba(255,255,255,0.1)] bg-transparent hover:bg-[rgba(255,255,255,0.05)] text-white",
        secondary: "glass text-white hover:bg-[rgba(17,17,17,0.4)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-8 py-2 rounded-2xl",
        sm: "h-9 rounded-xl px-3",
        lg: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-14 w-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
