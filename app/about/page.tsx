"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Award,
  Palette,
  Heart,
  Users,
  Star,
  Camera,
  Brush,
  Coffee,
  Music,
  Book,
  Mountain,
  Mail,
  Phone,
  Instagram,
  Facebook,
  ChevronRight,
} from "lucide-react"

import { EnhancedButton } from "@/components/ui/enhanced-button"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AnimatedSection } from "@/components/ui/animated-section"
import { HeroSection } from "@/components/ui/hero-section"

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const skills = [
    { name: "Mural Painting", level: 95, icon: <Brush className="h-5 w-5" /> },
    { name: "Canvas Art", level: 90, icon: <Palette className="h-5 w-5" /> },
    { name: "Digital Design", level: 85, icon: <Camera className="h-5 w-5" /> },
    { name: "Color Theory", level: 92, icon: <Heart className="h-5 w-5" /> },
    { name: "Client Relations", level: 88, icon: <Users className="h-5 w-5" /> },
    { name: "Project Management", level: 87, icon: <Award className="h-5 w-5" /> },
  ]

  const timeline = [
    {
      year: "2013",
      title: "Art School Graduate",
      description: "Graduated with honors from Fine Arts Academy, specializing in contemporary painting techniques.",
      image: "/placeholder.svg?height=300&width=400&text=Graduation",
      achievements: ["Dean's List", "Best Portfolio Award", "Community Art Prize"],
    },
    {
      year: "2015",
      title: "First Solo Exhibition",
      description: "Launched my first solo exhibition 'Urban Dreams' featuring 20 original canvas paintings.",
      image: "/placeholder.svg?height=300&width=400&text=Exhibition",
      achievements: ["15 paintings sold", "Featured in Art Weekly", "Gallery partnership"],
    },
    {
      year: "2017",
      title: "Mural Specialization",
      description: "Transitioned to large-scale mural work, completing my first commercial project.",
      image: "/placeholder.svg?height=300&width=400&text=First+Mural",
      achievements: ["10+ murals completed", "Commercial contracts", "Team expansion"],
    },
    {
      year: "2020",
      title: "Dagil Arts Founded",
      description: "Officially established Dagil Arts studio, focusing on custom art and community projects.",
      image: "/placeholder.svg?height=300&width=400&text=Studio+Opening",
      achievements: ["Studio space acquired", "5-person team", "50+ projects completed"],
    },
    {
      year: "2023",
      title: "Recognition & Growth",
      description: "Received multiple awards and expanded services to include digital art consultation.",
      image: "/placeholder.svg?height=300&width=400&text=Awards",
      achievements: ["City Arts Award", "100+ happy clients", "Featured in magazines"],
    },
  ]

  const interests = [
    { name: "Photography", icon: <Camera className="h-6 w-6" />, description: "Capturing moments that inspire my art" },
    {
      name: "Coffee Culture",
      icon: <Coffee className="h-6 w-6" />,
      description: "Exploring local cafes and their stories",
    },
    { name: "Music", icon: <Music className="h-6 w-6" />, description: "Jazz and indie music fuel my creativity" },
    { name: "Reading", icon: <Book className="h-6 w-6" />, description: "Art history and contemporary design books" },
    { name: "Hiking", icon: <Mountain className="h-6 w-6" />, description: "Nature walks for color inspiration" },
    { name: "Community", icon: <Users className="h-6 w-6" />, description: "Volunteering for local art programs" },
  ]

  const values = [
    {
      title: "Authenticity",
      description: "Every piece tells a genuine story, reflecting the client's vision and my artistic integrity.",
      icon: <Heart className="h-8 w-8" />,
    },
    {
      title: "Collaboration",
      description: "Art is a conversation. I work closely with clients to bring their dreams to life.",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Excellence",
      description: "From concept to completion, I maintain the highest standards in every project.",
      icon: <Star className="h-8 w-8" />,
    },
    {
      title: "Community",
      description: "Art has the power to unite and inspire. I'm committed to giving back through my work.",
      icon: <Award className="h-8 w-8" />,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Gallery Owner",
      quote: "Working with Dagil has been transformative. Their artistic vision and professionalism are unmatched.",
      image: "/placeholder.svg?height=80&width=80&text=Sarah",
    },
    {
      name: "Marcus Chen",
      role: "Restaurant Owner",
      quote: "The mural completely changed our space. Customers love it, and it's become our signature feature.",
      image: "/placeholder.svg?height=80&width=80&text=Marcus",
    },
    {
      name: "Elena Rodriguez",
      role: "Art Collector",
      quote: "Each piece is a masterpiece. The attention to detail and emotional depth is extraordinary.",
      image: "/placeholder.svg?height=80&width=80&text=Elena",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <div className="p-2 rounded-lg bg-primary/10">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <span className="text-gradient">Dagil Arts</span>
          </Link>
          <EnhancedButton variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </EnhancedButton>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          subtitle="✨ Meet the Artist"
          title="Hello, I'm Dagil"
          description="A passionate artist dedicated to transforming spaces through meaningful art. With over 10 years of experience, I specialize in creating custom murals and canvas paintings that tell stories and connect with people."
          primaryAction={
            <EnhancedButton size="xl" variant="default" asChild>
              <Link href="#story">
                Discover My Story
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </EnhancedButton>
          }
          secondaryAction={
            <EnhancedButton size="xl" variant="outline" asChild>
              <Link href="#contact">Let's Connect</Link>
            </EnhancedButton>
          }
          backgroundImage="/placeholder.svg?height=800&width=1200&text=Artist+Portrait"
          className="gradient-hero"
        />

        {/* Personal Story Section */}
        <section id="story" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <AnimatedSection animation="slide-in-left">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <Heart className="h-4 w-4" />
                      My Journey
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                      From Canvas to Community
                    </h2>
                  </div>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      My artistic journey began in childhood, sketching everything I could see. What started as a hobby
                      became a calling when I realized art's power to transform not just spaces, but lives.
                    </p>
                    <p>
                      After graduating from Fine Arts Academy, I spent years exploring different mediums and styles. The
                      breakthrough came when I painted my first mural – seeing how it brought a community together
                      changed everything.
                    </p>
                    <p>
                      Today, through Dagil Arts, I combine technical expertise with emotional storytelling, creating
                      pieces that resonate with viewers long after they've left the room.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-primary/5">
                      <div className="text-2xl font-bold text-primary">150+</div>
                      <div className="text-sm text-muted-foreground">Projects Completed</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-primary/5">
                      <div className="text-2xl font-bold text-primary">10+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-in-right" delay={200}>
                <div className="relative">
                  <div className="relative h-[600px] overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src="/placeholder.svg?height=800&width=600&text=Artist+Working"
                      alt="Artist at work"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/20 rounded-full animate-float" />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/30 rounded-full animate-float delay-300" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Interactive Timeline */}
        <section className="py-16 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">My Artistic Journey</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Key milestones that shaped my career and artistic vision
              </p>
            </AnimatedSection>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <AnimatedSection key={index} delay={index * 100}>
                    <div
                      className={`flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="flex-1 space-y-4">
                        <EnhancedCard
                          className={`p-6 cursor-pointer transition-all duration-300 ${
                            activeTimeline === index ? "ring-2 ring-primary shadow-lg" : ""
                          }`}
                          onClick={() => setActiveTimeline(index)}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Badge variant="default" className="text-sm">
                                {item.year}
                              </Badge>
                              <h3 className="text-xl font-semibold">{item.title}</h3>
                            </div>
                            <p className="text-muted-foreground">{item.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {item.achievements.map((achievement, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </EnhancedCard>
                      </div>

                      {/* Timeline dot */}
                      <div className="relative z-10 hidden md:block">
                        <div
                          className={`w-4 h-4 rounded-full border-4 border-background transition-colors duration-300 ${
                            activeTimeline === index ? "bg-primary" : "bg-primary/50"
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="relative h-[300px] overflow-hidden rounded-2xl shadow-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12">
            <AnimatedSection className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Skills & Expertise</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Years of practice and dedication have honed these core competencies
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2">
              {skills.map((skill, index) => (
                <AnimatedSection key={skill.name} delay={index * 100}>
                  <EnhancedCard className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">{skill.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{skill.name}</h3>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </EnhancedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Interests */}
        <section className="py-16 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Beyond the Canvas</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The interests and passions that inspire my artistic vision
              </p>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interests.map((interest, index) => (
                <AnimatedSection key={interest.name} delay={index * 100}>
                  <EnhancedCard className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                    <div className="space-y-4">
                      <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {interest.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{interest.name}</h3>
                      <p className="text-sm text-muted-foreground">{interest.description}</p>
                    </div>
                  </EnhancedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Values & Philosophy */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12">
            <AnimatedSection className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">My Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every project and client relationship
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2">
              {values.map((value, index) => (
                <AnimatedSection key={value.title} delay={index * 150}>
                  <EnhancedCard className="p-8 h-full">
                    <div className="space-y-4">
                      <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary">{value.icon}</div>
                      <h3 className="text-xl font-semibold">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </EnhancedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container space-y-12">
            <AnimatedSection className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">What People Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Testimonials from clients who've experienced the Dagil Arts difference
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection key={testimonial.name} delay={index * 150}>
                  <EnhancedCard className="p-6 h-full">
                    <div className="space-y-4">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <blockquote className="text-muted-foreground italic leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-3 pt-4 border-t">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </EnhancedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Connect */}
        <section id="contact" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection className="text-center space-y-8 mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Let's Connect</h2>
                <p className="text-lg text-muted-foreground">
                  Ready to start your art journey? I'd love to hear about your vision and discuss how we can bring it to
                  life.
                </p>
              </AnimatedSection>

              <div className="grid gap-8 md:grid-cols-2">
                <AnimatedSection animation="slide-in-left">
                  <EnhancedCard className="p-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Get in Touch</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-sm text-muted-foreground">hello@dagilarts.com</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Phone</div>
                            <div className="text-sm text-muted-foreground">(555) 123-4567</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Studio</div>
                            <div className="text-sm text-muted-foreground">123 Art Street, Creative District</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </EnhancedCard>
                </AnimatedSection>

                <AnimatedSection animation="slide-in-right" delay={200}>
                  <EnhancedCard className="p-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Follow My Journey</h3>
                      <p className="text-muted-foreground">
                        Stay updated with my latest projects, behind-the-scenes content, and artistic insights.
                      </p>
                      <div className="flex gap-4">
                        <EnhancedButton variant="outline" size="sm" className="flex-1">
                          <Instagram className="h-4 w-4 mr-2" />
                          Instagram
                        </EnhancedButton>
                        <EnhancedButton variant="outline" size="sm" className="flex-1">
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </EnhancedButton>
                      </div>
                      <EnhancedButton variant="default" size="lg" className="w-full" asChild>
                        <Link href="/#contact">Start a Project</Link>
                      </EnhancedButton>
                    </div>
                  </EnhancedCard>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dagil Arts. Crafted with passion and creativity.
          </p>
        </div>
      </footer>
    </div>
  )
}
