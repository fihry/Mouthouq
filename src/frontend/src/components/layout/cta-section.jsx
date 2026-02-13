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
  Star,
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
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-900" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_rgba(234,88,12,0.15)_0%,_transparent_50%)]" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(220,38,38,0.15)_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-[4rem] p-12 md:p-24 text-center shadow-2xl relative overflow-hidden group">
          {/* Animated Background Circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
              Ready to find your <span className="underline decoration-white/30">perfect</span> specialist?
            </h2>
            <p className="text-xl md:text-2xl text-orange-100 mb-12 font-medium leading-relaxed">
              Join 50k+ Moroccans who use Mouthouq to hire verified professionals every single day.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button className="bg-white text-gray-900 hover:bg-orange-50 px-12 h-20 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 group-hover:scale-105">
                Get Started Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 h-20 rounded-[2rem] font-black text-xl backdrop-blur-md">
                Browse Services
              </Button>
            </div>

            <div className="mt-16 pt-16 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Shield, text: "100% Verified" },
                { icon: Clock, text: "Fast Response" },
                { icon: Star, text: "Top Rated" },
                { icon: Users, text: "Trusted Pros" }
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center">
                  <item.icon className="h-6 w-6 text-orange-200 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-100">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
