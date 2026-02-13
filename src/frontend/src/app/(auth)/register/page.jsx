"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Briefcase, ArrowRight, ArrowLeft, Phone, Building, FileText, CheckCircle } from "lucide-react"
import {
  BenefitsSection,
  ProgressSteps,
  BasicInfoStep,
  ContactInfoStep,
  BusinessInfoStep,
  ProfileStep,
  ReviewStep,
} from "@/components/layout/auth-components"
import { MouthouqOriginalLogo } from "@/components/shared/logo"
import { apiClient } from "@/lib/api-client"
export default function RegisterPage() {
  const [userType, setUserType] = useState("customer") // "customer" or "professional"
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    // Professional specific fields
    businessName: "",
    serviceCategory: "",
    experience: "",
    description: "",
    profileImage: null,
  })
  const [errors, setErrors] = useState({})
  const [stepValidation, setStepValidation] = useState({})

  // Get initial values from URL params (if any)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlType = urlParams.get("type")

    if (urlType && ["customer", "professional"].includes(urlType)) {
      setUserType(urlType)
    }
  }, [])

  // Define steps based on user type
  const customerSteps = [
    {
      id: "basic",
      title: "Basic Information",
      description: "Let's start with your personal details",
      icon: User,
      component: BasicInfoStep,
    },
    {
      id: "contact",
      title: "Contact Details",
      description: "How can professionals reach you?",
      icon: Phone,
      component: ContactInfoStep,
    },
    {
      id: "review",
      title: "Review & Complete",
      description: "Review your information and create account",
      icon: CheckCircle,
      component: ReviewStep,
    },
  ]

  const professionalSteps = [
    {
      id: "basic",
      title: "Basic Information",
      description: "Let's start with your personal details",
      icon: User,
      component: BasicInfoStep,
    },
    {
      id: "contact",
      title: "Contact Details",
      description: "How can customers reach you?",
      icon: Phone,
      component: ContactInfoStep,
    },
    {
      id: "business",
      title: "Business Information",
      description: "Tell us about your business",
      icon: Building,
      component: BusinessInfoStep,
    },
    {
      id: "profile",
      title: "Profile & Services",
      description: "Complete your professional profile",
      icon: FileText,
      component: ProfileStep,
    },
    {
      id: "review",
      title: "Review & Complete",
      description: "Review your information and create account",
      icon: CheckCircle,
      component: ReviewStep,
    },
  ]

  const steps = userType === "professional" ? professionalSteps : customerSteps
  const CurrentStepComponent = steps[currentStep]?.component

  // Handle step validation
  const handleStepValidation = (stepIndex, isValid) => {
    setStepValidation((prev) => ({
      ...prev,
      [stepIndex]: isValid,
    }))
  }

  const canProceedToNext = () => {
    return stepValidation[currentStep] === true
  }

  const handleNext = () => {
    if (canProceedToNext()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      setErrors({})
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentStep === steps.length - 1) {
      if (!canProceedToNext()) {
        return
      }

      setIsLoading(true)
      try {
        const response = await apiClient.post("/auth/register", {
          ...formData,
          role: userType === "professional" ? "professional" : "customer",
        })

        console.log("Registration successful:", response)

        // If backend returns token on register, store it
        if (response.token) {
          localStorage.setItem("token", response.token)
        }
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user))
        }

        // Handle success - redirect to success page or dashboard
        window.location.href =
          userType === "professional"
            ? "/registration-success?type=professional"
            : "/registration-success?type=customer"
      } catch (error) {
        console.error("Registration error:", error)
        setErrors({ general: error.message || "Registration failed. Please try again." })
      } finally {
        setIsLoading(false)
      }
    } else {
      handleNext()
    }
  }

  // Reset step validation when user type changes
  useEffect(() => {
    setCurrentStep(0)
    setStepValidation({})
    setErrors({})
  }, [userType])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Branding & Benefits */}
          <div className="hidden lg:block sticky top-8">
            <div className="text-center lg:text-left">
              <MouthouqOriginalLogo size="large" />
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-8 mb-6">Join Mawthouq Today</h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Create your account and start connecting with the best professionals in Morocco.
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

          {/* Right Side - Registration Form */}
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
                  <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                  <p className="text-gray-600 mt-2">Create your {userType} account to get started</p>
                </div>

                {/* General Error */}
                {errors.general && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>
                )}

                {/* Multi-Step Form */}
                <div className="space-y-8">
                  <ProgressSteps steps={steps} currentStep={currentStep} />

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                      {CurrentStepComponent && (
                        <CurrentStepComponent
                          formData={formData}
                          setFormData={setFormData}
                          errors={errors}
                          setErrors={setErrors}
                          userType={userType}
                          onValidate={(isValid) => handleStepValidation(currentStep, isValid)}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 0 || isLoading}
                        className="flex items-center space-x-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </Button>

                      <div className="text-sm text-gray-500">
                        Step {currentStep + 1} of {steps.length}
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading || !canProceedToNext()}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>
                          {isLoading ? "Creating..." : currentStep === steps.length - 1 ? "Create Account" : "Continue"}
                        </span>
                        {currentStep < steps.length - 1 && !isLoading && <ArrowRight className="h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Footer Link to Login */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href={`/login?type=${userType}`} className="text-orange-600 hover:text-orange-700 font-medium">
                      Sign in
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
