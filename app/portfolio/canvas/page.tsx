"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
	ArrowLeft,
	ChevronLeft,
	ChevronRight,
	Grid2X2,
	Grid3X3,
	Heart,
	List,
	Share2,
	Star,
	X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

import { artworks as allArtworks } from "@/lib/artworks"

const canvasArtworks = allArtworks.filter((artwork) => artwork.type === "canvas")
const availableTypes = Array.from(new Set(canvasArtworks.map((artwork) => artwork.type)))
const availableCategories = Array.from(new Set(canvasArtworks.map((artwork) => artwork.category)))
const yearValues = canvasArtworks.map((artwork) => artwork.year)
const fallbackYear = new Date().getFullYear()
const MIN_YEAR = yearValues.length > 0 ? Math.min(...yearValues) : fallbackYear
const MAX_YEAR = yearValues.length > 0 ? Math.max(...yearValues) : fallbackYear

const typeOptions = [
	{ value: "all", label: "All types" },
	...availableTypes.map((type) => ({
		value: type,
		label: type.charAt(0).toUpperCase() + type.slice(1),
	})),
]

const sortOptions = [
	{ value: "newest", label: "Newest" },
	{ value: "oldest", label: "Oldest" },
	{ value: "popular", label: "Most popular" },
	{ value: "alphabetical", label: "A → Z" },
]

type Artwork = (typeof canvasArtworks)[number]
type ViewMode = "grid-large" | "grid-small" | "list"

