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
    <section className="py-20 bg-gradient-to-br from-orange-50/50 via-red-50/30 to-pink-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
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
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "4s" }}
        />
        <div
          className="absolute top-60 right-20 w-12 h-12 bg-gradient-to-br from-red-200/30 to-pink-200/30 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "6s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Popular Services</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From routine maintenance to emergency repairs, find the right professional for every job in Morocco.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50 relative overflow-hidden animate-in slide-in-from-bottom-6 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                    Popular
                  </Badge>
                )}

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <CardContent className="p-6">
                  {/* Service Icon */}
                  <div
                    className={`${service.bgColor} p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                  >
                    <IconComponent className={`h-8 w-8 ${service.iconColor}`} />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>

                  {/* Service Stats */}
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="font-medium">{service.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.avgTime}</span>
                    </div>
                    {service.verified && (
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3 text-green-500" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Explore Link */}
                  <div className="flex items-center text-orange-500 font-medium text-sm group-hover:text-orange-600 transition-colors duration-300">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
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
