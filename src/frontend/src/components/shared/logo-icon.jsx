"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Palette, Copy, Check } from "lucide-react"
import { MouthouqOriginalIcon } from "@/components/shared/logo"

// // EXACT SAME ICON FROM NAVBAR - No modifications
// const MouthouqOriginalIcon = ({ size = 40, animated = false, isHovered = false }) => {
//       return (
//             <div className="relative group">
//                   {/* Outer energy ring */}
//                   <div
//                         className={`absolute inset-0 rounded-full transition-all duration-1000 ${isHovered ? "scale-150 opacity-30" : "scale-100 opacity-0"
//                               }`}
//                         style={{
//                               width: size * 1.4,
//                               height: size * 1.4,
//                               left: -size * 0.2,
//                               top: -size * 0.2,
//                               background: "conic-gradient(from 0deg, #FF6B35, #F7931E, #FF5722, #E91E63, #9C27B0, #FF6B35)",
//                               filter: "blur(6px)",
//                         }}
//                   />

//                   {/* Main icon container with unique shape */}
//                   <div
//                         className={`relative transition-all duration-700 ${isHovered ? "scale-110 rotate-3" : "scale-100 rotate-0"}`}
//                         style={{
//                               width: size,
//                               height: size,
//                               background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FF5722 50%, #E91E63 75%, #9C27B0 100%)",
//                               borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
//                               boxShadow: `
//             0 ${size * 0.15}px ${size * 0.3}px rgba(255, 107, 53, 0.25),
//             0 ${size * 0.08}px ${size * 0.15}px rgba(255, 107, 53, 0.15),
//             inset 0 1px 0 rgba(255, 255, 255, 0.3)
//           `,
//                               animation: animated ? "morphShape 8s ease-in-out infinite" : "none",
//                         }}
//                   >
//                         {/* Moroccan Zellige-inspired pattern */}
//                         <div
//                               className="absolute inset-0 opacity-10"
//                               style={{
//                                     borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
//                                     backgroundImage: `
//               radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px),
//               radial-gradient(circle at 75% 25%, rgba(255,255,255,0.3) 1px, transparent 1px),
//               radial-gradient(circle at 25% 75%, rgba(255,255,255,0.3) 1px, transparent 1px),
//               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 1px, transparent 1px)
//             `,
//                                     backgroundSize: `${size * 0.15}px ${size * 0.15}px`,
//                               }}
//                         />

//                         {/* Central trust symbol - Original design */}
//                         <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" className="relative z-10 p-2">
//                               <defs>
//                                     <linearGradient id={`trustGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
//                                           <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
//                                           <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
//                                           <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
//                                     </linearGradient>
//                                     <filter id={`innerGlow-${size}`}>
//                                           <feGaussianBlur stdDeviation="1" result="coloredBlur" />
//                                           <feMerge>
//                                                 <feMergeNode in="coloredBlur" />
//                                                 <feMergeNode in="SourceGraphic" />
//                                           </feMerge>
//                                     </filter>
//                               </defs>

//                               {/* Moroccan arch-inspired base */}
//                               <path
//                                     d="M12 3C8.5 3 6 5.5 6 9v7c0 1.5 1 2.5 2.5 2.5h7c1.5 0 2.5-1 2.5-2.5V9c0-3.5-2.5-6-6-6z"
//                                     fill={`url(#trustGradient-${size})`}
//                                     className={`transition-all duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
//                                     filter={`url(#innerGlow-${size})`}
//                               />

//                               {/* Trust checkmark with Moroccan flair */}
//                               <path
//                                     d="M8.5 12l2 2 5-5"
//                                     stroke="rgba(239, 68, 68, 0.9)"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     fill="none"
//                                     className={`transition-all duration-700 ${isHovered ? "stroke-red-600" : ""}`}
//                                     style={{
//                                           filter: "drop-shadow(0 1px 2px rgba(239, 68, 68, 0.3))",
//                                     }}
//                               />

