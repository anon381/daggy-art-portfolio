"use client"

import type React from "react"
import { AnimatedSection } from "./animated-section"
import { EnhancedCard } from "./enhanced-card"

interface Stat {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface StatsSectionProps {
  stats: Stat[]
  title?: string
  description?: string
  className?: string
}

export function StatsSection({ stats, title, description, className }: StatsSectionProps) {
  return (
    <section className={className}>
      <div className="container py-16 md:py-24">
        {(title || description) && (
          <AnimatedSection className="text-center mb-12">
            {title && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">{title}</h2>}
            {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
          </AnimatedSection>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <EnhancedCard className="text-center p-6 hover:shadow-lg transition-all duration-300">
                {stat.icon && (
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">{stat.icon}</div>
                  </div>
                )}
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-medium text-foreground mb-1">{stat.label}</div>
                {stat.description && <div className="text-sm text-muted-foreground">{stat.description}</div>}
              </EnhancedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
