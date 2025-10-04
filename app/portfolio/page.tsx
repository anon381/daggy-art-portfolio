"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Share2,
  Filter,
  Grid3X3,
  Grid2X2,
  List,
  Search,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

// Sample artwork data with enhanced properties
const artworks = [
  {
    id: 1,
    title: "Urban Jungle",
    type: "mural",
    category: "commercial",
    description:
      "A vibrant mural depicting the harmony between urban life and nature. This piece transforms a concrete wall into a living ecosystem.",
    image: "/placeholder.svg?height=800&width=1200&text=Urban Jungle",
    client: "City Park Cafe",
    year: 2023,
    size: "4m x 3m",
    duration: "2 weeks",
    materials: ["Acrylic paint", "Weather-resistant coating"],
    tags: ["nature", "urban", "colorful", "large-scale"],
    featured: true,
    likes: 127,
    views: 1543,
  },
  {
    id: 2,
    title: "Serenity",
    type: "canvas",
    category: "abstract",
    description:
      "An abstract canvas painting exploring themes of peace and tranquility through flowing forms and calming colors.",
    image: "/placeholder.svg?height=800&width=1200&text=Serenity",
    client: "Private Collection",
    year: 2022,
    size: "80cm x 60cm",
    duration: "1 week",
    materials: ["Oil paint", "Canvas"],
    tags: ["abstract", "peaceful", "blue", "meditation"],
    featured: false,
    likes: 89,
    views: 892,
  },
  {
    id: 3,
    title: "Ocean Dreams",
    type: "canvas",
    category: "nature",
    description:
      "A canvas painting capturing the mesmerizing beauty of ocean waves with dynamic brushstrokes and vivid blues.",
    image: "/placeholder.svg?height=800&width=1200&text=Ocean Dreams",
    client: "Coastal Resort",
    year: 2023,
    size: "120cm x 90cm",
    duration: "10 days",
    materials: ["Acrylic paint", "Canvas", "Texture medium"],
    tags: ["ocean", "waves", "blue", "movement"],
    featured: true,
    likes: 156,
    views: 2103,
  },
  {
    id: 4,
    title: "Community Spirit",
    type: "mural",
    category: "public",
    description:
      "A community mural celebrating local heritage and diversity, created with input from neighborhood residents.",
    image: "/placeholder.svg?height=800&width=1200&text=Community Spirit",
    client: "Community Center",
    year: 2021,
    size: "6m x 4m",
    duration: "3 weeks",
    materials: ["Acrylic paint", "Anti-graffiti coating"],
    tags: ["community", "heritage", "colorful", "collaborative"],
    featured: false,
    likes: 203,
    views: 3421,
  },
  {
    id: 5,
    title: "Sunset Reflections",
    type: "canvas",
    category: "nature",
    description: "A canvas painting depicting a breathtaking sunset over still waters with warm, golden tones.",
    image: "/placeholder.svg?height=800&width=1200&text=Sunset Reflections",
    client: "Private Residence",
    year: 2022,
    size: "100cm x 70cm",
    duration: "1 week",
    materials: ["Oil paint", "Canvas"],
    tags: ["sunset", "reflection", "warm", "peaceful"],
    featured: false,
    likes: 94,
    views: 1287,
  },
  {
    id: 6,
    title: "Corporate Vision",
    type: "mural",
    category: "commercial",
    description:
      "A corporate mural representing the company's values and vision for the future through modern geometric forms.",
    image: "/placeholder.svg?height=800&width=1200&text=Corporate Vision",
    client: "Tech Innovations Inc.",
    year: 2023,
    size: "5m x 2.5m",
    duration: "2 weeks",
    materials: ["Acrylic paint", "Primer"],
    tags: ["corporate", "modern", "geometric", "professional"],
    featured: true,
    likes: 78,
    views: 1156,
  },
]

type ViewMode = "grid-large" | "grid-small" | "list"

