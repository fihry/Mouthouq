import { useState } from "react"
import Image from "next/image"
import {
    Star,
    MapPin,
    Users,
    Clock,
    Calendar,
    Phone,
    Heart,
    Brain,
    Shield,
    Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { BookingModal } from "./BookingModal"

interface ServiceProp {
    id: number
    title: string
    price: number
    priceText: string
    provider: string
    providerImage: string
    location: string
    distance: number
    rating: number
    reviews: number
    image: string
    description: string
    tags: string[]
    responseTime: number
    responseTimeText: string
    badges: string[]
    category: string
    availability: string
    experience: number
    completedJobs: number
    isEmergency: boolean
    phone: string
    email: string
}

export const ServiceCard = ({ service }: { service: ServiceProp }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false)

    return (
        <>
            <div
                onClick={() => setIsBookingOpen(true)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100 cursor-pointer group overflow-hidden"
            >
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {service.badges.map((badge, index) => (
                            <div
                                key={index}
                                className={`flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${badge === "AI Match" ? "bg-orange-500" : badge === "Emergency" ? "bg-red-500" : "bg-green-500"
                                    }`}
                            >
                                {badge === "AI Match" && <Brain className="h-3 w-3 mr-1" />}
                                {badge === "Verified" && <Shield className="h-3 w-3 mr-1" />}
                                {badge === "Emergency" && <Zap className="h-3 w-3 mr-1" />}
                                {badge}
                            </div>
                        ))}
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group">
                        <Heart className="h-4 w-4 text-orange-600 group-hover:fill-current" />
                    </button>
                    {service.isEmergency && (
                        <div className="absolute bottom-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Zap className="h-3 w-3 mr-1" />
                            Emergency Service
                        </div>
                    )}
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-orange-900 group-hover:text-orange-600 transition-colors">
                            {service.title}
                        </h3>
                        <div className="text-xl font-bold text-orange-600">{service.priceText}</div>
                    </div>

                    <div className="flex items-center mb-3">
                        <div className="relative w-8 h-8 mr-3">
                            <Image
                                src={service.providerImage || "/placeholder.svg"}
                                alt={service.provider}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-orange-900">{service.provider}</div>
                            <div className="flex items-center text-xs text-orange-600">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>
                                    {service.location} • {service.distance} km
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            <div className="flex items-center mr-3">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-sm font-medium text-orange-900">{service.rating}</span>
                                <span className="text-sm text-orange-600 ml-1">({service.reviews})</span>
                            </div>
                        </div>
                        <div className="flex items-center text-xs text-orange-600">
                            <Users className="h-3 w-3 mr-1" />
                            <span>{service.completedJobs}+ jobs</span>
                        </div>
                    </div>

                    <p className="text-orange-700 text-sm mb-4 line-clamp-2">{service.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                                {tag}
                            </Badge>
                        ))}
                        {service.tags.length > 3 && (
                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                                +{service.tags.length - 3} more
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-orange-100">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-xs text-orange-600">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{service.responseTimeText}</span>
                            </div>
                            <div className="flex items-center text-xs text-orange-600">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{service.availability}</span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                            </Button>
                            <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md transition-all">
                                <Calendar className="h-4 w-4 mr-1" />
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                service={{
                    title: service.title,
                    provider: service.provider,
                    priceText: service.priceText,
                }}
            />
        </>
    )
}
