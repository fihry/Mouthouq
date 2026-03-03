"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              {/* Error Icon */}
              <div className="bg-gradient-to-br from-red-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We encountered an unexpected error. Our team has been notified and is working to fix this issue.
              </p>

              {/* Error Details (in development) */}
              {process.env.NODE_ENV === "development" && (
                <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm font-mono text-gray-700 break-all">{error.message}</p>
                  {error.digest && <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={reset}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 group"
                >
                  <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Support Link */}
              <p className="text-sm text-gray-500 mt-6">
                Need help?{" "}
                <a href="mailto:support@mawthouq.ma" className="text-orange-600 hover:text-orange-700 font-medium">
                  Contact Support
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
