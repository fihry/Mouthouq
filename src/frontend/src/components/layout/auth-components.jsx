"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Shield,
  Star,
  Users,
  TrendingUp,
  Camera,
  Upload,
  CheckCircle,
  Building,
  Award,
  FileText,
} from "lucide-react"


// Progress Steps Component
export const ProgressSteps = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                index < currentStep
                  ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-500 text-white"
                  : index === currentStep
                    ? "border-orange-500 text-orange-600 bg-orange-50"
                    : "border-gray-300 text-gray-400"
              }`}
            >
              {index < currentStep ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 sm:w-16 h-0.5 mx-2 transition-all duration-300 ${
                  index < currentStep ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{steps[currentStep]?.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{steps[currentStep]?.description}</p>
      </div>
      <Progress
        value={((currentStep + 1) / steps.length) * 100}
        className="mt-4 h-2"
        style={{
          background: "linear-gradient(to right, #FF6B35, #F7931E)",
        }}
      />
    </div>
  )
}

// Benefits Component
export const BenefitsSection = ({ userType }) => {
  const customerBenefits = [
    { icon: Shield, text: "Verified Professionals", description: "All service providers are background-checked" },
    { icon: Star, text: "Quality Guaranteed", description: "100% satisfaction guarantee on all services" },
    { icon: Users, text: "Trusted Community", description: "Join thousands of satisfied customers" },
  ]

  const professionalBenefits = [
    { icon: TrendingUp, text: "Grow Your Business", description: "Access thousands of potential customers" },
    { icon: Briefcase, text: "Professional Tools", description: "Advanced dashboard and booking management" },
    { icon: Star, text: "Build Reputation", description: "Showcase your skills and earn reviews" },
  ]

  const benefits = userType === "professional" ? professionalBenefits : customerBenefits

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {userType === "professional" ? "Why Join as a Professional?" : "Why Choose Mawthouq?"}
      </h3>
      {benefits.map((benefit, index) => (
        <div key={benefit.text} className="flex items-start space-x-3">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg flex-shrink-0">
            <benefit.icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{benefit.text}</h4>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validatePhone = (phone) => {
  const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

// Step Components with proper validation
export const BasicInfoStep = ({ formData, setFormData, errors, setErrors, onValidate }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateStep = () => {
    const newErrors = {}

    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
    }

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0
    if (onValidate) onValidate(isValid)
    return isValid
  }

  // Call validation whenever form data changes
  useState(() => {
    if (formData.firstName || formData.lastName || formData.email || formData.password || formData.confirmPassword) {
      validateStep()
    }
  }, [formData])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              id="firstName"
              type="text"
              value={formData.firstName || ""}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              onBlur={validateStep}
              className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
              placeholder="First name"
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName || ""}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            onBlur={validateStep}
            className={errors.lastName ? "border-red-500" : ""}
            placeholder="Last name"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={validateStep}
            className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password || ""}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onBlur={validateStep}
              className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
              placeholder="Create password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword || ""}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              onBlur={validateStep}
              className={`pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Password Requirements</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className={`flex items-center ${formData.password?.length >= 6 ? "text-green-600" : ""}`}>
            <CheckCircle
              className={`h-4 w-4 mr-2 ${formData.password?.length >= 6 ? "text-green-600" : "text-gray-400"}`}
            />
            At least 6 characters
          </li>
        </ul>
      </div>
    </div>
  )
}

export const ContactInfoStep = ({ formData, setFormData, errors, setErrors, onValidate }) => {
  const cities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fes",
    "Tangier",
    "Agadir",
    "Meknes",
    "Oujda",
    "Kenitra",
    "Tetouan",
  ]

  const validateStep = () => {
    const newErrors = {}

    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Moroccan phone number"
    }
    if (!formData.city) newErrors.city = "City is required"

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0
    if (onValidate) onValidate(isValid)
    return isValid
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="phone"
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            onBlur={validateStep}
            className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
            placeholder="+212 6XX-XXXXXX"
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
          <Select
            value={formData.city || ""}
            onValueChange={(value) => {
              setFormData({ ...formData, city: value })
              setTimeout(validateStep, 100)
            }}
          >
            <SelectTrigger className={`pl-10 ${errors.city ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
      </div>

      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Why do we need this information?</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Phone number for direct communication with professionals</li>
          <li>• City location to find nearby service providers</li>
          <li>• All information is kept secure and private</li>
        </ul>
      </div>
    </div>
  )
}

export const BusinessInfoStep = ({ formData, setFormData, errors, setErrors, onValidate }) => {
  const serviceCategories = [
    "House Cleaning",
    "Plumbing",
    "Electrical Work",
    "AC Repair & Maintenance",
    "Painting",
    "Appliance Repair",
    "Handyman Services",
    "Moving Services",
    "Gardening",
    "Carpentry",
  ]

  const validateStep = () => {
    const newErrors = {}

    if (!formData.businessName?.trim()) newErrors.businessName = "Business name is required"
    if (!formData.serviceCategory) newErrors.serviceCategory = "Service category is required"
    if (!formData.experience) newErrors.experience = "Experience is required"

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0
    if (onValidate) onValidate(isValid)
    return isValid
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
          Business Name *
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="businessName"
            type="text"
            value={formData.businessName || ""}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            onBlur={validateStep}
            className={`pl-10 ${errors.businessName ? "border-red-500" : ""}`}
            placeholder="Your business name"
          />
        </div>
        {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
      </div>

      <div>
        <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700 mb-2">
          Primary Service Category *
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
          <Select
            value={formData.serviceCategory || ""}
            onValueChange={(value) => {
              setFormData({ ...formData, serviceCategory: value })
              setTimeout(validateStep, 100)
            }}
          >
            <SelectTrigger className={`pl-10 ${errors.serviceCategory ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select your main service" />
            </SelectTrigger>
            <SelectContent>
              {serviceCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.serviceCategory && <p className="text-red-500 text-sm mt-1">{errors.serviceCategory}</p>}
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience *
        </label>
        <div className="relative">
          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
          <Select
            value={formData.experience || ""}
            onValueChange={(value) => {
              setFormData({ ...formData, experience: value })
              setTimeout(validateStep, 100)
            }}
          >
            <SelectTrigger className={`pl-10 ${errors.experience ? "border-red-500" : ""}`}>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
      </div>
    </div>
  )
}