//                               {/* Moroccan star elements */}
//                               <path
//                                     d="M12 6l1 2h2l-1.5 1.5L14 12l-2-1-2 1 .5-2.5L9 8h2l1-2z"
//                                     fill="rgba(251, 146, 60, 0.6)"
//                                     className={`transition-all duration-700 ${isHovered ? "fill-orange-400" : ""}`}
//                                     style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
//                               />

//                               {/* Connection dots representing network */}
//                               <circle
//                                     cx="7"
//                                     cy="16"
//                                     r="0.8"
//                                     fill="rgba(251, 146, 60, 0.8)"
//                                     className={`transition-all duration-500 ${isHovered ? "r-1" : ""}`}
//                               />
//                               <circle
//                                     cx="17"
//                                     cy="16"
//                                     r="0.8"
//                                     fill="rgba(251, 146, 60, 0.8)"
//                                     className={`transition-all duration-500 ${isHovered ? "r-1" : ""}`}
//                               />
//                               <circle
//                                     cx="12"
//                                     cy="18"
//                                     r="0.8"
//                                     fill="rgba(251, 146, 60, 0.8)"
//                                     className={`transition-all duration-500 ${isHovered ? "r-1" : ""}`}
//                               />

//                               {/* Connecting lines */}
//                               <path
//                                     d="M7 16l5 2 5-2"
//                                     stroke="rgba(251, 146, 60, 0.4)"
//                                     strokeWidth="0.8"
//                                     fill="none"
//                                     className={`transition-all duration-700 ${isHovered ? "stroke-orange-400" : ""}`}
//                               />
//                         </svg>

//                         {/* Premium highlight effect */}
//                         <div
//                               className={`absolute top-1 left-1 right-1 h-3 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transition-all duration-700 ${isHovered ? "opacity-40" : ""
//                                     }`}
//                               style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
//                         />
//                   </div>

//                   {/* Add CSS animations */}
//                   <style jsx>{`
//         @keyframes morphShape {
//           0%,
//           100% {
//             border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
//           }
//           25% {
//             border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
//           }
//           50% {
//             border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
//           }
//           75% {
//             border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
//           }
//         }
//       `}</style>
//             </div>
//       )
// }

// Professional Favicon Component - wrapper for the exact navbar icon
const FaviconPreview = ({ size = 32 }) => {
      const [isHovered, setIsHovered] = useState(false)

      return (
            <div
                  className="relative inline-block"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
            >
                  <MouthouqOriginalIcon size={size} animated={false} isHovered={isHovered} />
            </div>
      )
}