export default function PortfolioPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof artworks)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [viewMode, setViewMode] = useState<ViewMode>("grid-large")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [yearRange, setYearRange] = useState([2021, 2023])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("portfolio-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage
  const toggleFavorite = (artworkId: number) => {
    const newFavorites = favorites.includes(artworkId)
      ? favorites.filter((id) => id !== artworkId)
      : [...favorites, artworkId]

    setFavorites(newFavorites)
    localStorage.setItem("portfolio-favorites", JSON.stringify(newFavorites))
  }

  // Filter artworks based on all criteria
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || artwork.category === categoryFilter
    const matchesType = typeFilter === "all" || artwork.type === typeFilter
    const matchesYear = yearFilter === "all" || artwork.year.toString() === yearFilter
    const matchesYearRange = artwork.year >= yearRange[0] && artwork.year <= yearRange[1]
    const matchesFeatured = !showFeaturedOnly || artwork.featured

    return matchesSearch && matchesCategory && matchesType && matchesYear && matchesYearRange && matchesFeatured
  })

  // Sort artworks
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return b.year - a.year
      case "oldest":
        return a.year - b.year
      case "a-z":
        return a.title.localeCompare(b.title)
      case "z-a":
        return b.title.localeCompare(a.title)
      case "most-liked":
        return b.likes - a.likes
      case "most-viewed":
        return b.views - a.views
      default:
        return 0
    }
  })

  // Get unique years for the filter
  const years = [...new Set(artworks.map((artwork) => artwork.year))].sort((a, b) => b - a)

  // Handle navigation between artworks in the modal
  const handlePrevArtwork = () => {
    if (!selectedArtwork) return
    const currentIndex = sortedArtworks.findIndex((artwork) => artwork.id === selectedArtwork.id)
    if (currentIndex > 0) {
      setSelectedArtwork(sortedArtworks[currentIndex - 1])
    } else {
      setSelectedArtwork(sortedArtworks[sortedArtworks.length - 1])
    }
  }

  const handleNextArtwork = () => {
    if (!selectedArtwork) return
    const currentIndex = sortedArtworks.findIndex((artwork) => artwork.id === selectedArtwork.id)
    if (currentIndex < sortedArtworks.length - 1) {
      setSelectedArtwork(sortedArtworks[currentIndex + 1])
    } else {
      setSelectedArtwork(sortedArtworks[0])
    }
  }

  const handleShare = async (artwork: (typeof artworks)[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: artwork.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setTypeFilter("all")
    setYearFilter("all")
    setYearRange([2021, 2023])
    setShowFeaturedOnly(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-earth">
            <span className="text-primary">Dagil</span> Arts
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild className="bg-earth text-white">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-earth">
              Interactive Portfolio
            </h1>
            <p className="text-muted-foreground">
              Explore our complete collection of custom murals and canvas paintings
            </p>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[280px_1fr]">
            {/* Filters sidebar */}
            <div className={`space-y-6 ${showFilters ? "block" : "hidden md:block"} bg-earth opacity-90`}>
              <Card className="bg-earth">
                <CardContent className="p-6 space-y-4 bg-earth">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-earth">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="bg-earth text-white">
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-2 hidden md:block">
                    <Label htmlFor="search" className="text-earth">
                      Search
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search artworks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured-only"
                      checked={showFeaturedOnly}
                      onCheckedChange={setShowFeaturedOnly}
                      className="bg-earth"
                    />
                    <Label htmlFor="featured-only" className="text-sm text-earth">
                      Featured only
                    </Label>
                  </div>

                  <Tabs defaultValue="basic" className="w-full bg-earth">
                    <TabsList className="grid w-full grid-cols-2 bg-earth">
                      <TabsTrigger value="basic" className="bg-earth text-white">
                        Basic
                      </TabsTrigger>
                      <TabsTrigger value="advanced" className="bg-earth text-white">
                        Advanced
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4 bg-earth">
                      <div className="space-y-2">
                        <Label htmlFor="type-filter" className="text-earth">
                          Type
                        </Label>
                        <Select value={typeFilter} onValueChange={setTypeFilter} className="bg-earth text-white">
                          <SelectTrigger id="type-filter" className="bg-earth text-white">
                            <SelectValue placeholder="Select type" className="bg-earth text-white" />
                          </SelectTrigger>
                          <SelectContent className="bg-earth text-white">
                            <SelectItem value="all" className="bg-earth text-white">
                              All Types
                            </SelectItem>
                            <SelectItem value="mural" className="bg-earth text-white">
                              Murals
                            </SelectItem>
                            <SelectItem value="canvas" className="bg-earth text-white">
                              Canvas
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category-filter" className="text-earth">
                          Category
                        </Label>
                        <Select
                          value={categoryFilter}
                          onValueChange={setCategoryFilter}
                          className="bg-earth text-white"
                        >
                          <SelectTrigger id="category-filter" className="bg-earth text-white">
                            <SelectValue placeholder="Select category" className="bg-earth text-white" />
                          </SelectTrigger>
                          <SelectContent className="bg-earth text-white">
                            <SelectItem value="all" className="bg-earth text-white">
                              All Categories
                            </SelectItem>
                            <SelectItem value="abstract" className="bg-earth text-white">
                              Abstract
                            </SelectItem>
                            <SelectItem value="nature" className="bg-earth text-white">
                              Nature
                            </SelectItem>
                            <SelectItem value="commercial" className="bg-earth text-white">
                              Commercial
                            </SelectItem>
                            <SelectItem value="residential" className="bg-earth text-white">
                              Residential
                            </SelectItem>
                            <SelectItem value="public" className="bg-earth text-white">
                              Public
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-4 bg-earth">
                      <div className="space-y-2">
                        <Label htmlFor="year-filter" className="text-earth">
                          Specific Year
                        </Label>
                        <Select value={yearFilter} onValueChange={setYearFilter} className="bg-earth text-white">
                          <SelectTrigger id="year-filter" className="bg-earth text-white">
                            <SelectValue placeholder="Select year" className="bg-earth text-white" />
                          </SelectTrigger>
                          <SelectContent className="bg-earth text-white">
                            <SelectItem value="all" className="bg-earth text-white">
                              All Years
                            </SelectItem>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()} className="bg-earth text-white">
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-earth">
                          Year Range: {yearRange[0]} - {yearRange[1]}
                        </Label>
                        <Slider
                          value={yearRange}
                          onValueChange={setYearRange}
                          min={2021}
                          max={2023}
                          step={1}
                          className="w-full bg-earth"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-2">
                    <Label htmlFor="sort-order" className="text-earth">
                      Sort By
                    </Label>
                    <Select value={sortOrder} onValueChange={setSortOrder} className="bg-earth text-white">
                      <SelectTrigger id="sort-order" className="bg-earth text-white">
                        <SelectValue placeholder="Sort by" className="bg-earth text-white" />
                      </SelectTrigger>
                      <SelectContent className="bg-earth text-white">
                        <SelectItem value="newest" className="bg-earth text-white">
                          Newest First
                        </SelectItem>
                        <SelectItem value="oldest" className="bg-earth text-white">
                          Oldest First
                        </SelectItem>
                        <SelectItem value="a-z" className="bg-earth text-white">
                          A-Z
                        </SelectItem>
                        <SelectItem value="z-a" className="bg-earth text-white">
                          Z-A
                        </SelectItem>
                        <SelectItem value="most-liked" className="bg-earth text-white">
                          Most Liked
                        </SelectItem>
                        <SelectItem value="most-viewed" className="bg-earth text-white">
                          Most Viewed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-earth">
                <CardContent className="p-6 bg-earth">
                  <h3 className="font-medium mb-2 text-earth">Need a Custom Piece?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact us to discuss your vision for a custom mural or canvas painting.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/#contact">Request a Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Gallery content */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedArtworks.length} of {artworks.length} artworks
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid-large" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid-large")}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid-small" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid-small")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {sortedArtworks.length > 0 ? (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid-large"
                      ? "grid-cols-1 sm:grid-cols-2"
                      : viewMode === "grid-small"
                        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-1"
                  }`}
                >
                  {sortedArtworks.map((artwork) => (
                    <Card
                      key={artwork.id}
                      className={`group cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-earth-gradient ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                      onClick={() => setSelectedArtwork(artwork)}
                    >
                      <div
                        className={`${
                          viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-[4/3] w-full"
                        } overflow-hidden`}
                      >
                        <Image
                          src={artwork.image || "/placeholder.svg"}
                          alt={artwork.title}
                          width={600}
                          height={450}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {artwork.featured && (
                          <Badge className="absolute top-2 left-2 bg-primary">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(artwork.id)
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${favorites.includes(artwork.id) ? "fill-current text-red-500" : ""}`}
                          />
                        </Button>
                      </div>

                      <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-earth">{artwork.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs capitalize">
                                {artwork.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs capitalize">
                                {artwork.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{artwork.year}</span>
                            </div>
                          </div>
                        </div>

                        <p
                          className={`text-sm text-muted-foreground mt-2 ${
                            viewMode === "grid-small" ? "line-clamp-2" : "line-clamp-3"
                          }`}
                        >
                          {artwork.description}
                        </p>

                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <span>{artwork.client}</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {artwork.likes}
                            </span>
                            <span>{artwork.views} views</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {artwork.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {artwork.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{artwork.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>

                      <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <span className="text-white font-medium">View Details</span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground mb-4">No artworks found matching your filters.</p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Artwork detail modal */}
        <Dialog open={!!selectedArtwork} onOpenChange={(open) => !open && setSelectedArtwork(null)}>
          <DialogContent className="max-w-6xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto bg-earth">
            <div className="relative">
              {selectedArtwork && (
                <Image
                  src={selectedArtwork.image || "/placeholder.svg"}
                  alt={selectedArtwork.title}
                  width={1200}
                  height={800}
                  className="w-full object-cover max-h-[50vh]"
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-black/20 hover:bg-black/40 text-white"
                onClick={() => setSelectedArtwork(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="absolute left-2 right-2 bottom-2 flex justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/20 hover:bg-black/40 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevArtwork()
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/20 hover:bg-black/40 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      selectedArtwork && toggleFavorite(selectedArtwork.id)
                    }}
                  >
                    <Heart
                      className={`h-5 w-5 ${selectedArtwork && favorites.includes(selectedArtwork.id) ? "fill-current text-red-500" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/20 hover:bg-black/40 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      selectedArtwork && handleShare(selectedArtwork)
                    }}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/20 hover:bg-black/40 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNextArtwork()
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {selectedArtwork && (
              <div className="p-6 bg-earth">
                <DialogHeader className="bg-earth">
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-2xl text-earth">{selectedArtwork.title}</DialogTitle>
                      <DialogDescription className="mt-2">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="capitalize">{selectedArtwork.type}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {selectedArtwork.category}
                          </Badge>
                          <Badge variant="secondary">{selectedArtwork.year}</Badge>
                          {selectedArtwork.featured && (
                            <Badge className="bg-primary">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </DialogDescription>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {selectedArtwork.likes}
                        </span>
                        <span>{selectedArtwork.views} views</span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="mt-6 space-y-6 bg-earth">
                  <p className="text-lg text-earth">{selectedArtwork.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-earth">
                    <div className="space-y-4 bg-earth">
                      <h4 className="font-semibold text-earth">Project Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm bg-earth">
                        <div>
                          <span className="font-medium text-earth">Client:</span>
                          <p className="text-muted-foreground">{selectedArtwork.client}</p>
                        </div>
                        <div>
                          <span className="font-medium text-earth">Year:</span>
                          <p className="text-muted-foreground">{selectedArtwork.year}</p>
                        </div>
                        <div>
                          <span className="font-medium text-earth">Size:</span>
                          <p className="text-muted-foreground">{selectedArtwork.size}</p>
                        </div>
                        <div>
                          <span className="font-medium text-earth">Duration:</span>
                          <p className="text-muted-foreground">{selectedArtwork.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 bg-earth">
                      <h4 className="font-semibold text-earth">Materials Used</h4>
                      <div className="flex flex-wrap gap-2 bg-earth">
                        {selectedArtwork.materials.map((material) => (
                          <Badge key={material} variant="outline">
                            {material}
                          </Badge>
                        ))}
                      </div>

                      <h4 className="font-semibold text-earth">Tags</h4>
                      <div className="flex flex-wrap gap-2 bg-earth">
                        {selectedArtwork.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center gap-4 bg-earth">
                    <Button asChild>
                      <Link href="/#contact">Request Similar Work</Link>
                    </Button>
                    <Button variant="outline" onClick={() => selectedArtwork && handleShare(selectedArtwork)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <footer className="border-t bg-muted/50 bg-earth">
        <div className="container py-6 text-center text-sm text-gray-500 bg-earth">
          <p className="text-earth">© {new Date().getFullYear()} Dagil Arts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