export default function CanvasPortfolioPage() {
	const router = useRouter()

	const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
	const [viewMode, setViewMode] = useState<ViewMode>("grid-large")
	const [searchQuery, setSearchQuery] = useState("")
	const [categoryFilter, setCategoryFilter] = useState<string>("all")
	const [typeFilter, setTypeFilter] = useState<string>("canvas")
	const [yearFilter, setYearFilter] = useState<string>("all")
	const [sortOrder, setSortOrder] = useState<string>("newest")
	const [showFilters, setShowFilters] = useState(false)
	const [favorites, setFavorites] = useState<number[]>([])
	const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
	const [yearRange, setYearRange] = useState<number[]>([MIN_YEAR, MAX_YEAR])

	const categories = useMemo(
		() => ["all", ...availableCategories],
		[],
	)

	useEffect(() => {
		if (typeof window === "undefined") return
		const stored = window.localStorage.getItem("portfolio-favorites")
		if (!stored) return
		try {
			const parsed = JSON.parse(stored) as number[]
			setFavorites(parsed)
		} catch (error) {
			console.error("Failed to parse favorites", error)
		}
	}, [])

	useEffect(() => {
		if (typeof window === "undefined") return
		window.localStorage.setItem("portfolio-favorites", JSON.stringify(favorites))
	}, [favorites])

	const filteredArtworks = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase()
		return canvasArtworks.filter((artwork) => {
			const matchesSearch =
				normalizedQuery.length === 0 ||
				artwork.title.toLowerCase().includes(normalizedQuery) ||
				artwork.description.toLowerCase().includes(normalizedQuery) ||
				artwork.client.toLowerCase().includes(normalizedQuery) ||
				artwork.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))

			const matchesCategory = categoryFilter === "all" || artwork.category === categoryFilter
			const matchesType = typeFilter === "all" || artwork.type === typeFilter
			const matchesYear = yearFilter === "all" || artwork.year.toString() === yearFilter
			const matchesYearRange = artwork.year >= yearRange[0] && artwork.year <= yearRange[1]
			const matchesFeatured = !showFeaturedOnly || artwork.featured

			return (
				matchesSearch &&
				matchesCategory &&
				matchesType &&
				matchesYear &&
				matchesYearRange &&
				matchesFeatured
			)
		})
	}, [categoryFilter, typeFilter, yearFilter, yearRange, showFeaturedOnly, searchQuery])

	const sortedArtworks = useMemo(() => {
		const list = [...filteredArtworks]

		switch (sortOrder) {
			case "oldest":
				list.sort((a, b) => a.year - b.year)
				break
			case "popular":
				list.sort((a, b) => b.likes - a.likes)
				break
			case "alphabetical":
				list.sort((a, b) => a.title.localeCompare(b.title))
				break
			case "newest":
			default:
				list.sort((a, b) => b.year - a.year)
				break
		}

		return list
	}, [filteredArtworks, sortOrder])

	const toggleFavorite = (id: number) => {
		setFavorites((prev) =>
			prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id],
		)
	}

	const handleShare = async (artwork: Artwork) => {
		if (typeof navigator !== "undefined" && navigator.share) {
			try {
				await navigator.share({
					title: artwork.title,
					text: artwork.description,
					url: typeof window !== "undefined" ? window.location.href : undefined,
				})
				return
			} catch (error) {
				console.error("Share cancelled", error)
			}
		}

		if (typeof navigator !== "undefined" && navigator.clipboard) {
			await navigator.clipboard.writeText(artwork.title)
		}
	}

	const handleBack = () => {
		if (typeof window !== "undefined" && window.history.length > 1) {
			router.back()
			return
		}
		router.push("/portfolio")
	}

	const handlePrevArtwork = () => {
		if (!selectedArtwork || sortedArtworks.length === 0) return
		const currentIndex = sortedArtworks.findIndex((artwork) => artwork.id === selectedArtwork.id)
		const nextIndex = (currentIndex - 1 + sortedArtworks.length) % sortedArtworks.length
		setSelectedArtwork(sortedArtworks[nextIndex])
	}

	const handleNextArtwork = () => {
		if (!selectedArtwork || sortedArtworks.length === 0) return
		const currentIndex = sortedArtworks.findIndex((artwork) => artwork.id === selectedArtwork.id)
		const nextIndex = (currentIndex + 1) % sortedArtworks.length
		setSelectedArtwork(sortedArtworks[nextIndex])
	}

	const resetFilters = () => {
		setSearchQuery("")
		setCategoryFilter("all")
		setTypeFilter("canvas")
		setYearFilter("all")
		setSortOrder("newest")
		setShowFeaturedOnly(false)
		setYearRange([MIN_YEAR, MAX_YEAR])
	}

	return (
		<main className="container space-y-10 py-12">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-3">
					<Button variant="ghost" size="icon" onClick={handleBack}>
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<div>
						<h1 className="text-3xl font-semibold text-earth">Canvas Portfolio</h1>
						<p className="text-muted-foreground">
							Explore every hand-painted canvas. Fine-tune the filters to find the perfect inspiration.
						</p>
					</div>
				</div>
				<Button className="md:hidden" variant="outline" onClick={() => setShowFilters((previous) => !previous)}>
					{showFilters ? "Hide filters" : "Show filters"}
				</Button>
			</div>

			<section className={`rounded-2xl border bg-card/50 p-6 shadow-sm ${showFilters ? "block" : "hidden md:block"}`}>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<div className="space-y-2">
						<Label htmlFor="search">Search</Label>
						<Input
							id="search"
							placeholder="Search artworks, clients, or tags"
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label>Type</Label>
						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Filter by type" />
							</SelectTrigger>
							<SelectContent>
								{typeOptions
									.filter((option) => option.value === "all" || availableTypes.includes(option.value))
									.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Category</Label>
						<Select value={categoryFilter} onValueChange={setCategoryFilter}>
							<SelectTrigger>
								<SelectValue placeholder="All categories" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category === "all"
											? "All categories"
											: category.charAt(0).toUpperCase() + category.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Sort by</Label>
						<Select value={sortOrder} onValueChange={setSortOrder}>
							<SelectTrigger>
								<SelectValue placeholder="Sort artworks" />
							</SelectTrigger>
							<SelectContent>
								{sortOptions.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Year</Label>
						<Select value={yearFilter} onValueChange={setYearFilter}>
							<SelectTrigger>
								<SelectValue placeholder="All years" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All years</SelectItem>
								{Array.from(new Set(yearValues))
									.sort((a, b) => b - a)
									.map((year) => (
										<SelectItem key={year} value={year.toString()}>
											{year}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Year range</Label>
						<div className="px-2">
							<Slider
								min={MIN_YEAR}
								max={MAX_YEAR}
								step={1}
								value={yearRange}
								onValueChange={(value) => setYearRange(value as number[])}
							/>
							<div className="mt-2 flex justify-between text-xs text-muted-foreground">
								<span>{yearRange[0]}</span>
								<span>{yearRange[1]}</span>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between rounded-lg border p-3">
						<div>
							<p className="text-sm font-medium">Featured only</p>
							<p className="text-xs text-muted-foreground">Show curated highlights</p>
						</div>
						<Switch checked={showFeaturedOnly} onCheckedChange={setShowFeaturedOnly} />
					</div>

					<div className="flex items-end">
						<Button variant="outline" className="w-full" onClick={resetFilters}>
							Reset filters
						</Button>
					</div>
				</div>
			</section>

			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold text-earth">{sortedArtworks.length} artworks</h2>
					<div className="hidden items-center gap-2 md:flex">
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

				{sortedArtworks.length === 0 ? (
					<div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
						<p className="mb-4 text-lg font-medium">No artworks found</p>
						<Button variant="outline" onClick={resetFilters}>
							Reset filters
						</Button>
					</div>
				) : (
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
												className={`group relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
									viewMode === "list" ? "flex" : ""
								}`}
								onClick={() => setSelectedArtwork(artwork)}
							>
								<div
									className={`relative overflow-hidden ${
										viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-[4/3] w-full"
									}`}
								>
									<Image
										src={artwork.image || "/placeholder.svg"}
										alt={artwork.title}
										width={600}
										height={450}
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									{artwork.featured && (
										<Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
											<Star className="mr-1 h-3 w-3" /> Featured
										</Badge>
									)}
									<Button
										variant="ghost"
										size="sm"
										className="absolute right-2 top-2 bg-black/30 text-white hover:bg-black/50"
										onClick={(event) => {
											event.stopPropagation()
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
										<div className="space-y-1">
											<h3 className="text-lg font-semibold text-earth">{artwork.title}</h3>
											<div className="flex items-center gap-2 text-xs text-muted-foreground">
												<Badge variant="secondary" className="text-[11px] capitalize">
													{artwork.type}
												</Badge>
												<Badge variant="outline" className="text-[11px] capitalize">
													{artwork.category}
												</Badge>
												<span>{artwork.year}</span>
											</div>
										</div>
										<div className="text-right text-xs text-muted-foreground">
											<div className="flex items-center gap-1">
												<Heart className="h-3 w-3" />
												{artwork.likes}
											</div>
											<div>{artwork.views} views</div>
										</div>
									</div>

									<p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{artwork.description}</p>

									<div className="mt-3 flex flex-wrap gap-1">
										{artwork.tags.slice(0, 3).map((tag) => (
											<Badge key={tag} variant="outline" className="text-[10px]">
												{tag}
											</Badge>
										))}
										{artwork.tags.length > 3 && (
											<Badge variant="outline" className="text-[10px]">
												+{artwork.tags.length - 3}
											</Badge>
										)}
									</div>
								</CardContent>

												<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<span className="text-sm font-medium text-white">View details</span>
								</div>
							</Card>
						))}
					</div>
				)}
			</section>

			<section className="rounded-2xl border bg-card/50 p-6 text-center shadow-sm">
				<h3 className="text-xl font-semibold text-earth">Seen something you like?</h3>
				<p className="mt-2 text-sm text-muted-foreground">
					Let’s bring a custom canvas to life based on any of these pieces.
				</p>
				<Button asChild className="mt-4">
					<Link href="/#contact">Request a commission</Link>
				</Button>
			</section>

			<Dialog open={!!selectedArtwork} onOpenChange={(open) => !open && setSelectedArtwork(null)}>
				<DialogContent className="max-h-[90vh] max-w-6xl overflow-hidden bg-earth p-0">
					<div className="relative">
						{selectedArtwork && (
							<Image
								src={selectedArtwork.image || "/placeholder.svg"}
								alt={selectedArtwork.title}
								width={1200}
								height={800}
								className="h-auto w-full max-h-[80vh] object-contain"
							/>
						)}
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-2 top-2 rounded-full bg-black/30 text-white hover:bg-black/50"
							onClick={() => setSelectedArtwork(null)}
						>
							<X className="h-5 w-5" />
						</Button>
						<div className="absolute bottom-2 left-2 right-2 flex justify-between">
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full bg-black/30 text-white hover:bg-black/50"
								onClick={(event) => {
									event.stopPropagation()
									handlePrevArtwork()
								}}
							>
								<ChevronLeft className="h-5 w-5" />
							</Button>
							<div className="flex gap-2">
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full bg-black/30 text-white hover:bg-black/50"
									onClick={(event) => {
										event.stopPropagation()
										if (selectedArtwork) toggleFavorite(selectedArtwork.id)
									}}
								>
									<Heart
										className={`h-5 w-5 ${
											selectedArtwork && favorites.includes(selectedArtwork.id)
												? "fill-current text-red-500"
												: ""
										}`}
									/>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full bg-black/30 text-white hover:bg-black/50"
									onClick={(event) => {
										event.stopPropagation()
										if (selectedArtwork) void handleShare(selectedArtwork)
									}}
								>
									<Share2 className="h-5 w-5" />
								</Button>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-full bg-black/30 text-white hover:bg-black/50"
								onClick={(event) => {
									event.stopPropagation()
									handleNextArtwork()
								}}
							>
								<ChevronRight className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{selectedArtwork && (
						<div className="space-y-6 bg-earth p-6">
							<DialogHeader className="bg-earth">
								<div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
									<div className="space-y-2">
										<DialogTitle className="text-2xl text-earth">{selectedArtwork.title}</DialogTitle>
										<DialogDescription>
											<div className="flex flex-wrap gap-2">
												<Badge className="capitalize">{selectedArtwork.type}</Badge>
												<Badge variant="outline" className="capitalize">
													{selectedArtwork.category}
												</Badge>
												<Badge variant="secondary">{selectedArtwork.year}</Badge>
												{selectedArtwork.featured && (
													<Badge className="bg-primary text-primary-foreground">
														<Star className="mr-1 h-3 w-3" /> Featured
													</Badge>
												)}
											</div>
										</DialogDescription>
									</div>
									<div className="text-right text-sm text-muted-foreground">
										<div className="flex items-center justify-end gap-3">
											<span className="flex items-center gap-1">
												<Heart className="h-4 w-4" />
												{selectedArtwork.likes}
											</span>
											<span>{selectedArtwork.views} views</span>
										</div>
									</div>
								</div>
							</DialogHeader>

							<p className="text-lg text-earth">{selectedArtwork.description}</p>

							<div className="grid gap-6 md:grid-cols-2">
								<div className="space-y-4">
									<h4 className="font-semibold text-earth">Project details</h4>
									<div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
										<div>
											<p className="font-medium text-earth">Client</p>
											<p>{selectedArtwork.client}</p>
										</div>
										<div>
											<p className="font-medium text-earth">Year</p>
											<p>{selectedArtwork.year}</p>
										</div>
										<div>
											<p className="font-medium text-earth">Size</p>
											<p>{selectedArtwork.size}</p>
										</div>
										<div>
											<p className="font-medium text-earth">Duration</p>
											<p>{selectedArtwork.duration}</p>
										</div>
									</div>
								</div>

								<div className="space-y-4">
									<h4 className="font-semibold text-earth">Materials used</h4>
									<div className="flex flex-wrap gap-2">
										{selectedArtwork.materials.map((material) => (
											<Badge key={material} variant="outline">
												{material}
											</Badge>
										))}
									</div>

									<h4 className="font-semibold text-earth">Tags</h4>
									<div className="flex flex-wrap gap-2">
										{selectedArtwork.tags.map((tag) => (
											<Badge key={tag} variant="secondary">
												{tag}
											</Badge>
										))}
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
								<span>
									Inspired by this piece? Let’s collaborate on a bespoke canvas tailored to your space.
								</span>
								<Button asChild variant="outline">
									<Link href="/#contact">Request similar work</Link>
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</main>
	)
}
