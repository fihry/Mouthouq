"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Info, CheckCircle2 } from "lucide-react"
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

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    service: {
        title: string
        provider: string
        priceText: string
    }
}

export function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
    const [date, setDate] = useState<Date>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleBooking = async () => {
        setIsSubmitting(true)
        // Simulate API call to backend service
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSuccess(true)
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
                        <span className="text-orange-900 font-medium">{service.title}</span>
                        <span className="text-orange-600 font-bold">{service.priceText}</span>
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
                        <Label htmlFor="notes" className="text-orange-900">Notes for Pro</Label>
                        <Textarea
                            id="notes"
                            placeholder="e.g., Specific entry instructions, emergency details..."
                            className="border-orange-200 focus:ring-orange-500 min-h-[100px]"
                        />
                    </div>

                    <div className="flex items-start space-x-2 text-xs text-orange-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <p>
                            Mouthouq handles payments securely. You&apos;ll be charged once the service is confirmed and completed.
                            A 15% platform fee is included in the price.
                        </p>
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