// CORRECTED SVG Generator - Exact navbar shape match
const generateExactSVG = (size) => {
      // Calculate the organic shape path that matches navbar exactly
      const centerX = size / 2
      const centerY = size / 2
      const radius = size * 0.4 // 40% of size like navbar

      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Exact gradient from navbar -->
    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FF6B35"/>
      <stop offset="25%" stopColor="#F7931E"/>
      <stop offset="50%" stopColor="#FF5722"/>
      <stop offset="75%" stopColor="#E91E63"/>
      <stop offset="100%" stopColor="#9C27B0"/>
    </linearGradient>
    
    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
      <stop offset="50%" stopColor="rgba(255,255,255,0.85)"/>
      <stop offset="100%" stopColor="rgba(255,255,255,0.75)"/>
    </linearGradient>
    
    <filter id="shadow">
      <feDropShadow dx="0" dy="${size * 0.06}" stdDeviation="${size * 0.04}" floodColor="rgba(255, 107, 53, 0.25)"/>
    </filter>
    
    <filter id="innerGlow">
      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <pattern id="zelligePattern" x="0" y="0" width="${size * 0.15}" height="${size * 0.15}" patternUnits="userSpaceOnUse">
      <circle cx="${size * 0.075}" cy="${size * 0.075}" r="1" fill="rgba(255,255,255,0.3)"/>
    </pattern>
  </defs>
  
  <!-- EXACT organic shape matching navbar borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" -->
  <path d="M${centerX} ${size * 0.1}
           C${size * 0.7} ${size * 0.1}, ${size * 0.9} ${size * 0.3}, ${size * 0.9} ${centerY}
           C${size * 0.9} ${size * 0.7}, ${size * 0.7} ${size * 0.9}, ${centerX} ${size * 0.9}
           C${size * 0.3} ${size * 0.9}, ${size * 0.1} ${size * 0.7}, ${size * 0.1} ${centerY}
           C${size * 0.1} ${size * 0.3}, ${size * 0.3} ${size * 0.1}, ${centerX} ${size * 0.1} Z" 
        fill="url(#mainGradient)" 
        filter="url(#shadow)"/>
  
  <!-- Pattern overlay with same shape -->
  <path d="M${centerX} ${size * 0.1}
           C${size * 0.7} ${size * 0.1}, ${size * 0.9} ${size * 0.3}, ${size * 0.9} ${centerY}
           C${size * 0.9} ${size * 0.7}, ${size * 0.7} ${size * 0.9}, ${centerX} ${size * 0.9}
           C${size * 0.3} ${size * 0.9}, ${size * 0.1} ${size * 0.7}, ${size * 0.1} ${centerY}
           C${size * 0.1} ${size * 0.3}, ${size * 0.3} ${size * 0.1}, ${centerX} ${size * 0.1} Z" 
        fill="url(#zelligePattern)" 
        opacity="0.1"/>
  
  <!-- Icon content - exact scaling and positioning -->
  <g transform="translate(${size * 0.1}, ${size * 0.1}) scale(${size / 30})">
    <!-- Moroccan arch -->
    <path d="M12 3C8.5 3 6 5.5 6 9v7c0 1.5 1 2.5 2.5 2.5h7c1.5 0 2.5-1 2.5-2.5V9c0-3.5-2.5-6-6-6z" 
          fill="url(#iconGradient)" 
          filter="url(#innerGlow)"/>
    
    <!-- Trust checkmark -->
    <path d="M8.5 12l2 2 5-5" 
          stroke="rgba(239, 68, 68, 0.9)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"/>
    
    <!-- Moroccan star -->
    <path d="M12 6l1 2h2l-1.5 1.5L14 12l-2-1-2 1 .5-2.5L9 8h2l1-2z" 
          fill="rgba(251, 146, 60, 0.6)"/>
    
    <!-- Connection dots -->
    <circle cx="7" cy="16" r="0.8" fill="rgba(251, 146, 60, 0.8)"/>
    <circle cx="17" cy="16" r="0.8" fill="rgba(251, 146, 60, 0.8)"/>
    <circle cx="12" cy="18" r="0.8" fill="rgba(251, 146, 60, 0.8)"/>
    
    <!-- Connecting lines -->
    <path d="M7 16l5 2 5-2" 
          stroke="rgba(251, 146, 60, 0.4)" 
          strokeWidth="0.8" 
          fill="none"/>
  </g>
  
  <!-- Premium highlight -->
  <ellipse cx="${centerX}" cy="${size * 0.2}" rx="${size * 0.25}" ry="${size * 0.06}" fill="rgba(255,255,255,0.3)"/>
</svg>`
}

export default function ProfessionalFaviconGenerator() {
      const [selectedSize, setSelectedSize] = useState(32)
      const [selectedFormat, setSelectedFormat] = useState("svg")
      const [previewMode, setPreviewMode] = useState("light")
      const [copiedCode, setCopiedCode] = useState(false)
      const [selectedSizes, setSelectedSizes] = useState([16, 32, 48])

      // Updated sizes array (max 256px as requested)
      const sizes = [16, 32, 48, 64, 96, 128, 192, 256]

      const formats = [
            { key: "svg", name: "SVG", description: "Vector format, perfect quality", recommended: true },
            { key: "png", name: "PNG", description: "High-quality raster format", recommended: true },
            { key: "ico", name: "ICO", description: "Traditional favicon format", recommended: false },
      ]

      const toggleSize = (size) => {
            setSelectedSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size].sort((a, b) => a - b),
            )
      }

      const downloadFavicon = async (size, format) => {
            try {
                  let blob, filename

                  if (format === "svg") {
                        const svgContent = generateExactSVG(size)
                        blob = new Blob([svgContent], { type: "image/svg+xml" })
                        filename = `Mouthouq-favicon-${size}x${size}.svg`
                  } else {
                        // For non-SVG formats, create a canvas and convert
                        const canvas = document.createElement("canvas")
                        const ctx = canvas.getContext("2d")
                        canvas.width = size
                        canvas.height = size

                        const svgContent = generateExactSVG(size)
                        const svgBlob = new Blob([svgContent], { type: "image/svg+xml" })
                        const url = URL.createObjectURL(svgBlob)

                        const img = new Image()
                        img.crossOrigin = "anonymous"

                        return new Promise((resolve) => {
                              img.onload = () => {
                                    ctx.drawImage(img, 0, 0, size, size)
                                    URL.revokeObjectURL(url)

                                    canvas.toBlob(
                                          (blob) => {
                                                const filename = `Mouthouq-favicon-${size}x${size}.${format}`
                                                const downloadUrl = URL.createObjectURL(blob)
                                                const a = document.createElement("a")
                                                a.href = downloadUrl
                                                a.download = filename
                                                document.body.appendChild(a)
                                                a.click()
                                                document.body.removeChild(a)
                                                URL.revokeObjectURL(downloadUrl)
                                                resolve()
                                          },
                                          `image/${format}`,
                                          0.95,
                                    )
                              }
                              img.src = url
                        })
                  }

                  if (format === "svg") {
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = filename
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        URL.revokeObjectURL(url)
                  }
            } catch (error) {
                  console.error("Download failed:", error)
            }
      }

      const downloadAllSizes = async () => {
            for (const size of sizes) {
                  await new Promise((resolve) => setTimeout(resolve, 300))
                  await downloadFavicon(size, selectedFormat)
            }
      }

      const generateCompletePackage = async () => {
            const essentialSizes = [16, 32, 48, 96, 192, 256]
            const formats = ["svg", "png"]

            for (const format of formats) {
                  for (const size of essentialSizes) {
                        await new Promise((resolve) => setTimeout(resolve, 200))
                        await downloadFavicon(size, format)
                  }
            }
      }

      const copyHtmlCode = () => {
            const htmlCode = `<!-- Mouthouq Professional Favicons -->
<!-- Standard favicon for modern browsers -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- PNG fallbacks for different sizes -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon for iOS devices -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Android Chrome icons -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png">

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">

<!-- Theme color for mobile browsers -->
<meta name="theme-color" content="#FF6B35">

<!-- Microsoft Tiles (optional) -->
<meta name="msapplication-TileColor" content="#FF6B35">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">`

            navigator.clipboard.writeText(htmlCode).then(() => {
                  setCopiedCode(true)
                  setTimeout(() => setCopiedCode(false), 2000)
            })
      }

      const downloadSelectedSizes = async (format) => {
            for (const size of selectedSizes) {
                  await new Promise((resolve) => setTimeout(resolve, 200))
                  await downloadFavicon(size, format)
            }
      }

      return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Header */}
                        <div className="text-center mb-16">
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 mb-6 text-sm font-semibold">
                                    Professional Grade • 100% Logo Match
                              </Badge>
                              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Mouthouq Favicon Generator</h1>
                              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                                    Generate perfect favicons that are 100% identical to your navbar logo. Professional quality with all the
                                    premium design elements preserved.
                              </p>
                        </div>

                        {/* Live Preview Section */}
                        <Card className="mb-16 bg-white/90 backdrop-blur-sm shadow-xl border-0">
                              <CardContent className="p-8 lg:p-12">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">Live Preview</h2>

                                    {/* Size Controls */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                                          {sizes.map((size) => (
                                                <Button
                                                      key={size}
                                                      variant={selectedSize === size ? "default" : "outline"}
                                                      size="sm"
                                                      onClick={() => setSelectedSize(size)}
                                                      className={`text-sm font-medium ${selectedSize === size
                                                                  ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                                                                  : "hover:bg-orange-50"
                                                            }`}
                                                >
                                                      {size}px
                                                </Button>
                                          ))}
                                          <Button
                                                variant="outline"
                                                onClick={() => setPreviewMode(previewMode === "light" ? "dark" : "light")}
                                                className="flex items-center gap-2 ml-4"
                                          >
                                                <Palette className="h-4 w-4" />
                                                {previewMode === "light" ? "Dark" : "Light"}
                                          </Button>
                                    </div>

                                    {/* Main Preview */}
                                    <div
                                          className={`rounded-2xl p-12 mb-12 transition-all duration-500 ${previewMode === "dark"
                                                      ? "bg-gradient-to-br from-gray-900 to-black"
                                                      : "bg-gradient-to-br from-gray-100 to-white"
                                                }`}
                                    >
                                          <div className="flex justify-center items-center">
                                                <div className="text-center">
                                                      <FaviconPreview size={Math.min(selectedSize * 2, 128)} />
                                                      <p className={`mt-4 text-sm font-medium ${previewMode === "dark" ? "text-white" : "text-gray-700"}`}>
                                                            {selectedSize}×{selectedSize} Preview
                                                      </p>
                                                </div>
                                          </div>
                                    </div>

                                    {/* All Sizes Grid */}
                                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 justify-items-center">
                                          {sizes.map((size) => (
                                                <div key={size} className="text-center group">
                                                      <div className="p-2 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
                                                            <FaviconPreview size={Math.min(size, 48)} />
                                                      </div>
                                                      <p className="text-xs text-gray-600 mt-2 font-medium">{size}px</p>
                                                </div>
                                          ))}
                                    </div>
                              </CardContent>
                        </Card>

                        {/* Format Selection */}
                        <div className="mb-16">
                              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">Choose Format</h2>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {formats.map((format) => (
                                          <Card
                                                key={format.key}
                                                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${selectedFormat === format.key
                                                            ? "border-orange-500 shadow-lg ring-2 ring-orange-200"
                                                            : "border-gray-200 hover:border-orange-300 hover:shadow-md"
                                                      }`}
                                                onClick={() => setSelectedFormat(format.key)}
                                          >
                                                <CardContent className="p-6 text-center">
                                                      <div className="flex items-center justify-center gap-2 mb-3">
                                                            <h3 className="font-bold text-gray-900">{format.name}</h3>
                                                            {format.recommended && <Badge className="bg-green-500 text-white text-xs">Recommended</Badge>}
                                                      </div>
                                                      <p className="text-sm text-gray-600 mb-4">{format.description}</p>
                                                      {selectedFormat === format.key && <Badge className="bg-orange-500 text-white">Selected</Badge>}
                                                </CardContent>
                                          </Card>
                                    ))}
                              </div>
                        </div>

                        {/* Simplified Download Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                              {/* Size Selection */}
                              <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
                                    <CardContent className="p-6">
                                          <h3 className="text-lg font-bold text-gray-900 mb-4">Select Sizes</h3>
                                          <div className="grid grid-cols-4 gap-2 mb-4">
                                                {sizes.map((size) => (
                                                      <Button
                                                            key={size}
                                                            variant={selectedSizes.includes(size) ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => toggleSize(size)}
                                                            className={`text-xs ${selectedSizes.includes(size)
                                                                        ? "bg-gradient-to-r from-orange-500 to-red-500"
                                                                        : "hover:bg-orange-50"
                                                                  }`}
                                                      >
                                                            {size}px
                                                      </Button>
                                                ))}
                                          </div>
                                          <p className="text-sm text-gray-600">
                                                Selected: {selectedSizes.length} size{selectedSizes.length !== 1 ? "s" : ""}
                                          </p>
                                    </CardContent>
                              </Card>

                              {/* Quick Downloads */}
                              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg border-0">
                                    <CardContent className="p-6">
                                          <h3 className="text-lg font-bold mb-4">Quick Download</h3>
                                          <div className="space-y-3">
                                                {formats.map((format) => (
                                                      <Button
                                                            key={format.key}
                                                            size="sm"
                                                            onClick={() => downloadSelectedSizes(format.key)}
                                                            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 font-medium"
                                                      >
                                                            <Download className="h-4 w-4 mr-2" />
                                                            Download {format.name} ({selectedSizes.length} sizes)
                                                      </Button>
                                                ))}
                                          </div>
                                    </CardContent>
                              </Card>
                        </div>

                        {/* Implementation Guide */}
                        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
                              <CardContent className="p-8 lg:p-12">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Professional Implementation</h3>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                          {/* HTML Code */}
                                          <div>
                                                <div className="flex items-center justify-between mb-4">
                                                      <h4 className="text-lg font-bold text-gray-900">Ready-to-Use HTML Code</h4>
                                                      <Button variant="outline" size="sm" onClick={copyHtmlCode} className="flex items-center gap-2">
                                                            {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                            {copiedCode ? "Copied!" : "Copy"}
                                                      </Button>
                                                </div>

                                                <div className="bg-gray-900 text-green-400 rounded-lg p-6 overflow-x-auto">
                                                      <pre className="text-sm leading-relaxed whitespace-pre-wrap">
                                                            <code>{`<!-- Mouthouq Professional Favicons -->
<!-- Standard favicon for modern browsers -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- PNG fallbacks for different sizes -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon for iOS devices -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Android Chrome icons -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png">

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">

<!-- Theme color for mobile browsers -->
<meta name="theme-color" content="#FF6B35">

<!-- Microsoft Tiles (optional) -->
<meta name="msapplication-TileColor" content="#FF6B35">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">`}</code>
                                                      </pre>
                                                </div>
                                          </div>

                                          {/* Features & Instructions */}
                                          <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-4">Premium Features</h4>
                                                <div className="space-y-4 mb-6">
                                                      <div className="flex items-start gap-3">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                            <div>
                                                                  <p className="font-medium text-gray-900">100% Logo Match</p>
                                                                  <p className="text-sm text-gray-600">
                                                                        Identical to your navbar logo with all design elements preserved
                                                                  </p>
                                                            </div>
                                                      </div>
                                                      <div className="flex items-start gap-3">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                            <div>
                                                                  <p className="font-medium text-gray-900">Perfect Gradients</p>
                                                                  <p className="text-sm text-gray-600">5-stop gradient with exact color matching</p>
                                                            </div>
                                                      </div>
                                                      <div className="flex items-start gap-3">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                            <div>
                                                                  <p className="font-medium text-gray-900">Moroccan Patterns</p>
                                                                  <p className="text-sm text-gray-600">Authentic Zellige-inspired overlay patterns</p>
                                                            </div>
                                                      </div>
                                                      <div className="flex items-start gap-3">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                            <div>
                                                                  <p className="font-medium text-gray-900">Cross-Browser Support</p>
                                                                  <p className="text-sm text-gray-600">Works perfectly in all modern browsers</p>
                                                            </div>
                                                      </div>
                                                </div>

                                                <h4 className="text-lg font-bold text-gray-900 mb-4">Installation Steps</h4>
                                                <div className="space-y-3 text-sm text-gray-700">
                                                      <div className="flex gap-3">
                                                            <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                  1
                                                            </span>
                                                            <p>Download your favicon files using the buttons above</p>
                                                      </div>
                                                      <div className="flex gap-3">
                                                            <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                  2
                                                            </span>
                                                            <p>Place all files in your website's root directory (public folder for Next.js)</p>
                                                      </div>
                                                      <div className="flex gap-3">
                                                            <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                  3
                                                            </span>
                                                            <p>Copy and paste the HTML code above into your website's &lt;head&gt; section</p>
                                                      </div>
                                                      <div className="flex gap-3">
                                                            <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                  4
                                                            </span>
                                                            <p>Test your favicon by visiting your website in different browsers</p>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </CardContent>
                        </Card>
                  </div>
            </div>
      )
}
