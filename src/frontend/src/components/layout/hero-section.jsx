"use client"

import { ArrowRight, MapPin, Search, Star, Users, Shield, Clock } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")

  const popularServices = [
    "House Cleaning",
    "Plumbing",
    "AC Repair",
    "Electrical Work",
    "Painting",
    "Appliance Repair",
    "Gardening",
    "Carpentry",
  ]

  const stats = [
    { icon: Users, value: "10,000+", label: "Trusted Professionals" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
    { icon: Shield, value: "100%", label: "Verified Services" },
    { icon: Clock, value: "24/7", label: "Support Available" },
  ]

  return (
    <section className="w-full relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8 animate-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Find Trusted Professionals
              <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Near You
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect with verified, AI-matched professionals for all your household services. From cleaning to repairs,
              we've got you covered with trusted experts in Morocco.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto mb-12 animate-in slide-in-from-bottom-6 duration-1000 delay-200">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20">
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-orange-500 transition-colors" />
                  <Input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-white/50 backdrop-blur-sm h-14"
                  />
                </div>

                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-orange-500 transition-colors" />
                  <Input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-white/50 backdrop-blur-sm h-14"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 px-8 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 h-14"
                >
                  <span>Find Professionals</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Popular Services */}
          <div className="mb-16 animate-in fade-in duration-1000 delay-400">
            <p className="text-gray-500 mb-6 text-lg">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {popularServices.map((service, index) => (
                <Badge
                  key={service}
                  variant="secondary"
                  className="bg-white/70 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 text-sm font-medium border border-gray-200/50 cursor-pointer hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-1000 delay-600">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={stat.label}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 group-hover:shadow-xl transition-all duration-300">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 animate-in fade-in duration-1000 delay-800">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Verified Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Rated & Reviewed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}