"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-in-up" | "slide-in-left" | "slide-in-right" | "scale-in"
  delay?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className,
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        {
          "opacity-0 translate-y-8": !isVisible && animation === "fade-in-up",
          "opacity-100 translate-y-0": isVisible && animation === "fade-in-up",
          "opacity-0 -translate-x-8": !isVisible && animation === "slide-in-left",
          "opacity-100 translate-x-0": isVisible && animation === "slide-in-left",
          "opacity-0 translate-x-8": !isVisible && animation === "slide-in-right",
          "opacity-100 translate-x-0": isVisible && animation === "slide-in-right",
          "opacity-0 scale-95": !isVisible && animation === "scale-in",
          "opacity-100 scale-100": isVisible && animation === "scale-in",
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
