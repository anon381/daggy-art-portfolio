"use client"

import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedSection } from "./animated-section"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  primaryAction?: React.ReactNode
  secondaryAction?: React.ReactNode
  backgroundImage?: string
  featuredImage?: string
  className?: string
  children?: React.ReactNode
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  featuredImage,
  className,
  children,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Hero background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
      )}

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/20 rounded-full animate-float delay-300" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent/15 rounded-full animate-float delay-500" />

      <div className="container relative z-10 py-24 md:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <AnimatedSection animation="slide-in-left">
              <div className="space-y-6">
                {subtitle && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {subtitle}
                  </div>
                )}
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="text-gradient">{title}</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-left" delay={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryAction}
                {secondaryAction}
              </div>
            </AnimatedSection>

            {children}
          </div>

          <AnimatedSection animation="slide-in-right" delay={400}>
            <div className="relative">
              <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl group">
                {featuredImage ? (
                  <Image
                    src={featuredImage}
                    alt="Featured artwork"
                    fill
                    className="object-cover transition-transform duration-700 transform-gpu group-hover:scale-105 group-hover:rotate-1 group-hover:brightness-110"
                    priority
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-40" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full animate-pulse-glow" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary/30 rounded-full animate-float delay-700" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
