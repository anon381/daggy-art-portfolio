import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, ChevronRight, Mail, MapPin, Phone, Star, Users, Award, Palette } from "lucide-react"

import { EnhancedButton } from "@/components/ui/enhanced-button"
import ThemeToggle from "@/components/ui/theme-toggle"
import MobileMenu from "@/components/ui/mobile-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedCard, EnhancedCardContent } from "@/components/ui/enhanced-card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeroSection } from "@/components/ui/hero-section"
import { AnimatedSection } from "@/components/ui/animated-section"
import { StatsSection } from "@/components/ui/stats-section"

export default function Home() {
  const stats = [
    { value: "150+", label: "Projects Completed", icon: <Award className="h-6 w-6" /> },
    { value: "10+", label: "Years Experience", icon: <Star className="h-6 w-6" /> },
    { value: "98%", label: "Client Satisfaction", icon: <Users className="h-6 w-6" /> },
    { value: "50+", label: "Happy Clients", icon: <Palette className="h-6 w-6" /> },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold hover:scale-105 transition-transform text-primary"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <span className="text-gradient">Dagil Arts</span>
          </Link>

          <nav className="hidden md:flex gap-8 justify-center mx-auto">
              {[
                { href: "/#portfolio", label: "Portfolio" },
                { href: "/#testimonials", label: "Testimonials" },
                { href: "/#pricing", label: "Pricing" },
                { href: "/#contact", label: "Contact" },
                { href: "/about", label: "About" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                className="text-sm font-medium hover:text-primary transition-all duration-300 relative group text-black dark:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <MobileMenu />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <HeroSection
          subtitle="✨ Custom Art & Murals"
          title="Bring Your Walls to Life"
          description="We specialize in turning personal stories, brands, and environments into living art on canvas or wall. Each piece is crafted with passion and attention to detail."
          primaryAction={
            <EnhancedButton size="xl" variant="default" asChild className="text-background">
              <Link href="#contact">
                Start Your Art Journey
                <ArrowRight className="ml-2 h-5 w-5 text-background" />
              </Link>
            </EnhancedButton>
          }
          secondaryAction={
            <EnhancedButton size="xl" variant="outline" asChild className="text-primary">
              <Link href="#portfolio">View Portfolio</Link>
            </EnhancedButton>
          }
          className="gradient-hero"
        >
          <AnimatedSection animation="slide-in-left" delay={600}>
            <StatsSection stats={stats} />
          </AnimatedSection>
        </HeroSection>

        {/* Enhanced Portfolio Section */}
        <section id="portfolio" className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12">
            <AnimatedSection className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary">
                <span className="text-gradient">Portfolio Gallery</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our collection of custom murals and canvas paintings, each telling a unique story
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Tabs defaultValue="all" className="w-full">
                <div className="flex justify-center mb-12">
                  <TabsList className="grid w-full max-w-md grid-cols-3 glass p-1">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-primary data-[state=active]:text-background"
                    >
                      All Works
                    </TabsTrigger>
                    <TabsTrigger
                      value="murals"
                      className="data-[state=active]:bg-primary data-[state=active]:text-background"
                    >
                      Murals
                    </TabsTrigger>
                    <TabsTrigger
                      value="canvas"
                      className="data-[state=active]:bg-primary data-[state=active]:text-background"
                    >
                      Canvas
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                      <AnimatedSection key={item} delay={index * 100}>
                        <EnhancedCard className="group overflow-hidden card">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={`/ceholder-svg-height-600-width-800-text-artwork-.jpg?height=600&width=800&text=Artwork ${item}`}
                              alt={`Artwork ${item}`}
                              width={800}
                              height={600}
                              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                <h3 className="text-xl font-bold text-background mb-2">Artwork Title {item}</h3>
                                <p className="text-sm text-background/80">
                                  {item % 2 === 0 ? "Canvas Painting" : "Wall Mural"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </EnhancedCard>
                      </AnimatedSection>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="murals" className="mt-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 3, 5].map((item, index) => (
                      <AnimatedSection key={item} delay={index * 100}>
                        <EnhancedCard className="group overflow-hidden card">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={`/ceholder-svg-height-600-width-800-text-mural-.jpg?height=600&width=800&text=Mural ${item}`}
                              alt={`Mural ${item}`}
                              width={800}
                              height={600}
                              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                <h3 className="text-xl font-bold text-background mb-2">Mural Title {item}</h3>
                                <p className="text-sm text-background/80">Wall Mural</p>
                              </div>
                            </div>
                          </div>
                        </EnhancedCard>
                      </AnimatedSection>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="canvas" className="mt-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[2, 4, 6].map((item, index) => (
                      <AnimatedSection key={item} delay={index * 100}>
                        <EnhancedCard className="group overflow-hidden card">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={`/ceholder-svg-height-600-width-800-text-canvas-.jpg?height=600&width=800&text=Canvas ${item}`}
                              alt={`Canvas ${item}`}
                              width={800}
                              height={600}
                              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                                <h3 className="text-xl font-bold text-background mb-2">Canvas Title {item}</h3>
                                <p className="text-sm text-background/80">Canvas Painting</p>
                              </div>
                            </div>
                          </div>
                        </EnhancedCard>
                      </AnimatedSection>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedSection>

            <AnimatedSection delay={400} className="flex justify-center">
              <EnhancedButton variant="default" size="lg" asChild className="text-background">
                <Link href="/portfolio">
                  View More Works
                  <ChevronRight className="ml-2 h-5 w-5 text-background" />
                </Link>
              </EnhancedButton>
            </AnimatedSection>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section id="about" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <AnimatedSection animation="slide-in-left">
                <div className="relative">
                  <div className="relative h-[600px] overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src="/placeholder.svg?height=1000&width=800&text=Artist Photo"
                      alt="About the Artist"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/20 rounded-full animate-float" />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/30 rounded-full animate-float delay-300" />
                </div>
              </AnimatedSection>

              <div className="flex flex-col justify-center space-y-8">
                <AnimatedSection animation="slide-in-right" delay={200}>
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <Star className="h-4 w-4 text-primary" />
                      Passionate Artist
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                      <span className="text-gradient">About the Artist</span>
                    </h2>
                    <p className="text-lg text-primary font-medium">Bringing stories to life through art</p>
                  </div>
                </AnimatedSection>

                <div className="space-y-6">
                  {[
                    "Hello! I'm the artist behind Dagil Arts, with over 10 years of experience transforming blank spaces into vibrant works of art. My journey began with a simple canvas and has evolved into creating large-scale murals for businesses, homes, and public spaces.",
                    "My style blends realism with abstract elements, creating pieces that tell stories and evoke emotions. I believe that art should not only be beautiful but also meaningful, connecting with viewers on a personal level.",
                    "Whether it's a small canvas for your home or a large mural for your business, I approach each project with the same passion and dedication, working closely with clients to bring their vision to life.",
                  ].map((text, index) => (
                    <AnimatedSection key={index} animation="slide-in-right" delay={300 + index * 100}>
                      <p className="text-muted-foreground leading-relaxed">{text}</p>
                    </AnimatedSection>
                  ))}
                </div>

                <AnimatedSection animation="slide-in-right" delay={600}>
                  <EnhancedButton variant="default" size="lg" asChild className="text-background">
                    <Link href="/about">Learn More About Me</Link>
                  </EnhancedButton>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12">
            <AnimatedSection className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary">
                <span className="text-gradient">What Clients Say</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from those who've experienced the magic of custom art
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Cafe Owner",
                  project: "Botanical Cafe Mural",
                  quote:
                    "Dagil transformed our cafe into a botanical paradise. Customers spend hours admiring the mural, and it's become our signature feature. The attention to detail is extraordinary.",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  role: "Homeowner",
                  project: "Family Portrait Canvas",
                  quote:
                    "The custom family portrait captures our essence beautifully. It's not just a painting—it's a treasured family heirloom that tells our story in the most artistic way.",
                  rating: 5,
                },
                {
                  name: "Lisa Rodriguez",
                  role: "Business Owner",
                  project: "Corporate Lobby Mural",
                  quote:
                    "Our office lobby was transformed into an inspiring space that reflects our company values. The collaborative process was seamless, and the result exceeded our expectations.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <AnimatedSection key={testimonial.name} delay={index * 150}>
                  <EnhancedCard variant="glass" className="h-full card">
                    <EnhancedCardContent className="p-8 h-full flex flex-col">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>

                      <blockquote className="text-muted-foreground leading-relaxed flex-1 mb-6 italic">
                        "{testimonial.quote}"
                      </blockquote>

                      <div className="space-y-2">
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-primary font-medium">Project: {testimonial.project}</div>
                      </div>
                    </EnhancedCardContent>
                  </EnhancedCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12">
            <AnimatedSection className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary">
                <span className="text-gradient">Investment Guide</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transparent pricing for our most popular art services
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Small Canvas",
                  price: "$299",
                  description: "Perfect for personal spaces and meaningful gifts",
                  features: [
                    "30×40 cm (12×16 inches)",
                    "Premium canvas & paints",
                    "Custom design process",
                    "Ready to hang",
                    "2-week completion",
                  ],
                  popular: false,
                },
                {
                  title: "Medium Mural",
                  price: "$899",
                  description: "Transform a feature wall in your space",
                  features: [
                    "Up to 2×3 meters",
                    "Professional-grade materials",
                    "Design consultation",
                    "Surface preparation",
                    "3-week completion",
                  ],
                  popular: true,
                },
                {
                  title: "Custom Project",
                  price: "Custom",
                  description: "Large-scale and specialized commissions",
                  features: [
                    "Any size or complexity",
                    "Commercial-grade materials",
                    "Comprehensive planning",
                    "Project management",
                    "Timeline varies",
                  ],
                  popular: false,
                },
              ].map((plan, index) => (
                <AnimatedSection key={plan.title} delay={index * 150}>
                  <EnhancedCard
                    variant={plan.popular ? "elevated" : "default"}
                    className={`relative h-full ${plan.popular ? "border-primary/50 shadow-xl" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="bg-gradient-to-r from-primary to-primary/80 text-background px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </div>
                      </div>
                    )}

                    <EnhancedCardContent className="p-8 h-full flex flex-col">
                      <div className="space-y-4 flex-1">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{plan.title}</h3>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-3xl font-bold text-primary">{plan.price}</span>
                            {plan.price !== "Custom" && (
                              <span className="text-muted-foreground text-sm">starting from</span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">{plan.description}</p>
                        </div>

                        <ul className="space-y-3 flex-1">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <EnhancedButton className="w-full mt-6" variant={plan.popular ? "default" : "outline"} asChild>
                        <Link href="#contact">Get Started</Link>
                      </EnhancedButton>
                    </EnhancedCardContent>
                  </EnhancedCard>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={400}>
              <div className="max-w-2xl mx-auto text-center">
                <EnhancedCard variant="glass" className="card">
                  <EnhancedCardContent className="p-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Note:</strong> Final pricing depends on complexity, materials,
                      and location. All projects include a detailed consultation to understand your vision and ensure
                      the perfect result.
                    </p>
                  </EnhancedCardContent>
                </EnhancedCard>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid gap-16 lg:grid-cols-2">
              <div className="space-y-8">
                <AnimatedSection animation="slide-in-left">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <Mail className="h-4 w-4 text-primary" />
                      Let's Connect
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                      <span className="text-gradient">Start Your Art Journey</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Ready to transform your space? Let's discuss your vision and create something beautiful together.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="slide-in-left" delay={200}>
                  <EnhancedCard variant="glass" className="card">
                    <EnhancedCardContent className="p-8">
                      <form className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="first-name" className="text-sm font-medium text-primary">
                              First name
                            </Label>
                            <Input
                              id="first-name"
                              placeholder="Your first name"
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name" className="text-sm font-medium text-primary">
                              Last name
                            </Label>
                            <Input
                              id="last-name"
                              placeholder="Your last name"
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-primary">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="art-type" className="text-sm font-medium text-primary">
                            Type of Art
                          </Label>
                          <Select>
                            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 text-primary">
                              <SelectValue placeholder="What type of art interests you?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="canvas">Canvas Painting</SelectItem>
                              <SelectItem value="mural">Wall Mural</SelectItem>
                              <SelectItem value="both">Both Canvas & Mural</SelectItem>
                              <SelectItem value="other">Something Else</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-sm font-medium text-primary">
                            Budget Range
                          </Label>
                          <Select>
                            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 text-primary">
                              <SelectValue placeholder="What's your budget range?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-500">Under $500</SelectItem>
                              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                              <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                              <SelectItem value="2000-plus">$2,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-sm font-medium text-primary">
                            Tell us about your vision
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your space, style preferences, themes, or any specific ideas you have in mind..."
                            className="min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-primary/20 resize-none"
                          />
                        </div>

                        <EnhancedButton type="submit" variant="default" size="lg" className="w-full text-background">
                          Send Message
                        </EnhancedButton>
                      </form>
                    </EnhancedCardContent>
                  </EnhancedCard>
                </AnimatedSection>
              </div>

              <div className="space-y-8">
                <AnimatedSection animation="slide-in-right">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-primary">Get in Touch</h3>

                    <div className="space-y-4">
                      {[
                        {
                          icon: Mail,
                          title: "Email",
                          content: "hello@dagilarts.com",
                          description: "Best for detailed inquiries",
                        },
                        {
                          icon: Phone,
                          title: "Phone",
                          content: "(555) 123-4567",
                          description: "Call for immediate questions",
                        },
                        {
                          icon: MapPin,
                          title: "Studio",
                          content: "123 Art Street, Creative District",
                          description: "Visit by appointment",
                        },
                      ].map((item, index) => (
                        <EnhancedCard key={item.title} variant="glass" className="hover-lift card">
                          <EnhancedCardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="p-3 rounded-xl bg-primary/10">
                                <item.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground">{item.title}</h4>
                                <p className="text-foreground font-medium">{item.content}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          </EnhancedCardContent>
                        </EnhancedCard>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="slide-in-right" delay={200}>
                  <EnhancedCard variant="glass" className="card">
                    <EnhancedCardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-primary">Studio Hours</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monday - Friday</span>
                          <span className="font-medium text-primary">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Saturday</span>
                          <span className="font-medium text-primary">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="font-medium text-primary">By appointment</span>
                        </div>
                      </div>
                    </EnhancedCardContent>
                  </EnhancedCard>
                </AnimatedSection>

                <AnimatedSection animation="slide-in-right" delay={300}>
                  <div className="relative h-[300px] overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src="/placeholder.svg?height=600&width=800&text=Studio Location"
                      alt="Studio Location"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">Visit Our Studio</p>
                      <p className="text-sm opacity-90">See works in progress</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedSection>
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-gradient">Dagil Arts</span>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Creating meaningful art that transforms spaces and tells stories. Every piece is crafted with passion
                  and attention to detail.
                </p>
              </div>
            </AnimatedSection>

            {[
              {
                title: "Services",
                links: [
                  { href: "#", label: "Canvas Paintings" },
                  { href: "#", label: "Wall Murals" },
                  { href: "#", label: "Commercial Projects" },
                  { href: "#", label: "Residential Art" },
                ],
              },
              {
                title: "Company",
                links: [
                  { href: "/about", label: "About Artist" },
                  { href: "#portfolio", label: "Portfolio" },
                  { href: "#testimonials", label: "Testimonials" },
                  { href: "#contact", label: "Contact" },
                ],
              },
              {
                title: "Connect",
                links: [
                  { href: "#", label: "Instagram" },
                  { href: "#", label: "Facebook" },
                  { href: "#", label: "Pinterest" },
                  { href: "#", label: "Newsletter" },
                ],
              },
            ].map((section, sectionIndex) => (
              <AnimatedSection key={section.title} delay={100 + sectionIndex * 100}>
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <nav className="flex flex-col gap-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-12 pt-8 border-t text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Dagil Arts. Crafted with love and creativity.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  )
}
