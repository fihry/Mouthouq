"use client"

import { useEffect, useState } from "react"
import { CheckCircle, ArrowRight, User, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MouthouqOriginalLogo } from "@/components/shared/logo"
import Link from "next/link"

export default function RegistrationSuccessPage() {
    const [userType, setUserType] = useState<string | null>(null)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setUserType(params.get("type"))
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto text-center">
                <MouthouqOriginalLogo size="large" />

                <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500" />
                    <CardContent className="p-8 md:p-12">
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 p-4 rounded-full">
                                <CheckCircle className="h-16 w-16 text-green-600" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Welcome to Mouthouq! Your account has been created successfully.
                            {userType === "professional"
                                ? " Our team will review your professional profile within 24 hours."
                                : " You can now start booking services from our trusted professionals."}
                        </p>

                        <div className="space-y-4">
                            <Link href="/login">
                                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl group">
                                    Sign In to Your Account
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            <div className="pt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                                {userType === "professional" ? (
                                    <><Briefcase className="h-4 w-4" /> <span>Professional Account</span></>
                                ) : (
                                    <><User className="h-4 w-4" /> <span>Customer Account</span></>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <p className="mt-8 text-gray-500">
                    Need help? <Link href="/contact" className="text-orange-600 hover:underline">Contact Support</Link>
                </p>
            </div>
        </div>
    )
}
