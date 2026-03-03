"use client"

import { useCallback, useEffect, useState } from "react"
import { Calendar as CalendarIcon, Info, CheckCircle2, ShieldCheck, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import { getStoredUser } from "@/lib/session"
import type { BookingRecord, ReviewRecord, ServiceRecord } from "@/lib/backend-types"
import { normalizeReview, normalizeService, pickUserName } from "@/lib/backend-normalizers"

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    service: {
        id: string
        title: string
        provider: string
        priceText: string
    }
}

export function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
    const [date, setDate] = useState<Date>()
    const [timeValue, setTimeValue] = useState("09:00")
    const [notes, setNotes] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [bookingId, setBookingId] = useState("")
    const [reviews, setReviews] = useState<ReviewRecord[]>([])
    const [isLoadingReviews, setIsLoadingReviews] = useState(false)
    const [reviewRating, setReviewRating] = useState(0)
    const [reviewComment, setReviewComment] = useState("")
    const [isSubmittingReview, setIsSubmittingReview] = useState(false)
    const [serviceDetails, setServiceDetails] = useState<ServiceRecord | null>(null)

    const loadServiceDetails = useCallback(async () => {
        try {
            const details = await apiClient.get<ServiceRecord>(`/services/${service.id}`)
            setServiceDetails(details)
        } catch {
            setServiceDetails(null)
        }
    }, [service.id])

    const loadReviews = useCallback(async () => {
        setIsLoadingReviews(true)
        try {
            const response = await apiClient.get<ReviewRecord[]>(`/reviews/${service.id}`)
            setReviews(Array.isArray(response) ? response : [])
        } catch {
            setReviews([])
        } finally {
            setIsLoadingReviews(false)
        }
    }, [service.id])

    useEffect(() => {
        if (!isOpen) return
        setDate(undefined)
        setTimeValue("09:00")
        setNotes("")
        setIsSubmitting(false)
        setIsSuccess(false)
        setBookingId("")
        setReviewRating(0)
        setReviewComment("")
        setServiceDetails(null)
        void loadServiceDetails()
        void loadReviews()
    }, [isOpen, loadReviews, loadServiceDetails])

    const handleBooking = async () => {
        if (!date) return

        const user = getStoredUser()
        if (!user) {
            toast.error("Login required", {
                description: "Please sign in as a customer to request a booking.",
            })
            return
        }

        if (user.userType !== "customer") {
            toast.error("Customer account required", {
                description: "Only customer accounts can create bookings.",
            })
            return
        }

        const [hours, minutes] = timeValue.split(":").map((part) => Number.parseInt(part, 10))
        const scheduledAt = new Date(date)
        scheduledAt.setHours(Number.isFinite(hours) ? hours : 9, Number.isFinite(minutes) ? minutes : 0, 0, 0)

        setIsSubmitting(true)
        try {
            const booking = await apiClient.post<BookingRecord>("/bookings", {
                serviceId: service.id,
                scheduledAt: scheduledAt.toISOString(),
                notes: notes.trim(),
            })

            setBookingId(booking.id ?? booking.ID ?? "")
            setIsSuccess(true)
            toast.success("Booking requested", {
                description: "Your request was sent to the provider for confirmation.",
            })
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to create booking."
            toast.error("Booking failed", {
                description: message,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSubmitReview = async () => {
        const user = getStoredUser()
        if (!user) {
            toast.error("Login required", {
                description: "Please sign in to submit a review.",
            })
            return
        }

        if (user.userType !== "customer") {
            toast.error("Customer account required", {
                description: "Only customers can submit reviews.",
            })
            return
        }

        if (!reviewRating || reviewComment.trim().length < 10) {
            toast.error("Review is incomplete", {
                description: "Choose a rating and write at least 10 characters.",
            })
            return
        }

        setIsSubmittingReview(true)
        try {
            await apiClient.post<ReviewRecord>("/reviews", {
                serviceId: service.id,
                rating: reviewRating,
                comment: reviewComment.trim(),
            })

            toast.success("Review submitted", {
                description: "Thanks for sharing your experience.",
            })

            setReviewRating(0)
            setReviewComment("")
            await loadReviews()
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to submit review."
            toast.error("Review failed", {
                description: message,
            })
        } finally {
            setIsSubmittingReview(false)
        }
    }

    if (isSuccess) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md text-center p-12">
                    <div className="flex flex-col items-center">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-orange-900 mb-2">Booking Requested!</DialogTitle>
                        <DialogDescription className="text-orange-600 mb-8">
                            Your request for <strong>{service.title}</strong> has been sent to <strong>{service.provider}</strong>.
                            They will confirm shortly.
                            {bookingId && <span className="block mt-2 text-xs text-orange-500">Booking ID: {bookingId}</span>}
                        </DialogDescription>
                        <Button onClick={onClose} className="w-full bg-orange-600 hover:bg-orange-700">
                            Go to My Bookings
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-orange-900">Book Service</DialogTitle>
                    <DialogDescription className="text-orange-600">
                        Secure your spot with {service.provider} for {service.title}.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <span className="text-orange-900 font-medium">{serviceDetails ? normalizeService(serviceDetails).title : service.title}</span>
                        <span className="text-orange-600 font-bold">
                            {serviceDetails
                                ? `${normalizeService(serviceDetails).priceAmount} ${normalizeService(serviceDetails).priceCurrency}`
                                : service.priceText}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-orange-900">Select Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal border-orange-200",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time" className="text-orange-900">Preferred Time</Label>
                        <input
                            id="time"
                            type="time"
                            value={timeValue}
                            onChange={(event) => setTimeValue(event.target.value)}
                            className="w-full h-10 rounded-md border border-orange-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-orange-900">Notes for Pro</Label>
                        <Textarea
                            id="notes"
                            placeholder="e.g., Specific entry instructions, emergency details..."
                            className="border-orange-200 focus:ring-orange-500 min-h-[100px]"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                        />
                    </div>

                    <div className="flex items-start space-x-2 text-xs text-orange-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <p>
                            Mouthouq handles payments securely. You&apos;ll be charged once the service is confirmed and completed.
                            A 15% platform fee is included in the price.
                        </p>
                    </div>

                    <div className="rounded-xl border border-orange-100 p-4 bg-white">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-orange-900">Service Reviews</h4>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => void loadReviews()}
                                disabled={isLoadingReviews}
                                className="text-orange-600"
                            >
                                Refresh
                            </Button>
                        </div>

                        {isLoadingReviews ? (
                            <p className="text-xs text-orange-500">Loading reviews...</p>
                        ) : reviews.length === 0 ? (
                            <p className="text-xs text-orange-500">No reviews yet.</p>
                        ) : (
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                                {reviews.map((review) => {
                                    const normalized = normalizeReview(review)
                                    return (
                                        <div key={normalized.id || `${normalized.createdAt}-${normalized.comment}`} className="rounded-lg bg-orange-50/60 p-3">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-medium text-orange-900">{pickUserName(normalized.user)}</span>
                                                <span className="text-orange-700">{normalized.rating.toFixed(1)} / 5</span>
                                            </div>
                                            <p className="mt-1 text-xs text-orange-700">{normalized.comment}</p>
                                            {normalized.isAiVerified && (
                                                <span className="mt-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                                                    <ShieldCheck className="mr-1 h-3 w-3" />
                                                    AI verified
                                                </span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        <div className="mt-4 border-t border-orange-100 pt-4 space-y-3">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setReviewRating(value)}
                                        className="rounded p-1 hover:bg-orange-100"
                                    >
                                        <Star className={cn("h-4 w-4", value <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-orange-200")} />
                                    </button>
                                ))}
                            </div>
                            <Textarea
                                value={reviewComment}
                                onChange={(event) => setReviewComment(event.target.value)}
                                placeholder="Share your experience after service completion."
                                className="min-h-[80px] border-orange-200"
                            />
                            <Button
                                type="button"
                                onClick={handleSubmitReview}
                                disabled={isSubmittingReview}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                {isSubmittingReview ? "Submitting..." : "Submit Review"}
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} className="text-orange-700">Cancel</Button>
                    <Button
                        disabled={!date || isSubmitting}
                        onClick={handleBooking}
                        className="bg-orange-600 hover:bg-orange-700 px-8"
                    >
                        {isSubmitting ? "Processing..." : "Confirm Request"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
