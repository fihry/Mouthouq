"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {MouthouqOriginalLogo,MouthouqOriginalIcon } from "@/components/shared/logo"


const MouthouqFluidOriginal = ({ size = 48, variant = "light" }) => {
  return (
    <div className="relative group">
      <div
        className="relative transition-all duration-700 group-hover:scale-105"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(45deg, #FF6B35, #F7931E, #FF5722)",
          borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
          boxShadow: "0 10px 30px rgba(255, 107, 53, 0.4)",
          animation: "fluidMove 6s ease-in-out infinite",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" className="p-3">
          <path
            d="M12 2L4 8v8c0 2 1 3 3 3h10c2 0 3-1 3-3V8l-8-6z"
            fill="rgba(255,255,255,0.9)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
          />
          <path d="M9 12l2 2 4-4" stroke="#FF5722" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fluidMove {
          0%,
          100% {
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
          }
          34% {
            border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
          }
          67% {
            border-radius: 58% 42% 37% 63% / 48% 62% 38% 52%;
          }
        }
      `}</style>
    </div>
  )
}

export default function MouthouqOriginalShowcase() {
  const [selectedVariant, setSelectedVariant] = useState("original")
  const [backgroundMode, setBackgroundMode] = useState("light")
  const [animationEnabled, setAnimationEnabled] = useState(true)

  const logoVariants = {
    original: {
      component: MouthouqOriginalLogo,
      name: "Original Moroccan",
      description: "Unique Zellige-inspired design with organic morphing shape",
    },
    geometric: {
      component: MouthouqOriginalLogo,
      name: "Geometric Hex",
      description: "Hexagonal Moroccan tile-inspired design",
    },
    fluid: {
      component: MouthouqFluidOriginal,
      name: "Fluid Organic",
      description: "Organic flowing shape with continuous animation",
    },
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        backgroundMode === "dark"
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black"
          : "bg-gradient-to-br from-orange-50 via-white to-pink-50"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-orange-200/10 to-red-200/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-200/10 to-orange-200/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-br from-red-200/5 to-pink-200/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm font-semibold">
              100% Original Design
            </Badge>
            <Badge
              variant="outline"
              className={`px-4 py-2 text-sm ${backgroundMode === "dark" ? "border-gray-600 text-gray-300" : ""}`}
            >
              Moroccan Innovation
            </Badge>
          </div>
          <h1
            className={`text-5xl md:text-7xl font-black mb-6 ${
              backgroundMode === "dark" ? "text-white" : "text-gray-900"
            }`}
            style={{
              fontFamily: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
          >
            Mouthouq
            <span className="block text-3xl md:text-4xl font-normal bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mt-2">
              Original Creative Identity
            </span>
          </h1>
          <p
            className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${backgroundMode === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            Completely original logo design inspired by Moroccan Zellige tiles, organic architecture, and modern trust
            symbols. A unique identity that stands out in the global market.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="flex gap-2">
            {Object.entries(logoVariants).map(([key, variant]) => (
              <Button
                key={key}
                variant={selectedVariant === key ? "default" : "outline"}
                onClick={() => setSelectedVariant(key)}
                className={`px-6 py-3 font-semibold transition-all duration-300 ${
                  selectedVariant === key
                    ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg scale-105"
                    : backgroundMode === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                      : "hover:bg-gray-50"
                }`}
              >
                {variant.name}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setBackgroundMode(backgroundMode === "light" ? "dark" : "light")}
              className={`px-6 py-3 font-semibold transition-all duration-300 ${
                backgroundMode === "dark" ? "text-white border-gray-600 hover:bg-gray-800" : "hover:bg-gray-50"
              }`}
            >
              {backgroundMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setAnimationEnabled(!animationEnabled)}
              className={`px-6 py-3 font-semibold transition-all duration-300 ${
                backgroundMode === "dark" ? "text-white border-gray-600 hover:bg-gray-800" : "hover:bg-gray-50"
              }`}
            >
              {animationEnabled ? "⚡ Animated" : "🎯 Static"}
            </Button>
          </div>
        </div>

        {/* Hero Logo Display */}
        <Card
          className={`mb-16 border-0 shadow-2xl ${backgroundMode === "dark" ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-xl`}
        >
          <CardContent className="p-16">
            <div className="text-center">
              <div className="mb-12">
                {selectedVariant === "original" && (
                  <div className="space-y-12">
                    <MouthouqOriginalLogo size="default" animated={true} variant={backgroundMode} />
                    <div className="flex justify-center items-center space-x-12">
                      <MouthouqOriginalIcon size={80} variant={backgroundMode} animated={animationEnabled} />
                      <MouthouqOriginalIcon size={64} variant={backgroundMode} animated={animationEnabled} />
                      <MouthouqOriginalIcon size={48} variant={backgroundMode} animated={animationEnabled} />
                      <MouthouqOriginalIcon size={32} variant={backgroundMode} animated={animationEnabled} />
                    </div>
                  </div>
                )}
                {selectedVariant === "geometric" && (
                  <div className="space-y-12">
                    <div className="flex items-center justify-center space-x-6">
                      <MouthouqOriginalLogo size="default" animated={true} variant={backgroundMode} />
                      <span
                        className={`text-6xl font-black tracking-tighter ${
                          backgroundMode === "dark" ? "text-white" : "text-gray-900"
                        }`}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Mouthouq
                      </span>
                    </div>
                    <div className="flex justify-center space-x-8">
                      <MouthouqOriginalLogo size="default" animated={true}variant={backgroundMode} />
                      <MouthouqOriginalLogo size="default" animated={true} variant={backgroundMode} />
                      <MouthouqOriginalLogo size="default" animated={true}variant={backgroundMode} />
                    </div>
                  </div>
                )}
                {selectedVariant === "fluid" && (
                  <div className="space-y-12">
                    <div className="flex items-center justify-center space-x-6">
                      <MouthouqFluidOriginal size={80} variant={backgroundMode} />
                      <span
                        className={`text-6xl font-black tracking-tighter ${
                          backgroundMode === "dark" ? "text-white" : "text-gray-900"
                        }`}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Mouthouq
                      </span>
                    </div>
                    <div className="flex justify-center space-x-8">
                      <MouthouqFluidOriginal size={64} variant={backgroundMode} />
                      <MouthouqFluidOriginal size={48} variant={backgroundMode} />
                      <MouthouqFluidOriginal size={32} variant={backgroundMode} />
                    </div>
                  </div>
                )}
              </div>
              <Badge
                variant="secondary"
                className="text-base px-6 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-gray-800 border-0"
              >
                {logoVariants[selectedVariant].description}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Original Design Features */}
        <Card
          className={`border-0 shadow-2xl ${backgroundMode === "dark" ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-xl mb-16`}
        >
          <CardContent className="p-12">
            <h3
              className={`text-3xl font-bold mb-8 text-center ${
                backgroundMode === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Original Design Elements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🏺</span>
                </div>
                <h4 className={`font-bold mb-2 ${backgroundMode === "dark" ? "text-white" : "text-gray-900"}`}>
                  Zellige Inspiration
                </h4>
                <p className={`text-sm ${backgroundMode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Traditional Moroccan tile patterns integrated into modern design
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🌊</span>
                </div>
                <h4 className={`font-bold mb-2 ${backgroundMode === "dark" ? "text-white" : "text-gray-900"}`}>
                  Organic Morphing
                </h4>
                <p className={`text-sm ${backgroundMode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Fluid shape-changing animation representing growth and adaptability
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">⭐</span>
                </div>
                <h4 className={`font-bold mb-2 ${backgroundMode === "dark" ? "text-white" : "text-gray-900"}`}>
                  Moroccan Star
                </h4>
                <p className={`text-sm ${backgroundMode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Traditional eight-pointed star symbolizing guidance and excellence
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🔗</span>
                </div>
                <h4 className={`font-bold mb-2 ${backgroundMode === "dark" ? "text-white" : "text-gray-900"}`}>
                  Trust Network
                </h4>
                <p className={`text-sm ${backgroundMode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Connected dots representing the trusted professional network
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mobile App */}
          <Card
            className={`border-0 shadow-xl ${backgroundMode === "dark" ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-xl hover:scale-105 transition-all duration-500`}
          >
            <CardContent className="p-8">
              <h3 className={`text-xl font-bold mb-6 ${backgroundMode === "dark" ? "text-white" : "text-gray-900"}`}>
                Mobile App Icon
              </h3>
              <div className="flex justify-center">
                <div className="bg-black rounded-3xl p-6" style={{ borderRadius: "22px" }}>
                  <MouthouqOriginalIcon size={64} variant="dark" animated={false} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Card */}
          <Card
            className={`border-0 shadow-xl ${backgroundMode === "dark" ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-xl hover:scale-105 transition-all duration-500`}
          >
            <CardContent className="p-8">
              <h3 className={`text-xl font-bold mb-6 ${backgroundMode === "dark" ? "text-white" : "text-gray-900"}`}>
                Business Card
              </h3>
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl text-white shadow-2xl">
                <MouthouqOriginalLogo size="small" variant="dark" />
                <div className="mt-4 space-y-1">
                  <div className="text-sm opacity-90">Mouhamed el fihry</div>
                  <div className="text-xs opacity-70">CEO & Founder</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Website Header */}
          <Card
            className={`border-0 shadow-xl ${backgroundMode === "dark" ? "bg-gray-800/50" : "bg-white/70"} backdrop-blur-xl hover:scale-105 transition-all duration-500`}
          >
            <CardContent className="p-8">
              <h3 className={`text-xl font-bold mb-6 ${backgroundMode === "dark" ? "text-white" : "text-gray-900"}`}>
                Website Header
              </h3>
              <div
                className={`p-4 rounded-xl ${backgroundMode === "dark" ? "bg-gray-900/50" : "bg-white"} shadow-inner`}
              >
                <div className="flex items-center justify-between">
                  <MouthouqOriginalLogo size="small" variant={backgroundMode} />
                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4">
                    Get Started
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
