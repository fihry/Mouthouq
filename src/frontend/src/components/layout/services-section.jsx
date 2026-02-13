"use client"

import {
  Sparkles,
  Droplets,
  Zap,
  Wind,
  PaintBucket,
  Wrench,
  Hammer,
  Car,
  ArrowRight,
  Star,
  Clock,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "House Cleaning",
      description: "Deep cleaning, regular maintenance, move-in/out cleaning",
      icon: Sparkles,
      color: "blue",
      gradient: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      popular: true,
      rating: 4.9,
      avgTime: "2-3 hours",
      verified: true,
    },
    {
      id: 2,
      title: "Plumbing Services",
      description: "Leak repairs, pipe installation, emergency plumbing",
      icon: Droplets,
      color: "cyan",
      gradient: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      popular: true,
      rating: 4.8,
      avgTime: "1-2 hours",
      verified: true,
    },
    {
      id: 3,
      title: "Electrical Work",
      description: "Wiring, fixture installation, electrical repairs",
      icon: Zap,
      color: "yellow",
      gradient: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      popular: false,
      rating: 4.7,
      avgTime: "1-3 hours",
      verified: true,
    },
    {
      id: 4,
      title: "AC Repair & Maintenance",
      description: "Air conditioning repair, cleaning, installation",
      icon: Wind,
      color: "green",
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      popular: true,
      rating: 4.8,
      avgTime: "2-4 hours",
      verified: true,
    },
    {
      id: 5,
      title: "Painting Services",
      description: "Interior/exterior painting, wall preparation",
      icon: PaintBucket,
      color: "purple",
      gradient: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      popular: false,
      rating: 4.6,
      avgTime: "4-8 hours",
      verified: true,
    },
    {
      id: 6,
      title: "Appliance Repair",
      description: "Washing machine, refrigerator, dishwasher repairs",
      icon: Wrench,
      color: "red",
      gradient: "from-red-400 to-red-600",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      popular: true,
      rating: 4.7,
      avgTime: "1-2 hours",
      verified: true,
    },
    {
      id: 7,
      title: "Handyman Services",
      description: "Furniture assembly, minor repairs, installations",
      icon: Hammer,
      color: "orange",
      gradient: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      popular: false,
      rating: 4.5,
      avgTime: "2-4 hours",
      verified: true,
    },
    {
      id: 8,
      title: "Moving Services",
      description: "Local moving, packing, furniture transport",
      icon: Car,
      color: "indigo",
      gradient: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      popular: false,
      rating: 4.6,
      avgTime: "4-8 hours",
      verified: true,
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50/50 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 md:block hidden" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-red-50/50 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 md:block hidden" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-in slide-in-from-bottom-6 duration-1000">
          <div className="max-w-2xl text-left">
            <Badge className="bg-orange-600 text-white px-4 py-1 mb-4 rounded-full font-bold">
              🔥 TRADING CATEGORIES
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Explore Popular <span className="text-orange-600">Services</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
              Find the right professional for every job in Morocco. From routine maintenance to emergency repairs.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-8 h-14 font-bold transition-all">
            See All Categories
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group relative bg-[#fafafa] hover:bg-white rounded-[2.5rem] border-0 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden isolate"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Glow */}
                {service.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 blur-3xl -z-10 group-hover:bg-orange-200/50 transition-colors" />
                )}

                <CardContent className="p-8">
                  {/* Service Icon with 3D Effect */}
                  <div
                    className={`${service.bgColor} w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <IconComponent className={`h-8 w-8 ${service.iconColor}`} />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      {service.description}
                    </p>

                    <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 shadow-sm overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${service.id + i}`} alt="User" />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">120+ Active</span>
                      </div>
                      <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </CardContent>

                {/* Corner Badge */}
                {service.popular && (
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-orange-600 rotate-45 flex items-end justify-center pb-2">
                    <Star className="h-4 w-4 text-white -rotate-45" />
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center animate-in fade-in duration-1000 delay-800">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
          >
            View All Services
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-1000 delay-600">
          <div className="text-center group">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 group-hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Professionals</h3>
              <p className="text-gray-600 text-sm">All service providers are background-checked and verified</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 group-hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">100% satisfaction guarantee on all completed services</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 group-hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-gray-600 text-sm">Fast booking and same-day service availability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
