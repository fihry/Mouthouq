"use client"

import React from "react"
import {
    BarChart3,
    Package,
    Star,
    TrendingUp,
    CheckCircle2,
    Zap,
    Shield,
    CreditCard,
    Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import NavBar from "@/components/layout/NaveBar"
import { apiClient } from "@/lib/api-client"
import { CreateServiceModal } from "@/components/services/CreateServiceModal"

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
}

export default function ProfessionalDashboard() {
    const [profile, setProfile] = React.useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)

    React.useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await apiClient.get("/users/profile")
                setProfile(data)
            } catch (error) {
                console.error("Failed to fetch profile:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProfile()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    const stats = [
        { label: "Total Earnings", value: "12,450 MAD", icon: TrendingUp, color: "text-green-600", trend: "+12%" },
        { label: "Completed Jobs", value: "48", icon: CheckCircle2, color: "text-blue-600", trend: "+5" },
        { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-yellow-500", trend: "Stable" },
        { label: "Active Services", value: "3", icon: Package, color: "text-orange-600", trend: "0" },
    ]

    const recentBookings = [
        { id: 1, customer: "Imane K.", service: "Deep Cleaning", date: "Today, 2:00 PM", status: "Pending", price: "250 MAD" },
        { id: 2, customer: "Youssef A.", service: "AC Repair", date: "Tomorrow, 10:00 AM", status: "Confirmed", price: "400 MAD" },
        { id: 3, customer: "Sami R.", service: "Painting", date: "Feb 15, 11:30 AM", status: "Completed", price: "1,200 MAD" },
    ]

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-orange-50/50 p-6 md:p-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-orange-900">Professional Dashboard</h1>
                            <p className="text-orange-600">Welcome back, {profile?.firstName || "Professional"}! Here&apos;s what&apos;s happening today.</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => setIsCreateModalOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                New Service
                            </Button>
                        </div>
                    </div>

                    <CreateServiceModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                    />

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, i) => (
                            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                            {stat.trend}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-500 capitalize">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Active Bookings */}
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-orange-900">Recent Bookings</CardTitle>
                                    <CardDescription>Manage your upcoming and recent customer requests</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentBookings.map((booking) => (
                                            <div key={booking.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-orange-100 hover:border-orange-300 transition-all">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                                        {booking.customer[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{booking.customer}</div>
                                                        <div className="text-sm text-orange-600">{booking.service} • {booking.date}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right hidden sm:block">
                                                        <div className="font-bold text-gray-900">{booking.price}</div>
                                                        <Badge variant="outline" className={`${booking.status === "Pending" ? "text-orange-500 border-orange-200" :
                                                            booking.status === "Confirmed" ? "text-blue-500 border-blue-200" :
                                                                "text-green-500 border-green-200"
                                                            }`}>
                                                            {booking.status}
                                                        </Badge>
                                                    </div>
                                                    <Button variant="ghost" size="sm">Details</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AI Verification Status */}
                            <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white border-none shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-2 text-center md:text-left">
                                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                                <Shield className="h-6 w-6 text-orange-200" />
                                                <h2 className="text-2xl font-bold">AI Trusted Profile</h2>
                                            </div>
                                            <p className="text-orange-100">Your profile is currently 85% verified by our AI Trust system.</p>
                                            <div className="w-full bg-orange-900/20 rounded-full h-2 mt-4">
                                                <div className="bg-white h-2 rounded-full" style={{ width: "85%" }}></div>
                                            </div>
                                        </div>
                                        <Button variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-xl px-8 shadow-lg">
                                            Finish Verification
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Section */}
                        <div className="space-y-8">
                            {/* Subscription Card */}
                            <Card className="border-none shadow-sm overflow-hidden">
                                <div className="bg-orange-600 p-1"></div>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center">
                                        <Zap className="h-5 w-5 text-orange-600 mr-2" />
                                        Subscription Plan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-orange-900">Premium Professional</span>
                                            <Badge className="bg-orange-600 text-white">Active</Badge>
                                        </div>
                                        <p className="text-xs text-orange-600">Renews on March 1, 2026</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                            Priority listing in search
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                            AI Review Analytics
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                            0% commission on first 5 jobs
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 mt-4 rounded-xl">
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Manage Billing
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Performance Card */}
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center">
                                        <BarChart3 className="h-5 w-5 text-orange-600 mr-2" />
                                        Review Analytics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">AI Verified Reviews</span>
                                            <span className="font-bold text-green-600">42</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Flagged for Review</span>
                                            <span className="font-bold text-red-500">2</span>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-orange-50 pt-2">
                                            <span className="text-sm font-semibold text-orange-900">Trust Score</span>
                                            <span className="font-bold text-orange-600 text-lg">9.8/10</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
