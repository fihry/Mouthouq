"use client"
import NaveBar from "../layout/NaveBar"

// Logo Concept 1: Moroccan Arch with Tools
const MoroccanArchLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg transform rotate-1"></div>
      <div className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M12 2C8 2 5 5 5 9v6c0 1 1 2 2 2h10c1 0 2-1 2-2V9c0-4-3-7-7-7z" fill="currentColor" opacity="0.3" />
          <path d="M8 12h8M10 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="9" r="2" fill="currentColor" />
        </svg>
      </div>
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
      Mouthouq
    </span>
  </div>
)

// Logo Concept 2: Connection Hub
const ConnectionHubLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative bg-gradient-to-br from-blue-500 to-teal-500 p-3 rounded-full shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full transform scale-110 opacity-20 animate-pulse"></div>
      <div className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.7" />
          <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.7" />
          <circle cx="6" cy="18" r="2" fill="currentColor" opacity="0.7" />
          <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.7" />
          <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
      Mouthouq
    </span>
  </div>
)

// Logo Concept 3: Moroccan Star with Tools
const MoroccanStarLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-lg shadow-lg transform rotate-12">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg transform -rotate-12"></div>
      <div className="relative transform -rotate-12">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="currentColor"
            opacity="0.8"
          />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
      Mouthouq
    </span>
  </div>
)

// Logo Concept 4: Shield of Trust
const ShieldTrustLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative bg-gradient-to-br from-purple-500 to-indigo-500 p-3 rounded-xl shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl transform scale-105 opacity-20"></div>
      <div className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path
            d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z"
            fill="currentColor"
            opacity="0.3"
          />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      </div>
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
      Mouthouq
    </span>
  </div>
)

// Logo Concept 5: Home Services Hub
const HomeServicesLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-2xl shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl transform rotate-3 opacity-30"></div>
      <div className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path
            d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="9" cy="16" r="1" fill="currentColor" />
          <circle cx="15" cy="16" r="1" fill="currentColor" />
          <path d="M12 6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
      Mouthouq
    </span>
  </div>
)

// Logo Concept 6: Moroccan Geometric Pattern
const GeometricPatternLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative bg-gradient-to-br from-rose-500 to-pink-500 p-3 rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-pink-600 rounded-lg transform rotate-45 scale-75 opacity-20"></div>
      <div className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M12 3l4 4-4 4-4-4 4-4zM12 13l4 4-4 4-4-4 4-4z" fill="currentColor" opacity="0.6" />
          <path d="M3 12l4-4 4 4-4 4-4-4zM17 12l4-4 4 4-4 4-4-4z" fill="currentColor" opacity="0.8" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
      Mouthouq
    </span>
  </div>
)

export default function LogoConcepts() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mouthouq Logo Concepts</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Innovative logo designs that capture the essence of trust, connection, and Moroccan identity for your
            professional services platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Concept 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <MoroccanArchLogo />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Moroccan Arch</h3>
            <p className="text-gray-600 text-sm">
              Inspired by traditional Moroccan architecture, symbolizing shelter and home services with cultural
              authenticity.
            </p>
          </div>

          {/* Concept 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <ConnectionHubLogo />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Connection Hub</h3>
            <p className="text-gray-600 text-sm">
              Represents the platform as a central hub connecting users with professionals through dynamic network
              visualization.
            </p>
          </div>

          {/* Concept 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <MoroccanStarLogo />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Moroccan Star</h3>
            <p className="text-gray-600 text-sm">
              Features the traditional Moroccan star pattern with integrated service tools, representing excellence and
              craftsmanship.
            </p>
          </div>

          {/* Concept 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <ShieldTrustLogo />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Shield of Trust</h3>
            <p className="text-gray-600 text-sm">
              Emphasizes security and trust with a protective shield design, perfect for building user confidence.
            </p>
          </div>

          {/* Concept 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <HomeServicesLogo />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Home Services Hub</h3>
            <p className="text-gray-600 text-sm">
              Clean house icon with service indicators, directly communicating the household services focus.
            </p>
          </div>

          {/* Concept 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <GeometricPatternLogo />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Geometric Pattern</h3>
            <p className="text-gray-600 text-sm">
              Modern interpretation of traditional Moroccan geometric patterns, symbolizing precision and quality.
            </p>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Logo in Context</h2>
          <div className="space-y-6">
            {/* Navbar Example */}
            <NaveBar />

            {/* Business Card Example */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-lg text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-2 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path
                      d="M12 2C8 2 5 5 5 9v6c0 1 1 2 2 2h10c1 0 2-1 2-2V9c0-4-3-7-7-7z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path d="M8 12h8M10 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="9" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Mouthouq</h3>
                  <p className="text-red-100">Trusted Professional Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
