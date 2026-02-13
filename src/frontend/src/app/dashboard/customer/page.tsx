"use client"

import React, { useEffect, useState } from "react"
import {
    User,
    MapPin,
    Settings,
    Calendar,
    MessageSquare,
    Search,
    Star,
    Clock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import NavBar from "@/components/layout/NaveBar"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
}

export default function CustomerDashboard() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await apiClient.get("/users/profile")
                setProfile(data)
            } catch (error) {
                console.error("Failed to fetch profile:", error)
                toast.error("Failed to load profile", {
                    description: "Could not load your profile information. Please refresh the page.",
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const recentBookings = [
        { id: 1, professional: "Ahmed Cleaning", service: "Home Cleaning", date: "Feb 20, 10:00 AM", status: "Confirmed", price: "200 MAD" },
        { id: 2, professional: "Sami Electrics", service: "Socket Repair", date: "Feb 25, 2:00 PM", status: "Pending", price: "150 MAD" },
    ]

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-orange-50/50 p-6 md:p-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-orange-900">My Dashboard</h1>
                            <p className="text-orange-600">Welcome back, {profile?.firstName || "Customer"}! Ready to simplify your life?</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline" className="border-orange-200">
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <Card className="hover:border-orange-500 cursor-pointer transition-colors group">
                                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                                        <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            <Search className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-medium">Find Pros</span>
                                    </CardContent>
                                </Card>
                                <Card className="hover:border-orange-500 cursor-pointer transition-colors group">
                                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                                        <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-medium">My Bookings</span>
                                    </CardContent>
                                </Card>
                                <Card className="hover:border-orange-500 cursor-pointer transition-colors group">
                                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                                        <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            <MessageSquare className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-medium">Messages</span>
                                    </CardContent>
                                </Card>
                                <Card className="hover:border-orange-500 cursor-pointer transition-colors group">
                                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                                        <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            <Star className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-medium">Favorites</span>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Bookings */}
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-orange-900 flex items-center">
                                        <Clock className="h-5 w-5 mr-2" />
                                        Upcoming Appointments
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentBookings.map((booking) => (
                                            <div key={booking.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-orange-100 hover:border-orange-300 transition-all">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                                        {booking.professional[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{booking.professional}</div>
                                                        <div className="text-sm text-orange-600">{booking.service} • {booking.date}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right">
                                                        <div className="font-bold text-gray-900">{booking.price}</div>
                                                        <Badge variant="outline" className={`${booking.status === "Pending" ? "text-orange-500 border-orange-200" : "text-blue-500 border-blue-200"}`}>
                                                            {booking.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button variant="ghost" className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                            View All Bookings
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Profile Info Sidebar */}
                        <div className="space-y-8">
                            <Card className="border-none shadow-sm overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-24" />
                                <CardContent className="p-6 -mt-12 text-center">
                                    <div className="inline-flex h-20 w-20 rounded-full border-4 border-white bg-orange-100 items-center justify-center text-orange-600 text-2xl font-bold mb-4 shadow-md">
                                        {profile?.firstName?.[0] || <User className="h-10 w-10" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{profile?.firstName} {profile?.lastName}</h3>
                                    <div className="flex items-center justify-center text-sm text-gray-500 mt-1">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {profile?.city || "Not specified"}
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <div className="flex justify-between text-sm py-2 border-b border-orange-50">
                                            <span className="text-gray-500">Email</span>
                                            <span className="font-medium text-gray-900">{profile?.email}</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-orange-50">
                                            <span className="text-gray-500">Member Since</span>
                                            <span className="font-medium text-gray-900">Feb 2026</span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-orange-600 hover:bg-orange-700 mt-6 rounded-xl shadow-lg">
                                        Edit Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
