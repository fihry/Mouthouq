"use client"

import { ArrowRight, MapPin, Search, Star, Users, Shield, Clock, CheckCircle } from "lucide-react"
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
    { icon: Users, value: "10,000+", label: "Trusted Professionals", color: "from-orange-500 to-red-500" },
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "from-yellow-400 to-orange-500" },
    { icon: Shield, value: "100%", label: "Verified Services", color: "from-green-400 to-emerald-600" },
    { icon: Clock, value: "24/7", label: "Support Available", color: "from-blue-400 to-indigo-600" },
  ]

  return (
    <section className="w-full relative min-h-screen flex items-center overflow-hidden bg-[#fafafa]">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-200/30 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] rounded-full bg-red-200/20 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-pink-100/30 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#fafafa_100%)]" />
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center rotate-12 animate-float">
          <Star className="h-10 w-10 text-yellow-400 fill-current" />
        </div>
        <div className="absolute top-1/3 right-12 w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center -rotate-12 animate-float" style={{ animationDelay: '1.5s' }}>
          <Shield className="h-8 w-8 text-green-500" />
        </div>
        <div className="absolute bottom-1/4 left-20 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center rotate-6 animate-float" style={{ animationDelay: '2.5s' }}>
          <CheckCircle className="h-8 w-8 text-orange-500" />
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8 animate-in slide-in-from-bottom-10 duration-1000">
            <Badge className="bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-bold mb-6 hover:scale-105 transition-transform">
              🚀 Now AI-Powered Verification Available
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight">
              Quality Service,
              <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 bg-clip-text text-transparent">
                Trusted Results
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Join Morocco's premier marketplace for verified household services. Our AI ensures you're matched with professionals you can trust.
            </p>
          </div>

          {/* Premium Search Bar */}
          <div className="max-w-4xl mx-auto mb-16 animate-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="bg-white p-2 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 backdrop-blur-sm group/search">
              <form className="flex flex-col md:flex-row items-center gap-2">
                <div className="relative flex-1 w-full pl-4 group/input">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within/input:text-orange-500 transition-colors" />
                  <Input
                    type="text"
                    placeholder="Find a specialist (e.g. Plumber, Cleaner)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 border-0 focus:ring-0 text-gray-800 text-lg h-14 bg-transparent"
                  />
                </div>
                <div className="h-8 w-px bg-gray-100 hidden md:block" />
                <div className="relative flex-1 w-full pl-4 group/input">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within/input:text-orange-500 transition-colors" />
                  <Input
                    type="text"
                    placeholder="City in Morocco"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 border-0 focus:ring-0 text-gray-800 text-lg h-14 bg-transparent"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-gray-900 hover:bg-black text-white px-10 h-14 rounded-[1.5rem] font-bold text-lg transition-all active:scale-95 shadow-lg"
                >
                  Search
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto animate-in slide-in-from-bottom-14 duration-1000 delay-500">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={stat.label}
                  className="group relative"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 border border-white hover:border-orange-100 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-gray-900 mb-2 truncate">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
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