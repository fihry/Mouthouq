"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
} from "lucide-react"

// Enhanced Testimonial Data with more realistic Moroccan context
const testimonials = [
  {
    id: 1,
    name: "Aicha Benali",
    role: "Marketing Manager",
    location: "Casablanca",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    date: "2 weeks ago",
    service: "House Cleaning",
    testimonial:
      "Mawthouq helped me find the most reliable cleaning service in Casablanca. Fatima and her team transformed my apartment completely. The booking process was seamless, and the quality exceeded my expectations. I've been using their service monthly ever since!",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Omar Alaoui",
    role: "Software Engineer",
    location: "Rabat",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    date: "1 month ago",
    service: "AC Repair",
    testimonial:
      "My AC broke down during the summer heat, and I found Ahmed through Mawthouq within minutes. He arrived the same day, fixed the issue professionally, and charged exactly what was quoted. The platform's transparency and speed saved my day!",
    verified: true,
    featured: false,
  },
  {
    id: 3,
    name: "Khadija Mansouri",
    role: "Business Owner",
    location: "Marrakech",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    date: "3 weeks ago",
    service: "Plumbing",
    testimonial:
      "Running a riad in Marrakech, I need reliable maintenance services. Mawthouq connected me with Youssef, an excellent plumber who has become our go-to professional. The quality assurance and customer support are outstanding.",
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: "Mehdi Tazi",
    role: "Architect",
    location: "Fes",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    date: "1 week ago",
    service: "Electrical Work",
    testimonial:
      "As an architect, I have high standards for electrical work. The electrician I found through Mawthouq was not only skilled but also understood modern building requirements. The platform's verification process really shows - only quality professionals here.",
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: "Salma Idrissi",
    role: "Doctor",
    location: "Tangier",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    date: "2 months ago",
    service: "Painting",
    testimonial:
      "Renovating my clinic required precision and attention to detail. The painting team I hired through Mawthouq delivered exceptional work within budget and timeline. Their professionalism and the platform's support made the entire process stress-free.",
    verified: true,
    featured: true,
  },
  {
    id: 6,
    name: "Rachid Benkirane",
    role: "Restaurant Owner",
    location: "Agadir",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    date: "3 months ago",
    service: "Appliance Repair",
    testimonial:
      "When our restaurant's refrigeration system failed, we needed immediate help. Mawthouq connected us with a specialist who arrived within hours and had us running again the same day. This platform is a lifesaver for business owners!",
    verified: true,
    featured: false,
  },
]

// Star Rating Component
const StarRating = ({ rating, size = "default" }) => {
  const sizeClasses = {
    small: "h-3 w-3",
    default: "h-4 w-4",
    large: "h-5 w-5",
  }

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            } transition-colors duration-200`}
        />
      ))}
    </div>
  )
}

// Individual Testimonial Card
const TestimonialCard = ({ testimonial, index, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`relative bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 overflow-hidden group animate-in slide-in-from-bottom-8 duration-1000 ${testimonial.featured ? "ring-2 ring-orange-200" : ""
        }`}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {testimonial.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            Featured
          </Badge>
        </div>
      )}

      {/* Gradient Overlay on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : ""}`}
      />

      <CardContent className="p-8 relative z-10">
        {/* Quote Icon */}
        <div
          className={`bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl inline-flex mb-6 transition-all duration-500 shadow-lg ${isHovered ? "scale-110 rotate-3" : ""}`}
        >
          <Quote className="h-6 w-6 text-white" />
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
          "{testimonial.testimonial}"
        </blockquote>

        {/* Rating */}
        <div className="flex items-center space-x-3 mb-6">
          <StarRating rating={testimonial.rating} size="default" />
          <span className="text-sm text-gray-500 font-medium">{testimonial.rating}.0 rating</span>
        </div>

        {/* Customer Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-14 w-14 ring-2 ring-orange-200 transition-all duration-300 group-hover:ring-orange-300">
              <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white font-semibold">
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                {testimonial.name}
              </h4>
              {testimonial.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
            <p className="text-sm text-gray-600 mb-1">{testimonial.role}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{testimonial.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{testimonial.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Badge */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Badge
            variant="secondary"
            className="bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors duration-300"
          >
            {testimonial.service}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

// Carousel Component
const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <TestimonialCard testimonial={testimonial} index={0} isActive={index === currentIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center space-x-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5 text-orange-600" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-gradient-to-r from-orange-500 to-red-500 scale-125"
                  : "bg-gray-300 hover:bg-orange-300"
                }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5 text-orange-600" />
        </Button>
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-sm text-gray-500 hover:text-orange-600 transition-colors duration-300"
        >
          {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"} Auto-scroll
        </button>
      </div>
    </div>
  )
}

// Stats Component
const StatsSection = () => {
  const stats = [
    { icon: Users, value: "50,000+", label: "Happy Customers", color: "from-blue-500 to-blue-600" },
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "from-yellow-500 to-yellow-600" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate", color: "from-green-500 to-green-600" },
    { icon: Award, value: "10,000+", label: "Completed Jobs", color: "from-purple-500 to-purple-600" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className={`bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-in slide-in-from-bottom-6 duration-1000`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6 text-center">
            <div
              className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <section className="py-24 relative overflow-hidden bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-bold mb-6">
            ✨ TRUSTED BY THOUSANDS
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
            Customer <span className="text-red-600">Stories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Active Testimonial (Large) */}
          <div className="relative animate-in slide-in-from-left-10 duration-1000">
            <Quote className="absolute -top-10 -left-10 h-32 w-32 text-orange-200/50 -z-10" />
            <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-gray-50 relative">
              <div className="flex items-center space-x-1 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-6 w-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-10 italic">
                "{testimonials[activeTestimonial].testimonial}"
              </p>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 ring-4 ring-orange-100">
                  <AvatarImage src={testimonials[activeTestimonial].avatar} />
                  <AvatarFallback className="bg-orange-500 text-white font-bold">
                    {testimonials[activeTestimonial].name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-black text-gray-900">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">{testimonials[activeTestimonial].location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial List (Small) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-10 duration-1000">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveTestimonial(i)}
                className={`text-left p-6 rounded-[2rem] transition-all duration-300 ${activeTestimonial === i
                    ? 'bg-orange-600 text-white shadow-xl scale-105'
                    : 'bg-white text-gray-900 hover:bg-orange-50'
                  }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10 ring-2 ring-white/20">
                    <AvatarFallback className={`${activeTestimonial === i ? 'bg-orange-500' : 'bg-gray-100'}`}>
                      {t.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="truncate">
                    <h5 className="font-bold text-sm">{t.name}</h5>
                    <p className={`text-[10px] uppercase font-black tracking-widest ${activeTestimonial === i ? 'text-orange-200' : 'text-gray-400'}`}>
                      {t.service}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
