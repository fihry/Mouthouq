"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Grid3X3, List, Filter, MapPin, DollarSign, Star, SlidersHorizontal, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import NavBar from "@/components/layout/NaveBar"
import { ServiceCard } from "@/components/services/ServiceCard"
import { CreateServiceModal } from "@/components/services/CreateServiceModal"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"

const categories = [
  { name: "Plumbing", count: 45 },
  { name: "Electrical", count: 38 },
  { name: "Cleaning", count: 52 },
  { name: "Painting", count: 29 },
  { name: "Carpentry", count: 31 },
  { name: "HVAC", count: 22 },
  { name: "Landscaping", count: 18 },
  { name: "Moving", count: 15 },
  { name: "Pest Control", count: 12 },
  { name: "Appliance Repair", count: 27 }
]

const locations = ["Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir", "Meknes", "Oujda"]

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [maxDistance, setMaxDistance] = useState(50)
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false)

  useEffect(() => {
    fetchServices()

    // Check user role from localStorage
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setUserRole(user.role)
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }
  }, [])

  async function fetchServices() {
    setIsLoading(true)
    try {
      const data = await apiClient.get("/services")
      // Filter to show only active and verified services to customers
      const filtered = data.filter((s: any) => s.IsActive && s.IsVerified)

      const mapped = filtered.map((s: any) => ({
        id: s.ID,
        title: s.Title,
        price: s.PriceAmount,
        priceText: `From ${s.PriceAmount} ${s.PriceCurrency || "MAD"}`,
        provider: "Verified Provider",
        providerImage: "/placeholder.svg",
        location: s.City || "Casablanca",
        distance: 2.5,
        rating: s.RatingAverage || 0,
        reviews: s.RatingCount || 0,
        image: s.Images?.[0] || "/placeholder.svg",
        description: s.Description,
        tags: s.Tags || [],
        responseTime: s.ResponseTimeMins || 60,
        responseTimeText: `< ${s.ResponseTimeMins || 60} mins`,
        badges: [
          ...(s.IsVerified ? ["Verified"] : []),
          ...(s.TrustScore > 0.8 ? ["AI Match"] : [])
        ],
        category: s.Category,
        availability: "24/7",
        experience: 5,
        completedJobs: 100,
        isEmergency: s.Tags?.includes("Emergency") || false,
        phone: s.Phone || "",
        email: s.Email || ""
      }))
      setServices(mapped)
    } catch (error) {
      console.error("Failed to fetch services:", error)
      toast.error("Failed to load services", {
        description: "Could not load services. Please refresh the page.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedLocation("all")
    setPriceRange([0, 1000])
    setMinRating(0)
    setMaxDistance(50)
    setShowEmergencyOnly(false)
  }

  const filteredAndSortedServices = useMemo(() => {
    const filtered = services.filter((service) => {
      if (searchQuery && !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !service.provider.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(service.category)) {
        return false
      }
      if (selectedLocation && selectedLocation !== "all" && service.location !== selectedLocation) {
        return false
      }
      if (service.price < priceRange[0] || service.price > priceRange[1]) {
        return false
      }
      if (service.rating < minRating) {
        return false
      }
      if (service.distance > maxDistance) {
        return false
      }
      if (showEmergencyOnly && !service.isEmergency) {
        return false
      }
      return true
    })

    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "distance":
        filtered.sort((a, b) => a.distance - b.distance)
        break
      default:
        filtered.sort((a, b) => {
          const aScore = (a.badges.includes("AI Match") ? 2 : 0) + (a.badges.includes("Verified") ? 1 : 0)
          const bScore = (b.badges.includes("AI Match") ? 2 : 0) + (b.badges.includes("Verified") ? 1 : 0)
          if (aScore !== bScore) return bScore - aScore
          return b.rating - a.rating
        })
    }

    return filtered
  }, [services, searchQuery, selectedCategories, selectedLocation, priceRange, minRating, maxDistance, showEmergencyOnly, sortBy])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchQuery) count++
    if (selectedCategories.length > 0) count++
    if (selectedLocation && selectedLocation !== "all") count++
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++
    if (minRating > 0) count++
    if (maxDistance < 50) count++
    if (showEmergencyOnly) count++
    return count
  }, [searchQuery, selectedCategories, selectedLocation, priceRange, minRating, maxDistance, showEmergencyOnly])

  return (
    <>
      <NavBar />
      <main className="min-h-screen mesh-gradient">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  Find <span className="text-gradient">Professional Services</span>
                </h1>
                <p className="text-gray-600 mt-1">Discover verified professionals for all your needs</p>
              </div>
              {userRole === "professional" && (
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Service
                </Button>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search services, providers, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 w-full text-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Compact Filter Bar */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200 sticky top-[140px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <Popover open={categoryPopoverOpen} onOpenChange={setCategoryPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-10 border-gray-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Category
                    {selectedCategories.length > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700">
                        {selectedCategories.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search categories..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((cat) => (
                          <CommandItem
                            key={cat.name}
                            onSelect={() => toggleCategory(cat.name)}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center">
                              <Checkbox
                                checked={selectedCategories.includes(cat.name)}
                                className="mr-2"
                              />
                              <span>{cat.name}</span>
                            </div>
                            <span className="text-sm text-gray-400">({cat.count})</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48 h-10 border-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-10 border-gray-300">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {priceRange[0]}-{priceRange[1]} MAD
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <Label>Price Range (MAD)</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      min={0}
                      step={50}
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{priceRange[0]} MAD</span>
                      <span>{priceRange[1]} MAD</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Rating Filter */}
              <div className="flex items-center gap-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <Button
                    key={rating}
                    variant={minRating === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    className={minRating === rating ? "bg-orange-500 hover:bg-orange-600" : "border-gray-300"}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {rating}+
                  </Button>
                ))}
              </div>

              {/* More Filters Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-10 border-gray-300">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search with additional filters
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 py-6">
                    <div>
                      <Label>Max Distance (km)</Label>
                      <Slider
                        value={[maxDistance]}
                        onValueChange={(val) => setMaxDistance(val[0])}
                        max={50}
                        min={1}
                        step={1}
                        className="mt-4"
                      />
                      <div className="text-center text-sm text-gray-600 mt-2">Within {maxDistance} km</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emergency"
                        checked={showEmergencyOnly}
                        onCheckedChange={(checked) => setShowEmergencyOnly(checked as boolean)}
                      />
                      <Label htmlFor="emergency" className="cursor-pointer">
                        Emergency Services Only
                      </Label>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  Clear All ({activeFiltersCount})
                </Button>
              )}
            </div>

            {/* Active Filter Badges */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="flex items-center gap-1">
                    {cat}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-600"
                      onClick={() => toggleCategory(cat)}
                    />
                  </Badge>
                ))}
                {selectedLocation && selectedLocation !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedLocation}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-600"
                      onClick={() => setSelectedLocation("all")}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="glass p-6 rounded-3xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  {filteredAndSortedServices.length} Service{filteredAndSortedServices.length !== 1 ? "s" : ""} Found
                </h2>
                <p className="text-gray-600">
                  {selectedLocation && selectedLocation !== "all" ? `in ${selectedLocation}` : "in all locations"}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Best Match</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredAndSortedServices.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {filteredAndSortedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={clearAllFilters} variant="outline" className="border-orange-300 text-orange-600">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        <CreateServiceModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={fetchServices}
        />
      </main>
    </>
  )
}
