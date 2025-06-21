"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Smartphone,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Briefcase,
  TrendingUp,
  Award,
  LayoutDashboard,
} from "lucide-react"

// Feature Badge Component
const FeatureBadge = ({ icon: Icon, text, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 cursor-pointer animate-in slide-in-from-bottom-6 duration-1000 transform hover:scale-105`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className={`h-5 w-5 text-orange-200 transition-all duration-300 ${isHovered ? "scale-110" : ""}`} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}

// Professional Benefits Component
const ProfessionalBenefits = () => {
  const benefits = [
    { icon: TrendingUp, text: "Grow Your Business" },
    { icon: Users, text: "Access More Customers" },
    { icon: Award, text: "Build Your Reputation" },
    { icon: Clock, text: "Flexible Schedule" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {benefits.map((benefit, index) => (
        <div
          key={benefit.text}
          className={`flex items-center space-x-2 text-sm animate-in slide-in-from-bottom-4 duration-1000`}
          style={{ animationDelay: `${index * 100 + 600}ms` }}
        >
          <benefit.icon className="h-4 w-4 text-orange-200 flex-shrink-0" />
          <span className="text-orange-100">{benefit.text}</span>
        </div>
      ))}
    </div>
  )
}

export default function CTASection() {
  const [hoveredButton, setHoveredButton] = useState(null)

  const features = [
    { icon: Smartphone, text: "Easy to Use App" },
    { icon: Shield, text: "Secure Payments" },
    { icon: LayoutDashboard, text: "Manage Everything in One Place" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-orange-600 via-red-700 to-pink-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "6s" }}
        />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "8s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-bounce"
          style={{ animationDelay: "4s", animationDuration: "7s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <div className="animate-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Find Your Perfect
              <span className="block bg-gradient-to-r from-orange-200 to-pink-200 bg-clip-text text-transparent">
                Professional?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust Mawthouq for all their household service needs.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {features.map((feature, index) => (
              <FeatureBadge key={feature.text} icon={feature.icon} text={feature.text} delay={index * 200 + 400} />
            ))}
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in slide-in-from-bottom-8 duration-1000 delay-800">
            <Button
              size="lg"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
              onMouseEnter={() => setHoveredButton("post")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <span>Post a Request</span>
              <ArrowRight
                className={`h-5 w-5 ml-2 transition-transform duration-300 ${
                  hoveredButton === "post" ? "translate-x-1" : ""
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
              onMouseEnter={() => setHoveredButton("browse")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Browse Services
            </Button>
          </div>

          {/* Professional Section */}
          <Card className="bg-white/10 backdrop-blur-sm border-0 rounded-2xl max-w-2xl mx-auto animate-in slide-in-from-bottom-10 duration-1000 delay-1000">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-orange-200 mr-3" />
                <h3 className="text-2xl font-bold">Are You a Professional?</h3>
              </div>

              <p className="text-orange-100 mb-6 leading-relaxed">
                Join our network of verified professionals and grow your business with Mawthouq. Get access to thousands
                of customers across Morocco.
              </p>

              {/* Professional Benefits Grid */}
              <ProfessionalBenefits />

              <Button
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                onMouseEnter={() => setHoveredButton("join")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span>Join as Professional</span>
                <ArrowRight
                  className={`h-4 w-4 ml-2 transition-transform duration-300 ${
                    hoveredButton === "join" ? "translate-x-1" : ""
                  }`}
                />
              </Button>

              {/* Trust Indicators for Professionals */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-wrap justify-center gap-4 text-sm text-orange-100">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Free to join</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span>Verified platform</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                    <span>Grow your income</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
