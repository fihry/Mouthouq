"use client"

import { useState, useMemo } from "react"
import {
  Filter,
  MapPin,
  Star,
  DollarSign,
  Clock,
  Grid3X3,
  List,
  MessageCircle,
  Heart,
  ChevronUp,
  ChevronDown,
  Brain,
  Shield,
  Search,
  X,
  Zap,
  Users,
  Calendar,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import NavBar from "@/components/layout/NaveBar"

// Enhanced sample data with more services
const allServices = [
  {
    id: 1,
    title: "Professional House Cleaning",
    price: 180,
    priceText: "From 180 MAD",
    provider: "Sara Cleaning Services",
    providerImage:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    location: "Casablanca",
    distance: 2.1,
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    description: "Deep cleaning, regular maintenance, eco-friendly products. Trusted by 500+ families.",
    tags: ["Eco-Friendly", "Insured", "Same Day"],
    responseTime: 2,
    responseTimeText: "< 2 hours",
    badges: ["AI Match", "Verified"],
    category: "House Cleaning",
    availability: "24/7",
    experience: 5,
    completedJobs: 500,
    isEmergency: false,
    phone: "+212 6 12 34 56 78",
    email: "sara@cleaningservices.ma",
  },
  {
    id: 2,
    title: "Emergency Plumbing Services",
    price: 250,
    priceText: "From 250 MAD",
    provider: "Ahmed Plumbing Solutions",
    providerImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    location: "Casablanca",
    distance: 3.5,
    rating: 4.8,
    reviews: 94,
    image:
      "https://images.pexels.com/photos/8487806/pexels-photo-8487806.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    description: "24/7 emergency service, leak repairs, pipe installation. Licensed and experienced.",
    tags: ["Emergency Service", "24/7 Available", "Licensed"],
    responseTime: 0.5,
    responseTimeText: "< 30 mins",
    badges: ["Verified", "Emergency"],
    category: "Plumbing",
    availability: "24/7",
    experience: 8,
    completedJobs: 300,
    isEmergency: true,
    phone: "+212 6 23 45 67 89",
    email: "ahmed@plumbingpro.ma",
  },
  {
    id: 3,
    title: "AC Maintenance & Repair",
    price: 200,
    priceText: "From 200 MAD",
    provider: "CoolTech Services",
    providerImage:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    location: "Casablanca",
    distance: 4.2,
    rating: 4.7,
    reviews: 78,
    image:
      "https://images.pexels.com/photos/7031590/pexels-photo-7031590.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    description: "AC installation, repair, and maintenance. All brands serviced with warranty.",
    tags: ["Warranty Included", "All Brands", "Certified"],
    responseTime: 4,
    responseTimeText: "< 4 hours",
    badges: ["AI Match", "Verified"],
    category: "AC Repair",
    availability: "Mon-Sat",
    experience: 6,
    completedJobs: 200,
    isEmergency: false,
    phone: "+212 6 34 56 78 90",
    email: "info@cooltech.ma",
  },
  {
    id: 4,
    title: "Electrical Installation & Repair",
    price: 150,
    priceText: "From 150 MAD",
    provider: "ElectricPro Services",
    providerImage:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    location: "Rabat",
    distance: 5.1,
    rating: 4.6,
    reviews: 56,
    image:
      "https://images.pexels.com/photos/8853502/pexels-photo-8853502.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    description: "Safe electrical work, wiring, fixtures, and emergency repairs. Licensed electrician.",
    tags: ["Licensed", "Safety Certified", "Insured"],
    responseTime: 6,
    responseTimeText: "< 6 hours",
    badges: ["Verified"],
    category: "Electrical Work",
    availability: "Mon-Fri",
    experience: 10,
    completedJobs: 400,
    isEmergency: false,
    phone: "+212 6 45 67 89 01",
    email: "contact@electricpro.ma",
  },
  {
    id: 5,
    title: "Interior & Exterior Painting",
    price: 300,
    priceText: "From 300 MAD",
    provider: "ColorCraft Painters",
    providerImage:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    location: "Casablanca",
    distance: 6.0,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    description: "Professional painting services with premium materials. Color consultation included.",
    tags: ["Color Consultation", "Premium Materials", "Eco Paint"],
    responseTime: 12,
    responseTimeText: "< 12 hours",
    badges: ["AI Match", "Verified"],
    category: "Painting",
    availability: "Mon-Sat",
    experience: 7,
    completedJobs: 150,
    isEmergency: false,
    phone: "+212 6 56 78 90 12",
    email: "info@colorcraft.ma",
  },
  {
    id: 6,
    title: "Appliance Repair Services",
    price: 120,
    priceText: "From 120 MAD",
    provider: "FixIt Appliance Solutions",
    providerImage:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    location: "Casablanca",
    distance: 7.2,
    rating: 4.5,
    reviews: 43,
    image:
      "https://images.pexels.com/photos/4107113/pexels-photo-4107113.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    description: "Washing machines, refrigerators, dishwashers. Quick diagnostics and repair.",
    tags: ["All Appliances", "Quick Service", "Warranty"],
    responseTime: 8,
    responseTimeText: "< 8 hours",
    badges: ["Verified"],
    category: "Appliance Repair",
    availability: "Mon-Sat",
    experience: 4,
    completedJobs: 100,
    isEmergency: false,
    phone: "+212 6 67 89 01 23",
    email: "support@fixit.ma",
  },
  {
    id: 7,
    title: "Professional Handyman Services",
    price: 100,
    priceText: "From 100 MAD",
    provider: "HandyFix Solutions",
    providerImage:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    location: "Rabat",
    distance: 8.5,
    rating: 4.4,
    reviews: 67,
    image:
      "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    description: "General repairs, furniture assembly, small installations. Reliable and affordable.",
    tags: ["Multi-Service", "Affordable", "Reliable"],
    responseTime: 3,
    responseTimeText: "< 3 hours",
    badges: ["Verified"],
    category: "Handyman",
    availability: "Mon-Sat",
    experience: 3,
    completedJobs: 80,
    isEmergency: false,
    phone: "+212 6 78 90 12 34",
    email: "info@handyfix.ma",
  },
  {
    id: 8,
    title: "Moving & Relocation Services",
    price: 400,
    priceText: "From 400 MAD",
    provider: "MoveEasy Transport",
    providerImage:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    location: "Fes",
    distance: 12.0,
    rating: 4.7,
    reviews: 92,
    image:
      "https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
    description: "Professional moving services with packing, loading, and transportation.",
    tags: ["Full Service", "Insured", "Professional Team"],
    responseTime: 24,
    responseTimeText: "< 24 hours",
    badges: ["AI Match", "Verified"],
    category: "Moving",
    availability: "Mon-Sun",
    experience: 9,
    completedJobs: 250,
    isEmergency: false,
    phone: "+212 6 89 01 23 45",
    email: "booking@moveeasy.ma",
  },
]

const categories = [
  { name: "House Cleaning", count: 245 },
  { name: "Plumbing", count: 189 },
  { name: "Electrical Work", count: 156 },
  { name: "AC Repair", count: 132 },
  { name: "Painting", count: 98 },
  { name: "Appliance Repair", count: 87 },
  { name: "Handyman", count: 76 },
  { name: "Moving", count: 54 },
]

const locations = ["Casablanca", "Rabat", "Fes", "Marrakech", "Agadir", "Tangier", "Oujda", "Kenitra"]

const availabilityOptions = [
  { value: "24/7", label: "24/7 Available" },
  { value: "Mon-Sun", label: "7 Days a Week" },
  { value: "Mon-Sat", label: "Monday to Saturday" },
  { value: "Mon-Fri", label: "Weekdays Only" },
]

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
        !service.provider.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !service.description.toLowerCase().includes(searchQuery.toLowerCase())
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

  const ServiceCard = ({ service }: { service: (typeof allServices)[0] }) => (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100 cursor-pointer group overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {service.badges.map((badge, index) => (
            <div
              key={index}
              className={`flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${badge === "AI Match" ? "bg-orange-500" : badge === "Emergency" ? "bg-red-500" : "bg-green-500"
                }`}
            >
              {badge === "AI Match" && <Brain className="h-3 w-3 mr-1" />}
              {badge === "Verified" && <Shield className="h-3 w-3 mr-1" />}
              {badge === "Emergency" && <Zap className="h-3 w-3 mr-1" />}
              {badge}
            </div>
          ))}
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group">
          <Heart className="h-4 w-4 text-orange-600 group-hover:fill-current" />
        </button>
        {service.isEmergency && (
          <div className="absolute bottom-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            Emergency Service
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-orange-900 group-hover:text-orange-600 transition-colors">
            {service.title}
          </h3>
          <div className="text-xl font-bold text-orange-600">{service.priceText}</div>
        </div>

        <div className="flex items-center mb-3">
          <img
            src={service.providerImage || "/placeholder.svg"}
            alt={service.provider}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-orange-900">{service.provider}</div>
            <div className="flex items-center text-xs text-orange-600">
              <MapPin className="h-3 w-3 mr-1" />
              <span>
                {service.location} • {service.distance} km
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-medium text-orange-900">{service.rating}</span>
              <span className="text-sm text-orange-600 ml-1">({service.reviews})</span>
            </div>
          </div>
          <div className="flex items-center text-xs text-orange-600">
            <Users className="h-3 w-3 mr-1" />
            <span>{service.completedJobs}+ jobs</span>
          </div>
        </div>

        <p className="text-orange-700 text-sm mb-4 line-clamp-2">{service.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
              {tag}
            </Badge>
          ))}
          {service.tags.length > 3 && (
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              +{service.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-orange-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-xs text-orange-600">
              <Clock className="h-3 w-3 mr-1" />
              <span>{service.responseTimeText}</span>
            </div>
            <div className="flex items-center text-xs text-orange-600">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{service.availability}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600">
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

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
