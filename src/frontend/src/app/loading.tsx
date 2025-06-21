"use client"

import { useState, useEffect } from "react"

// Import the exact same logo from navbar
const MawthouqOriginalIcon = ({ size = 40, animated = true }) => {
  return (
    <div className="relative group">
      {/* Main icon container with unique shape */}
      <div
        className="relative"
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
          animation: animated ? "morphShape 2s ease-in-out infinite, pulse 1.5s ease-in-out infinite" : "none",
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
            backgroundSize: `${size * 0.15}px ${size * 0.15}px`,
          }}
        />

        {/* Central trust symbol */}
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" className="relative z-10 p-2">
          <defs>
            <linearGradient id={`trustGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
            </linearGradient>
          </defs>

          {/* Moroccan arch-inspired base */}
          <path
            d="M12 3C8.5 3 6 5.5 6 9v7c0 1.5 1 2.5 2.5 2.5h7c1.5 0 2.5-1 2.5-2.5V9c0-3.5-2.5-6-6-6z"
            fill={`url(#trustGradient-${size})`}
          />

          {/* Trust checkmark */}
          <path
            d="M8.5 12l2 2 5-5"
            stroke="rgba(239, 68, 68, 0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Moroccan star */}
          <path d="M12 6l1 2h2l-1.5 1.5L14 12l-2-1-2 1 .5-2.5L9 8h2l1-2z" fill="rgba(251, 146, 60, 0.6)" />

          {/* Connection dots */}
          <circle cx="7" cy="16" r="0.8" fill="rgba(251, 146, 60, 0.8)" />
          <circle cx="17" cy="16" r="0.8" fill="rgba(251, 146, 60, 0.8)" />
          <circle cx="12" cy="18" r="0.8" fill="rgba(251, 146, 60, 0.8)" />

          {/* Connecting lines */}
          <path d="M7 16l5 2 5-2" stroke="rgba(251, 146, 60, 0.4)" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes morphShape {
          0%,
          100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}

export default function Loading() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 flex justify-center">
          <MawthouqOriginalIcon size={80} animated={true} />
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            <span
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Mawthouq
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Loading{dots}
            <span className="inline-block w-8 text-left">{dots}</span>
          </p>
        </div>

        {/* Loading Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-sm text-gray-500 mt-6 max-w-md mx-auto">
          Connecting you with trusted professionals in Morocco...
        </p>
      </div>
    </div>
  )
}
