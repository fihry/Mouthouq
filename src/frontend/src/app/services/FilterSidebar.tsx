import { Filter, X, ChevronUp, ChevronDown, MapPin, Star, DollarSign, Clock, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { categories, locations, availabilityOptions } from "./services-data"

interface ExpandedFilters {
    category: boolean
    location: boolean
    rating: boolean
    price: boolean
    availability: boolean
    distance: boolean
}

interface FilterSidebarProps {
    searchQuery: string
    setSearchQuery: (val: string) => void
    selectedCategories: string[]
    setSelectedCategories: (val: string[]) => void
    selectedLocation: string
    setSelectedLocation: (val: string) => void
    selectedAvailability: string[]
    setSelectedAvailability: (val: string[]) => void
    priceRange: number[]
    setPriceRange: (val: number[]) => void
    minRating: number
    setMinRating: (val: number) => void
    maxDistance: number
    setMaxDistance: (val: number) => void
    showEmergencyOnly: boolean
    setShowEmergencyOnly: (val: boolean) => void
    activeFiltersCount: number
    clearAllFilters: () => void
    expandedFilters: ExpandedFilters
    toggleFilter: (filterName: keyof ExpandedFilters) => void
}

export const FilterSidebar = ({
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedLocation,
    setSelectedLocation,
    selectedAvailability,
    setSelectedAvailability,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    maxDistance,
    setMaxDistance,
    showEmergencyOnly,
    setShowEmergencyOnly,
    activeFiltersCount,
    clearAllFilters,
    expandedFilters,
    toggleFilter,
}: FilterSidebarProps) => {
    return (
        <div className="lg:w-80 mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 sticky top-24">
                <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-orange-200">
                    <Filter className="h-5 w-5 text-orange-500" />
                    <h2 className="text-lg font-semibold text-orange-900">Filters</h2>
                    {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            {activeFiltersCount}
                        </Badge>
                    )}
                    <button
                        onClick={clearAllFilters}
                        className="ml-auto text-sm text-orange-600 hover:text-orange-700 transition-colors"
                    >
                        Clear All
                    </button>
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {searchQuery && (
                                <Badge variant="outline" className="flex items-center gap-1">
                                    Search: {searchQuery}
                                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                                </Badge>
                            )}
                            {selectedCategories.map((category) => (
                                <Badge key={category} variant="outline" className="flex items-center gap-1">
                                    {category}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                                    />
                                </Badge>
                            ))}
                            {selectedLocation && (
                                <Badge variant="outline" className="flex items-center gap-1">
                                    {selectedLocation}
                                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation("")} />
                                </Badge>
                            )}
                        </div>
                    </div>
                )}

                {/* Service Category Filter */}
                <div className="border-b border-orange-200 pb-6 mb-6">
                    <button
                        onClick={() => toggleFilter("category")}
                        className="flex items-center justify-between w-full mb-4 hover:text-orange-600 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <Filter className="h-5 w-5 text-orange-500" />
                            <h3 className="font-semibold text-orange-900">Service Category</h3>
                        </div>
                        {expandedFilters.category ? (
                            <ChevronUp className="h-4 w-4 text-orange-400" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-orange-400" />
                        )}
                    </button>

                    {expandedFilters.category && (
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <label key={category.name} className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex items-center">
                                        <Checkbox
                                            checked={selectedCategories.includes(category.name)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setSelectedCategories([...selectedCategories, category.name])
                                                } else {
                                                    setSelectedCategories(selectedCategories.filter((c) => c !== category.name))
                                                }
                                            }}
                                            className="border-orange-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <span className="ml-3 text-orange-700 group-hover:text-orange-600 transition-colors">
                                            {category.name}
                                        </span>
                                    </div>
                                    <span className="text-sm text-orange-400">({category.count})</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Location Filter */}
                <div className="border-b border-orange-200 pb-6 mb-6">
                    <button
                        onClick={() => toggleFilter("location")}
                        className="flex items-center justify-between w-full mb-4 hover:text-orange-600 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-orange-500" />
                            <h3 className="font-semibold text-orange-900">Location</h3>
                        </div>
                        {expandedFilters.location ? (
                            <ChevronUp className="h-4 w-4 text-orange-400" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-orange-400" />
                        )}
                    </button>

                    {expandedFilters.location && (
                        <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation}>
                            <div className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value="" id="all-locations" />
                                <Label htmlFor="all-locations" className="text-orange-700 cursor-pointer">
                                    All Locations
                                </Label>
                            </div>
                            {locations.map((location) => (
                                <div key={location} className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value={location}
                                        id={location}
                                        className="border-orange-300 text-orange-600 focus:ring-orange-500"
                                    />
                                    <Label
                                        htmlFor={location}
                                        className="text-orange-700 hover:text-orange-600 transition-colors cursor-pointer"
                                    >
                                        {location}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}
                </div>

                {/* Rating Filter */}
                <div className="border-b border-orange-200 pb-6 mb-6">
                    <button
                        onClick={() => toggleFilter("rating")}
                        className="flex items-center justify-between w-full mb-4 hover:text-orange-600 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <Star className="h-5 w-5 text-orange-500" />
                            <h3 className="font-semibold text-orange-900">Minimum Rating</h3>
                        </div>
                        {expandedFilters.rating ? (
                            <ChevronUp className="h-4 w-4 text-orange-400" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-orange-400" />
                        )}
                    </button>

                    {expandedFilters.rating && (
                        <div className="space-y-3">
                            {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
                                <label key={rating} className="flex items-center cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={rating}
                                        checked={minRating === rating}
                                        onChange={() => setMinRating(rating)}
                                        className="border-orange-300 text-orange-600 focus:ring-orange-500"
                                    />
                                    <div className="ml-3 flex items-center">
                                        {rating > 0 ? (
                                            <>
                                                <div className="flex items-center mr-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-orange-700">{rating}+ stars</span>
                                            </>
                                        ) : (
                                            <span className="text-orange-700">All ratings</span>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Range Filter */}
                <div className="border-b border-orange-200 pb-6 mb-6">
                    <button
                        onClick={() => toggleFilter("price")}
                        className="flex items-center justify-between w-full mb-4 hover:text-orange-600 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <DollarSign className="h-5 w-5 text-orange-500" />
                            <h3 className="font-semibold text-orange-900">Price Range</h3>
                        </div>
                        {expandedFilters.price ? (
                            <ChevronUp className="h-4 w-4 text-orange-400" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-orange-400" />
                        )}
                    </button>

                    {expandedFilters.price && (
                        <div className="space-y-4">
                            <Slider
                                value={priceRange}
                                onValueChange={setPriceRange}
                                max={1000}
                                min={0}
                                step={50}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-orange-600">
                                <span>{priceRange[0]} MAD</span>
                                <span>{priceRange[1]} MAD</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Availability Filter */}
                <div className="border-b border-orange-200 pb-6 mb-6">
                    <button
                        onClick={() => toggleFilter("availability")}
                        className="flex items-center justify-between w-full mb-4 hover:text-orange-600 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-orange-500" />
                            <h3 className="font-semibold text-orange-900">Availability</h3>
                        </div>
                        {expandedFilters.availability ? (
                            <ChevronUp className="h-4 w-4 text-orange-400" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-orange-400" />
                        )}
                    </button>

                    {expandedFilters.availability && (
                        <div className="space-y-3">
                            {availabilityOptions.map((option) => (
                                <label key={option.value} className="flex items-center cursor-pointer group">
                                    <Checkbox
                                        checked={selectedAvailability.includes(option.value)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedAvailability([...selectedAvailability, option.value])
                                            } else {
                                                setSelectedAvailability(selectedAvailability.filter((a) => a !== option.value))
                                            }
                                        }}
                                        className="border-orange-300 text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="ml-3 text-orange-700 group-hover:text-orange-600 transition-colors">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    checked={showEmergencyOnly}
                                    onCheckedChange={(checked) => {
                                        if (checked !== "indeterminate") {
                                            setShowEmergencyOnly(checked);
                                        }
                                    }}
                                    className="border-orange-300 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="ml-3 text-orange-700 group-hover:text-orange-600 transition-colors flex items-center">
                                    <Zap className="h-4 w-4 mr-1" />
                                    Emergency Services Only
                                </span>
                            </label>
                        </div>
                    )}
                </div>

                {/* Distance Filter */}
                <div>
                    <button
                        onClick={() => toggleFilter("distance")}
                        className="flex items-center justify-between w-full mb-4 hover:text-orange-600 transition-colors"
                    >
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-orange-500" />
                            <h3 className="font-semibold text-orange-900">Max Distance</h3>
                        </div>
                        {expandedFilters.distance ? (
                            <ChevronUp className="h-4 w-4 text-orange-400" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-orange-400" />
                        )}
                    </button>

                    {expandedFilters.distance && (
                        <div className="space-y-4">
                            <Slider
                                value={[maxDistance]}
                                onValueChange={(value) => setMaxDistance(value[0])}
                                max={50}
                                min={1}
                                step={1}
                                className="w-full"
                            />
                            <div className="text-center text-sm text-orange-600">Within {maxDistance} km</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
