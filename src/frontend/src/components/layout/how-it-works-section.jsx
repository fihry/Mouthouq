"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, UserCheck, MessageSquare, CheckCircle, ArrowRight, Star, Shield, Clock, Users } from "lucide-react"

// Enhanced Animated Icon Component
const AnimatedIcon = ({ icon: Icon, isHovered, iconType }) => {
      const getIconAnimation = () => {
            switch (iconType) {
                  case "search":
                        return (
                              <div className="relative">
                                    <Icon
                                          className={`h-8 w-8 text-orange-600 transition-all duration-500 ${isHovered ? "scale-110 rotate-12 text-orange-700" : ""
                                                }`}
                                    />
                                    {/* Animated search rays */}
                                    <div
                                          className={`absolute inset-0 transition-all duration-700 ${isHovered ? "opacity-100 scale-150" : "opacity-0 scale-100"
                                                }`}
                                    >
                                          <div
                                                className="absolute top-1 right-1 w-1 h-1 bg-orange-400 rounded-full animate-ping"
                                                style={{ animationDelay: "0ms" }}
                                          />
                                          <div
                                                className="absolute top-2 right-0 w-0.5 h-0.5 bg-orange-500 rounded-full animate-ping"
                                                style={{ animationDelay: "200ms" }}
                                          />
                                          <div
                                                className="absolute top-0 right-2 w-0.5 h-0.5 bg-orange-400 rounded-full animate-ping"
                                                style={{ animationDelay: "400ms" }}
                                          />
                                    </div>
                              </div>
                        )

                  case "usercheck":
                        return (
                              <div className="relative">
                                    <Icon
                                          className={`h-8 w-8 text-orange-600 transition-all duration-500 ${isHovered ? "scale-110 text-green-600" : ""
                                                }`}
                                    />
                                    {/* Animated checkmark glow */}
                                    <div className={`absolute inset-0 transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                                          <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-30 animate-pulse" />
                                    </div>
                                    {/* Success particles */}
                                    {isHovered && (
                                          <>
                                                <div
                                                      className="absolute -top-1 -right-1 w-1 h-1 bg-green-400 rounded-full animate-bounce"
                                                      style={{ animationDelay: "0ms" }}
                                                />
                                                <div
                                                      className="absolute -bottom-1 -left-1 w-1 h-1 bg-green-500 rounded-full animate-bounce"
                                                      style={{ animationDelay: "300ms" }}
                                                />
                                                <div
                                                      className="absolute top-0 -left-2 w-0.5 h-0.5 bg-green-400 rounded-full animate-bounce"
                                                      style={{ animationDelay: "600ms" }}
                                                />
                                          </>
                                    )}
                              </div>
                        )

                  case "message":
                        return (
                              <div className="relative">
                                    <Icon
                                          className={`h-8 w-8 text-orange-600 transition-all duration-500 ${isHovered ? "scale-110 -rotate-6 text-blue-600" : ""
                                                }`}
                                    />
                                    {/* Animated message bubbles */}
                                    <div className={`absolute transition-all duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                                          <div
                                                className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"
                                                style={{ animationDelay: "0ms" }}
                                          />
                                          <div
                                                className="absolute -top-1 -right-3 w-1 h-1 bg-blue-500 rounded-full animate-ping"
                                                style={{ animationDelay: "400ms" }}
                                          />
                                          <div
                                                className="absolute -top-3 -right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"
                                                style={{ animationDelay: "800ms" }}
                                          />
                                    </div>
                                    {/* Typing indicator */}
                                    {isHovered && (
                                          <div className="absolute bottom-1 right-1 flex space-x-0.5">
                                                <div
                                                      className="w-0.5 h-0.5 bg-blue-500 rounded-full animate-bounce"
                                                      style={{ animationDelay: "0ms" }}
                                                />
                                                <div
                                                      className="w-0.5 h-0.5 bg-blue-500 rounded-full animate-bounce"
                                                      style={{ animationDelay: "150ms" }}
                                                />
                                                <div
                                                      className="w-0.5 h-0.5 bg-blue-500 rounded-full animate-bounce"
                                                      style={{ animationDelay: "300ms" }}
                                                />
                                          </div>
                                    )}
                              </div>
                        )

                  case "check":
                        return (
                              <div className="relative">
                                    <Icon
                                          className={`h-8 w-8 text-orange-600 transition-all duration-500 ${isHovered ? "scale-125 text-green-600" : ""
                                                }`}
                                    />
                                    {/* Animated success ring */}
                                    <div
                                          className={`absolute inset-0 transition-all duration-1000 ${isHovered ? "opacity-100 scale-150" : "opacity-0 scale-100"
                                                }`}
                                    >
                                          <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping" />
                                    </div>
                                    {/* Celebration particles */}
                                    {isHovered && (
                                          <>
                                                <div
                                                      className="absolute -top-2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-bounce transform -translate-x-1/2"
                                                      style={{ animationDelay: "0ms" }}
                                                />
                                                <div
                                                      className="absolute -right-2 top-1/2 w-1 h-1 bg-green-400 rounded-full animate-bounce transform -translate-y-1/2"
                                                      style={{ animationDelay: "200ms" }}
                                                />
                                                <div
                                                      className="absolute -bottom-2 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-bounce transform -translate-x-1/2"
                                                      style={{ animationDelay: "400ms" }}
                                                />
                                                <div
                                                      className="absolute -left-2 top-1/2 w-1 h-1 bg-purple-400 rounded-full animate-bounce transform -translate-y-1/2"
                                                      style={{ animationDelay: "600ms" }}
                                                />
                                          </>
                                    )}
                              </div>
                        )

                  default:
                        return <Icon className="h-8 w-8 text-orange-600" />
            }
      }

      return <div className="relative w-16 h-16 flex items-center justify-center">{getIconAnimation()}</div>
}

// Enhanced Step Component
const ProcessStep = ({ number, icon: Icon, title, description, isLast = false, delay = 0, iconType }) => {
      const [isHovered, setIsHovered] = useState(false)

      return (
            <div
                  className="relative text-center group animate-in slide-in-from-bottom-6 duration-1000"
                  style={{ animationDelay: `${delay}ms` }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
            >
                  {/* Enhanced Step Number Circle */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full font-bold text-lg mb-6 group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-500 shadow-lg group-hover:shadow-2xl transform group-hover:scale-110 group-hover:rotate-3">
                        <span className={`transition-all duration-300 ${isHovered ? "scale-110" : ""}`}>{number}</span>

                        {/* Enhanced Connecting Dot with Animation */}
                        {!isLast && (
                              <>
                                    <div className="hidden lg:block absolute -right-12 top-1/2 w-6 h-6 bg-orange-300 rounded-full transform -translate-y-1/2 transition-all duration-500 group-hover:bg-orange-400 group-hover:scale-125" />
                                    {/* Animated pulse ring */}
                                    <div
                                          className={`hidden lg:block absolute -right-12 top-1/2 w-6 h-6 border-2 border-orange-400 rounded-full transform -translate-y-1/2 transition-all duration-700 ${isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
                                                }`}
                                    />
                              </>
                        )}

                        {/* Number glow effect */}
                        <div
                              className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-full transition-all duration-500 -z-10 ${isHovered ? "scale-150 opacity-30 blur-md" : "scale-100 opacity-0"
                                    }`}
                        />
                  </div>

                  {/* Enhanced Icon Container with Advanced Animations */}
                  <div
                        className={`relative bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl inline-flex mb-4 transition-all duration-500 shadow-sm overflow-hidden ${isHovered ? "from-orange-100 to-red-100 shadow-xl scale-110 rotate-3" : ""
                              }`}
                  >
                        {/* Background animation */}
                        <div
                              className={`absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 transition-all duration-700 ${isHovered ? "opacity-20 scale-150" : "opacity-0 scale-100"
                                    }`}
                        />

                        {/* Animated border */}
                        <div
                              className={`absolute inset-0 border-2 border-orange-300 rounded-xl transition-all duration-500 ${isHovered ? "border-orange-500 scale-105" : "border-transparent"
                                    }`}
                        />

                        {/* Icon with advanced animations */}
                        <div className="relative z-10">
                              <AnimatedIcon icon={Icon} isHovered={isHovered} iconType={iconType} />
                        </div>

                        {/* Sparkle effects */}
                        {isHovered && (
                              <>
                                    <div
                                          className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                                          style={{ animationDelay: "0ms" }}
                                    />
                                    <div
                                          className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-orange-400 rounded-full animate-ping"
                                          style={{ animationDelay: "300ms" }}
                                    />
                                    <div
                                          className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-red-400 rounded-full animate-ping"
                                          style={{ animationDelay: "600ms" }}
                                    />
                              </>
                        )}
                  </div>

                  {/* Enhanced Step Content */}
                  <div className={`transition-all duration-300 ${isHovered ? "transform -translate-y-1" : ""}`}>
                        <h3
                              className={`text-xl font-semibold mb-3 transition-all duration-300 ${isHovered ? "text-orange-600 scale-105" : "text-gray-900"
                                    }`}
                        >
                              {title}
                        </h3>
                        <p
                              className={`text-gray-600 leading-relaxed max-w-xs mx-auto transition-all duration-300 ${isHovered ? "text-gray-700" : ""
                                    }`}
                        >
                              {description}
                        </p>
                  </div>

                  {/* Enhanced Mobile Connector */}
                  {!isLast && (
                        <div className="lg:hidden flex justify-center mt-8 mb-4">
                              <div className="relative">
                                    <div className="w-0.5 h-8 bg-gradient-to-b from-orange-200 to-red-200" />
                                    <div
                                          className={`absolute top-1/2 left-1/2 w-2 h-2 bg-orange-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isHovered ? "scale-150 bg-orange-500" : ""
                                                }`}
                                    />
                              </div>
                        </div>
                  )}
            </div>
      )
}

// Enhanced Stats Component
const StatsCard = ({ icon: Icon, value, label, delay = 0 }) => {
      const [isHovered, setIsHovered] = useState(false)

      return (
            <Card
                  className={`bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-in slide-in-from-bottom-8 duration-1000 overflow-hidden`}
                  style={{ animationDelay: `${delay}ms` }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
            >
                  <CardContent className="p-6 text-center relative">
                        {/* Background glow */}
                        <div
                              className={`absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                                    }`}
                        />

                        <div
                              className={`relative bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${isHovered ? "scale-125 rotate-12 shadow-lg" : ""
                                    }`}
                        >
                              <Icon className={`h-6 w-6 text-white transition-all duration-300 ${isHovered ? "scale-110" : ""}`} />

                              {/* Icon glow */}
                              <div
                                    className={`absolute inset-0 bg-white rounded-xl transition-all duration-500 ${isHovered ? "opacity-20 scale-150 blur-sm" : "opacity-0"
                                          }`}
                              />
                        </div>

                        <div
                              className={`text-2xl font-bold text-gray-900 mb-1 transition-all duration-300 ${isHovered ? "scale-110 text-orange-600" : ""
                                    }`}
                        >
                              {value}
                        </div>
                        <div
                              className={`text-sm text-gray-600 font-medium transition-all duration-300 ${isHovered ? "text-gray-700" : ""
                                    }`}
                        >
                              {label}
                        </div>
                  </CardContent>
            </Card>
      )
}

export default function HowItWorksSection() {
      const steps = [
            {
                  number: "01",
                  icon: Search,
                  iconType: "search",
                  title: "Search & Discover",
                  description: "Tell us what you need and where you are. Our AI will find the perfect professionals for your job.",
            },
            {
                  number: "02",
                  icon: UserCheck,
                  iconType: "usercheck",
                  title: "Compare & Choose",
                  description: "Browse verified profiles, read reviews, and compare prices to find your ideal professional.",
            },
            {
                  number: "03",
                  icon: MessageSquare,
                  iconType: "message",
                  title: "Book & Connect",
                  description: "Send a message, discuss details, and book your service. Direct communication with professionals.",
            },
            {
                  number: "04",
                  icon: CheckCircle,
                  iconType: "check",
                  title: "Get It Done",
                  description: "Relax while your professional completes the job. Rate your experience when finished.",
            },
      ]

      const stats = [
            { icon: Users, value: "10,000+", label: "Happy Customers" },
            { icon: Star, value: "4.9/5", label: "Average Rating" },
            { icon: Shield, value: "100%", label: "Verified Pros" },
            { icon: Clock, value: "24/7", label: "Support" },
      ]

      return (
            <section className="py-20 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02]">
                        <div
                              className="absolute inset-0 bg-repeat"
                              style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                              }}
                        />
                  </div>

                  {/* Enhanced Floating Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                              className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full animate-bounce"
                              style={{ animationDelay: "0s", animationDuration: "4s" }}
                        />
                        <div
                              className="absolute top-60 right-20 w-16 h-16 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full animate-bounce"
                              style={{ animationDelay: "2s", animationDuration: "5s" }}
                        />
                        <div
                              className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full animate-bounce"
                              style={{ animationDelay: "1s", animationDuration: "6s" }}
                        />
                  </div>

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        {/* Section Header */}
                        <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-1000">
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 mb-6 text-sm font-semibold">
                                    Simple Process
                              </Badge>
                              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
                              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                                    Getting help has never been easier. Follow these simple steps to connect with the right professional for
                                    your needs.
                              </p>
                        </div>

                        {/* Process Steps */}
                        <div className="relative mb-20">
                              {/* Enhanced Desktop Connecting Line */}
                              <div
                                    className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 transform translate-x-8"
                                    style={{ width: "calc(100% - 4rem)" }}
                              />

                              {/* Animated dots on the line */}
                              <div
                                    className="hidden lg:block absolute top-24 left-0 right-0 transform translate-x-8"
                                    style={{ width: "calc(100% - 4rem)" }}
                              >
                                    <div
                                          className="absolute top-0 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-ping"
                                          style={{ animationDelay: "0s" }}
                                    />
                                    <div
                                          className="absolute top-0 left-2/4 w-1 h-1 bg-orange-400 rounded-full animate-ping"
                                          style={{ animationDelay: "1s" }}
                                    />
                                    <div
                                          className="absolute top-0 left-3/4 w-1 h-1 bg-orange-400 rounded-full animate-ping"
                                          style={{ animationDelay: "2s" }}
                                    />
                              </div>

                              {/* Steps Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                                    {steps.map((step, index) => (
                                          <ProcessStep
                                                key={step.number}
                                                number={step.number}
                                                icon={step.icon}
                                                iconType={step.iconType}
                                                title={step.title}
                                                description={step.description}
                                                isLast={index === steps.length - 1}
                                                delay={index * 200}
                                          />
                                    ))}
                              </div>
                        </div>

                        {/* Enhanced Stats Section */}
                        <div className="mb-16 animate-in slide-in-from-bottom-10 duration-1000 delay-800">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {stats.map((stat, index) => (
                                          <StatsCard
                                                key={stat.label}
                                                icon={stat.icon}
                                                value={stat.value}
                                                label={stat.label}
                                                delay={index * 100 + 800}
                                          />
                                    ))}
                              </div>
                        </div>

                        {/* Enhanced CTA Section */}
                        <Card className="border-0 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-12 duration-1000 delay-1000">
                              <CardContent className="p-0">
                                    <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white relative overflow-hidden">
                                          {/* Enhanced Background Pattern */}
                                          <div className="absolute inset-0 opacity-10">
                                                <div
                                                      className="absolute inset-0 bg-repeat"
                                                      style={{
                                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fillOpacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                                                      }}
                                                />
                                          </div>

                                          {/* Enhanced Floating Elements */}
                                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                                <div className="absolute top-4 right-8 w-16 h-16 bg-white/10 rounded-full animate-pulse" />
                                                <div
                                                      className="absolute bottom-4 left-8 w-12 h-12 bg-white/10 rounded-full animate-pulse"
                                                      style={{ animationDelay: "1s" }}
                                                />
                                                <div
                                                      className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/10 rounded-full animate-pulse"
                                                      style={{ animationDelay: "2s" }}
                                                />
                                                {/* Additional sparkles */}
                                                <div
                                                      className="absolute top-8 left-1/3 w-2 h-2 bg-white/20 rounded-full animate-ping"
                                                      style={{ animationDelay: "0.5s" }}
                                                />
                                                <div
                                                      className="absolute bottom-8 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping"
                                                      style={{ animationDelay: "1.5s" }}
                                                />
                                          </div>

                                          <div className="relative p-8 md:p-12 text-center">
                                                <h3 className="text-2xl md:text-4xl font-bold mb-4">Ready to Get Started?</h3>
                                                <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                                                      Join thousands of satisfied customers who have found reliable professionals through Mawthouq. Your
                                                      perfect service provider is just a click away!
                                                </p>

                                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                      <Button
                                                            size="lg"
                                                            className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 group relative overflow-hidden"
                                                      >
                                                            <span className="relative z-10">Post Your First Request</span>
                                                            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                      </Button>
                                                      <Button
                                                            size="lg"
                                                            className="bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 group relative overflow-hidden"
                                                      >
                                                            <span className="relative z-10">Browse Services</span>
                                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                      </Button>
                                                </div>

                                                {/* Enhanced Trust Indicators */}
                                                <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-orange-100">
                                                      <div className="flex items-center space-x-2 group cursor-pointer">
                                                            <Shield className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                                            <span className="text-sm font-medium group-hover:text-white transition-colors duration-300">
                                                                  Verified Professionals
                                                            </span>
                                                      </div>
                                                      <div className="flex items-center space-x-2 group cursor-pointer">
                                                            <Star className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                                            <span className="text-sm font-medium group-hover:text-white transition-colors duration-300">
                                                                  Rated & Reviewed
                                                            </span>
                                                      </div>
                                                      <div className="flex items-center space-x-2 group cursor-pointer">
                                                            <Clock className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                                            <span className="text-sm font-medium group-hover:text-white transition-colors duration-300">
                                                                  Quick Response
                                                            </span>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </CardContent>
                        </Card>

                        {/* Enhanced Additional Features */}
                        <div className="mt-16 text-center animate-in fade-in duration-1000 delay-1200">
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Mawthouq?</h4>
                              <div className="flex flex-wrap justify-center gap-4">
                                    {[
                                          "AI-Powered Matching",
                                          "Secure Payments",
                                          "24/7 Support",
                                          "Quality Guarantee",
                                          "Local Professionals",
                                          "Instant Booking",
                                    ].map((feature, index) => (
                                          <Badge
                                                key={feature}
                                                variant="secondary"
                                                className="bg-white/70 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 text-sm font-medium border border-gray-200/50 cursor-pointer hover:scale-110 hover:text-orange-600 group relative overflow-hidden"
                                                style={{ animationDelay: `${index * 100 + 1200}ms` }}
                                          >
                                                <span className="relative z-10">{feature}</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                          </Badge>
                                    ))}
                              </div>
                        </div>
                  </div>
            </section>
      )
}