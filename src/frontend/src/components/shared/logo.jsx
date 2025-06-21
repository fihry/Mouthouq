"use client"

import { useState } from "react"

// Original Creative Logo with Moroccan Zellige Design
const MouthouqOriginalLogo = ({ size = "default", animated = true }) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizes = {
    small: { icon: 32, text: "text-lg", container: "space-x-2", letterSpacing: "tracking-tight" },
    default: { icon: 40, text: "text-2xl", container: "space-x-3", letterSpacing: "tracking-tight" },
    large: { icon: 48, text: "text-3xl", container: "space-x-4", letterSpacing: "tracking-tight" },
  }

  const currentSize = sizes[size]

  return (
    <div
      className={`flex items-center ${currentSize.container} cursor-pointer transition-all duration-500 ${animated ? "hover:scale-105" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MouthouqOriginalIcon size={currentSize.icon} animated={animated} isHovered={isHovered} />
      <div className="relative">
        <span
          className={`${currentSize.text} font-black ${currentSize.letterSpacing} relative z-10 transition-all duration-500 text-gray-900`}
          style={{
            fontFamily: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 800,
            transform: isHovered ? "translateY(-1px)" : "translateY(0px)",
          }}
        >
          Mouthouq
        </span>
        {/* Dynamic gradient overlay */}
        <div
          className={`absolute inset-0 ${currentSize.text} font-black ${currentSize.letterSpacing} bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            fontFamily: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 800,
          }}
        >
          Mouthouq
        </div>
      </div>
    </div>
  )
}

// Original Icon Design - Moroccan Zellige Pattern + Modern Trust Symbol
const MouthouqOriginalIcon = ({ size = 40, animated = false, isHovered = false }) => {
  return (
    <div className="relative group">
      {/* Outer energy ring */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-1000 ${
          isHovered ? "scale-150 opacity-30" : "scale-100 opacity-0"
        }`}
        style={{
          width: size * 1.4,
          height: size * 1.4,
          left: -size * 0.2,
          top: -size * 0.2,
          background: "conic-gradient(from 0deg, #FF6B35, #F7931E, #FF5722, #E91E63, #9C27B0, #FF6B35)",
          filter: "blur(6px)",
        }}
      />

      {/* Main icon container with unique shape */}
      <div
        className={`relative transition-all duration-700 ${isHovered ? "scale-110 rotate-3" : "scale-100 rotate-0"}`}
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF5722 50%, #E91E63 75%, #9C27B0 100%)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          boxShadow: `
            0 ${size * 0.15}px ${size * 0.3}px rgba(255, 107, 53, 0.25),
            0 ${size * 0.08}px ${size * 0.15}px rgba(255, 107, 53, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `,
          animation: animated ? "morphShape 8s ease-in-out infinite" : "none",
        }}
      >
        {/* Moroccan Zellige-inspired pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px),
              radial-gradient(circle at 75% 25%, rgba(255,255,255,0.3) 1px, transparent 1px),
              radial-gradient(circle at 25% 75%, rgba(255,255,255,0.3) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "6px 6px",
          }}
        />

        {/* Central trust symbol - Original design */}
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" className="relative z-10 p-2">
          <defs>
            <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
            </linearGradient>
            <filter id="innerGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Moroccan arch-inspired base */}
          <path
            d="M12 3C8.5 3 6 5.5 6 9v7c0 1.5 1 2.5 2.5 2.5h7c1.5 0 2.5-1 2.5-2.5V9c0-3.5-2.5-6-6-6z"
            fill="url(#trustGradient)"
            className={`transition-all duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
            filter="url(#innerGlow)"
          />

          {/* Trust checkmark with Moroccan flair */}
          <path
            d="M8.5 12l2 2 5-5"
            stroke="rgba(239, 68, 68, 0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className={`transition-all duration-700 ${isHovered ? "stroke-red-600" : ""}`}
            style={{
              filter: "drop-shadow(0 1px 2px rgba(239, 68, 68, 0.3))",
            }}
          />

          {/* Moroccan star elements */}
          <path
            d="M12 6l1 2h2l-1.5 1.5L14 12l-2-1-2 1 .5-2.5L9 8h2l1-2z"
            fill="rgba(251, 146, 60, 0.6)"
            className={`transition-all duration-700 ${isHovered ? "fill-orange-400" : ""}`}
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          />

          {/* Connection dots representing network */}
          <circle
            cx="7"
            cy="16"
            r="0.8"
            fill="rgba(251, 146, 60, 0.8)"
            className={`transition-all duration-500 ${isHovered ? "r-1" : ""}`}
          />
          <circle
            cx="17"
            cy="16"
            r="0.8"
            fill="rgba(251, 146, 60, 0.8)"
            className={`transition-all duration-500 ${isHovered ? "r-1" : ""}`}
          />
          <circle
            cx="12"
            cy="18"
            r="0.8"
            fill="rgba(251, 146, 60, 0.8)"
            className={`transition-all duration-500 ${isHovered ? "r-1" : ""}`}
          />

          {/* Connecting lines */}
          <path
            d="M7 16l5 2 5-2"
            stroke="rgba(251, 146, 60, 0.4)"
            strokeWidth="0.8"
            fill="none"
            className={`transition-all duration-700 ${isHovered ? "stroke-orange-400" : ""}`}
          />
        </svg>

        {/* Premium highlight effect */}
        <div
          className={`absolute top-1 left-1 right-1 h-3 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transition-all duration-700 ${
            isHovered ? "opacity-40" : ""
          }`}
          style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
        />
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes morphShape {
          0%,
          100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
          }
        }
      `}</style>
    </div>
  )
}

export { MouthouqOriginalLogo, MouthouqOriginalIcon }