export const ProfileStep = ({ formData, setFormData, errors, setErrors, onValidate }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors({ ...errors, profileImage: "File size must be less than 5MB" })
        return
      }
      setFormData({ ...formData, profileImage: file })
      setErrors({ ...errors, profileImage: null })
    }
  }

  const validateStep = () => {
    const newErrors = {}

    if (!formData.description?.trim()) {
      newErrors.description = "Business description is required"
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    }

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0
    if (onValidate) onValidate(isValid)
    return isValid
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Business Description * (minimum 50 characters)
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          <textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            onBlur={validateStep}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
            placeholder="Describe your services, expertise, and what makes you unique..."
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          <p className="text-sm text-gray-500 ml-auto">{formData.description?.length || 0}/50 characters</p>
        </div>
      </div>

      <div>
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image (Optional)
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label
              htmlFor="profileImage"
              className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 transition-colors bg-gray-50 hover:bg-orange-50"
            >
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.profileImage ? formData.profileImage.name : "Upload profile image"}
                </span>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </label>
            <input id="profileImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
          {formData.profileImage && (
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Camera className="h-8 w-8 text-white" />
            </div>
          )}
        </div>
        {errors.profileImage && <p className="text-red-500 text-sm mt-1">{errors.profileImage}</p>}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Write a compelling description to attract more customers</li>
          <li>• Add a professional profile photo to build trust</li>
          <li>• Highlight your unique skills and experience</li>
          <li>• Mention any certifications or special training</li>
        </ul>
      </div>
    </div>
  )
}

export const ReviewStep = ({ formData, userType, errors, setErrors, onValidate }) => {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [marketingAccepted, setMarketingAccepted] = useState(false)

  const validateStep = () => {
    const newErrors = {}

    if (!termsAccepted) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0
    if (onValidate) onValidate(isValid)
    return isValid
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}
              </div>
              <div>
                <span className="text-gray-600">Email:</span> {formData.email}
              </div>
              <div>
                <span className="text-gray-600">Phone:</span> {formData.phone}
              </div>
              <div>
                <span className="text-gray-600">City:</span> {formData.city}
              </div>
            </div>
          </div>

          {userType === "professional" && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Business Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Business:</span> {formData.businessName}
                </div>
                <div>
                  <span className="text-gray-600">Service:</span> {formData.serviceCategory}
                </div>
                <div>
                  <span className="text-gray-600">Experience:</span> {formData.experience} years
                </div>
                <div>
                  <span className="text-gray-600">Profile Image:</span>{" "}
                  {formData.profileImage ? "Uploaded" : "Not uploaded"}
                </div>
              </div>
            </div>
          )}
        </div>

        {userType === "professional" && formData.description && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-600 bg-white rounded p-3">{formData.description}</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={termsAccepted}
            onCheckedChange={(checked) => {
              setTermsAccepted(checked)
              setTimeout(validateStep, 100)
            }}
            className="mt-1"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
            I agree to the{" "}
            <a href="/terms" className="text-orange-600 hover:text-orange-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-orange-600 hover:text-orange-700">
              Privacy Policy
            </a>{" "}
            *
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToMarketing"
            checked={marketingAccepted}
            onCheckedChange={setMarketingAccepted}
            className="mt-1"
          />
          <label htmlFor="agreeToMarketing" className="text-sm text-gray-600">
            I'd like to receive marketing emails about Mawthouq services and updates
          </label>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <h4 className="font-medium text-green-900">Almost Done!</h4>
        </div>
        <p className="text-sm text-green-700">
          {userType === "professional"
            ? "Your professional account will be reviewed within 24 hours. You'll receive an email confirmation once approved."
            : "Click 'Create Account' to complete your registration and start finding trusted professionals."}
        </p>
      </div>
    </div>
  )
}
