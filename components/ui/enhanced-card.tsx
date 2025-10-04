"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated" | "bordered" | "earth" | "stone" | "concrete"
  hover?: boolean
  children: React.ReactNode
}

export function EnhancedCard({ className, variant = "default", hover = true, children, ...props }: EnhancedCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
        {
          "card-enhanced": variant === "default",
          glass: variant === "glass",
          "shadow-lg border-2": variant === "elevated",
          "border-2 border-primary/20": variant === "bordered",
          "bg-earth hover:bg-earth-hover": variant === "earth",
          "bg-stone hover:bg-stone-hover": variant === "stone",
          "bg-concrete hover:bg-concrete-hover": variant === "concrete",
          "hover-lift": hover,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function EnhancedCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

export function EnhancedCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

export function EnhancedCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export function EnhancedCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function EnhancedCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}
