"use client"

import { useState, useMemo } from "react"
import { Search, Grid3X3, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/layout/NaveBar"
import { allServices } from "./services-data"
import { ServiceCard } from "@/components/services/ServiceCard"
import { FilterSidebar } from "./FilterSidebar"

export default function ServicesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [maxDistance, setMaxDistance] = useState(50)
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    location: true,
    rating: false,
    price: false,
    availability: false,
    distance: false,
  })

  const toggleFilter = (filterName: keyof typeof expandedFilters) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }))
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedLocation("")
    setSelectedAvailability([])
    setPriceRange([0, 1000])
    setMinRating(0)
    setMaxDistance(50)
    setShowEmergencyOnly(false)
  }

  const filteredAndSortedServices = useMemo(() => {
    const filtered = allServices.filter((service) => {
      // Search query filter
      if (
        searchQuery &&
        !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !service.provider.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(service.category)) {
        return false
      }

      // Location filter
      if (selectedLocation && service.location !== selectedLocation) {
        return false
      }

      // Availability filter
      if (selectedAvailability.length > 0 && !selectedAvailability.includes(service.availability)) {
        return false
      }

      // Price range filter
      if (service.price < priceRange[0] || service.price > priceRange[1]) {
        return false
      }

      // Rating filter
      if (service.rating < minRating) {
        return false
      }

      // Distance filter
      if (service.distance > maxDistance) {
        return false
      }

      // Emergency filter
      if (showEmergencyOnly && !service.isEmergency) {
        return false
      }

      return true
    })

    // Sort the filtered results
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
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case "response-time":
        filtered.sort((a, b) => a.responseTime - b.responseTime)
        break
      default: // relevance
        filtered.sort((a, b) => {
          // AI Match and Verified badges get priority
          const aScore = (a.badges.includes("AI Match") ? 2 : 0) + (a.badges.includes("Verified") ? 1 : 0)
          const bScore = (b.badges.includes("AI Match") ? 2 : 0) + (b.badges.includes("Verified") ? 1 : 0)
          if (aScore !== bScore) return bScore - aScore
          // Then by rating
          return b.rating - a.rating
        })
    }

    return filtered
  }, [
    searchQuery,
    selectedCategories,
    selectedLocation,
    selectedAvailability,
    priceRange,
    minRating,
    maxDistance,
    showEmergencyOnly,
    sortBy,
  ])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchQuery) count++
    if (selectedCategories.length > 0) count++
    if (selectedLocation) count++
    if (selectedAvailability.length > 0) count++
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++
    if (minRating > 0) count++
    if (maxDistance < 50) count++
    if (showEmergencyOnly) count++
    return count
  }, [
    searchQuery,
    selectedCategories,
    selectedLocation,
    selectedAvailability,
    priceRange,
    minRating,
    maxDistance,
    showEmergencyOnly,
  ])

  return (
    <>
      <NavBar />
      <main className="flex-grow">
        <div className="min-h-screen bg-orange-50">
          {/* Header */}
          <div className="bg-white border-b border-orange-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold text-orange-900 mb-2">Find Professional Services</h1>
              <p className="text-orange-600">Discover verified professionals for all your household needs</p>

              {/* Search Bar */}
              <div className="mt-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                <Input
                  type="text"
                  placeholder="Search services, providers, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full max-w-2xl border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:flex lg:space-x-8">
              {/* Sidebar Filters */}
              <FilterSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedAvailability={selectedAvailability}
                setSelectedAvailability={setSelectedAvailability}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                maxDistance={maxDistance}
                setMaxDistance={setMaxDistance}
                showEmergencyOnly={showEmergencyOnly}
                setShowEmergencyOnly={setShowEmergencyOnly}
                activeFiltersCount={activeFiltersCount}
                clearAllFilters={clearAllFilters}
                expandedFilters={expandedFilters}
                toggleFilter={toggleFilter}
              />

              {/* Main Content */}
              <div className="lg:flex-1">
                {/* Results Header */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-orange-900 mb-1">
                        {filteredAndSortedServices.length} Service{filteredAndSortedServices.length !== 1 ? "s" : ""}{" "}
                        Found
                      </h2>
                      <p className="text-orange-600">
                        {selectedLocation ? `in ${selectedLocation}` : "in all locations"} for your search
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* View Toggle */}
                      <div className="flex items-center bg-orange-100 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-orange-500 hover:text-orange-700"
                            }`}
                        >
                          <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-2 rounded-md transition-colors ${viewMode === "list"
                            ? "bg-white text-orange-600 shadow-sm"
                            : "text-orange-500 hover:text-orange-700"
                            }`}
                        >
                          <List className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Sort Dropdown */}
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48 border-orange-300 focus:ring-orange-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Best Match</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="distance">Nearest</SelectItem>
                          <SelectItem value="reviews">Most Reviews</SelectItem>
                          <SelectItem value="response-time">Fastest Response</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Services Grid */}
                {filteredAndSortedServices.length > 0 ? (
                  <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
                    {filteredAndSortedServices.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-orange-400 mb-4">
                      <Search className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-orange-900 mb-2">No services found</h3>
                    <p className="text-orange-600 mb-4">Try adjusting your filters or search terms</p>
                    <Button onClick={clearAllFilters} variant="outline" className="border-orange-300 text-orange-600">
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Load More */}
                {filteredAndSortedServices.length > 0 && (
                  <div className="text-center mt-12">
                    <Button className="bg-orange-500 text-white px-8 py-3 hover:bg-orange-600 font-semibold">
                      Load More Services
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
