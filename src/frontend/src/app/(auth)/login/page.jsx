"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, User, Mail, Briefcase } from "lucide-react"
import { BenefitsSection, validateEmail } from "@/components/layout/auth-components"
import { MouthouqOriginalLogo } from "@/components/shared/logo"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"

export default function LoginPage() {
  const [userType, setUserType] = useState("customer") // "customer" or "professional"
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  // Get initial values from URL params (if any)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlType = urlParams.get("type")

    if (urlType && ["customer", "professional"].includes(urlType)) {
      setUserType(urlType)
    }
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsLoading(true)
    try {
      const response = await apiClient.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      })

      console.log("Login successful:", response)

      // Store token and user info
      if (response.token) {
        localStorage.setItem("token", response.token)
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user))
      }

      // Show success toast
      toast.success("Welcome back!", {
        description: "You have successfully logged in.",
      })

      // Handle success - redirect to dashboard after a brief delay
      setTimeout(() => {
        window.location.href = userType === "professional" ? "/dashboard/professional" : "/dashboard/customer"
      }, 500)
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login Failed", {
        description: error.message || "Invalid email or password. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Benefits */}
          <div className="hidden lg:block">
            <div className="text-center lg:text-left">
              <MouthouqOriginalLogo size="large" />
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-8 mb-6">Welcome Back!</h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Sign in to access your account and connect with trusted professionals across Morocco.
              </p>

              <BenefitsSection userType={userType} />

              {/* Trust Indicators */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">10,000+</div>
                  <div className="text-sm text-gray-600">Professionals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50,000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-8">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8">
                  <MouthouqOriginalLogo size="default" />
                </div>

                {/* User Type Toggle */}
                <div className="flex bg-orange-50 rounded-xl p-1 mb-6">
                  <button
                    onClick={() => setUserType("customer")}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${userType === "customer"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Customer
                  </button>
                  <button
                    onClick={() => setUserType("professional")}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${userType === "professional"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    <Briefcase className="h-4 w-4 inline mr-2" />
                    Professional
                  </button>
                </div>

                {/* Form Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                  <p className="text-gray-600 mt-2">Sign in to your {userType} account</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        placeholder="Enter your email"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                        placeholder="Enter your password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked })}
                        disabled={isLoading}
                      />
                      <label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <a href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                {/* Footer Links */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a
                      href={`/register?type=${userType}`}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Sign up
                    </a>
                  </p>
                </div>

                {/* Social Login */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
